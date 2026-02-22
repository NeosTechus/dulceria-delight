import heroBg from '@/assets/hero-bg.jpg';
import { ChevronDown, Sparkles } from 'lucide-react';
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
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-fiesta-dark/40 via-fiesta-dark/55 to-fiesta-dark/85" />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-fiesta-pink/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fiesta-orange/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fiesta-turquoise/10 rounded-full blur-[120px]" />

      {/* Floating decorations */}
      <div className="absolute top-20 left-[8%] text-6xl animate-float opacity-80 drop-shadow-lg">🪅</div>
      <div className="absolute top-32 right-[12%] text-5xl animate-float opacity-70 drop-shadow-lg" style={{ animationDelay: '2s' }}>🍬</div>
      <div className="absolute bottom-32 left-[15%] text-4xl animate-float opacity-60 drop-shadow-lg" style={{ animationDelay: '4s' }}>🌶️</div>
      <div className="absolute bottom-40 right-[8%] text-5xl animate-float opacity-70 drop-shadow-lg" style={{ animationDelay: '1s' }}>🎉</div>
      <div className="absolute top-[35%] left-[25%] text-3xl animate-float opacity-30" style={{ animationDelay: '3s' }}>🍭</div>
      <div className="absolute top-[25%] right-[30%] text-4xl animate-float opacity-40" style={{ animationDelay: '5s' }}>🎊</div>

      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
        <span className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md text-primary-foreground/90 text-sm font-bold px-5 py-2 rounded-full border border-primary-foreground/20 mb-8 shadow-lg">
          <Sparkles size={14} className="text-fiesta-yellow" />
          {t('hero.location')}
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-fredoka text-primary-foreground mb-5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.3)] leading-[0.95]">
          Dulceria
          <br />
          <span className="text-gradient-fiesta drop-shadow-none">Medina</span>
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 font-nunito font-bold mb-3 tracking-wide">
          {t('hero.subtitle')}
        </p>
        <p className="text-base md:text-lg text-primary-foreground/60 font-nunito mb-12 max-w-lg mx-auto">
          {t('hero.desc')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/60 animate-bounce-gentle hover:text-primary-foreground/90 transition-colors"
      >
        <ChevronDown size={40} strokeWidth={1.5} />
      </button>
    </section>
  );
};

export default HeroSection;
