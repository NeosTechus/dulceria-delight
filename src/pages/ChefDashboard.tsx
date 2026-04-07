import { useState, useEffect, useRef } from 'react';
import { useOrderNotification } from '@/hooks/useOrderNotification';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders, type OrderStatus } from '@/contexts/OrderContext';
import {
  ArrowLeft, Clock, CheckCircle, ChefHat, Eye, Flame,
  ShieldCheck, Truck, ShoppingBag, History, XCircle, Timer,
  Volume2, VolumeX
} from 'lucide-react';


interface StatusSection {
  key: string;
  label: string;
  emoji: string;
  color: string;
  statuses: string[];
}

type Lang = 'es' | 'en';

const i18n: Record<Lang, Record<string, string>> = {
  es: {
    title: 'Panel de Cocina', subtitle: 'Gestión de pedidos',
    soundOn: 'Sonido', soundOff: 'Silencio', adminView: 'Vista Admin',
    pending: 'Pendiente', accepted: 'Aceptado', preparing: 'Preparando',
    ready: 'Listo', outForDelivery: 'En Camino', done: 'Entregado', rejected: 'Rechazado',
    statPending: 'Pendientes', statPreparing: 'Preparando',
    statReadyPickup: 'Listo (Recoger)', statReadyDelivery: 'Listo (Envío)',
    statOut: 'En Camino', statCompleted: 'Completados',
    secNew: 'Nuevos Pedidos', secPreparing: 'Preparando',
    secReadyPickup: 'Listo para Recoger', secReadyDelivery: 'Listo para Envío',
    secOut: 'En Camino', secDone: 'Completados / Entregados', secRejected: 'Rechazados (Reembolsados)',
    noOrders: 'No hay pedidos aquí',
    accept: 'Aceptar', reject: 'Rechazar',
    acceptAll: 'Aceptar Todos', rejectAll: 'Rechazar Todos',
    rejectAllConfirm: '¿Rechazar todos los pedidos pendientes? Se reembolsarán los pagos.',
    rejectOneConfirm: '¿Rechazar este pedido? Se reembolsará el pago.',
    startPreparing: '🔥 Preparar', markReady: '✅ Listo',
    outDelivery: '🚗 En Camino', complete: '📦 Completar', delivered: '✅ Entregado', next: 'Siguiente',
    phone: '📞 Teléfono', email: '✉️ Correo',
    deliveryAddr: '📍 Dirección de Envío', pickupDate: '📅 Fecha de Recogida',
    pickupTime: '🕐 Hora de Recogida', prepTime: 'Tiempo de Prep.', items: 'Artículos',
    pickup: 'Recoger', delivery: 'Envío',
    justNow: 'Ahora', minAgo: 'min atrás', hAgo: 'h atrás',
    overdue: 'ATRASADO', left: 'restante',
    dropPreparing: '🔥 Preparando', dropReady: '✅ Listo',
    dropOut: '🚗 En Camino', dropDelivered: '🎉 Entregado', dropRejected: '❌ Rechazado',
  },
  en: {
    title: 'Chef Dashboard', subtitle: 'Kitchen order management',
    soundOn: 'Sound On', soundOff: 'Sound Off', adminView: 'Admin View',
    pending: 'Pending', accepted: 'Accepted', preparing: 'Preparing',
    ready: 'Ready', outForDelivery: 'Out for Delivery', done: 'Done', rejected: 'Rejected',
    statPending: 'Pending', statPreparing: 'Preparing',
    statReadyPickup: 'Ready (Pickup)', statReadyDelivery: 'Ready (Delivery)',
    statOut: 'Out for Delivery', statCompleted: 'Completed',
    secNew: 'New Orders', secPreparing: 'Preparing',
    secReadyPickup: 'Ready for Pickup', secReadyDelivery: 'Ready for Delivery',
    secOut: 'Out for Delivery', secDone: 'Completed / Delivered', secRejected: 'Rejected (Refunded)',
    noOrders: 'No orders here',
    accept: 'Accept', reject: 'Reject',
    acceptAll: 'Accept All', rejectAll: 'Reject All',
    rejectAllConfirm: 'Reject all pending orders? This will refund all payments.',
    rejectOneConfirm: 'Reject this order? Payment will be refunded.',
    startPreparing: '🔥 Start Preparing', markReady: '✅ Mark Ready',
    outDelivery: '🚗 Out for Delivery', complete: '📦 Complete', delivered: '✅ Delivered', next: 'Next',
    phone: '📞 Phone', email: '✉️ Email',
    deliveryAddr: '📍 Delivery Address', pickupDate: '📅 Pickup Date',
    pickupTime: '🕐 Pickup Time', prepTime: 'Prep Time', items: 'Items',
    pickup: 'Pickup', delivery: 'Delivery',
    justNow: 'Just now', minAgo: 'min ago', hAgo: 'h ago',
    overdue: 'OVERDUE', left: 'left',
    dropPreparing: '🔥 Preparing', dropReady: '✅ Ready',
    dropOut: '🚗 Out for Delivery', dropDelivered: '🎉 Delivered', dropRejected: '❌ Rejected',
  },
};

const getStatusConfig = (L: Record<string, string>): Record<string, { bg: string; icon: typeof Clock; label: string; next?: OrderStatus }> => ({
  pending: { bg: 'bg-yellow-500', icon: Clock, label: L.pending },
  accepted: { bg: 'bg-blue-400', icon: CheckCircle, label: L.accepted, next: 'preparing' },
  preparing: { bg: 'bg-blue-600', icon: Flame, label: L.preparing, next: 'ready' },
  ready: { bg: 'bg-green-500', icon: CheckCircle, label: L.ready },
  out_for_delivery: { bg: 'bg-purple-500', icon: Truck, label: L.outForDelivery, next: 'delivered' },
  delivered: { bg: 'bg-emerald-600', icon: ShieldCheck, label: L.done },
  rejected: { bg: 'bg-red-600', icon: XCircle, label: L.rejected },
});

const ChefDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { orders, updateOrderStatus, updatePrepTime } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState(Date.now());
  const [lang, setLang] = useState<Lang>('es');
  const L = i18n[lang];
  const statusConfig = getStatusConfig(L);

  // Tick every second for countdown timers
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated || user?.role !== 'chef') {
    return <Navigate to="/login" replace />;
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => ['accepted', 'preparing'].includes(o.status));
  const readyOrders = orders.filter((o) => o.status === 'ready');
  const outForDeliveryOrders = orders.filter((o) => o.status === 'out_for_delivery');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');
  const rejectedOrders = orders.filter((o) => o.status === 'rejected');

  const pendingCount = pendingOrders.length;
  const preparingCount = preparingOrders.length;
  const readyCount = readyOrders.length;
  const outCount = outForDeliveryOrders.length;

  // Play notification sound when new pending orders arrive
  const { soundEnabled, toggleSound } = useOrderNotification(pendingCount);

  const sections: StatusSection[] = [
    { key: 'pending', label: L.secNew, emoji: '🔔', color: 'border-yellow-500', statuses: ['pending'] },
    { key: 'preparing', label: L.secPreparing, emoji: '🔥', color: 'border-blue-500', statuses: ['accepted', 'preparing'] },
    { key: 'ready_pickup', label: L.secReadyPickup, emoji: '📦', color: 'border-green-500', statuses: ['ready'] },
    { key: 'ready_delivery', label: L.secReadyDelivery, emoji: '🚚', color: 'border-emerald-500', statuses: ['ready'] },
    { key: 'out', label: L.secOut, emoji: '🚗', color: 'border-purple-500', statuses: ['out_for_delivery'] },
    { key: 'done', label: L.secDone, emoji: '🎉', color: 'border-muted-foreground', statuses: ['delivered'] },
    { key: 'rejected', label: L.secRejected, emoji: '❌', color: 'border-red-500', statuses: ['rejected'] },
  ];

  const getOrdersForSection = (section: StatusSection) => {
    const statusFiltered = orders.filter((o) => section.statuses.includes(o.status));
    if (section.key === 'ready_pickup') return statusFiltered.filter((o) => o.orderType !== 'delivery');
    if (section.key === 'ready_delivery') return statusFiltered.filter((o) => o.orderType === 'delivery');
    return statusFiltered;
  };

  const timeAgo = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return L.justNow;
    if (mins < 60) return `${mins} ${L.minAgo}`;
    return `${Math.floor(mins / 60)}${L.hAgo}`;
  };

  const getCountdown = (order: typeof orders[0]) => {
    if (['pending', 'delivered'].includes(order.status)) return null;
    const elapsed = (now - order.createdAt.getTime()) / 60000;
    const remaining = Math.max(0, order.prepMinutes - elapsed);
    const mins = Math.floor(remaining);
    const secs = Math.floor((remaining - mins) * 60);
    const isUrgent = remaining <= 5 && remaining > 0;
    const isOverdue = remaining === 0;
    return { mins, secs, isUrgent, isOverdue, remaining };
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
            <CheckCircle size={14} /> {L.accept}
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); updateOrderStatus(orderId, 'rejected'); }}
            className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive font-bold text-sm flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <XCircle size={14} /> {L.reject}
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
        accepted: L.startPreparing,
        preparing: L.markReady,
        ready: orderType === 'delivery' ? L.outDelivery : L.complete,
        out_for_delivery: L.delivered,
      };
      return (
        <motion.button
          onClick={(e) => { e.stopPropagation(); updateOrderStatus(orderId, nextStatus!); }}
          className="px-4 py-2 rounded-lg bg-gradient-fiesta text-primary-foreground font-bold text-sm flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {labels[status] || L.next}
        </motion.button>
      );
    }
    return null;
  };

  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Convert long MongoDB IDs to readable short IDs like #DM-A12F
  const shortId = (id: string) => {
    if (id.startsWith('ORD-')) return id;
    return `#DM-${id.slice(-4).toUpperCase()}`;
  };

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
                <h1 className="font-fredoka text-2xl text-foreground">{L.title}</h1>
                <p className="text-sm text-muted-foreground">{L.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-colors ${soundEnabled
                ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              title={soundEnabled ? 'Sound on — click to mute' : 'Sound off — click to unmute'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {soundEnabled ? L.soundOn : L.soundOff}
            </motion.button>
            <motion.button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-fiesta-orange/10 text-fiesta-orange font-bold text-sm hover:bg-fiesta-orange/20 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {lang === 'es' ? '🇺🇸 English' : '🇲🇽 Español'}
            </motion.button>
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors"
            >
              {L.adminView}
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: L.statPending, count: pendingCount, color: 'bg-yellow-500' },
            { label: L.statPreparing, count: preparingCount, color: 'bg-blue-500' },
            { label: L.statReadyPickup, count: readyOrders.filter(o => o.orderType !== 'delivery').length, color: 'bg-green-500' },
            { label: L.statReadyDelivery, count: readyOrders.filter(o => o.orderType === 'delivery').length, color: 'bg-emerald-500' },
            { label: L.statOut, count: outCount, color: 'bg-purple-500' },
            { label: L.statCompleted, count: deliveredOrders.length, color: 'bg-muted-foreground' },
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

                {/* Accept All / Reject All for pending section */}
                {section.key === 'pending' && !isCollapsed && sectionOrders.length > 1 && (
                  <div className="flex items-center gap-2 mb-3 pl-2">
                    <motion.button
                      onClick={() => sectionOrders.forEach((o) => updateOrderStatus(o.id, 'accepted'))}
                      className="px-4 py-2 rounded-lg bg-gradient-fiesta text-primary-foreground font-bold text-sm flex items-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <CheckCircle size={14} /> {L.acceptAll} ({sectionOrders.length})
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        if (confirm(L.rejectAllConfirm)) {
                          sectionOrders.forEach((o) => updateOrderStatus(o.id, 'rejected'));
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive font-bold text-sm flex items-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <XCircle size={14} /> {L.rejectAll} ({sectionOrders.length})
                    </motion.button>
                  </div>
                )}

                {!isCollapsed && (
                  <div className="space-y-3 pl-2">
                    {sectionOrders.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">{L.noOrders}</p>
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
                              className={`bg-card rounded-xl border overflow-hidden ${order.status === 'pending' ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'border-border'
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
                                      <span className="font-bold text-foreground">{shortId(order.id)}</span>
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${config.bg}`}>
                                        {config.label}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${order.orderType === 'delivery' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'
                                        }`}>
                                        {order.orderType === 'delivery' ? <Truck size={12} className="inline mr-1" /> : <ShoppingBag size={12} className="inline mr-1" />}
                                        {order.orderType === 'delivery' ? L.delivery : L.pickup}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {order.customerName} · {timeAgo(order.createdAt)} · {order.items.length} {L.items} · ${order.total.toFixed(2)}
                                    </p>
                                    {order.orderType === 'delivery' && order.deliveryAddress && (
                                      <p className="text-xs text-blue-500 font-bold mt-0.5 flex items-center gap-1">
                                        📍 {order.deliveryAddress}
                                      </p>
                                    )}
                                    {order.orderType !== 'delivery' && order.pickupTime && (
                                      <p className="text-xs text-primary font-bold mt-0.5 flex items-center gap-1">
                                        🕐 {L.pickup}: {order.pickupTime}{order.pickupDate ? ` · ${order.pickupDate}` : ''}
                                      </p>
                                    )}
                                    {(() => {
                                      const cd = getCountdown(order);
                                      if (!cd) return null;
                                      return (
                                        <div className={`flex items-center gap-1.5 mt-1 text-xs font-bold ${cd.isOverdue ? 'text-destructive animate-pulse' : cd.isUrgent ? 'text-yellow-500' : 'text-muted-foreground'
                                          }`}>
                                          <Timer size={12} />
                                          {cd.isOverdue ? L.overdue : `${String(cd.mins).padStart(2, '0')}:${String(cd.secs).padStart(2, '0')} ${L.left}`}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <select
                                    value={order.status}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                      const newStatus = e.target.value as OrderStatus;
                                      if (newStatus === 'rejected' && order.status !== 'rejected') {
                                        if (!confirm(L.rejectOneConfirm)) {
                                          e.target.value = order.status;
                                          return;
                                        }
                                      }
                                      updateOrderStatus(order.id, newStatus);
                                    }}
                                    className="px-2 py-1.5 rounded-lg border border-border bg-muted/50 text-xs font-bold text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                                  >
                                    <option value="preparing">{L.dropPreparing}</option>
                                    <option value="ready">{L.dropReady}</option>
                                    <option value="out_for_delivery">{L.dropOut}</option>
                                    <option value="delivered">{L.dropDelivered}</option>
                                    <option value="rejected">{L.dropRejected}</option>
                                  </select>
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
                                          <p className="text-muted-foreground">{L.phone}</p>
                                          <p className="font-bold text-foreground">{order.customerPhone}</p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">{L.email}</p>
                                          <p className="font-bold text-foreground">{order.customerEmail}</p>
                                        </div>
                                        {order.deliveryAddress && (
                                          <div className="col-span-2">
                                            <p className="text-muted-foreground">{L.deliveryAddr}</p>
                                            <p className="font-bold text-foreground">{order.deliveryAddress}</p>
                                          </div>
                                        )}
                                        {order.pickupDate && (
                                          <div>
                                            <p className="text-muted-foreground">{L.pickupDate}</p>
                                            <p className="font-bold text-foreground">{order.pickupDate}</p>
                                          </div>
                                        )}
                                        {order.pickupTime && (
                                          <div>
                                            <p className="text-muted-foreground">{L.pickupTime}</p>
                                            <p className="font-bold text-foreground">{order.pickupTime}</p>
                                          </div>
                                        )}
                                        <div>
                                          <p className="text-muted-foreground flex items-center gap-1"><Timer size={14} /> {L.prepTime}</p>
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
                                        <p className="text-xs font-bold text-muted-foreground mb-2 uppercase">{L.items}</p>
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

