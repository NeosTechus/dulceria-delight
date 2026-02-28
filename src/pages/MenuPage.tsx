import { useState } from 'react';
import Navbar from '@/components/Navbar';
import RestaurantMenu from '@/components/RestaurantMenu';
import CartDrawer from '@/components/CartDrawer';
import PaymentModal from '@/components/PaymentModal';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const MenuPage = () => {
  const { addMenuItem, cartCount, cartOpen, setCartOpen, cart, updateQty, removeItem, clearCart } = useCart();
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handleCheckout = () => {
    setCartOpen(false);
    setPaymentOpen(true);
  };

  const handlePaymentComplete = () => {
    setPaymentOpen(false);
    clearCart();
  };

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <RestaurantMenu onAddToCart={addMenuItem} />
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
