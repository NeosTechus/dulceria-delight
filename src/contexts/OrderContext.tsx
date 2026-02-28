import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { type CartItem } from '@/data/menu';

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered';

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
  total: number;
  createdAt: Date;
  prepMinutes: number;
}

interface OrderContextType {
  orders: PlacedOrder[];
  placeOrder: (order: Omit<PlacedOrder, 'id' | 'status' | 'createdAt'>) => string;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getOrdersByStatus: (status: OrderStatus) => PlacedOrder[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

let orderCounter = 1;

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  const placeOrder = useCallback((order: Omit<PlacedOrder, 'id' | 'status' | 'createdAt'>) => {
    const id = `ORD-${String(orderCounter++).padStart(3, '0')}`;
    const newOrder: PlacedOrder = {
      ...order,
      id,
      status: 'pending',
      createdAt: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return id;
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
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
