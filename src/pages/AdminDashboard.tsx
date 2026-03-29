import { useState, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useOrderNotification } from '@/hooks/useOrderNotification';
import {
  ShoppingCart, Menu as MenuIcon, BarChart3, ArrowLeft,
  Package, Clock, CheckCircle, DollarSign, TrendingUp,
  Edit, Trash2, Plus, Search, Volume2, VolumeX, AlertCircle
} from 'lucide-react';
import { menuItems } from '@/data/menu';
import type { Order } from '@/services/api';

type Tab = 'orders' | 'menu' | 'analytics';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-blue-100 text-blue-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready: 'bg-green-100 text-green-800',
  out_for_delivery: 'bg-purple-100 text-purple-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
};

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { orders, updateStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const { soundEnabled, toggleSound, isAlarming } = useOrderNotification(pendingCount);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const shortId = (id: string) => `#DM-${id.slice(-4).toUpperCase()}`;

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const tabs: { key: Tab; label: string; icon: typeof ShoppingCart }[] = [
    { key: 'orders', label: 'Orders', icon: ShoppingCart },
    { key: 'menu', label: 'Menu', icon: MenuIcon },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  // Compute real stats from orders
  const todayOrders = orders.filter((o) => {
    const orderDate = new Date(o.createdAt).toDateString();
    return orderDate === new Date().toDateString();
  });
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Today's Orders", value: String(todayOrders.length), icon: Package, color: 'text-fiesta-orange' },
    { label: 'Revenue Today', value: `$${todayRevenue.toFixed(0)}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'Pending Orders', value: String(pendingCount), icon: Clock, color: 'text-yellow-500' },
    { label: 'Total Orders', value: String(orders.length), icon: TrendingUp, color: 'text-fiesta-turquoise' },
  ];

  const filteredOrders = orders
    .filter((o) => {
      const matchSearch = o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o._id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const nextStatus: Record<string, Order['status']> = {
    pending: 'accepted',
    accepted: 'preparing',
    preparing: 'ready',
    ready: 'out_for_delivery',
    out_for_delivery: 'delivered',
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
            <div>
              <h1 className="font-fredoka text-2xl text-gradient-fiesta">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your store</p>
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
            </motion.button>
            <Link to="/chef" className="px-3 py-2 rounded-lg bg-fiesta-orange/10 text-fiesta-orange font-bold text-sm hover:bg-fiesta-orange/20 transition-colors">
              Chef View
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={18} className={stat.color} />
                <span className="text-xs text-muted-foreground font-bold">{stat.label}</span>
              </div>
              <p className="font-fredoka text-2xl text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === tab.key
                ? 'bg-gradient-fiesta text-primary-foreground shadow-md'
                : 'bg-card border border-border text-foreground/70 hover:border-primary/40'
                }`}
            >
              <tab.icon size={16} /> {tab.label}
              {tab.key === 'orders' && pendingCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-yellow-500 text-white text-xs font-bold">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'orders' && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or order ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-muted/50 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-muted/50 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <AlertCircle size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="font-bold">No orders found</p>
                  <p className="text-sm mt-1">Orders will appear here when customers place them.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 text-left text-muted-foreground">
                        <th className="px-4 py-3 font-bold">Order</th>
                        <th className="px-4 py-3 font-bold">Customer</th>
                        <th className="px-4 py-3 font-bold">Items</th>
                        <th className="px-4 py-3 font-bold">Total</th>
                        <th className="px-4 py-3 font-bold">Type</th>
                        <th className="px-4 py-3 font-bold">Status</th>
                        <th className="px-4 py-3 font-bold">Time</th>
                        <th className="px-4 py-3 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order._id} className="border-t border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-bold text-foreground">{shortId(order._id)}</td>
                          <td className="px-4 py-3">
                            <div>{order.customerName}</div>
                            <div className="text-xs text-muted-foreground">{order.customerPhone}</div>
                          </td>
                          <td className="px-4 py-3">{order.items.length}</td>
                          <td className="px-4 py-3 font-bold">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.orderType === 'delivery' ? 'bg-fiesta-turquoise/10 text-fiesta-turquoise' : 'bg-fiesta-orange/10 text-fiesta-orange'}`}>
                              {order.orderType || 'pickup'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${statusColors[order.status] || 'bg-muted text-muted-foreground'}`}>
                              {order.status.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{timeAgo(order.createdAt)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {nextStatus[order.status] && (
                                <button
                                  onClick={() => updateStatus(order._id, nextStatus[order.status])}
                                  className="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                                >
                                  {nextStatus[order.status].replace(/_/g, ' ')}
                                </button>
                              )}
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => updateStatus(order._id, 'rejected')}
                                  className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors"
                                >
                                  reject
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground text-sm">{menuItems.length} items</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                      <p className="font-fredoka text-secondary mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-fredoka text-lg text-foreground mb-4">Order Summary</h3>
                {orders.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No order data yet. Analytics will populate as orders come in.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Orders', value: String(orders.length) },
                      { label: 'Avg Order Value', value: `$${(orders.reduce((s, o) => s + o.total, 0) / orders.length).toFixed(2)}` },
                      { label: 'Delivery Orders', value: String(orders.filter(o => o.orderType === 'delivery').length) },
                      { label: 'Total Revenue', value: `$${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}` },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="font-fredoka text-2xl text-foreground">{s.value}</p>
                        <p className="text-sm font-bold text-foreground/80">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-fredoka text-lg text-foreground mb-4">Orders by Status</h3>
                <div className="space-y-3">
                  {Object.entries(
                    orders.reduce((acc, o) => {
                      acc[o.status] = (acc[o.status] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort((a, b) => b[1] - a[1]).map(([status, count]) => (
                    <div key={status} className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize w-28 text-center ${statusColors[status] || 'bg-muted text-muted-foreground'}`}>
                        {status.replace(/_/g, ' ')}
                      </span>
                      <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-fiesta rounded-full flex items-center justify-end pr-2"
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / orders.length) * 100}%` }}
                          transition={{ duration: 0.6 }}
                        >
                          <span className="text-[10px] font-bold text-primary-foreground">{count}</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
