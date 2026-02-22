import { useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';
import { type CartItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

const PaymentModal = ({ open, onClose, items, onComplete }: PaymentModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = total * 0.09;
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onComplete();
      setStep('form');
    }, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-fiesta-dark/60" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {step === 'success' ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <Check size={40} className="text-accent" />
            </div>
            <h3 className="font-fredoka text-3xl text-foreground mb-2">¡Gracias!</h3>
            <p className="text-muted-foreground">{t('pay.thanks')}</p>
            <p className="text-5xl mt-4">🎉</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-fredoka text-2xl text-foreground flex items-center gap-2">
                <CreditCard size={24} className="text-primary" /> {t('pay.checkout')}
              </h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <div className="p-5 border-b border-border bg-muted/30">
              <h4 className="font-bold text-foreground mb-3">{t('pay.summary')}</h4>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{item.name} × {item.quantity}</span>
                  <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-border mt-3 pt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('pay.subtotal')}</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('pay.tax')}</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-1">
                  <span className="text-foreground">{t('cart.total')}</span>
                  <span className="font-fredoka text-secondary">${(total + tax).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">{t('pay.name')}</label>
                <input required type="text" placeholder={t('pay.namePlaceholder')} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">{t('pay.phone')}</label>
                <input required type="tel" placeholder="(314) 555-1234" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">{t('pay.cardNumber')}</label>
                <input required type="text" placeholder="4242 4242 4242 4242" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">{t('pay.expiry')}</label>
                  <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">CVC</label>
                  <input required type="text" placeholder="123" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-fiesta text-primary-foreground font-bold py-4 rounded-xl text-lg shadow-fiesta hover:scale-[1.02] transition-transform mt-2">
                Pay ${(total + tax).toFixed(2)}
              </button>
              <p className="text-xs text-muted-foreground text-center">{t('pay.demo')}</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
