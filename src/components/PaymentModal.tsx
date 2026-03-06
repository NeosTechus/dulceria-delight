import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CreditCard, Check, AlertCircle, CalendarIcon, Clock, Truck } from 'lucide-react';
import { format } from 'date-fns';
import { type CartItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { STRIPE_PUBLISHABLE_KEY, API_BASE_URL } from '@/config/api';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

const PaymentModal = ({ open, onClose, items, onComplete }: PaymentModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'info' | 'success' | 'error'>('info');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Saint Louis');
  const [state, setState] = useState('MO');
  const [zip, setZip] = useState('');
  const [addressError, setAddressError] = useState('');
  const [distanceMiles, setDistanceMiles] = useState<number | null>(null);
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
  const prepTime = Math.max(15, Math.min(prepMinutes, 90));

  // St. Louis ZIP codes with approximate distance
  const MAX_DELIVERY_MILES = 10;
  const MIN_DELIVERY_ORDER = 25;
  const stlZipDistances: Record<string, number> = {
    '63118': 0, '63104': 1.2, '63111': 1.5, '63116': 1.8, '63110': 2,
    '63109': 2.5, '63139': 3, '63103': 2.8, '63102': 3.5, '63101': 4,
    '63106': 3, '63107': 4, '63108': 3.2, '63113': 4.5, '63112': 4,
    '63143': 3.5, '63117': 3, '63119': 4, '63105': 3.8, '63130': 5,
    '63122': 6, '63123': 5.5, '63125': 7, '63126': 7.5, '63127': 8,
    '63128': 9, '63129': 8.5, '63114': 8, '63132': 7, '63133': 6,
    '63120': 5.5, '63115': 4.5, '63147': 5,
  };

  const checkDistance = (zipCode: string) => {
    const dist = stlZipDistances[zipCode];
    if (dist !== undefined) {
      setDistanceMiles(dist);
      if (dist > MAX_DELIVERY_MILES) {
        setAddressError(`Delivery is only available within ${MAX_DELIVERY_MILES} miles. Your location is ${dist} miles away.`);
      } else if (grandTotal < MIN_DELIVERY_ORDER) {
        setAddressError(`Minimum order for delivery is $${MIN_DELIVERY_ORDER}.`);
      } else {
        setAddressError('');
      }
    } else {
      setDistanceMiles(null);
      setAddressError('We could not verify this ZIP code. Please use a St. Louis area ZIP.');
    }
  };

  const validateDelivery = () => {
    if (!street.trim()) return 'Please enter a street address';
    if (!zip.trim() || zip.length < 5) return 'Please enter a valid ZIP code';
    if (distanceMiles !== null && distanceMiles > MAX_DELIVERY_MILES)
      return `Delivery is only available within ${MAX_DELIVERY_MILES} miles.`;
    if (distanceMiles === null) return 'Please enter a valid St. Louis area ZIP code';
    return '';
  };

  const fullDeliveryAddress = `${street}, ${city}, ${state} ${zip}`;

  // Generate pickup time slots
  const generateTimeSlots = () => {
    const isToday = pickupDate && pickupDate.toDateString() === new Date().toDateString();
    const now = new Date();
    const earliest = new Date(now.getTime() + prepTime * 60000);
    earliest.setMinutes(Math.ceil(earliest.getMinutes() / 15) * 15, 0, 0);

    const storeOpen = 10 * 60;
    const storeClose = 20 * 60;
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
  const isStripeConfigured = !!STRIPE_PUBLISHABLE_KEY;

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (orderType === 'delivery') {
      const err = validateDelivery();
      if (err) { setAddressError(err); return; }
    }

    if (!isStripeConfigured) {
      // Demo mode — place order into local context
      const id = placeOrder({
        items: items.map((i) => ({ name: i.name, qty: i.quantity, category: i.category, emoji: i.emoji })),
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        orderType,
        deliveryAddress: orderType === 'delivery' ? fullDeliveryAddress : undefined,
        pickupDate: pickupDate ? format(pickupDate, 'MMM d, yyyy') : undefined,
        pickupTime: pickupTime || undefined,
        total: grandTotal,
        prepMinutes: prepTime,
      });
      setOrderId(id);
      setStep('success');
      setTimeout(() => {
        onComplete();
        onClose();
        setStep('info');
        resetForm();
        navigate('/orders');
      }, 2500);
      return;
    }

    // Stripe Checkout — redirect to Stripe-hosted payment page
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          orderType,
          deliveryAddress: orderType === 'delivery' ? fullDeliveryAddress : undefined,
          pickupDate: pickupDate ? format(pickupDate, 'MMM d, yyyy') : undefined,
          pickupTime: pickupTime || undefined,
        }),
      });

      const text = await res.text();
      let data: { url?: string; message?: string };
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        const fallback = 'Payment service is temporarily unavailable. Please try again later.';
        const msg = res.ok ? 'Invalid response from server' : (text?.trim().startsWith('<') ? fallback : (text?.slice(0, 120) || fallback));
        throw new Error(msg);
      }

      if (!res.ok) {
        throw new Error(data.message || text || 'Failed to create checkout session');
      }

      // Clear cart before redirect
      onComplete();

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create checkout session');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setStreet('');
    setCity('Saint Louis');
    setState('MO');
    setZip('');
    setDistanceMiles(null);
    setAddressError('');
    setPickupDate(undefined);
    setPickupTime('');
    setOrderId('');
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

                {orderType === 'delivery' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-sm">
                      <Truck size={16} className="text-primary shrink-0" />
                      <span className="text-foreground">
                        Delivery within <strong>~{MAX_DELIVERY_MILES} miles</strong> of Cherokee St · Min. order: <strong>${MIN_DELIVERY_ORDER}</strong>
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1">Street Address</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => { setStreet(e.target.value); setAddressError(''); }}
                        placeholder="3040A, 3949 Apts, Lindell Blvd"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">State</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))}
                          maxLength={2}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">ZIP Code</label>
                        <input
                          type="text"
                          value={zip}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 5);
                            setZip(v);
                            setAddressError('');
                            if (v.length === 5) checkDistance(v);
                            else setDistanceMiles(null);
                          }}
                          maxLength={5}
                          placeholder="63118"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>

                    {distanceMiles !== null && (
                      <div className={cn(
                        "px-4 py-2.5 rounded-lg text-sm font-bold text-center",
                        distanceMiles <= MAX_DELIVERY_MILES ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                      )}>
                        {distanceMiles <= MAX_DELIVERY_MILES
                          ? `✅ ${distanceMiles} miles away — Delivery available!`
                          : `${distanceMiles} miles away — Check again`}
                      </div>
                    )}

                    {addressError && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-sm text-destructive">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        {addressError}
                      </div>
                    )}
                  </div>
                )}

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
                  disabled={loading || (orderType === 'pickup' && (!pickupDate || !pickupTime)) || (orderType === 'delivery' && (!street.trim() || !zip.trim() || distanceMiles === null || distanceMiles > MAX_DELIVERY_MILES))}
                  className="w-full bg-gradient-fiesta text-primary-foreground font-bold py-4 rounded-xl text-lg shadow-fiesta hover:scale-[1.02] transition-transform mt-2 disabled:opacity-50"
                >
                  {loading ? 'Redirecting to payment...' : isStripeConfigured ? `💳 Pay $${grandTotal.toFixed(2)}` : `Pay $${grandTotal.toFixed(2)}`}
                </button>
                {isStripeConfigured && (
                  <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                    🔒 Secure checkout powered by Stripe
                  </p>
                )}
                {!isStripeConfigured && (
                  <p className="text-xs text-muted-foreground text-center">{t('pay.demo')}</p>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
