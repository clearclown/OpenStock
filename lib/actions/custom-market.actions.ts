'use server';

import { connectToDatabase } from '@/database/mongoose';
import { CustomMarket } from '@/database/models/custom-market.model';
import { revalidatePath } from 'next/cache';

export async function addCustomMarket({
    userId,
    exchangeCode,
    exchangeName,
    country,
    region,
}: {
    userId: string;
    exchangeCode: string;
    exchangeName: string;
    country: string;
    region: string;
}) {
    try {
        await connectToDatabase();

        // Check if already added
        const existing = await CustomMarket.findOne({ userId, exchangeCode });
        if (existing) {
            return { success: false, error: 'Market already added' };
        }

        await CustomMarket.create({
            userId,
            exchangeCode,
            exchangeName,
            country,
            region,
            addedAt: new Date(),
        });

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error adding custom market:', error);
        return { success: false, error: 'Failed to add market' };
    }
}

export async function removeCustomMarket({
    userId,
    exchangeCode,
}: {
    userId: string;
    exchangeCode: string;
}) {
    try {
        await connectToDatabase();

        await CustomMarket.deleteOne({ userId, exchangeCode });

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error removing custom market:', error);
        return { success: false, error: 'Failed to remove market' };
    }
}

export async function getUserCustomMarkets(userId: string) {
    try {
        await connectToDatabase();

        const markets = await CustomMarket.find({ userId }).sort({ addedAt: -1 }).lean();

        return markets.map(market => ({
            exchangeCode: market.exchangeCode,
            exchangeName: market.exchangeName,
            country: market.country,
            region: market.region,
            addedAt: market.addedAt,
        }));
    } catch (error) {
        console.error('Error fetching custom markets:', error);
        return [];
    }
}

export async function isMarketAdded(userId: string, exchangeCode: string) {
    try {
        await connectToDatabase();

        const exists = await CustomMarket.exists({ userId, exchangeCode });
        return Boolean(exists);
    } catch (error) {
        console.error('Error checking market:', error);
        return false;
    }
}
