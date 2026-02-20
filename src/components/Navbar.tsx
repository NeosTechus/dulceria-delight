import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <button onClick={() => scrollTo('hero')} className="font-fredoka text-2xl text-gradient-fiesta">
          🪅 Dulceria Medina
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            ['Candy Shop', 'candy'],
            ['Menu', 'menu'],
            ['Contact', 'contact'],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-nunito font-bold text-foreground/80 hover:text-primary transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={onCartClick}
            className="relative bg-gradient-fiesta text-primary-foreground px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <ShoppingCart size={18} />
            Order
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
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
          {[
            ['Candy Shop', 'candy'],
            ['Menu', 'menu'],
            ['Contact', 'contact'],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-bold text-foreground/80 text-left py-2"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
