import { useState } from 'react';
import { X, CreditCard, Check, AlertCircle, CalendarIcon, Clock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { format } from 'date-fns';
import { type CartItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { STRIPE_PUBLISHABLE_KEY } from '@/config/api';
import { ordersApi } from '@/services/api';
import StripePaymentForm from '@/components/StripePaymentForm';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

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
  const [email, setEmail] = useState('');
  const [pickupDate, setPickupDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState('');
  const { orderType } = useCart();
  const { placeOrder } = useOrders();
  const [orderId, setOrderId] = useState('');
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = total * 0.09;
  const grandTotal = total + tax;
  const { t } = useLanguage();

  // Estimate prep time based on items
  const prepMinutes = items.reduce((total, item) => {
    const perItem: Record<string, number> = { tortas: 12, snacks: 8, jugos: 5, candy: 2 };
    return total + (perItem[item.category] || 5) * item.quantity;
  }, 0);
  const prepTime = Math.max(15, Math.min(prepMinutes, 90)); // clamp 15–90 min

  // Generate pickup slots starting from now + prep time, in 15-min increments
  const generateTimeSlots = () => {
    const isToday = pickupDate && pickupDate.toDateString() === new Date().toDateString();
    const now = new Date();
    const earliest = new Date(now.getTime() + prepTime * 60000);
    // Round up to next 15-min mark
    earliest.setMinutes(Math.ceil(earliest.getMinutes() / 15) * 15, 0, 0);

    const storeOpen = 10 * 60; // 10:00 AM in minutes
    const storeClose = 20 * 60; // 8:00 PM in minutes
    const startMin = isToday
      ? Math.max(earliest.getHours() * 60 + earliest.getMinutes(), storeOpen)
      : storeOpen;

    const slots: string[] = [];
    for (let m = startMin; m < storeClose; m += 15) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      slots.push(`${h12}:${min.toString().padStart(2, '0')} ${ampm}`);
    }
    return slots;
  };

  const timeSlots = pickupDate ? generateTimeSlots() : [];

  const isStripeConfigured = !!STRIPE_PUBLISHABLE_KEY && !!stripePromise;

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStripeConfigured) {
      // Demo mode — place order into context for chef dashboard
      const id = placeOrder({
        items: items.map((i) => ({ name: i.name, qty: i.quantity, category: i.category, emoji: i.emoji })),
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        orderType,
        pickupDate: pickupDate ? format(pickupDate, 'MMM d, yyyy') : undefined,
        pickupTime: pickupTime || undefined,
        total: grandTotal,
        prepMinutes: prepTime,
      });
      setOrderId(id);
      setStep('success');
      setTimeout(() => {
        onComplete();
        setStep('info');
        setName('');
        setPhone('');
        setEmail('');
        setPickupDate(undefined);
        setPickupTime('');
        setOrderId('');
      }, 3000);
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
            {orderId && (
              <div className="mt-3 p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-fredoka text-xl text-foreground">{orderId}</p>
                <p className="text-xs text-muted-foreground mt-1">⏳ Waiting for chef to accept...</p>
              </div>
            )}
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
                   <div>
                     <label className="block text-sm font-bold text-foreground mb-1">Email</label>
                     <input
                       required
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="you@example.com"
                       className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                     />
                   </div>

                   {orderType === 'pickup' && (
                     <>
                       <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-sm">
                         <Clock size={16} className="text-primary shrink-0" />
                         <span className="text-foreground">
                           Estimated prep time: <strong>{prepTime} min</strong> — pick a slot after that!
                         </span>
                       </div>
                       <div className="grid grid-cols-2 gap-3">
                         <div>
                           <label className="block text-sm font-bold text-foreground mb-1">📅 Pickup Date</label>
                           <Popover>
                             <PopoverTrigger asChild>
                               <button
                                 type="button"
                                 className={cn(
                                   "w-full px-4 py-3 rounded-lg border border-input bg-background text-left text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring",
                                   !pickupDate && "text-muted-foreground"
                                 )}
                               >
                                 <CalendarIcon size={16} />
                                 {pickupDate ? format(pickupDate, 'MMM d, yyyy') : 'Select date'}
                               </button>
                             </PopoverTrigger>
                             <PopoverContent className="w-auto p-0 z-[70]" align="start">
                               <Calendar
                                 mode="single"
                                 selected={pickupDate}
                                 onSelect={(d) => { setPickupDate(d); setPickupTime(''); }}
                                 disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                 className={cn("p-3 pointer-events-auto")}
                               />
                             </PopoverContent>
                           </Popover>
                         </div>
                       <div>
                         <label className="block text-sm font-bold text-foreground mb-1">🕐 Pickup Time</label>
                         <select
                           required
                           value={pickupTime}
                           onChange={(e) => setPickupTime(e.target.value)}
                           className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                         >
                           <option value="">Select time</option>
                           {timeSlots.map((slot) => (
                             <option key={slot} value={slot}>{slot}</option>
                           ))}
                         </select>
                       </div>
                      </div>
                     </>
                   )}

                   <button
                     type="submit"
                     disabled={loading || (orderType === 'pickup' && (!pickupDate || !pickupTime))}
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
