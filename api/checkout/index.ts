import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { items, customerName, customerPhone, customerEmail, orderType, deliveryAddress, pickupDate, pickupTime } = req.body;

        if (!items || !items.length || !customerName || !customerPhone) {
            return res.status(400).json({ message: 'Items, customer name, and phone are required' });
        }

        // Calculate totals
        const subtotal = items.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
        );
        const tax = Math.round(subtotal * 0.0963 * 100) / 100;
        const total = Math.round((subtotal + tax) * 100) / 100;

        // Save order to MongoDB first
        const { db } = await connectToDatabase();
        const order = {
            items,
            total: subtotal,
            tax,
            status: 'awaiting_payment' as const,
            customerName,
            customerPhone,
            customerEmail: customerEmail || '',
            orderType: orderType || 'pickup',
            deliveryAddress: deliveryAddress || undefined,
            pickupDate: pickupDate || undefined,
            pickupTime: pickupTime || undefined,
            createdAt: new Date(),
        };

        const result = await db.collection('orders').insertOne(order);
        const orderId = result.insertedId.toString();

        // Build line items for Stripe Checkout
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${item.emoji || ''} ${item.name}`.trim(),
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Add tax as a separate line item
        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: '📋 Sales Tax (9.63%)',
                },
                unit_amount: Math.round(tax * 100),
            },
            quantity: 1,
        });

        // Determine URLs for redirect
        const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || 'http://localhost:8080';

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/orders?payment=success&orderId=${orderId}`,
            cancel_url: `${origin}/orders?payment=cancelled&orderId=${orderId}`,
            customer_email: customerEmail || undefined,
            metadata: {
                orderId,
                customerName,
                customerPhone,
            },
        });

        // Update order with Stripe session ID
        await db.collection('orders').updateOne(
            { _id: result.insertedId },
            { $set: { stripeSessionId: session.id } }
        );

        return res.status(200).json({
            url: session.url,
            orderId,
        });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return res.status(500).json({ message: error.message || 'Failed to create checkout session' });
    }
}
