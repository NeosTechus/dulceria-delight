import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb.js';
import { authenticate } from '../_lib/auth.js';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { db } = await connectToDatabase();

    // POST /api/orders — Create a new order
    if (req.method === 'POST') {
        try {
            const { items, customerName, customerPhone } = req.body;

            if (!items || !items.length || !customerName || !customerPhone) {
                return res.status(400).json({ message: 'Items, customer name, and phone are required' });
            }

            // Calculate total
            const total = items.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0
            );
            const tax = Math.round(total * 0.0963 * 100) / 100; // St. Louis tax rate
            const grandTotal = Math.round((total + tax) * 100) / 100;

            // Create Stripe PaymentIntent
            let paymentIntent;
            let clientSecret = '';

            if (process.env.STRIPE_SECRET_KEY) {
                paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(grandTotal * 100), // Stripe uses cents
                    currency: 'usd',
                    metadata: {
                        customerName,
                        customerPhone,
                    },
                });
                clientSecret = paymentIntent.client_secret || '';
            }

            // Save order to database
            const order = {
                items,
                total,
                tax,
                status: 'pending' as const,
                customerName,
                customerPhone,
                stripePaymentIntentId: paymentIntent?.id || undefined,
                createdAt: new Date(),
            };

            const result = await db.collection('orders').insertOne(order);

            return res.status(201).json({
                order: { _id: result.insertedId.toString(), ...order },
                clientSecret,
            });
        } catch (error: any) {
            console.error('Create order error:', error);
            return res.status(500).json({ message: error.message || 'Failed to create order' });
        }
    }

    // GET /api/orders — List all orders (admin/chef only)
    if (req.method === 'GET') {
        try {
            const user = authenticate(req);
            if (!user || !['admin', 'chef'].includes(user.role)) {
                return res.status(403).json({ message: 'Admin or chef access required' });
            }

            const orders = await db
                .collection('orders')
                .find({
                    status: { $ne: 'awaiting_payment' },
                    paymentStatus: 'paid',
                })
                .sort({ createdAt: -1 })
                .limit(100)
                .toArray();

            const formatted = orders.map((o) => ({
                ...o,
                _id: o._id.toString(),
            }));

            return res.status(200).json(formatted);
        } catch (error: any) {
            console.error('List orders error:', error);
            return res.status(500).json({ message: 'Failed to fetch orders' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
