import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
    api: {
        bodyParser: false, // Stripe needs the raw body for signature verification
    },
};

// Helper to get raw body from request
function getRawBody(req: VercelRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        let event: Stripe.Event;

        if (endpointSecret) {
            // Verify webhook signature in production
            const rawBody = await getRawBody(req);
            const sig = req.headers['stripe-signature']!;
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
        } else {
            // In development without webhook secret, trust the payload
            event = req.body as Stripe.Event;
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const orderId = session.metadata?.orderId;

            if (orderId) {
                const { db } = await connectToDatabase();
                const { ObjectId } = await import('mongodb');

                await db.collection('orders').updateOne(
                    { _id: new ObjectId(orderId) },
                    {
                        $set: {
                            status: 'pending',
                            paymentStatus: 'paid',
                            stripeSessionId: session.id,
                            paidAt: new Date(),
                        },
                    }
                );

                console.log(`✅ Order ${orderId} payment confirmed`);
            }
        }

        return res.status(200).json({ received: true });
    } catch (error: any) {
        console.error('Webhook error:', error.message);
        return res.status(400).json({ message: `Webhook error: ${error.message}` });
    }
}
