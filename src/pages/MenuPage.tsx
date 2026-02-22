import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import RestaurantMenu from '@/components/RestaurantMenu';
import CartDrawer from '@/components/CartDrawer';
import PaymentModal from '@/components/PaymentModal';
import Footer from '@/components/Footer';
import { type MenuItem, type CartItem } from '@/data/menu';

const MenuPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, category: item.category }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleCheckout = () => {
    setCartOpen(false);
    setPaymentOpen(true);
  };

  const handlePaymentComplete = () => {
    setPaymentOpen(false);
    setCart([]);
  };

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <RestaurantMenu onAddToCart={addToCart} />
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        items={cart}
        onComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default MenuPage;
