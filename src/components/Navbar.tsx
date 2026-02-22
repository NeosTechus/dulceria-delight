import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { label: t('nav.candyShop'), to: '/candy-shop' },
    { label: t('nav.readyToEat'), to: '/menu' },
    { label: t('nav.about'), to: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="font-fredoka text-2xl text-gradient-fiesta">
          🪅 Dulceria Medina
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`font-nunito font-bold transition-colors ${
                location.pathname === to ? 'text-primary' : 'text-foreground/80 hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-bold text-foreground/80 hover:border-primary/40 hover:text-primary transition-colors"
            title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
          >
            <Globe size={16} />
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          <button
            onClick={onCartClick}
            className="relative bg-gradient-fiesta text-primary-foreground px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <ShoppingCart size={18} />
            {t('nav.order')}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border text-xs font-bold text-foreground/80"
          >
            <Globe size={14} />
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button onClick={onCartClick} className="relative text-primary">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`font-bold text-left py-2 ${
                location.pathname === to ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
