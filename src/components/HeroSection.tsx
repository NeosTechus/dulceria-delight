import heroBg from '@/assets/hero-bg.jpg';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToNext = () => {
    document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-fiesta-dark/50 via-fiesta-dark/60 to-fiesta-dark/80" />

      {/* Floating decorations */}
      <div className="absolute top-20 left-10 text-6xl animate-float opacity-80">🪅</div>
      <div className="absolute top-40 right-16 text-5xl animate-float opacity-70" style={{ animationDelay: '2s' }}>🍬</div>
      <div className="absolute bottom-32 left-20 text-4xl animate-float opacity-60" style={{ animationDelay: '4s' }}>🌶️</div>
      <div className="absolute bottom-40 right-10 text-5xl animate-float opacity-70" style={{ animationDelay: '1s' }}>🎉</div>
      <div className="absolute top-1/3 left-1/4 text-3xl animate-float opacity-40" style={{ animationDelay: '3s' }}>🍭</div>
      <div className="absolute top-1/4 right-1/3 text-4xl animate-float opacity-50" style={{ animationDelay: '5s' }}>🎊</div>

      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
        <span className="inline-block bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground/90 text-sm font-bold px-4 py-1.5 rounded-full border border-primary-foreground/20 mb-6">
          {t('hero.location')}
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-fredoka text-primary-foreground mb-4 drop-shadow-lg">
          Dulceria Medina
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 font-nunito font-semibold mb-2">
          {t('hero.subtitle')}
        </p>
        <p className="text-lg text-primary-foreground/70 font-nunito mb-10 max-w-xl mx-auto">
          {t('hero.desc')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/menu"
            className="bg-gradient-fiesta text-primary-foreground font-bold text-lg px-8 py-4 rounded-full shadow-fiesta hover:scale-105 transition-transform"
          >
            {t('hero.orderNow')}
          </Link>
          <Link
            to="/candy-shop"
            className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground font-bold text-lg px-8 py-4 rounded-full border-2 border-primary-foreground/30 hover:bg-primary-foreground/30 transition-colors"
          >
            {t('hero.exploreCandyShop')}
          </Link>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/80 animate-bounce-gentle"
      >
        <ChevronDown size={36} />
      </button>
    </section>
  );
};

export default HeroSection;
