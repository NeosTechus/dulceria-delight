import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb.js';
import { signToken } from '../_lib/auth.js';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, password, role = 'customer' } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const { db } = await connectToDatabase();

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists' });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
            role,
            createdAt: new Date(),
        });

        const token = signToken({
            userId: result.insertedId.toString(),
            email,
            role,
        });

        return res.status(201).json({
            token,
            user: {
                id: result.insertedId.toString(),
                name,
                email,
                role,
            },
        });
    } catch (error: any) {
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
