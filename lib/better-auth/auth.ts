import { betterAuth } from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {connectToDatabase} from "@/database/mongoose";
import {nextCookies} from "better-auth/next-js";


let authInstance: ReturnType<typeof betterAuth> | null = null;


export const getAuth = async () => {
    if(authInstance) {
        return authInstance;
    }

    // Skip auth initialization during build
    if (process.env.SKIP_DB_CONNECTION === 'true') {
        throw new Error("Auth initialization skipped during build");
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection;

    if (!db) {
        throw new Error("MongoDB connection not found!");
    }

    authInstance = betterAuth({
        database: mongodbAdapter(db as any),
       secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        plugins: [nextCookies()],

    });

    return authInstance;
}

// Initialize auth - returns a stub during build, real instance at runtime
async function initAuth() {
    try {
        return await getAuth();
    } catch (error) {
        // During build time, return a stub that will never be called
        console.log('Auth initialization deferred until runtime');
        return null;
    }
}

const authInstancePromise = initAuth();

export const auth = new Proxy({} as Awaited<ReturnType<typeof getAuth>>, {
    get(_, prop) {
        return new Proxy({} as any, {
            get(__, nestedProp) {
                return async (...args: any[]) => {
                    const instance = await authInstancePromise;
                    if (!instance) {
                        throw new Error('Auth not initialized - this should not be called during build');
                    }
                    return (instance as any)[prop][nestedProp](...args);
                };
            },
            apply: async (___, ____, args: any[]) => {
                const instance = await authInstancePromise;
                if (!instance) {
                    throw new Error('Auth not initialized - this should not be called during build');
                }
                return (instance as any)[prop](...args);
            }
        });
    }
});