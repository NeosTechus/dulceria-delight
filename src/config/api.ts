/**
 * API Configuration for Vercel Serverless Functions
 * 
 * Vercel serverless functions live at /api/* on the same origin.
 * 
 * Env vars (set in Vercel dashboard or .env.local):
 * - MONGODB_URI: Your MongoDB connection string
 * - STRIPE_SECRET_KEY: Your Stripe secret key
 * - JWT_SECRET: Secret for signing JWT tokens
 * - GOOGLE_CLIENT_ID: Google OAuth client ID (server validation)
 * - GOOGLE_CLIENT_SECRET: Google OAuth client secret
 * 
 * Client-side env vars (prefixed with VITE_):
 * - VITE_STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key (pk_)
 * - VITE_GOOGLE_CLIENT_ID: Your Google OAuth client ID
 */

export const API_BASE_URL = '/api';
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
