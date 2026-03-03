import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb';
import { authenticate } from '../_lib/auth';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const payload = authenticate(req);
        if (!payload) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne(
            { _id: new ObjectId(payload.userId) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar || undefined,
            },
        });
    } catch (error: any) {
        console.error('Auth me error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
