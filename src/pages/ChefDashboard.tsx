import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, CheckCircle, ChefHat, Eye, Flame,
  ShieldCheck, Truck, ShoppingBag, History
} from 'lucide-react';

type Tab = 'queue' | 'history';

interface Order {
  id: string;
  customer: string;
  type: 'pickup' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  time: string;
  items: { name: string; qty: number; notes?: string }[];
}

const mockQueue: Order[] = [
  {
    id: 'ORD-002', customer: 'James Wilson', type: 'delivery', status: 'pending', time: '5 min ago',
    items: [
      { name: 'Torta Cubana', qty: 2, notes: 'Extra guac' },
      { name: 'Horchata', qty: 2 },
      { name: 'Churros', qty: 1 },
    ],
  },
  {
    id: 'ORD-001', customer: 'Maria Garcia', type: 'pickup', status: 'preparing', time: '2 min ago',
    items: [
      { name: 'Elote en Vaso', qty: 2 },
      { name: 'Jugo de Naranja', qty: 1, notes: 'No ice' },
    ],
  },
  {
    id: 'ORD-003', customer: 'Ana Lopez', type: 'pickup', status: 'ready', time: '8 min ago',
    items: [
      { name: 'Tostilocos', qty: 1 },
      { name: 'Mango con Chile', qty: 1 },
    ],
  },
];

const mockHistory: Order[] = [
  {
    id: 'ORD-004', customer: 'Carlos Ruiz', type: 'delivery', status: 'delivered', time: '20 min ago',
    items: [
      { name: 'Torta de Milanesa', qty: 3 },
      { name: 'Jamaica', qty: 4 },
    ],
  },
  {
    id: 'ORD-005', customer: 'Emily Chen', type: 'pickup', status: 'delivered', time: '45 min ago',
    items: [{ name: 'Nachos con Queso', qty: 2 }],
  },
];

const statusConfig: Record<string, { bg: string; icon: typeof Clock; label: string; next?: string }> = {
  pending: { bg: 'bg-yellow-500', icon: Clock, label: 'Pending', next: 'preparing' },
  preparing: { bg: 'bg-blue-500', icon: Flame, label: 'Preparing', next: 'ready' },
  ready: { bg: 'bg-green-500', icon: CheckCircle, label: 'Ready', next: 'delivered' },
  delivered: { bg: 'bg-emerald-600', icon: ShieldCheck, label: 'Done' },
};

const ChefDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('queue');
  const [orders, setOrders] = useState<Order[]>(mockQueue);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const advanceStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const next = statusConfig[o.status]?.next;
        return next ? { ...o, status: next as Order['status'] } : o;
      })
    );
  };

  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const preparingCount = orders.filter((o) => o.status === 'preparing').length;
  const readyCount = orders.filter((o) => o.status === 'ready').length;

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
              <div className="w-10 h-10 rounded-full bg-fiesta-orange/10 flex items-center justify-center">
                <ChefHat size={22} className="text-fiesta-orange" />
              </div>
              <div>
                <h1 className="font-fredoka text-2xl text-gradient-fiesta">Chef Dashboard</h1>
                <p className="text-sm text-muted-foreground">Kitchen order management</p>
              </div>
            </div>
          </div>
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fiesta-pink/10 text-fiesta-pink font-bold text-sm hover:bg-fiesta-pink/20 transition-colors"
          >
            Admin View
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Pending', count: pendingCount, color: 'bg-yellow-500' },
            { label: 'Preparing', count: preparingCount, color: 'bg-blue-500' },
            { label: 'Ready', count: readyCount, color: 'bg-green-500' },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="bg-card rounded-xl border border-border p-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`w-3 h-3 rounded-full ${s.color} animate-pulse`} />
              <div>
                <p className="font-fredoka text-2xl text-foreground">{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
              activeTab === 'queue'
                ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta'
                : 'bg-card border border-border text-foreground/70 hover:border-primary/40'
            }`}
          >
            <Flame size={16} /> Live Queue ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta'
                : 'bg-card border border-border text-foreground/70 hover:border-primary/40'
            }`}
          >
            <History size={16} /> History
          </button>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {(activeTab === 'queue' ? activeOrders : mockHistory).map((order) => {
              const config = statusConfig[order.status];
              const isExpanded = expandedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  {/* Order Header */}
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-12 rounded-full ${config.bg}`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${config.bg}`}>
                            {config.label}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            order.type === 'delivery' ? 'bg-fiesta-turquoise/10 text-fiesta-turquoise' : 'bg-fiesta-orange/10 text-fiesta-orange'
                          }`}>
                            {order.type === 'delivery' ? <Truck size={12} className="inline mr-1" /> : <ShoppingBag size={12} className="inline mr-1" />}
                            {order.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.customer} · {order.time} · {order.items.length} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                        <Eye size={16} />
                      </button>
                      {config.next && activeTab === 'queue' && (
                        <motion.button
                          onClick={(e) => { e.stopPropagation(); advanceStatus(order.id); }}
                          className="px-4 py-2 rounded-lg bg-gradient-fiesta text-primary-foreground font-bold text-sm flex items-center gap-2"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {order.status === 'pending' ? 'Start' : order.status === 'preparing' ? 'Mark Ready' : 'Complete'}
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border"
                      >
                        <div className="p-4 space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                              <div>
                                <span className="font-bold text-foreground">{item.qty}× {item.name}</span>
                                {item.notes && (
                                  <p className="text-xs text-fiesta-orange mt-0.5">📝 {item.notes}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
