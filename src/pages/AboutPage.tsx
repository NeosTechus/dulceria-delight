import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import store2 from '@/assets/store/store-2.jpg';
import store6 from '@/assets/store/store-6.jpg';
import store8 from '@/assets/store/store-8.jpg';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-16">
      <Navbar cartCount={0} onCartClick={() => {}} />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${store2})` }} />
        <div className="absolute inset-0 bg-fiesta-dark/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-fredoka text-primary-foreground mb-3 drop-shadow-lg">
            🪅 About Us
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-nunito max-w-2xl mx-auto">
            Bringing authentic Mexican flavors & culture to St. Louis
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-3xl font-fredoka text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Dulceria Medina started as a family dream — to bring the vibrant flavors and traditions of Mexico right to the heart of St. Louis. Located on Cherokee Street, we've become a beloved neighborhood destination for authentic Mexican candy, handmade piñatas, and freshly prepared food.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From the sweet crumble of a Mazapán to the tangy kick of a Pulparindo, every item in our shop is carefully selected to bring a taste of home to our community. Our kitchen serves up fresh jugos, tortas, and street snacks made with love every single day.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-fiesta">
              <img src={store6} alt="Mexican crafts at Dulceria Medina" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { emoji: '🇲🇽', title: 'Authentic', desc: 'Real Mexican products sourced directly from trusted suppliers' },
              { emoji: '👨‍👩‍👧‍👦', title: 'Family-Owned', desc: 'Operated with love and pride by the Medina family' },
              { emoji: '🏘️', title: 'Community', desc: 'A Cherokee Street staple serving our neighbors since day one' },
            ].map((v) => (
              <div key={v.title} className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-fiesta transition-shadow">
                <span className="text-4xl mb-3 block">{v.emoji}</span>
                <h3 className="font-fredoka text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden shadow-fiesta-orange">
            <img src={store8} alt="Piñatas at Dulceria Medina" className="w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
