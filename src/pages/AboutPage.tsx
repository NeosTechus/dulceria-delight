import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Users, Store } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import store2 from '@/assets/store/store-2.jpg';
import store6 from '@/assets/store/store-6.jpg';
import store8 from '@/assets/store/store-8.jpg';
import store3 from '@/assets/store/store-3.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const AboutPage = () => {
  const { t } = useLanguage();
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });

  const values = [
    { icon: Store, emoji: '🇲🇽', title: t('about.authentic'), desc: t('about.authenticDesc'), gradient: 'from-fiesta-pink/15 to-transparent', iconColor: 'text-fiesta-pink bg-fiesta-pink/15' },
    { icon: Heart, emoji: '👨‍👩‍👧‍👦', title: t('about.family'), desc: t('about.familyDesc'), gradient: 'from-fiesta-orange/15 to-transparent', iconColor: 'text-fiesta-orange bg-fiesta-orange/15' },
    { icon: Users, emoji: '🏘️', title: t('about.community'), desc: t('about.communityDesc'), gradient: 'from-fiesta-turquoise/15 to-transparent', iconColor: 'text-fiesta-turquoise bg-fiesta-turquoise/15' },
  ];

  const { cartCount, setCartOpen } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${store2})` }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fiesta-dark/40 via-fiesta-dark/60 to-fiesta-dark/85" />
        <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-fiesta-pink/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-fiesta-turquoise/15 rounded-full blur-[80px]" />
        
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-fredoka text-primary-foreground mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {t('about.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 font-nunito max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fiesta-yellow/5 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 max-w-5xl relative">
          <div className="grid md:grid-cols-2 gap-14 items-center mb-20" ref={storyRef}>
            <motion.div initial="hidden" animate={storyInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0}>
              <span className="inline-block text-sm font-extrabold text-secondary uppercase tracking-[0.2em] mb-4">
                {t('about.storyTitle')}
              </span>
              <h2 className="text-3xl md:text-4xl font-fredoka text-foreground mb-6">{t('about.storyTitle')}</h2>
              <div className="w-16 h-1 bg-gradient-fiesta rounded-full mb-6" />
              <p className="text-muted-foreground mb-5 leading-relaxed text-lg">{t('about.story1')}</p>
              <p className="text-muted-foreground leading-relaxed text-lg">{t('about.story2')}</p>
            </motion.div>
            <motion.div initial="hidden" animate={storyInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-fiesta-lg">
                  <img src={store6} alt="Mexican crafts at Dulceria Medina" className="w-full h-full object-cover" />
                </div>
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden shadow-elevated border-4 border-background hidden md:block"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={storyInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <img src={store3} alt="Piñatas" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20" ref={valuesRef}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className={`group bg-gradient-to-br ${v.gradient} rounded-3xl border border-border/50 p-8 text-center hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500`}
                initial="hidden"
                animate={valuesInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className={`w-16 h-16 ${v.iconColor} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <v.icon size={30} />
                </div>
                <h3 className="font-fredoka text-xl text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Full-width photo */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-fiesta-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <img src={store8} alt="Piñatas at Dulceria Medina" className="w-full h-72 md:h-96 object-cover" />
          </motion.div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
