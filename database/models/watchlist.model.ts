// each user can search and save their fav stock and come back to look whenever want
// here we will be creating a playlist (schema) of stocks  and watching over the lists

import { model, models, Schema, type Document, type Model } from "mongoose";

export interface WatchlistItem extends Document {
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
}

const WatchlistSchema = new Schema<WatchlistItem>(
    {
        userId: { type: String, required: true, index: true},
        symbol: { type: String, required: true, uppercase: true, trim: true},
        company: { type: String, required: true, trim: true},
        addedAt: { type: Date, default: Date.now}
    }, 
    { timestamps: false}
);

// Prevent duplicate symbols per user
WatchlistSchema.index({ userId: 1, symbol: 1}, { unique: true});

export const watchlist: Model<WatchlistItem> =
    (models?.Watchlistatchlist as Model<WatchlistItem>) || model<WatchlistItem>("WatchlistItem", WatchlistSchema)