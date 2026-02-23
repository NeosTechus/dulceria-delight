import { ShoppingCart, Menu, X, Globe, LogIn, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, toggleLang, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.candyShop'), to: '/candy-shop' },
    { label: t('nav.readyToEat'), to: '/menu' },
    { label: t('nav.about'), to: '/about' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-xl border-b border-border shadow-elevated'
          : 'bg-card/80 backdrop-blur-md border-b border-border/50'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between py-3.5 px-4">
        <Link to="/" className="font-fredoka text-2xl text-gradient-fiesta hover:scale-105 transition-transform">
          🪅 Dulceria Medina
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`font-nunito font-bold transition-all duration-200 relative py-1 ${
                location.pathname === to ? 'text-primary' : 'text-foreground/70 hover:text-primary'
              }`}
            >
              {label}
              {location.pathname === to && (
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-fiesta rounded-full"
                  layoutId="nav-underline"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <motion.button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-bold text-foreground/70 hover:border-primary/40 hover:text-primary transition-all duration-200"
            title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={15} />
            {lang === 'en' ? 'ES' : 'EN'}
          </motion.button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground/70 flex items-center gap-1.5">
                <User size={15} />
                {user?.name?.split(' ')[0]}
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{user?.role}</span>
              </span>
              <motion.button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-bold text-foreground/70 hover:border-destructive/40 hover:text-destructive transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={15} />
                {t('nav.signOut')}
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-primary text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn size={15} />
              {t('nav.signIn')}
            </motion.button>
          )}

          <motion.button
            onClick={onCartClick}
            className="relative bg-gradient-fiesta text-primary-foreground px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:shadow-fiesta transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            {t('nav.order')}
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border text-xs font-bold text-foreground/70"
          >
            <Globe size={14} />
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button onClick={onCartClick} className="relative text-primary">
            <ShoppingCart size={24} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border px-4 py-5 flex flex-col gap-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {navLinks.map(({ label, to }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`font-bold text-left py-3 px-4 rounded-xl transition-all block ${
                    location.pathname === to ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:bg-muted'
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            {/* Mobile auth button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
            >
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="font-bold text-left py-3 px-4 rounded-xl transition-all block text-destructive hover:bg-destructive/5 w-full flex items-center gap-2"
                >
                  <LogOut size={16} /> {t('nav.signOut')} ({user?.role})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="font-bold text-left py-3 px-4 rounded-xl transition-all block text-primary hover:bg-primary/5 flex items-center gap-2"
                >
                  <LogIn size={16} /> {t('nav.signIn')}
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
