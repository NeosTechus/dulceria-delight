import heroBg from '@/assets/hero-bg.jpg';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const floatingEmojis = [
  { emoji: '🪅', className: 'top-20 left-[8%] text-6xl', delay: 0 },
  { emoji: '🍬', className: 'top-32 right-[12%] text-5xl', delay: 2 },
  { emoji: '🌶️', className: 'bottom-32 left-[15%] text-4xl', delay: 4 },
  { emoji: '🎉', className: 'bottom-40 right-[8%] text-5xl', delay: 1 },
  { emoji: '🍭', className: 'top-[35%] left-[25%] text-3xl', delay: 3 },
  { emoji: '🎊', className: 'top-[25%] right-[30%] text-4xl', delay: 5 },
];

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToNext = () => {
    document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[120px]">
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-fiesta-dark/40 via-fiesta-dark/55 to-fiesta-dark/85" />
      
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-fiesta-pink/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fiesta-orange/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fiesta-turquoise/10 rounded-full blur-[120px]" />

      {floatingEmojis.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.className} drop-shadow-lg`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: [0, 0.8, 0.6, 0.8], y: [30, -10, -5, -10] }}
          transition={{ duration: 6, delay: item.delay * 0.3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.span
          className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md text-primary-foreground/90 text-sm font-bold px-5 py-2 rounded-full border border-primary-foreground/20 mb-8 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles size={14} className="text-fiesta-yellow" />
          {t('hero.location')}
        </motion.span>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-fredoka text-primary-foreground mb-5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.3)] leading-[0.95]"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Dulceria
          <br />
          <span className="text-gradient-fiesta drop-shadow-none">Medina</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-primary-foreground/90 font-nunito font-bold mb-3 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.p
          className="text-base md:text-lg text-primary-foreground/60 font-nunito mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {t('hero.desc')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Link
            to="/menu"
            className="group bg-gradient-fiesta text-primary-foreground font-bold text-lg px-10 py-4 rounded-full shadow-fiesta-lg hover:scale-105 hover:shadow-[0_24px_60px_-12px_hsl(330_100%_71%_/_0.4)] transition-all duration-300"
          >
            {t('hero.orderNow')}
          </Link>
          <Link
            to="/candy-shop"
            className="bg-primary-foreground/10 backdrop-blur-md text-primary-foreground font-bold text-lg px-10 py-4 rounded-full border-2 border-primary-foreground/20 hover:bg-primary-foreground/20 hover:border-primary-foreground/40 transition-all duration-300"
          >
            {t('hero.exploreCandyShop')}
          </Link>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground/90 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={40} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
};

export default HeroSection;
