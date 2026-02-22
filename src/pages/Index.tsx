import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { type MenuItem, type CartItem } from '@/data/menu';

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
