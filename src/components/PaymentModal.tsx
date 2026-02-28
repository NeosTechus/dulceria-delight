import { useState } from 'react';
import { X, CreditCard, Check, AlertCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { type CartItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { STRIPE_PUBLISHABLE_KEY } from '@/config/api';
import { ordersApi } from '@/services/api';
import StripePaymentForm from '@/components/StripePaymentForm';

const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

const PaymentModal = ({ open, onClose, items, onComplete }: PaymentModalProps) => {
  const [step, setStep] = useState<'info' | 'stripe' | 'success' | 'error'>('info');
  const [clientSecret, setClientSecret] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = total * 0.09;
  const grandTotal = total + tax;
  const { t } = useLanguage();

  const isStripeConfigured = !!STRIPE_PUBLISHABLE_KEY && !!stripePromise;

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStripeConfigured) {
      // Demo mode fallback when Stripe isn't configured
      setStep('success');
      setTimeout(() => {
        onComplete();
        setStep('info');
        setName('');
        setPhone('');
      }, 2500);
      return;
    }

    setLoading(true);
    try {
      const { clientSecret: secret } = await ordersApi.create({
        items,
        customerName: name,
        customerPhone: phone,
      });
      setClientSecret(secret);
      setStep('stripe');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create order');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setStep('success');
    setTimeout(() => {
      onComplete();
      setStep('info');
      setClientSecret('');
      setName('');
      setPhone('');
    }, 2500);
  };

  const handleClose = () => {
    onClose();
    if (step === 'error') setStep('info');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-fiesta-dark/60" onClick={handleClose} />
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
        ) : step === 'error' ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertCircle size={40} className="text-destructive" />
            </div>
            <h3 className="font-fredoka text-2xl text-foreground mb-2">Payment Error</h3>
            <p className="text-muted-foreground mb-4">{errorMsg}</p>
            <button
              onClick={() => setStep('info')}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-fredoka text-2xl text-foreground flex items-center gap-2">
                <CreditCard size={24} className="text-primary" /> {t('pay.checkout')}
              </h3>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            {/* Order summary */}
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
                  <span className="font-fredoka text-secondary">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-5">
              {step === 'info' && (
                <form onSubmit={handleInfoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1">{t('pay.name')}</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('pay.namePlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-1">{t('pay.phone')}</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(314) 555-1234"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-fiesta text-primary-foreground font-bold py-4 rounded-xl text-lg shadow-fiesta hover:scale-[1.02] transition-transform mt-2 disabled:opacity-50"
                  >
                    {loading ? 'Creating order...' : isStripeConfigured ? 'Continue to Payment' : `Pay $${grandTotal.toFixed(2)}`}
                  </button>
                  {!isStripeConfigured && (
                    <p className="text-xs text-muted-foreground text-center">{t('pay.demo')}</p>
                  )}
                </form>
              )}

              {step === 'stripe' && stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                  <StripePaymentForm
                    total={grandTotal}
                    onSuccess={handlePaymentSuccess}
                    onError={(msg) => { setErrorMsg(msg); setStep('error'); }}
                  />
                </Elements>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
