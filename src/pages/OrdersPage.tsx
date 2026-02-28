import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Search, Package, ArrowRight, Clock, CheckCircle, Flame, ShoppingBag, Truck, Timer } from 'lucide-react';
import { useOrders, type OrderStatus } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';
import Footer from '@/components/Footer';

const statusSteps: { key: OrderStatus; label: string; emoji: string }[] = [
  { key: 'pending', label: 'Order Placed', emoji: '📝' },
  { key: 'accepted', label: 'Chef Accepted', emoji: '👨‍🍳' },
  { key: 'preparing', label: 'Preparing', emoji: '🔥' },
  { key: 'ready', label: 'Ready', emoji: '✅' },
  { key: 'delivered', label: 'Complete', emoji: '🎉' },
];

const statusIndex = (s: OrderStatus) => statusSteps.findIndex((st) => st.key === s);

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500',
  accepted: 'bg-blue-400',
  preparing: 'bg-blue-600',
  ready: 'bg-green-500',
  delivered: 'bg-muted-foreground',
};

const OrdersPage = () => {
  const { orders } = useOrders();
  const { isAuthenticated } = useAuth();
  const { cartCount, setCartOpen } = useCart();
  const navigate = useNavigate();
  const [searchEmail, setSearchEmail] = useState('');
  const [searchedEmail, setSearchedEmail] = useState('');

  // Auto-refresh every 5s to keep timestamps and status current
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedEmail(searchEmail.trim().toLowerCase());
  };

  const filteredOrders = searchedEmail
    ? orders.filter((o) => o.customerEmail.toLowerCase() === searchedEmail)
    : orders;

  const activeOrders = filteredOrders.filter((o) => o.status !== 'delivered');
  const pastOrders = filteredOrders.filter((o) => o.status === 'delivered');

  const timeAgo = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getEstimatedReady = (order: typeof activeOrders[0]) => {
    const acceptedEntry = order.statusHistory.find((h) => h.status === 'accepted');
    if (!acceptedEntry) return null;
    const ready = new Date(acceptedEntry.at.getTime() + order.prepMinutes * 60000);
    return ready;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-primary" />
            </div>
            <h1 className="font-fredoka text-4xl text-foreground mb-2">Order History</h1>
            <p className="text-muted-foreground">View and track all your past orders</p>
          </motion.div>

          {/* Sign In + Email Search cards */}
          {!isAuthenticated && (
            <motion.div
              className="grid md:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <LogIn size={20} className="text-primary" />
                  <h3 className="font-fredoka text-lg text-foreground">Have an Account?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign in to see all your orders and enjoy faster checkout
                </p>
                <Link
                  to="/login"
                  className="w-full bg-gradient-fiesta text-primary-foreground font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-fiesta"
                >
                  Sign In <ArrowRight size={16} />
                </Link>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Search size={20} className="text-primary" />
                  <h3 className="font-fredoka text-lg text-foreground">Find Orders by Email</h3>
                </div>
                <form onSubmit={handleSearch} className="flex gap-2 mt-4">
                  <input
                    type="email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Active Orders - Live Tracking */}
          {activeOrders.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-fredoka text-xl text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Active Orders
              </h2>
              <div className="space-y-4">
                {activeOrders.map((order) => {
                  const currentIdx = statusIndex(order.status);
                  return (
                    <div key={order.id} className="bg-card border border-border rounded-2xl p-5 overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground text-lg">{order.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${statusColors[order.status]}`}>
                              {statusSteps[currentIdx]?.label}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              order.orderType === 'delivery' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'
                            }`}>
                              {order.orderType === 'delivery' ? <Truck size={12} className="inline mr-1" /> : <ShoppingBag size={12} className="inline mr-1" />}
                              {order.orderType}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {timeAgo(order.createdAt)} · {order.items.length} items · ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <span className="text-3xl">{statusSteps[currentIdx]?.emoji}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="flex items-center gap-1 mb-3">
                        {statusSteps.slice(0, -1).map((step, i) => (
                          <div
                            key={step.key}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              i <= currentIdx ? 'bg-primary' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Step labels */}
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-4">
                        {statusSteps.slice(0, -1).map((step, i) => (
                          <span key={step.key} className={i <= currentIdx ? 'text-primary font-bold' : ''}>
                            {step.label}
                          </span>
                        ))}
                      </div>

                      {/* Items */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-border/50">
                        {order.items.map((item, i) => (
                          <span key={i} className="text-xs bg-muted/50 text-foreground px-2.5 py-1 rounded-full">
                            {item.emoji} {item.qty}× {item.name}
                          </span>
                        ))}
                      </div>

                      {/* Timing & Status History */}
                      <div className="mt-4 pt-3 border-t border-border/50 space-y-3">
                        {/* Estimated ready / pickup info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          {(() => {
                            const est = getEstimatedReady(order);
                            if (est && order.status !== 'ready') {
                              const minsLeft = Math.max(0, Math.ceil((est.getTime() - Date.now()) / 60000));
                              return (
                                <div className="flex items-center gap-1.5 text-primary font-bold">
                                  <Timer size={14} />
                                  {minsLeft > 0
                                    ? `Ready in ~${minsLeft} min (${formatTime(est)})`
                                    : `Should be ready now!`}
                                </div>
                              );
                            }
                            if (order.status === 'ready') {
                              return (
                                <div className="flex items-center gap-1.5 text-green-600 font-bold">
                                  <CheckCircle size={14} />
                                  Ready for {order.orderType}!
                                </div>
                              );
                            }
                            return (
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Clock size={14} />
                                Est. {order.prepMinutes} min prep time
                              </div>
                            );
                          })()}
                          {order.pickupDate && (
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              📅 {order.pickupDate} {order.pickupTime && `at ${order.pickupTime}`}
                            </div>
                          )}
                        </div>

                        {/* Status change timeline */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                          {order.statusHistory.map((h, i) => (
                            <span key={i} className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${statusColors[h.status]}`} />
                              {statusSteps[statusIndex(h.status)]?.label} — {formatTime(h.at)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Past Orders */}
          {pastOrders.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-fredoka text-xl text-foreground mb-4">Past Orders</h2>
              <div className="space-y-3">
                {pastOrders.map((order) => (
                  <div key={order.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{order.id}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-muted text-muted-foreground">
                          Complete
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items · ${order.total.toFixed(2)} · {timeAgo(order.createdAt)}
                      </p>
                    </div>
                    <span className="text-2xl">🎉</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {filteredOrders.length === 0 && (
            <motion.div
              className="bg-card border border-border rounded-2xl p-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-fredoka text-xl text-foreground mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">When you place orders, they'll appear here</p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-gradient-fiesta text-primary-foreground font-bold px-6 py-3 rounded-xl shadow-fiesta hover:scale-[1.02] transition-transform"
              >
                Browse Menu <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}

          {searchedEmail && filteredOrders.length === 0 && (
            <motion.p
              className="text-center text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No orders found for <strong>{searchedEmail}</strong>. Try a different email.
            </motion.p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrdersPage;
