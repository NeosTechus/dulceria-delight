import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import store2 from '@/assets/store/store-2.jpg';
import store6 from '@/assets/store/store-6.jpg';
import store8 from '@/assets/store/store-8.jpg';

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    { emoji: '🇲🇽', title: t('about.authentic'), desc: t('about.authenticDesc') },
    { emoji: '👨‍👩‍👧‍👦', title: t('about.family'), desc: t('about.familyDesc') },
    { emoji: '🏘️', title: t('about.community'), desc: t('about.communityDesc') },
  ];

  return (
    <div className="min-h-screen pt-16">
      <Navbar cartCount={0} onCartClick={() => {}} />

      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${store2})` }} />
        <div className="absolute inset-0 bg-fiesta-dark/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-fredoka text-primary-foreground mb-3 drop-shadow-lg">
            {t('about.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-nunito max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-3xl font-fredoka text-foreground mb-4">{t('about.storyTitle')}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{t('about.story1')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('about.story2')}</p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-fiesta">
              <img src={store6} alt="Mexican crafts at Dulceria Medina" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {values.map((v) => (
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
