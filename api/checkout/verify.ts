import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * POST /api/checkout/verify — Verify payment and update order status.
 * Called when user lands on success page, as a fallback if webhook hasn't fired yet.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const { db } = await connectToDatabase();
        const order = await db.collection('orders').findOne({ _id: new ObjectId(orderId) });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // If already confirmed, return success
        if (order.status !== 'awaiting_payment') {
            return res.status(200).json({ status: order.status, verified: true });
        }

        // Check Stripe session status
        if (order.stripeSessionId) {
            const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);

            if (session.payment_status === 'paid') {
                await db.collection('orders').updateOne(
                    { _id: new ObjectId(orderId) },
                    {
                        $set: {
                            status: 'pending',
                            paymentStatus: 'paid',
                            paidAt: new Date(),
                        },
                    }
                );
                return res.status(200).json({ status: 'pending', verified: true });
            }
        }

        return res.status(200).json({ status: order.status, verified: false });
    } catch (error: any) {
        console.error('Verify error:', error);
        return res.status(500).json({ message: 'Failed to verify payment' });
    }
}
