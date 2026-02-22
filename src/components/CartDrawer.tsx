import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { type CartItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer = ({ open, onClose, items, onUpdateQty, onRemove, onCheckout }: CartDrawerProps) => {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const { t } = useLanguage();

  return (
    <>
      {open && <div className="fixed inset-0 bg-fiesta-dark/50 z-50" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-fredoka text-2xl text-foreground">{t('cart.title')}</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">🌮</p>
                <p className="text-muted-foreground font-semibold">{t('cart.empty')}</p>
                <p className="text-sm text-muted-foreground mt-1">{t('cart.addItems')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{item.name}</p>
                      <p className="text-sm text-secondary font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-foreground w-6 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted">
                        <Plus size={14} />
                      </button>
                      <button onClick={() => onRemove(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-destructive hover:bg-destructive/10">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-5 border-t border-border">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-foreground text-lg">{t('cart.total')}</span>
                <span className="font-fredoka text-2xl text-secondary">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-fiesta text-primary-foreground font-bold py-4 rounded-xl text-lg shadow-fiesta hover:scale-[1.02] transition-transform"
              >
                {t('cart.checkout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
