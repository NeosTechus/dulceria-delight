import { X, Plus, Minus, Trash2, MapPin, Store, Truck, AlertCircle } from 'lucide-react';
import CartSuggestions from '@/components/CartSuggestions';
import { type CartItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart, MIN_DELIVERY_TOTAL, MAX_DELIVERY_MILES, haversineDistance, STORE_LAT, STORE_LNG } from '@/contexts/CartContext';
import { useState } from 'react';

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
  const { orderType, setOrderType, deliveryInfo, setDeliveryInfo, canDeliver, deliveryError } = useCart();
  const [checkingDistance, setCheckingDistance] = useState(false);

  const fullAddress = `${deliveryInfo.street}, ${deliveryInfo.city}, ${deliveryInfo.state} ${deliveryInfo.zipCode}`.trim();

  const handleCheckDistance = async () => {
    if (!deliveryInfo.street.trim() || !deliveryInfo.city.trim()) return;
    setCheckingDistance(true);

    try {
      const encoded = encodeURIComponent(`${fullAddress}, USA`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`);
      const data = await res.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const dist = haversineDistance(STORE_LAT, STORE_LNG, lat, lng);
        setDeliveryInfo({ distance: Math.round(dist * 10) / 10 });
      } else {
        setDeliveryInfo({ distance: 999 });
      }
    } catch {
      setDeliveryInfo({ distance: null });
    } finally {
      setCheckingDistance(false);
    }
  };

  const categoryLabel = (cat: string) => {
    const labels: Record<string, string> = { jugos: '🍊', tortas: '🥪', snacks: '🌽', candy: '🍬' };
    return labels[cat] || '';
  };

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
              <>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                      <span className="text-xl">{categoryLabel(item.category)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-sm truncate">{item.name}</p>
                        <p className="text-sm text-secondary font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted">
                          <Minus size={12} />
                        </button>
                        <span className="font-bold text-foreground w-5 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-muted">
                          <Plus size={12} />
                        </button>
                        <button onClick={() => onRemove(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-destructive hover:bg-destructive/10">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggested items */}
                <CartSuggestions cartItems={items} />

                {/* Pickup / Delivery selector */}
                <div className="border border-border rounded-xl p-4 mb-4">
                  <p className="text-sm font-bold text-foreground mb-3">Order Type</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOrderType('pickup')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                        orderType === 'pickup'
                          ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta'
                          : 'bg-muted/50 text-muted-foreground border border-border hover:border-primary/40'
                      }`}
                    >
                      <Store size={16} /> Pickup
                    </button>
                    <button
                      onClick={() => setOrderType('delivery')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                        orderType === 'delivery'
                          ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta'
                          : 'bg-muted/50 text-muted-foreground border border-border hover:border-primary/40'
                      }`}
                    >
                      <Truck size={16} /> Delivery
                    </button>
                  </div>

                  {orderType === 'pickup' && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                      <span>3515 Cherokee St, St. Louis</span>
                    </div>
                  )}

                  {orderType === 'delivery' && (
                    <div className="mt-3 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">Street Address</label>
                        <input
                          type="text"
                          placeholder="123 Main St, Apt 4B"
                          value={deliveryInfo.street}
                          onChange={(e) => setDeliveryInfo({ street: e.target.value, distance: null })}
                          className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <label className="block text-xs font-bold text-foreground mb-1">City</label>
                          <input
                            type="text"
                            placeholder="St. Louis"
                            value={deliveryInfo.city}
                            onChange={(e) => setDeliveryInfo({ city: e.target.value, distance: null })}
                            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1">State</label>
                          <input
                            type="text"
                            placeholder="MO"
                            maxLength={2}
                            value={deliveryInfo.state}
                            onChange={(e) => setDeliveryInfo({ state: e.target.value.toUpperCase(), distance: null })}
                            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1">ZIP Code</label>
                          <input
                            type="text"
                            placeholder="63118"
                            maxLength={5}
                            value={deliveryInfo.zipCode}
                            onChange={(e) => setDeliveryInfo({ zipCode: e.target.value, distance: null })}
                            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleCheckDistance}
                        disabled={!deliveryInfo.street.trim() || !deliveryInfo.city.trim() || checkingDistance}
                        className="w-full py-2 rounded-lg bg-muted text-foreground font-bold text-xs hover:bg-muted/80 transition-colors disabled:opacity-50"
                      >
                        {checkingDistance ? 'Checking...' : deliveryInfo.distance !== null ? `${deliveryInfo.distance} miles away — Check again` : 'Check delivery availability'}
                      </button>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>🚚 Min. order: <span className="font-bold text-foreground">${MIN_DELIVERY_TOTAL}</span></p>
                        <p>📍 Max distance: <span className="font-bold text-foreground">{MAX_DELIVERY_MILES} miles</span> from store</p>
                      </div>

                      {deliveryInfo.distance !== null && deliveryInfo.distance <= MAX_DELIVERY_MILES && (
                        <p className="text-xs text-accent font-bold">✅ You're within delivery range!</p>
                      )}

                      {deliveryError && (
                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-destructive/10 text-destructive text-xs">
                          <AlertCircle size={14} className="mt-0.5 shrink-0" />
                          <span>{deliveryError}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
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
                disabled={!canDeliver}
                className="w-full bg-gradient-fiesta text-primary-foreground font-bold py-4 rounded-xl text-lg shadow-fiesta hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
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
