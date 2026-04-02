import { useState } from 'react';
import { MapPin, Camera, Plus, ShoppingCart } from 'lucide-react';
import { candyItems, type CandyItem } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useRef } from 'react';
import store1 from '@/assets/store/store-1.jpg';

import candyImageMap from '@/data/candy-images.json';

import storeImg1 from '@/assets/store/store-1.jpg';
import store2 from '@/assets/store/store-2.jpg';
import store3 from '@/assets/store/store-3.jpg';
import store4 from '@/assets/store/store-4.jpg';
import store5 from '@/assets/store/store-5.jpg';
import store6 from '@/assets/store/store-6.jpg';
import store7 from '@/assets/store/store-7.jpg';
import store8 from '@/assets/store/store-8.jpg';
import store9 from '@/assets/store/store-9.jpg';
import store10 from '@/assets/store/store-10.jpg';
import store11 from '@/assets/store/store-11.jpg';

// External product images from candy-images.json + local overrides
const candyImages: Record<string, string> = candyImageMap as Record<string, string>;

const storePhotoKeys = [
  'store.juiceCounter', 'store.candyCounter', 'store.pinataAisle',
  'store.partySupplies', 'store.mexicanCrafts', 'store.pinatasGalore',
  'store.snackAisle', 'store.religiousItems', 'store.miniCollectibles',
  'store.freshDesserts', 'store.storeOverview',
];
const storePhotoSrcs = [store11, storeImg1, store3, store5, store6, store8, store9, store4, store7, store10, store2];

const allTags = ['All', ...Array.from(new Set(candyItems.map((i) => i.tag)))];

const tagColors: Record<string, string> = {
  'All': 'bg-gradient-fiesta',
  'Candy': 'bg-fiesta-pink',
  'Bulk Candy': 'bg-fiesta-orange',
  'Lollipops': 'bg-fiesta-pink',
  'Chocolate': 'bg-fiesta-red',
  'Cookies': 'bg-fiesta-yellow',
  'Piñata Mix': 'bg-fiesta-turquoise',
  'Tamarind/Chile': 'bg-fiesta-red',
  'Chamoy & Sauces': 'bg-fiesta-orange',
  'Dulces de Leche': 'bg-fiesta-yellow',
  'Sour Candy': 'bg-fiesta-green',
  'Snacks': 'bg-fiesta-orange',
  'Beverages': 'bg-fiesta-turquoise',
  'Gum': 'bg-fiesta-green',
  'Gummy': 'bg-fiesta-green',
  'Chewy Candy': 'bg-fiesta-pink',
  'Hard Candy': 'bg-fiesta-red',
  'Marshmallow': 'bg-fiesta-yellow',
  'Grocery': 'bg-fiesta-green',
  'Party Supplies': 'bg-fiesta-turquoise',
  'Other': 'bg-fiesta-orange',
};

const ITEMS_PER_PAGE = 24;

const CandyShopSection = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const { t } = useLanguage();
  const { addCandyItem } = useCart();
  const galleryRef = useRef(null);
  const galleryInView = useInView(galleryRef, { once: true, margin: '-80px' });

  const byTag = activeTag === 'All' ? candyItems : candyItems.filter((i) => i.tag === activeTag);
  const filtered = search
    ? byTag.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()))
    : byTag;
  const visible = filtered.slice(0, visibleCount);
  const storePhotos = storePhotoSrcs.map((src, i) => ({ src, label: t(storePhotoKeys[i]) }));

  return (
    <>
      {/* Candy Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden pt-[120px]">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${store1})` }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fiesta-dark/50 via-fiesta-dark/60 to-fiesta-dark/80" />
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-fredoka text-primary-foreground mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {t('candy.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 font-nunito max-w-2xl mx-auto">{t('candy.desc')}</p>
          <p className="mt-4 text-sm text-primary-foreground/80 font-nunito max-w-xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
            Products and availability may vary in-store. Images are for reference only. Contact the store at <a href="tel:+13147718648" className="text-fiesta-orange underline font-semibold">(314) 771-8648</a> for clarification.
          </p>
        </motion.div>
      </section>

      <section id="candy" className="py-16 bg-background relative">
        <div className="absolute top-0 left-0 w-72 h-72 bg-fiesta-pink/5 rounded-full blur-[80px]" />
        
        <div className="container mx-auto px-4 relative">
          {/* Search */}
          <motion.div
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              placeholder={t('candy.search') || 'Search candy, snacks, drinks...'}
              className="w-full px-5 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-nunito text-sm"
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex justify-center gap-2 mb-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => { setActiveTag(tag); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 text-sm ${
                  activeTag === tag
                    ? `${tagColors[tag] || 'bg-gradient-fiesta'} text-primary-foreground shadow-fiesta-lg scale-110`
                    : 'bg-card text-foreground border border-border hover:border-primary/40 hover:shadow-elevated'
                }`}
                whileHover={{ scale: activeTag === tag ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag === 'All' ? t('candy.all') : tag}
              </motion.button>
            ))}
          </motion.div>

          <LayoutGroup>
            <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" layout>
              <AnimatePresence mode="popLayout">
                {visible.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="aspect-square overflow-hidden bg-muted relative">
                      {candyImages[item.id] ? (
                        <img
                          src={candyImages[item.id]}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fiesta-yellow/10 to-fiesta-orange/10">
                          <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{item.emoji}</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-block text-xs font-bold ${tagColors[item.tag] || 'bg-secondary'} text-primary-foreground px-3 py-1 rounded-full shadow-lg`}>
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-1.5">
                        <h3 className="font-fredoka text-lg text-foreground">{item.name}</h3>
                        <span className="font-fredoka text-lg text-secondary">
                          {(() => {
                            const activePrice = item.variants
                              ? item.variants[selectedVariants[item.id] ?? 0].price
                              : item.price;
                            return activePrice > 0 ? `$${activePrice.toFixed(2)}` : 'In Store';
                          })()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{item.description}</p>
                      {item.variants && (
                        <div className="flex gap-1.5 mb-3">
                          {item.variants.map((v, vi) => (
                            <button
                              key={v.label}
                              onClick={() => setSelectedVariants((prev) => ({ ...prev, [item.id]: vi }))}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                                (selectedVariants[item.id] ?? 0) === vi
                                  ? 'bg-secondary text-primary-foreground shadow-sm'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                            >
                              {v.label}
                            </button>
                          ))}
                        </div>
                      )}
                      {(() => {
                        const activePrice = item.variants
                          ? item.variants[selectedVariants[item.id] ?? 0].price
                          : item.price;
                        return activePrice > 0 ? (
                          <motion.button
                            onClick={() => addCandyItem({
                              ...item,
                              price: activePrice,
                              name: item.variants
                                ? `${item.name} (${item.variants[selectedVariants[item.id] ?? 0].label})`
                                : item.name,
                            })}
                            className="w-full bg-gradient-fiesta-alt text-accent-foreground font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-300 text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <ShoppingCart size={16} /> Add to Cart
                          </motion.button>
                        ) : (
                          <span className="block w-full text-center text-sm text-muted-foreground font-nunito py-2.5">
                            Available In Store
                          </span>
                        );
                      })()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Item count & Load More */}
          <div className="text-center mt-8 space-y-4">
            <p className="text-sm text-muted-foreground font-nunito">
              Showing {visible.length} of {filtered.length} items
            </p>
            {visibleCount < filtered.length && (
              <motion.button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="px-8 py-3 rounded-full bg-gradient-fiesta text-primary-foreground font-bold hover:shadow-fiesta-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More
              </motion.button>
            )}
          </div>

          {/* Store Photo Gallery */}
          <div className="mt-20 mb-12" ref={galleryRef}>
            <motion.div
              className="flex items-center gap-3 justify-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Camera size={28} className="text-primary" />
              <h3 className="text-3xl md:text-4xl font-fredoka text-foreground">{t('candy.insideStore')}</h3>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {storePhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                    i === 0 || i === 4 ? 'md:col-span-1 lg:row-span-2 lg:col-span-2' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <div className={`${i === 0 || i === 4 ? 'aspect-square' : 'aspect-[4/3]'} overflow-hidden`}>
                    <img
                      src={photo.src}
                      alt={photo.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-fiesta-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute bottom-4 left-4 text-primary-foreground font-fredoka text-sm drop-shadow-lg">{photo.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-gradient-to-br from-fiesta-yellow/10 to-fiesta-orange/10 rounded-3xl px-10 py-7 border border-border/50">
              <p className="font-fredoka text-2xl text-foreground mb-2">{t('candy.visitUs')}</p>
              <p className="text-muted-foreground text-lg">{t('candy.visitDesc')}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CandyShopSection;
