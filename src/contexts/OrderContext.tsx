import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { type CartItem } from '@/data/menu';

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';

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
  getOrdersByStatus: (status: OrderStatus) => PlacedOrder[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

let orderCounter = 1;

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

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
  }, []);

  const getOrdersByStatus = useCallback(
    (status: OrderStatus) => orders.filter((o) => o.status === status),
    [orders]
  );

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, getOrdersByStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};
