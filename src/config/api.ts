/**
 * API Configuration for Vercel Serverless Functions
 *
 * In production, set VITE_API_BASE_URL in Vercel to your full API base (e.g.
 * https://www.dulceriamedina.com/api). If unset, uses relative /api (same origin).
 *
 * Server env vars (must be set in Vercel Dashboard → Settings → Environment Variables):
 * - MONGODB_URI, JWT_SECRET, STRIPE_SECRET_KEY, GOOGLE_CLIENT_SECRET
 * - Optional: STRIPE_WEBHOOK_SECRET
 *
 * Client (VITE_*, set in Vercel for production build):
 * - VITE_API_BASE_URL, VITE_STRIPE_PUBLISHABLE_KEY, VITE_GOOGLE_CLIENT_ID
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string)?.trim() || '/api';
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
