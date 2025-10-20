# Use official Node.js 20 Alpine image as base
# Compatible with both Docker and Podman
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./
# Uncomment the next line if you use pnpm and have pnpm-lock.yaml
# COPY pnpm-lock.yaml ./

# Install dependencies (choose npm or pnpm)
RUN npm install
# If using pnpm, replace with:
# RUN npm install -g pnpm && pnpm install

# Copy all project files
COPY . .

# Build the Next.js application (set temporary env to skip DB connection during build)
ENV SKIP_DB_CONNECTION=true
RUN npm run build
# Or if using pnpm:
# RUN pnpm run build

# Unset the build-time environment variable
ENV SKIP_DB_CONNECTION=

# Expose the port Next.js runs on
EXPOSE 8301

# Set the PORT environment variable for Next.js
ENV PORT=8301

# Start the Next.js production server
CMD ["npm", "start"]
# Or if using pnpm:
# CMD ["pnpm", "start"]
