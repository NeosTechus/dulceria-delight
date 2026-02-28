/**
 * API Configuration
 * 
 * Set these environment variables when running locally:
 * - VITE_API_BASE_URL: Your backend server URL (default: http://localhost:5000/api)
 * - VITE_STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key (starts with pk_)
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
