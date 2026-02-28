import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LandingHighlights from '@/components/LandingHighlights';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const { cartCount, setCartOpen } = useCart();
  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroSection />
      <LandingHighlights />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
