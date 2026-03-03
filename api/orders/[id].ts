import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb';
import { authenticate } from '../_lib/auth';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    let objectId: ObjectId;
    try {
        objectId = new ObjectId(id);
    } catch {
        return res.status(400).json({ message: 'Invalid order ID' });
    }

    const { db } = await connectToDatabase();

    // GET /api/orders/:id — Get a single order
    if (req.method === 'GET') {
        try {
            const order = await db.collection('orders').findOne({ _id: objectId });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(200).json({ ...order, _id: order._id.toString() });
        } catch (error: any) {
            console.error('Get order error:', error);
            return res.status(500).json({ message: 'Failed to fetch order' });
        }
    }

    // PATCH /api/orders/:id — Update order status (admin/chef only)
    if (req.method === 'PATCH') {
        try {
            const user = authenticate(req);
            if (!user || !['admin', 'chef'].includes(user.role)) {
                return res.status(403).json({ message: 'Admin or chef access required' });
            }

            const { status } = req.body;
            const validStatuses = ['pending', 'accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'completed', 'rejected'];
            if (!status || !validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }

            // If rejecting, process Stripe refund first
            let refundId: string | undefined;
            if (status === 'rejected') {
                const order = await db.collection('orders').findOne({ _id: objectId });
                if (order?.stripeSessionId) {
                    try {
                        // Retrieve the checkout session to get the payment intent
                        const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);
                        const paymentIntentId = session.payment_intent as string;

                        if (paymentIntentId) {
                            // Issue full refund
                            const refund = await stripe.refunds.create({
                                payment_intent: paymentIntentId,
                                reason: 'requested_by_customer',
                            });
                            refundId = refund.id;
                            console.log(`💰 Refund ${refund.id} issued for order ${id}`);
                        }
                    } catch (refundError: any) {
                        console.error('Refund error:', refundError.message);
                        // Still reject the order even if refund fails — can be retried manually
                    }
                }
            }

            const updateFields: any = {
                status,
                updatedAt: new Date(),
            };
            if (refundId) {
                updateFields.refundId = refundId;
                updateFields.refundedAt = new Date();
            }

            const result = await db.collection('orders').findOneAndUpdate(
                { _id: objectId },
                { $set: updateFields },
                { returnDocument: 'after' }
            );

            if (!result) {
                return res.status(404).json({ message: 'Order not found' });
            }

            return res.status(200).json({
                ...result,
                _id: result._id.toString(),
                refunded: !!refundId,
            });
        } catch (error: any) {
            console.error('Update order error:', error);
            return res.status(500).json({ message: 'Failed to update order' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
