import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Facebook, Instagram, MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: 'Candy Shop', to: '/candy-shop' },
    { label: 'Ready to Eat', to: '/menu' },
    { label: 'About Us', to: '/about' },
  ];

  return (
    <footer className="bg-fiesta-dark text-primary-foreground/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-50" />

      <div className="container mx-auto px-4 relative">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14 border-b border-primary-foreground/10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-fredoka text-2xl text-gradient-fiesta inline-block mb-3">🪅 Dulceria Medina</p>
            <p className="text-sm leading-relaxed text-primary-foreground/50 max-w-xs">
              St. Louis's favorite spot for authentic Mexican candy, piñatas, and fresh kitchen favorites.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.facebook.com/dulceria.medina/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-fiesta-pink/20 hover:text-fiesta-pink transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-fiesta-orange/20 hover:text-fiesta-orange transition-all"
              >
                <Instagram size={16} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-fredoka text-lg text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-foreground/50 hover:text-fiesta-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-fredoka text-lg text-primary-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/50">
              <li>
                <a
                  href="https://maps.google.com/?q=2753+Cherokee+St,+St.+Louis,+MO+63118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-fiesta-orange transition-colors"
                >
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  2753 Cherokee St, St. Louis, MO 63118
                </a>
              </li>
              <li>
                <a href="tel:+13147718648" className="flex items-center gap-2 hover:text-fiesta-orange transition-colors">
                  <Phone size={15} className="shrink-0" />
                  (314) 771-8648
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={15} className="shrink-0" />
                Mon–Sat: 10 AM – 8 PM
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/30">
          <p>© {new Date().getFullYear()} Dulceria Medina — All rights reserved.</p>
          <a
            href="https://www.neostechus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-foreground/40 hover:text-fiesta-turquoise transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#1a3a5c" />
              <path d="M12 28V12l8 10 8-10v16" stroke="#00bcd4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 10l6-2" stroke="#00bcd4" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Proud client of NeosTechs
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
