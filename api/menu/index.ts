import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb.js';
import { authenticate } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { db } = await connectToDatabase();

    // GET /api/menu — List all menu items
    if (req.method === 'GET') {
        try {
            const items = await db.collection('menu').find({}).toArray();
            const formatted = items.map((item) => ({
                ...item,
                _id: item._id.toString(),
            }));
            return res.status(200).json(formatted);
        } catch (error: any) {
            console.error('List menu error:', error);
            return res.status(500).json({ message: 'Failed to fetch menu' });
        }
    }

    // POST /api/menu — Create a menu item (admin only)
    if (req.method === 'POST') {
        try {
            const user = authenticate(req);
            if (!user || user.role !== 'admin') {
                return res.status(403).json({ message: 'Admin access required' });
            }

            const { name, description, price, category, emoji } = req.body;
            if (!name || !price || !category) {
                return res.status(400).json({ message: 'Name, price, and category are required' });
            }

            const result = await db.collection('menu').insertOne({
                name,
                description: description || '',
                price,
                category,
                emoji: emoji || '',
                createdAt: new Date(),
            });

            return res.status(201).json({
                _id: result.insertedId.toString(),
                name,
                description,
                price,
                category,
                emoji,
            });
        } catch (error: any) {
            console.error('Create menu item error:', error);
            return res.status(500).json({ message: 'Failed to create menu item' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
