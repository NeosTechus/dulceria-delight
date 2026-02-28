import { useState } from 'react';
import { useOrderNotification } from '@/hooks/useOrderNotification';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders, type OrderStatus } from '@/contexts/OrderContext';
import {
  ArrowLeft, Clock, CheckCircle, ChefHat, Eye, Flame,
  ShieldCheck, Truck, ShoppingBag, History, XCircle, Timer
} from 'lucide-react';


interface StatusSection {
  key: string;
  label: string;
  emoji: string;
  color: string;
  statuses: string[];
}

const statusConfig: Record<string, { bg: string; icon: typeof Clock; label: string; next?: OrderStatus }> = {
  pending: { bg: 'bg-yellow-500', icon: Clock, label: 'Pending' },
  accepted: { bg: 'bg-blue-400', icon: CheckCircle, label: 'Accepted', next: 'preparing' },
  preparing: { bg: 'bg-blue-600', icon: Flame, label: 'Preparing', next: 'ready' },
  ready: { bg: 'bg-green-500', icon: CheckCircle, label: 'Ready' },
  out_for_delivery: { bg: 'bg-purple-500', icon: Truck, label: 'Out for Delivery', next: 'delivered' },
  delivered: { bg: 'bg-emerald-600', icon: ShieldCheck, label: 'Done' },
};

const ChefDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { orders, updateOrderStatus, updatePrepTime } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  if (!isAuthenticated || user?.role !== 'chef') {
    return <Navigate to="/login" replace />;
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => ['accepted', 'preparing'].includes(o.status));
  const readyOrders = orders.filter((o) => o.status === 'ready');
  const outForDeliveryOrders = orders.filter((o) => o.status === 'out_for_delivery');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');

  const pendingCount = pendingOrders.length;
  const preparingCount = preparingOrders.length;
  const readyCount = readyOrders.length;
  const outCount = outForDeliveryOrders.length;

  // Play notification sound when new pending orders arrive
  useOrderNotification(pendingCount);

  const sections: StatusSection[] = [
    { key: 'pending', label: 'New Orders', emoji: '🔔', color: 'border-yellow-500', statuses: ['pending'] },
    { key: 'preparing', label: 'Preparing', emoji: '🔥', color: 'border-blue-500', statuses: ['accepted', 'preparing'] },
    { key: 'ready', label: 'Ready for Pickup / Delivery', emoji: '✅', color: 'border-green-500', statuses: ['ready'] },
    { key: 'out', label: 'Out for Delivery', emoji: '🚗', color: 'border-purple-500', statuses: ['out_for_delivery'] },
    { key: 'done', label: 'Completed / Delivered', emoji: '🎉', color: 'border-muted-foreground', statuses: ['delivered'] },
  ];

  const getOrdersForSection = (section: StatusSection) =>
    orders.filter((o) => section.statuses.includes(o.status));

  const timeAgo = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  const getActionButton = (orderId: string, status: OrderStatus, orderType: 'pickup' | 'delivery') => {
    if (status === 'pending') {
      return (
        <div className="flex items-center gap-2">
          <motion.button
            onClick={(e) => { e.stopPropagation(); updateOrderStatus(orderId, 'accepted'); }}
            className="px-4 py-2 rounded-lg bg-gradient-fiesta text-primary-foreground font-bold text-sm flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <CheckCircle size={14} /> Accept
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); updateOrderStatus(orderId, 'delivered'); }}
            className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive font-bold text-sm flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <XCircle size={14} /> Reject
          </motion.button>
        </div>
      );
    }

    // For "ready" status, next depends on order type
    let nextStatus: OrderStatus | undefined;
    if (status === 'ready') {
      nextStatus = orderType === 'delivery' ? 'out_for_delivery' : 'delivered';
    } else {
      nextStatus = statusConfig[status]?.next;
    }

    if (nextStatus) {
      const labels: Record<string, string> = {
        accepted: '🔥 Start Preparing',
        preparing: '✅ Mark Ready',
        ready: orderType === 'delivery' ? '🚗 Out for Delivery' : '📦 Complete',
        out_for_delivery: '✅ Delivered',
      };
      return (
        <motion.button
          onClick={(e) => { e.stopPropagation(); updateOrderStatus(orderId, nextStatus!); }}
          className="px-4 py-2 rounded-lg bg-gradient-fiesta text-primary-foreground font-bold text-sm flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {labels[status] || 'Next'}
        </motion.button>
      );
    }
    return null;
  };

  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ChefHat size={22} className="text-primary" />
              </div>
              <div>
                <h1 className="font-fredoka text-2xl text-foreground">Chef Dashboard</h1>
                <p className="text-sm text-muted-foreground">Kitchen order management</p>
              </div>
            </div>
          </div>
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors"
          >
            Admin View
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Pending', count: pendingCount, color: 'bg-yellow-500' },
            { label: 'Preparing', count: preparingCount, color: 'bg-blue-500' },
            { label: 'Ready', count: readyCount, color: 'bg-green-500' },
            { label: 'Out', count: outCount, color: 'bg-purple-500' },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="bg-card rounded-xl border border-border p-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`w-3 h-3 rounded-full ${s.color} ${s.count > 0 ? 'animate-pulse' : ''}`} />
              <div>
                <p className="font-fredoka text-2xl text-foreground">{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grouped Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const sectionOrders = getOrdersForSection(section);
            const isCollapsed = collapsedSections[section.key] ?? (section.key === 'done');

            return (
              <div key={section.key}>
                <button
                  onClick={() => toggleSection(section.key)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-l-4 ${section.color} bg-card border border-border mb-3 hover:bg-muted/30 transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.emoji}</span>
                    <h2 className="font-fredoka text-lg text-foreground">{section.label}</h2>
                    <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {sectionOrders.length}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">{isCollapsed ? '▸' : '▾'}</span>
                </button>

                {!isCollapsed && (
                  <div className="space-y-3 pl-2">
                    {sectionOrders.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">No orders here</p>
                    ) : (
                      <AnimatePresence mode="popLayout">
                        {sectionOrders.map((order) => {
                          const config = statusConfig[order.status];
                          const isExpanded = expandedOrder === order.id;

                          return (
                            <motion.div
                              key={order.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              className={`bg-card rounded-xl border overflow-hidden ${
                                order.status === 'pending' ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'border-border'
                              }`}
                            >
                              <div
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-2 h-12 rounded-full ${config.bg}`} />
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-bold text-foreground">{order.id}</span>
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${config.bg}`}>
                                        {config.label}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                        order.orderType === 'delivery' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'
                                      }`}>
                                        {order.orderType === 'delivery' ? <Truck size={12} className="inline mr-1" /> : <ShoppingBag size={12} className="inline mr-1" />}
                                        {order.orderType}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {order.customerName} · {timeAgo(order.createdAt)} · {order.items.length} items · ${order.total.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                                    <Eye size={16} />
                                  </button>
                                  {getActionButton(order.id, order.status, order.orderType)}
                                </div>
                              </div>

                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-border"
                                  >
                                    <div className="p-4 space-y-3">
                                      <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                          <p className="text-muted-foreground">📞 Phone</p>
                                          <p className="font-bold text-foreground">{order.customerPhone}</p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">✉️ Email</p>
                                          <p className="font-bold text-foreground">{order.customerEmail}</p>
                                        </div>
                                        {order.deliveryAddress && (
                                          <div className="col-span-2">
                                            <p className="text-muted-foreground">📍 Delivery Address</p>
                                            <p className="font-bold text-foreground">{order.deliveryAddress}</p>
                                          </div>
                                        )}
                                        {order.pickupDate && (
                                          <div>
                                            <p className="text-muted-foreground">📅 Pickup Date</p>
                                            <p className="font-bold text-foreground">{order.pickupDate}</p>
                                          </div>
                                        )}
                                        {order.pickupTime && (
                                          <div>
                                            <p className="text-muted-foreground">🕐 Pickup Time</p>
                                            <p className="font-bold text-foreground">{order.pickupTime}</p>
                                          </div>
                                        )}
                                        <div>
                                          <p className="text-muted-foreground flex items-center gap-1"><Timer size={14} /> Prep Time</p>
                                          <div className="flex items-center gap-2 mt-1">
                                            <motion.button
                                              type="button"
                                              onClick={(e) => { e.stopPropagation(); updatePrepTime(order.id, order.prepMinutes - 5); }}
                                              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground font-bold hover:bg-muted/80"
                                              whileTap={{ scale: 0.9 }}
                                            >
                                              −
                                            </motion.button>
                                            <span className="font-fredoka text-lg text-foreground min-w-[50px] text-center">{order.prepMinutes} min</span>
                                            <motion.button
                                              type="button"
                                              onClick={(e) => { e.stopPropagation(); updatePrepTime(order.id, order.prepMinutes + 5); }}
                                              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground font-bold hover:bg-muted/80"
                                              whileTap={{ scale: 0.9 }}
                                            >
                                              +
                                            </motion.button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="border-t border-border/50 pt-3">
                                        <p className="text-xs font-bold text-muted-foreground mb-2 uppercase">Items</p>
                                        {order.items.map((item, i) => (
                                          <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                                            <span className="font-bold text-foreground">
                                              {item.emoji && <span className="mr-2">{item.emoji}</span>}
                                              {item.qty}× {item.name}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;

