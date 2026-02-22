import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import store11 from '@/assets/store/store-11.jpg';
import store1 from '@/assets/store/store-1.jpg';
import store10 from '@/assets/store/store-10.jpg';

const kitchenFeatures = [
  { emoji: '🍊', title: 'Jugos Naturales', desc: 'Freshly squeezed juices made to order with real fruits' },
  { emoji: '🥪', title: 'Tortas Auténticas', desc: 'Traditional Mexican sandwiches loaded with flavor' },
  { emoji: '🌽', title: 'Street Snacks', desc: 'Elote, tostilocos, fruta con chile & more' },
  { emoji: '🧃', title: 'Aguas Frescas', desc: 'Horchata, jamaica, tamarindo — all homemade' },
];

const KitchenPage = () => {
  return (
    <div className="min-h-screen pt-16">
      <Navbar cartCount={0} onCartClick={() => {}} />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${store11})` }} />
        <div className="absolute inset-0 bg-fiesta-dark/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-fredoka text-primary-foreground mb-3 drop-shadow-lg">
            🍽️ Our Kitchen
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-nunito max-w-2xl mx-auto">
            Fresh, made-to-order Mexican food & drinks — right inside the candy shop!
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {kitchenFeatures.map((f) => (
              <div key={f.title} className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-fiesta transition-shadow">
                <span className="text-4xl mb-3 block">{f.emoji}</span>
                <h3 className="font-fredoka text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Photo strip */}
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { src: store11, label: 'Juice Counter' },
              { src: store1, label: 'Fresh Ingredients' },
              { src: store10, label: 'Desserts & Treats' },
            ].map((photo) => (
              <div key={photo.label} className="group relative overflow-hidden rounded-xl aspect-[4/3]">
                <img src={photo.src} alt={photo.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute bottom-3 left-3 text-primary-foreground font-fredoka text-sm">{photo.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/menu"
              className="inline-block bg-gradient-fiesta text-primary-foreground font-bold text-lg px-8 py-4 rounded-full shadow-fiesta hover:scale-105 transition-transform"
            >
              🍽️ See Full Menu & Order
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KitchenPage;
