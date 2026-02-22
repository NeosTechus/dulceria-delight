import Navbar from '@/components/Navbar';
import CandyShopSection from '@/components/CandyShopSection';
import Footer from '@/components/Footer';

const CandyShopPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar cartCount={0} onCartClick={() => {}} />
      <CandyShopSection />
      <Footer />
    </div>
  );
};

export default CandyShopPage;
