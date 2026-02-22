import { Link } from 'react-router-dom';
import { Candy, UtensilsCrossed, PartyPopper, Star, ArrowRight, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import store3 from '@/assets/store/store-3.jpg';
import store6 from '@/assets/store/store-6.jpg';
import store11 from '@/assets/store/store-11.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className={className}>
      {isInView ? children : <div style={{ opacity: 0 }}>{children}</div>}
    </div>
  );
}

const LandingHighlights = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Candy, title: t('highlights.candy.title'), desc: t('highlights.candy.desc'), gradient: 'from-fiesta-pink/20 to-fiesta-pink/5', iconBg: 'bg-fiesta-pink/15 text-fiesta-pink', link: '/candy-shop' },
    { icon: UtensilsCrossed, title: t('highlights.kitchen.title'), desc: t('highlights.kitchen.desc'), gradient: 'from-fiesta-orange/20 to-fiesta-orange/5', iconBg: 'bg-fiesta-orange/15 text-fiesta-orange', link: '/menu' },
    { icon: PartyPopper, title: t('highlights.party.title'), desc: t('highlights.party.desc'), gradient: 'from-fiesta-turquoise/20 to-fiesta-turquoise/5', iconBg: 'bg-fiesta-turquoise/15 text-fiesta-turquoise', link: '/candy-shop' },
  ];

  const featuredPhotos = [
    { src: store3, label: t('featured.pinata'), link: '/candy-shop' },
    { src: store11, label: t('featured.juice'), link: '/menu' },
    { src: store6, label: t('featured.crafts'), link: '/about' },
  ];

  const testimonials = [
    { text: t('testimonials.1'), author: 'Maria G.', stars: 5 },
    { text: t('testimonials.2'), author: 'Carlos R.', stars: 5 },
    { text: t('testimonials.3'), author: 'Ana P.', stars: 5 },
  ];

  const highlightsRef = useRef(null);
  const highlightsInView = useInView(highlightsRef, { once: true, margin: '-80px' });

  const photosRef = useRef(null);
  const photosInView = useInView(photosRef, { once: true, margin: '-80px' });

  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-80px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* Highlights */}
      <section id="highlights" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-fiesta-pink/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-fiesta-turquoise/5 rounded-full blur-[80px]" />
        
        <div className="container mx-auto px-4 relative" ref={highlightsRef}>
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={highlightsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block text-sm font-extrabold text-secondary uppercase tracking-[0.2em] mb-4">
              {t('highlights.subtitle')}
            </span>
            <h2 className="text-4xl md:text-6xl font-fredoka text-foreground mb-4">{t('highlights.title')}</h2>
            <div className="w-24 h-1 bg-gradient-fiesta mx-auto rounded-full mb-5" />
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t('highlights.desc')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial="hidden"
                animate={highlightsInView ? 'visible' : 'hidden'}
                variants={scaleIn}
                custom={i + 1}
              >
                <Link
                  to={h.link}
                  className={`group relative block bg-gradient-to-br ${h.gradient} rounded-3xl p-8 text-center hover:shadow-fiesta-lg hover:-translate-y-3 transition-all duration-500 border border-border/50`}
                >
                  <div className={`w-20 h-20 rounded-3xl ${h.iconBg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <h.icon size={36} />
                  </div>
                  <h3 className="font-fredoka text-2xl text-foreground mb-3">{h.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{h.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all duration-300">
                    {t('highlights.explore')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Photos */}
      <section className="py-24 bg-muted/30 relative papel-picado">
        <div className="container mx-auto px-4" ref={photosRef}>
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={photosInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block text-sm font-extrabold text-accent uppercase tracking-[0.2em] mb-4">{t('featured.subtitle')}</span>
            <h2 className="text-4xl md:text-6xl font-fredoka text-foreground mb-4">{t('featured.title')}</h2>
            <div className="w-24 h-1 bg-gradient-fiesta-alt mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredPhotos.map((photo, i) => (
              <motion.div
                key={photo.label}
                initial="hidden"
                animate={photosInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
                <Link
                  to={photo.link}
                  className="group relative block overflow-hidden rounded-3xl aspect-[3/4] shadow-elevated hover:shadow-fiesta-lg transition-all duration-500"
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fiesta-dark/90 via-fiesta-dark/30 to-transparent group-hover:via-fiesta-dark/40 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <h3 className="font-fredoka text-2xl text-primary-foreground mb-2 drop-shadow-lg">{photo.label}</h3>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-foreground/60 group-hover:text-primary-foreground group-hover:gap-3 transition-all duration-300">
                      {t('featured.viewMore')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fiesta-yellow/5 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative" ref={testimonialsRef}>
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block text-sm font-extrabold text-fiesta-pink uppercase tracking-[0.2em] mb-4">{t('testimonials.subtitle')}</span>
            <h2 className="text-4xl md:text-6xl font-fredoka text-foreground mb-4">{t('testimonials.title')}</h2>
            <div className="w-24 h-1 bg-gradient-fiesta mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((review, i) => (
              <motion.div
                key={i}
                className="relative bg-card rounded-3xl border border-border/50 p-8 hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500"
                initial="hidden"
                animate={testimonialsInView ? 'visible' : 'hidden'}
                variants={scaleIn}
                custom={i + 1}
              >
                <Quote size={32} className="text-fiesta-pink/20 mb-4" />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} size={18} className="fill-fiesta-yellow text-fiesta-yellow drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed text-lg">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-fiesta flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <p className="font-fredoka text-foreground">{review.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-fiesta relative overflow-hidden" ref={ctaRef}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-50" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-[60px]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-[60px]" />
        
        <motion.div
          className="container mx-auto px-4 text-center relative"
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="text-4xl md:text-5xl font-fredoka text-primary-foreground mb-5 drop-shadow-lg">{t('cta.title')}</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-lg mx-auto text-lg">{t('cta.desc')}</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/menu"
              className="inline-block bg-primary-foreground text-foreground font-bold text-lg px-10 py-5 rounded-full shadow-[0_8px_30px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_-5px_rgba(255,255,255,0.4)] transition-shadow duration-300"
            >
              {t('cta.button')}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default LandingHighlights;
