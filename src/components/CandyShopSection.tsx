import { useState } from 'react';
import { MapPin, Camera } from 'lucide-react';
import { candyItems } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';
import store1 from '@/assets/store/store-1.jpg';

import mazapanImg from '@/assets/candy/mazapan.jpg';
import pulparindoImg from '@/assets/candy/pulparindo.jpg';
import lucasMuecasImg from '@/assets/candy/lucas-muecas.jpg';
import obleasImg from '@/assets/candy/obleas.jpg';
import pelonImg from '@/assets/candy/pelon.jpg';
import duvalinImg from '@/assets/candy/duvalin.jpg';
import pinataImg from '@/assets/candy/pinata.jpg';
import veroMangoImg from '@/assets/candy/vero-mango.jpg';

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

const candyImages: Record<string, string> = {
  c1: mazapanImg,
  c2: pulparindoImg,
  c3: lucasMuecasImg,
  c4: obleasImg,
  c5: pelonImg,
  c6: duvalinImg,
  c7: pinataImg,
  c8: veroMangoImg,
};

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
  'Best Seller': 'bg-fiesta-pink',
  'Spicy': 'bg-fiesta-red',
  'Fun': 'bg-fiesta-turquoise',
  'Sweet': 'bg-fiesta-yellow',
  'Classic': 'bg-fiesta-orange',
  'Creamy': 'bg-fiesta-green',
  'Party': 'bg-fiesta-pink',
  'Tangy': 'bg-fiesta-orange',
};

const CandyShopSection = () => {
  const [activeTag, setActiveTag] = useState('All');
  const { t } = useLanguage();

  const filtered = activeTag === 'All' ? candyItems : candyItems.filter((i) => i.tag === activeTag);
  const storePhotos = storePhotoSrcs.map((src, i) => ({ src, label: t(storePhotoKeys[i]) }));

  return (
    <>
      {/* Candy Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${store1})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-fiesta-dark/50 via-fiesta-dark/60 to-fiesta-dark/80" />
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-fredoka text-primary-foreground mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {t('candy.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 font-nunito max-w-2xl mx-auto">
            {t('candy.desc')}
          </p>
        </div>
      </section>

      <section id="candy" className="py-16 bg-background relative">
        <div className="absolute top-0 left-0 w-72 h-72 bg-fiesta-pink/5 rounded-full blur-[80px]" />
        
        <div className="container mx-auto px-4 relative">
          {/* Category Filter */}
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 text-sm ${
                  activeTag === tag
                    ? `${tagColors[tag] || 'bg-gradient-fiesta'} text-primary-foreground shadow-fiesta-lg scale-110`
                    : 'bg-card text-foreground border border-border hover:border-primary/40 hover:shadow-elevated'
                }`}
              >
                {tag === 'All' ? t('candy.all') : tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img
                    src={candyImages[item.id]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-block text-xs font-bold ${tagColors[item.tag] || 'bg-secondary'} text-primary-foreground px-3 py-1 rounded-full shadow-lg`}>
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-fredoka text-lg text-foreground mb-1.5">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-accent group-hover:gap-2.5 transition-all duration-300">
                    <MapPin size={14} /> {t('candy.viewInStore')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Store Photo Gallery */}
          <div className="mt-20 mb-12">
            <div className="flex items-center gap-3 justify-center mb-10">
              <Camera size={28} className="text-primary" />
              <h3 className="text-3xl md:text-4xl font-fredoka text-foreground">{t('candy.insideStore')}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {storePhotos.map((photo, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                    i === 0 || i === 4 ? 'md:col-span-1 lg:row-span-2 lg:col-span-2' : ''
                  }`}
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
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14">
            <div className="inline-block bg-gradient-to-br from-fiesta-yellow/10 to-fiesta-orange/10 rounded-3xl px-10 py-7 border border-border/50">
              <p className="font-fredoka text-2xl text-foreground mb-2">{t('candy.visitUs')}</p>
              <p className="text-muted-foreground text-lg">{t('candy.visitDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CandyShopSection;
