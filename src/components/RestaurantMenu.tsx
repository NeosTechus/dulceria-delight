import { useState } from 'react';
import { Plus } from 'lucide-react';
import { menuItems, type MenuItem, type CartItem } from '@/data/menu';

interface RestaurantMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const categoryInfo = {
  jugos: { label: '🍊 Jugos Naturales', desc: 'Fresh-squeezed juices & aguas frescas' },
  tortas: { label: '🥪 Tortas', desc: 'Authentic Mexican sandwiches' },
  snacks: { label: '🌽 Snacks', desc: 'Street-style bites & treats' },
} as const;

const RestaurantMenu = ({ onAddToCart }: RestaurantMenuProps) => {
  const [activeTab, setActiveTab] = useState<'jugos' | 'tortas' | 'snacks'>('jugos');

  const tabs: Array<'jugos' | 'tortas' | 'snacks'> = ['jugos', 'tortas', 'snacks'];
  const filtered = menuItems.filter((i) => i.category === activeTab);

  return (
    <section id="menu" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-fredoka text-foreground mb-3">
            🍽️ Fresh Kitchen Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Made fresh daily — order online for pickup!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta scale-105'
                  : 'bg-card text-foreground border border-border hover:border-primary/40'
              }`}
            >
              {categoryInfo[tab].label}
            </button>
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-8">{categoryInfo[activeTab].desc}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl border border-border p-5 flex flex-col hover:shadow-fiesta hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-fredoka text-xl text-secondary">${item.price.toFixed(2)}</span>
              </div>
              <h3 className="font-fredoka text-lg text-foreground mb-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{item.description}</p>
              <button
                onClick={() => onAddToCart(item)}
                className="w-full bg-accent text-accent-foreground font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={18} /> Add to Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantMenu;
