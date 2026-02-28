import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { type CartItem, type MenuItem, type CandyItem } from '@/data/menu';

export type OrderType = 'pickup' | 'delivery';

interface DeliveryInfo {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  distance: number | null; // miles from store
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  orderType: OrderType;
  deliveryInfo: DeliveryInfo;
  setCartOpen: (open: boolean) => void;
  setOrderType: (type: OrderType) => void;
  setDeliveryInfo: (info: Partial<DeliveryInfo>) => void;
  addMenuItem: (item: MenuItem) => void;
  addCandyItem: (item: CandyItem) => void;
  updateQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  canDeliver: boolean;
  deliveryError: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORE_LAT = 38.5883;
const STORE_LNG = -90.2154;
const MIN_DELIVERY_TOTAL = 80;
const MAX_DELIVERY_MILES = 70;

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [deliveryInfo, setDeliveryInfoState] = useState<DeliveryInfo>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    distance: null,
  });

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addToCart = useCallback((id: string, name: string, price: number, category: CartItem['category'], emoji?: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) {
        return prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id, name, price, quantity: 1, category, emoji }];
    });
    setCartOpen(true);
  }, []);

  const addMenuItem = useCallback((item: MenuItem) => {
    addToCart(item.id, item.name, item.price, item.category, item.emoji);
  }, [addToCart]);

  const addCandyItem = useCallback((item: CandyItem) => {
    addToCart(item.id, item.name, item.price, 'candy', item.emoji);
  }, [addToCart]);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c)).filter((c) => c.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const setDeliveryInfo = useCallback((info: Partial<DeliveryInfo>) => {
    setDeliveryInfoState((prev) => ({ ...prev, ...info }));
  }, []);

  // Delivery validation
  const meetsMinimum = cartTotal >= MIN_DELIVERY_TOTAL;
  const withinRadius = deliveryInfo.distance !== null && deliveryInfo.distance <= MAX_DELIVERY_MILES;
  const canDeliver = orderType === 'pickup' || (meetsMinimum && withinRadius);

  let deliveryError: string | null = null;
  if (orderType === 'delivery') {
    if (!meetsMinimum) {
      deliveryError = `Minimum order for delivery is $${MIN_DELIVERY_TOTAL}. You need $${(MIN_DELIVERY_TOTAL - cartTotal).toFixed(2)} more.`;
    } else if (deliveryInfo.distance !== null && !withinRadius) {
      deliveryError = `Delivery is only available within ${MAX_DELIVERY_MILES} miles. Your location is ${deliveryInfo.distance.toFixed(1)} miles away.`;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart, cartCount, cartTotal, cartOpen, orderType, deliveryInfo,
        setCartOpen, setOrderType, setDeliveryInfo,
        addMenuItem, addCandyItem, updateQty, removeItem, clearCart,
        canDeliver, deliveryError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { STORE_LAT, STORE_LNG, MIN_DELIVERY_TOTAL, MAX_DELIVERY_MILES, haversineDistance };

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
