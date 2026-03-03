import { API_BASE_URL } from '@/config/api';
import { authApi } from '@/services/auth';
import type { CartItem } from '@/data/menu';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authApi.getAuthHeaders(),
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Orders (/api/orders) ─────────────────────────────────────────────
export interface Order {
  _id: string;
  items: CartItem[];
  total: number;
  tax: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'completed' | 'rejected';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType?: 'pickup' | 'delivery';
  deliveryAddress?: string;
  pickupDate?: string;
  pickupTime?: string;
  paymentStatus?: string;
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  createdAt: string;
}

export const ordersApi = {
  create: (data: { items: CartItem[]; customerName: string; customerPhone: string }) =>
    request<{ order: Order; clientSecret: string }>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getById: (id: string) => request<Order>(`/orders/${id}`),

  list: () => request<Order[]>('/orders'),

  updateStatus: (id: string, status: Order['status']) =>
    request<Order>(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ─── Menu (/api/menu) ────────────────────────────────────────────────
export const menuApi = {
  list: () => request<any[]>('/menu'),
  create: (item: any) =>
    request('/menu', { method: 'POST', body: JSON.stringify(item) }),
  update: (id: string, item: any) =>
    request(`/menu/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
  delete: (id: string) =>
    request(`/menu/${id}`, { method: 'DELETE' }),
};
