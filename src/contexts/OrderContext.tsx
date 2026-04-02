import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { type CartItem } from '@/data/menu';
import { ordersApi, type Order } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'rejected';

export interface StatusChange {
  status: OrderStatus;
  at: Date;
}

export interface PlacedOrder {
  id: string;
  items: { name: string; qty: number; category: string; emoji?: string }[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  pickupDate?: string;
  pickupTime?: string;
  status: OrderStatus;
  statusHistory: StatusChange[];
  total: number;
  createdAt: Date;
  prepMinutes: number;
}

interface OrderContextType {
  orders: PlacedOrder[];
  placeOrder: (order: Omit<PlacedOrder, 'id' | 'status' | 'createdAt' | 'statusHistory'>) => string;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updatePrepTime: (id: string, minutes: number) => void;
  getOrdersByStatus: (status: OrderStatus) => PlacedOrder[];
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

let orderCounter = 1;

// Convert API Order to PlacedOrder format — preserving ALL fields
function apiOrderToPlaced(o: Order): PlacedOrder {
  // Use the status directly from the DB — no mapping needed
  // The DB now stores the same statuses the chef dashboard uses
  const status = (o.status as OrderStatus) || 'pending';

  return {
    id: o._id,
    items: (o.items || []).map((i) => ({
      name: i.name,
      qty: i.quantity || 1,
      category: i.category || '',
      emoji: i.emoji,
    })),
    customerName: o.customerName || '',
    customerPhone: o.customerPhone || '',
    customerEmail: o.customerEmail || '',
    orderType: o.orderType || 'pickup',
    deliveryAddress: o.deliveryAddress,
    pickupDate: o.pickupDate,
    pickupTime: o.pickupTime,
    status,
    statusHistory: [{ status, at: new Date(o.createdAt) }],
    total: (o.total || 0) + (o.tax || 0),
    createdAt: new Date(o.createdAt),
    prepMinutes: 20,
  };
}

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const { user } = useAuth();

  // Fetch orders from API for admin/chef users
  const refreshOrders = useCallback(async () => {
    if (!user || !['admin', 'chef'].includes(user.role)) return;
    try {
      const apiOrders = await ordersApi.list();
      const placed = apiOrders.map(apiOrderToPlaced);
      setOrders((prev) => {
        // Merge: keep local-only orders, update/add API orders
        const apiIds = new Set(placed.map((o) => o.id));
        const localOnly = prev.filter((o) => !apiIds.has(o.id) && o.id.startsWith('ORD-'));
        return [...placed, ...localOnly];
      });
    } catch (err) {
      // If API fails, keep local orders
      console.warn('Failed to fetch orders from API:', err);
    }
  }, [user]);

  // Poll for new orders every 10 seconds for chef/admin
  useEffect(() => {
    if (!user || !['admin', 'chef'].includes(user.role)) return;

    refreshOrders();
    const interval = setInterval(refreshOrders, 2000);
    return () => clearInterval(interval);
  }, [user, refreshOrders]);

  const placeOrder = useCallback((order: Omit<PlacedOrder, 'id' | 'status' | 'createdAt'>) => {
    const id = `ORD-${String(orderCounter++).padStart(3, '0')}`;
    const now = new Date();
    const newOrder: PlacedOrder = {
      ...order,
      id,
      status: 'pending',
      statusHistory: [{ status: 'pending', at: now }],
      createdAt: now,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return id;
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status, statusHistory: [...o.statusHistory, { status, at: new Date() }] }
          : o
      )
    );

    // Also update via API if it's a MongoDB order (not a local ORD- order)
    // Send the exact same status to the API — no mapping needed
    if (!id.startsWith('ORD-')) {
      ordersApi.updateStatus(id, status as Order['status']).catch((err) => {
        console.warn('Failed to update order status via API:', err);
      });
    }
  }, []);

  const updatePrepTime = useCallback((id: string, minutes: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, prepMinutes: Math.max(5, Math.min(minutes, 180)) } : o))
    );
  }, []);

  const getOrdersByStatus = useCallback(
    (status: OrderStatus) => orders.filter((o) => o.status === status),
    [orders]
  );

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, updatePrepTime, getOrdersByStatus, refreshOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};
