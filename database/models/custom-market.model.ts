import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface CustomMarket extends Document {
    userId: string;
    exchangeCode: string;
    exchangeName: string;
    country: string;
    region: string;
    addedAt: Date;
}

const CustomMarketSchema = new Schema<CustomMarket>(
    {
        userId: { type: String, required: true, index: true },
        exchangeCode: { type: String, required: true, uppercase: true, trim: true },
        exchangeName: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        region: { type: String, required: true, trim: true },
        addedAt: { type: Date, default: Date.now },
    },
    { timestamps: false }
);

// Prevent duplicate exchanges per user
CustomMarketSchema.index({ userId: 1, exchangeCode: 1 }, { unique: true });

export const CustomMarket: Model<CustomMarket> =
    (models?.CustomMarket as Model<CustomMarket>) || model<CustomMarket>('CustomMarket', CustomMarketSchema);
