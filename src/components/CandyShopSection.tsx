import { useState } from 'react';
import { MapPin, Camera } from 'lucide-react';
import { candyItems } from '@/data/menu';
import { useLanguage } from '@/contexts/LanguageContext';

import mazapanImg from '@/assets/candy/mazapan.jpg';
import pulparindoImg from '@/assets/candy/pulparindo.jpg';
import lucasMuecasImg from '@/assets/candy/lucas-muecas.jpg';
import obleasImg from '@/assets/candy/obleas.jpg';
import pelonImg from '@/assets/candy/pelon.jpg';
import duvalinImg from '@/assets/candy/duvalin.jpg';
import pinataImg from '@/assets/candy/pinata.jpg';
import veroMangoImg from '@/assets/candy/vero-mango.jpg';

import store1 from '@/assets/store/store-1.jpg';
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

const storePhotoSrcs = [store11, store1, store3, store5, store6, store8, store9, store4, store7, store10, store2];

const allTags = ['All', ...Array.from(new Set(candyItems.map((i) => i.tag)))];

const CandyShopSection = () => {
  const [activeTag, setActiveTag] = useState('All');
  const { t } = useLanguage();

  const filtered = activeTag === 'All' ? candyItems : candyItems.filter((i) => i.tag === activeTag);

  const storePhotos = storePhotoSrcs.map((src, i) => ({ src, label: t(storePhotoKeys[i]) }));

  return (
    <section id="candy" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-fredoka text-foreground mb-3">
            {t('candy.title')}
          </h2>
          <p className="text-lg text-muted-foreground font-nunito max-w-2xl mx-auto">
            {t('candy.desc')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2.5 rounded-full font-bold transition-all text-sm ${
                activeTag === tag
                  ? 'bg-gradient-fiesta text-primary-foreground shadow-fiesta scale-105'
                  : 'bg-card text-foreground border border-border hover:border-primary/40'
              }`}
            >
              {tag === 'All' ? t('candy.all') : tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-fiesta-orange hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={candyImages[item.id]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <span className="inline-block text-xs font-bold bg-secondary/15 text-secondary px-2 py-0.5 rounded-full mb-2">
                  {item.tag}
                </span>
                <h3 className="font-fredoka text-lg text-foreground mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-accent">
                  <MapPin size={14} /> {t('candy.viewInStore')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Store Photo Gallery */}
        <div className="mt-16 mb-12">
          <div className="flex items-center gap-2 justify-center mb-8">
            <Camera size={24} className="text-primary" />
            <h3 className="text-2xl md:text-3xl font-fredoka text-foreground">{t('candy.insideStore')}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {storePhotos.map((photo, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                  i === 0 || i === 4 ? 'md:col-span-1 lg:row-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className={`${i === 0 || i === 4 ? 'aspect-square' : 'aspect-[4/3]'} overflow-hidden`}>
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute bottom-3 left-3 text-white font-fredoka text-sm">{photo.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-muted rounded-2xl px-8 py-5">
            <p className="font-fredoka text-xl text-foreground mb-1">{t('candy.visitUs')}</p>
            <p className="text-muted-foreground">{t('candy.visitDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandyShopSection;
