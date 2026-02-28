import { useState } from 'react';
import { Plus } from 'lucide-react';
import { menuItems, type MenuItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import store11 from '@/assets/store/store-11.jpg';

// Menu item images
import jugoNaranja from '@/assets/menu/jugo-naranja.jpg';
import jugoVerde from '@/assets/menu/jugo-verde.jpg';
import horchata from '@/assets/menu/horchata.jpg';
import licuadoFresa from '@/assets/menu/licuado-fresa.jpg';
import jamaica from '@/assets/menu/jamaica.jpg';
import mangoChile from '@/assets/menu/mango-chile.jpg';
import tortaJamon from '@/assets/menu/torta-jamon.jpg';
import tortaMilanesa from '@/assets/menu/torta-milanesa.jpg';
import tortaCubana from '@/assets/menu/torta-cubana.jpg';
import tortaCarnitas from '@/assets/menu/torta-carnitas.jpg';
import tortaPollo from '@/assets/menu/torta-pollo.jpg';
import elote from '@/assets/menu/elote.jpg';
import tostilocos from '@/assets/menu/tostilocos.jpg';
import frutaChile from '@/assets/menu/fruta-chile.jpg';
import nachos from '@/assets/menu/nachos.jpg';
import churros from '@/assets/menu/churros.jpg';

const menuImages: Record<string, string> = {
  j1: jugoNaranja, j2: jugoVerde, j3: horchata, j4: licuadoFresa, j5: jamaica, j6: mangoChile,
  t1: tortaJamon, t2: tortaMilanesa, t3: tortaCubana, t4: tortaCarnitas, t5: tortaPollo,
  s1: elote, s2: tostilocos, s3: frutaChile, s4: nachos, s5: churros,
};

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
