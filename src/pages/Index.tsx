import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LandingHighlights from '@/components/LandingHighlights';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar cartCount={0} onCartClick={() => {}} />
      <HeroSection />
      <LandingHighlights />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
