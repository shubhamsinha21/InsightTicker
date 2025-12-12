import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongoosecache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null; // type of promise -> Promise
    }
}

let cached = global.mongoosecache;

if(!cached) {
    cached = global.mongoosecache = { conn: null, promise: null};
}

export const connectToDatabase = async () => {
    if(!MONGODB_URI) throw new Error("MONGODB_URI must be set within .env")

    if(!cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false});
    }

    try {
        cached.conn = await cached.promise;
        
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    console.log(`Conneced to database ${process.env.NODE_ENV} - ${MONGODB_URI}`);

}