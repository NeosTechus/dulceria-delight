import { MapPin } from 'lucide-react';
import { candyItems } from '@/data/menu';

import mazapanImg from '@/assets/candy/mazapan.jpg';
import pulparindoImg from '@/assets/candy/pulparindo.jpg';
import lucasMuecasImg from '@/assets/candy/lucas-muecas.jpg';
import obleasImg from '@/assets/candy/obleas.jpg';
import pelonImg from '@/assets/candy/pelon.jpg';
import duvalinImg from '@/assets/candy/duvalin.jpg';
import pinataImg from '@/assets/candy/pinata.jpg';
import veroMangoImg from '@/assets/candy/vero-mango.jpg';

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

const CandyShopSection = () => {
  return (
    <section id="candy" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-fredoka text-foreground mb-3">
            🪅 Candy Shop & Piñatas
          </h2>
          <p className="text-lg text-muted-foreground font-nunito max-w-2xl mx-auto">
            Discover hundreds of authentic Mexican candies, party supplies, and handmade piñatas. Come visit us in store!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {candyItems.map((item, i) => (
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
                  <MapPin size={14} /> View in Store
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-muted rounded-2xl px-8 py-5">
            <p className="font-fredoka text-xl text-foreground mb-1">📍 Visit Us for the Full Selection!</p>
            <p className="text-muted-foreground">100s more candies, piñatas & party supplies in store</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandyShopSection;
