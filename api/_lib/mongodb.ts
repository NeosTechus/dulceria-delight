import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in your environment variables');
}

// Use global to preserve connection across Vercel dev hot-reloads
const globalWithMongo = globalThis as typeof globalThis & {
    _mongoClient: MongoClient | null;
    _mongoDb: Db | null;
};

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
    if (globalWithMongo._mongoClient && globalWithMongo._mongoDb) {
        return { client: globalWithMongo._mongoClient, db: globalWithMongo._mongoDb };
    }

    const client = await MongoClient.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
    });
    const db = client.db();

    globalWithMongo._mongoClient = client;
    globalWithMongo._mongoDb = db;

    return { client, db };
}

