import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import {
  ShoppingCart, Menu as MenuIcon, BarChart3, Users, ArrowLeft,
  Package, Clock, CheckCircle, XCircle, DollarSign, TrendingUp,
  Edit, Trash2, Plus, Search, ChefHat
} from 'lucide-react';
import { menuItems } from '@/data/menu';

type Tab = 'orders' | 'menu' | 'analytics' | 'users';

// Mock data
const mockOrders = [
  { id: 'ORD-001', customer: 'Maria Garcia', items: 3, total: 28.50, type: 'pickup', status: 'preparing', time: '2 min ago' },
  { id: 'ORD-002', customer: 'James Wilson', items: 5, total: 92.00, type: 'delivery', status: 'pending', time: '5 min ago' },
  { id: 'ORD-003', customer: 'Ana Lopez', items: 2, total: 15.00, type: 'pickup', status: 'ready', time: '8 min ago' },
  { id: 'ORD-004', customer: 'Carlos Ruiz', items: 7, total: 105.50, type: 'delivery', status: 'delivered', time: '20 min ago' },
  { id: 'ORD-005', customer: 'Emily Chen', items: 1, total: 8.00, type: 'pickup', status: 'cancelled', time: '30 min ago' },
];

const mockUsers = [
  { id: 1, name: 'Maria Garcia', email: 'maria@email.com', role: 'customer', orders: 12, joined: 'Jan 2026' },
  { id: 2, name: 'Chef Juan', email: 'juan@dulceria.com', role: 'chef', orders: 0, joined: 'Dec 2025' },
  { id: 3, name: 'Admin Rosa', email: 'rosa@dulceria.com', role: 'admin', orders: 0, joined: 'Nov 2025' },
  { id: 4, name: 'James Wilson', email: 'james@email.com', role: 'customer', orders: 5, joined: 'Feb 2026' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const tabs: { key: Tab; label: string; icon: typeof ShoppingCart }[] = [
    { key: 'orders', label: 'Orders', icon: ShoppingCart },
    { key: 'menu', label: 'Menu', icon: MenuIcon },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'users', label: 'Users', icon: Users },
  ];

  const stats = [
    { label: "Today's Orders", value: '24', icon: Package, color: 'text-fiesta-orange' },
    { label: 'Revenue Today', value: '$486', icon: DollarSign, color: 'text-green-500' },
    { label: 'Pending Orders', value: '3', icon: Clock, color: 'text-yellow-500' },
    { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-fiesta-turquoise' },
  ];

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
          <Link
            to="/chef"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fiesta-orange/10 text-fiesta-orange font-bold text-sm hover:bg-fiesta-orange/20 transition-colors"
          >
            <ChefHat size={16} /> Chef View
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className="font-fredoka text-2xl text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta'
                  : 'bg-card border border-border text-foreground/70 hover:border-primary/40'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
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
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-muted/50 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
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
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders
                      .filter((o) => o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((order) => (
                        <tr key={order.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-bold text-foreground">{order.id}</td>
                          <td className="px-4 py-3">{order.customer}</td>
                          <td className="px-4 py-3">{order.items}</td>
                          <td className="px-4 py-3 font-bold">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.type === 'delivery' ? 'bg-fiesta-turquoise/10 text-fiesta-turquoise' : 'bg-fiesta-orange/10 text-fiesta-orange'}`}>
                              {order.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{order.time}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground text-sm">{menuItems.length} items</p>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-fiesta text-primary-foreground font-bold text-sm">
                  <Plus size={16} /> Add Item
                </button>
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
                    <div className="flex gap-1 shrink-0">
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Edit size={14} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-fredoka text-lg text-foreground mb-4">Revenue This Week</h3>
                  <div className="space-y-3">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                      const val = [320, 450, 280, 520, 680, 890, 420][i];
                      const max = 890;
                      return (
                        <div key={day} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-8">{day}</span>
                          <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-fiesta rounded-full flex items-center justify-end pr-2"
                              initial={{ width: 0 }}
                              animate={{ width: `${(val / max) * 100}%` }}
                              transition={{ duration: 0.6, delay: i * 0.08 }}
                            >
                              <span className="text-[10px] font-bold text-primary-foreground">${val}</span>
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-fredoka text-lg text-foreground mb-4">Top Items</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Torta Cubana', sold: 42 },
                      { name: 'Horchata', sold: 38 },
                      { name: 'Elote en Vaso', sold: 35 },
                      { name: 'Jugo de Naranja', sold: 28 },
                      { name: 'Churros', sold: 25 },
                    ].map((item, i) => (
                      <div key={item.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-fiesta-orange/10 text-fiesta-orange text-xs font-bold flex items-center justify-center">{i + 1}</span>
                          <span className="font-bold text-sm text-foreground">{item.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.sold} sold</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-fredoka text-lg text-foreground mb-4">Order Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Orders', value: '156', sub: 'This month' },
                    { label: 'Avg Order Value', value: '$32.50', sub: '+8% vs last month' },
                    { label: 'Delivery Orders', value: '48', sub: '31% of total' },
                    { label: 'Repeat Customers', value: '67%', sub: '+5% vs last month' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-fredoka text-2xl text-foreground">{s.value}</p>
                      <p className="text-sm font-bold text-foreground/80">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-left text-muted-foreground">
                      <th className="px-4 py-3 font-bold">Name</th>
                      <th className="px-4 py-3 font-bold">Email</th>
                      <th className="px-4 py-3 font-bold">Role</th>
                      <th className="px-4 py-3 font-bold">Orders</th>
                      <th className="px-4 py-3 font-bold">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-bold text-foreground">{user.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${
                            user.role === 'admin' ? 'bg-fiesta-pink/10 text-fiesta-pink' :
                            user.role === 'chef' ? 'bg-fiesta-orange/10 text-fiesta-orange' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">{user.orders}</td>
                        <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
