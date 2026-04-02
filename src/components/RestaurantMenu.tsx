import { useState } from 'react';
import { Plus } from 'lucide-react';
import { menuItems, type MenuItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import store11 from '@/assets/store/store-11.jpg';

// AI-generated food photography for all kitchen items
import mangonada from '@/assets/kitchen/mangonada.png';
import horchata from '@/assets/kitchen/horchata.png';
import jamaica from '@/assets/kitchen/jamaica.png';
import jugoNaranja from '@/assets/kitchen/jugo-naranja.png';
import licuadoFresa from '@/assets/kitchen/licuado-fresa.png';
import mangoChile from '@/assets/kitchen/mango-chile.png';
import papasLocas from '@/assets/kitchen/papas-locas.png';
import chicharronPreparado from '@/assets/kitchen/chicharron-preparado.png';
import elote from '@/assets/kitchen/elote.png';
import tostilocos from '@/assets/kitchen/tostilocos.png';
import frutaChile from '@/assets/kitchen/fruta-chile.png';
import nachos from '@/assets/kitchen/nachos.png';
import frozenPaletas from '@/assets/kitchen/frozen-paletas.png';
import paletaMangoChile from '@/assets/kitchen/paleta-mango-chile.png';

const menuImages: Record<string, string> = {
  // Bebidas
  b1: mangonada,
  b2: horchata,
  b3: jamaica,
  b4: jugoNaranja,
  b5: licuadoFresa,
  b6: mangoChile,
  // Antojitos
  a1: papasLocas,
  a2: chicharronPreparado,
  a3: elote,
  a4: tostilocos,
  a5: frutaChile,
  a6: nachos,
  // Helados — use frozen paletas & mango chile paleta, alternate for variety
  h1: frozenPaletas,
  h2: paletaMangoChile,
  h3: frozenPaletas,
  h4: frozenPaletas,
  h5: frozenPaletas,
  h6: frozenPaletas,
};

interface RestaurantMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const RestaurantMenu = ({ onAddToCart }: RestaurantMenuProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bebidas' | 'antojitos' | 'helados'>('all');
  const { t } = useLanguage();

  const categoryInfo = {
    all: { label: '🍽️ All', desc: 'Browse our full kitchen menu — drinks, antojitos & frozen treats' },
    bebidas: { label: '🥤 Bebidas', desc: 'Fresh-made drinks — mangonadas, aguas frescas & jugos naturales' },
    antojitos: { label: '🍟 Antojitos', desc: 'Kitchen-prepared street food favorites — papas locas, chicharrón preparado & more' },
    helados: { label: '🍦 Helados', desc: 'Frozen paletas & ice cream bars — La Michoacana style' },
  };

  const tabs: Array<'all' | 'bebidas' | 'antojitos' | 'helados'> = ['all', 'bebidas', 'antojitos', 'helados'];
  const filtered = activeTab === 'all' ? menuItems : menuItems.filter((i) => i.category === activeTab);

  return (
    <>
      {/* Menu Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden pt-[120px]">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${store11})` }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fiesta-dark/50 via-fiesta-dark/60 to-fiesta-dark/80" />
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-muted/50 to-transparent" />
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-fredoka text-primary-foreground mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {t('menu.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 font-nunito max-w-2xl mx-auto">{t('menu.desc')}</p>
          <p className="mt-4 text-sm text-primary-foreground/80 font-nunito max-w-xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
            Products and availability may vary in-store. Images are for reference only. Contact the store at <a href="tel:+13147718648" className="text-fiesta-orange underline font-semibold">(314) 771-8648</a> for clarification.
          </p>
        </motion.div>
      </section>

      <section id="menu" className="py-16 bg-muted/50 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-fiesta-orange/5 rounded-full blur-[80px]" />
        
        <div className="container mx-auto px-4 relative">
          {/* Tabs */}
          <motion.div
            className="flex justify-center gap-3 mb-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 text-base ${
                  activeTab === tab
                    ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta-lg scale-105'
                    : 'bg-card text-foreground border border-border hover:border-primary/40 hover:shadow-elevated'
                }`}
                whileHover={{ scale: activeTab === tab ? 1.05 : 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                {categoryInfo[tab].label}
              </motion.button>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-muted-foreground mb-10 text-lg"
            key={activeTab + '-desc'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {categoryInfo[activeTab].desc}
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-card rounded-2xl border border-border/50 overflow-hidden flex flex-col hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Image */}
                  {menuImages[item.id] && (
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={menuImages[item.id]}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <motion.span
                        className="text-3xl"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                      >
                        {item.emoji}
                      </motion.span>
                      <span className="font-fredoka text-2xl text-secondary">${item.price.toFixed(2)}</span>
                    </div>
                    <h3 className="font-fredoka text-xl text-foreground mb-2">{item.name}</h3>
                    <p className="text-muted-foreground mb-5 flex-1 leading-relaxed">{item.description}</p>
                    <motion.button
                      onClick={() => onAddToCart(item)}
                      className="w-full bg-gradient-fiesta-alt text-accent-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Plus size={18} /> {t('menu.addToOrder')}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantMenu;
