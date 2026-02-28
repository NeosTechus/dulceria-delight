import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle, Flame, Package, Truck } from 'lucide-react';
import { useOrders, type OrderStatus } from '@/contexts/OrderContext';

const statusSteps: { key: OrderStatus; label: string; icon: typeof Clock; emoji: string }[] = [
  { key: 'pending', label: 'Order Placed', icon: Clock, emoji: '📝' },
  { key: 'accepted', label: 'Chef Accepted', icon: CheckCircle, emoji: '👨‍🍳' },
  { key: 'preparing', label: 'Preparing', icon: Flame, emoji: '🔥' },
  { key: 'ready', label: 'Ready for Pickup', icon: Package, emoji: '✅' },
  { key: 'delivered', label: 'Complete', icon: Truck, emoji: '🎉' },
];

const statusIndex = (s: OrderStatus) => statusSteps.findIndex((st) => st.key === s);

const OrderTracker = () => {
  const { orders } = useOrders();
  const [open, setOpen] = useState(false);

  // Show only active (non-delivered) orders
  const activeOrders = orders.filter((o) => o.status !== 'delivered');

  if (activeOrders.length === 0) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-fiesta text-primary-foreground rounded-full px-5 py-3 font-bold text-sm shadow-fiesta flex items-center gap-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Package size={18} />
        Track Order{activeOrders.length > 1 ? 's' : ''} ({activeOrders.length})
      </motion.button>

      {/* Tracker panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-foreground/30 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h3 className="font-fredoka text-2xl text-foreground">📦 Order Status</h3>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={24} />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {activeOrders.map((order) => {
                  const currentIdx = statusIndex(order.status);

                  return (
                    <div key={order.id} className="border border-border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-bold text-foreground text-lg">{order.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.items.length} items · ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <span className="text-2xl">
                          {statusSteps[currentIdx]?.emoji || '📝'}
                        </span>
                      </div>

                      {/* Progress steps */}
                      <div className="relative">
                        {statusSteps.slice(0, -1).map((step, i) => {
                          const isComplete = i < currentIdx;
                          const isCurrent = i === currentIdx;

                          return (
                            <div key={step.key} className="flex items-start gap-3 mb-0">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                                    isComplete
                                      ? 'bg-accent text-accent-foreground'
                                      : isCurrent
                                      ? 'bg-primary text-primary-foreground animate-pulse'
                                      : 'bg-muted text-muted-foreground'
                                  }`}
                                >
                                  {isComplete ? <CheckCircle size={16} /> : <step.icon size={16} />}
                                </div>
                                {i < statusSteps.length - 2 && (
                                  <div
                                    className={`w-0.5 h-8 ${
                                      isComplete ? 'bg-accent' : 'bg-border'
                                    }`}
                                  />
                                )}
                              </div>
                              <div className="pt-1">
                                <p
                                  className={`text-sm font-bold ${
                                    isComplete || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                                  }`}
                                >
                                  {step.label}
                                </p>
                                {isCurrent && (
                                  <p className="text-xs text-primary mt-0.5">
                                    {step.key === 'pending' && '⏳ Waiting for chef...'}
                                    {step.key === 'accepted' && '👨‍🍳 Chef is getting ready!'}
                                    {step.key === 'preparing' && '🔥 Your food is being made!'}
                                    {step.key === 'ready' && '✅ Come pick it up!'}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Items list */}
                      <div className="mt-4 pt-3 border-t border-border/50">
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, i) => (
                            <span
                              key={i}
                              className="text-xs bg-muted/50 text-foreground px-2 py-1 rounded-full"
                            >
                              {item.emoji} {item.qty}× {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderTracker;
