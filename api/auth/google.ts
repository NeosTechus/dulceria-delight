import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb.js';
import { signToken } from '../_lib/auth.js';
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ message: 'Google ID token is required' });
        }

        if (!GOOGLE_CLIENT_ID) {
            return res.status(500).json({ message: 'Google OAuth is not configured' });
        }

        // Verify the Google ID token
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(401).json({ message: 'Invalid Google token' });
        }

        const { db } = await connectToDatabase();

        // Find or create user
        let user = await db.collection('users').findOne({ email: payload.email });

        if (!user) {
            const result = await db.collection('users').insertOne({
                name: payload.name || 'Google User',
                email: payload.email,
                avatar: payload.picture || undefined,
                role: 'customer',
                googleId: payload.sub,
                createdAt: new Date(),
            });
            user = {
                _id: result.insertedId,
                name: payload.name || 'Google User',
                email: payload.email,
                avatar: payload.picture || undefined,
                role: 'customer' as const,
            };
        }

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        return res.status(200).json({
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar || payload.picture || undefined,
            },
        });
    } catch (error: any) {
        console.error('Google auth error:', error);
        return res.status(401).json({ message: 'Google authentication failed' });
    }
}
