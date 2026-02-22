import { useState } from 'react';
import { Plus } from 'lucide-react';
import { menuItems, type MenuItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import store11 from '@/assets/store/store-11.jpg';

interface RestaurantMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const RestaurantMenu = ({ onAddToCart }: RestaurantMenuProps) => {
  const [activeTab, setActiveTab] = useState<'jugos' | 'tortas' | 'snacks'>('jugos');
  const { t } = useLanguage();

  const categoryInfo = {
    jugos: { label: t('menu.jugos.label'), desc: t('menu.jugos.desc') },
    tortas: { label: t('menu.tortas.label'), desc: t('menu.tortas.desc') },
    snacks: { label: t('menu.snacks.label'), desc: t('menu.snacks.desc') },
  };

  const tabs: Array<'jugos' | 'tortas' | 'snacks'> = ['jugos', 'tortas', 'snacks'];
  const filtered = menuItems.filter((i) => i.category === activeTab);

  return (
    <>
      {/* Menu Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${store11})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-fiesta-dark/50 via-fiesta-dark/60 to-fiesta-dark/80" />
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-muted/50 to-transparent" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-fredoka text-primary-foreground mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {t('menu.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 font-nunito max-w-2xl mx-auto">
            {t('menu.desc')}
          </p>
        </div>
      </section>

      <section id="menu" className="py-16 bg-muted/50 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-fiesta-orange/5 rounded-full blur-[80px]" />
        
        <div className="container mx-auto px-4 relative">
          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 text-base ${
                  activeTab === tab
                    ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta-lg scale-105'
                    : 'bg-card text-foreground border border-border hover:border-primary/40 hover:shadow-elevated'
                }`}
              >
                {categoryInfo[tab].label}
              </button>
            ))}
          </div>

          <p className="text-center text-muted-foreground mb-10 text-lg">{categoryInfo[activeTab].desc}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="group bg-card rounded-2xl border border-border/50 p-6 flex flex-col hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl group-hover:animate-wiggle">{item.emoji}</span>
                  <span className="font-fredoka text-2xl text-secondary">${item.price.toFixed(2)}</span>
                </div>
                <h3 className="font-fredoka text-xl text-foreground mb-2">{item.name}</h3>
                <p className="text-muted-foreground mb-5 flex-1 leading-relaxed">{item.description}</p>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-full bg-gradient-fiesta-alt text-accent-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <Plus size={18} /> {t('menu.addToOrder')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantMenu;
