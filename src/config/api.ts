/**
 * API Configuration for Vercel Serverless Functions
 * 
 * Vercel serverless functions live at /api/* on the same origin.
 * No VITE_API_BASE_URL needed — all calls are relative.
 * 
 * Env vars (set in Vercel dashboard or .env.local):
 * - MONGODB_URI: Your MongoDB connection string
 * - STRIPE_SECRET_KEY: Your Stripe secret key
 * - JWT_SECRET: Secret for signing JWT tokens
 * 
 * Client-side env vars (prefixed with VITE_):
 * - VITE_STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key (pk_)
 */

export const API_BASE_URL = '/api';
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
