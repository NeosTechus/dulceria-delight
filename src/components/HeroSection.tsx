import kitchenImg from '@/assets/kitchen-counter.jpg';
import heroBg from '@/assets/hero-bg.jpg';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${kitchenImg})` }}
      />
      <div className="absolute inset-0 bg-fiesta-dark/60" />

      {/* Floating decorations */}
      <div className="absolute top-20 left-10 text-6xl animate-float opacity-80">🪅</div>
      <div className="absolute top-40 right-16 text-5xl animate-float opacity-70" style={{ animationDelay: '2s' }}>🍬</div>
      <div className="absolute bottom-32 left-20 text-4xl animate-float opacity-60" style={{ animationDelay: '4s' }}>🌶️</div>
      <div className="absolute bottom-40 right-10 text-5xl animate-float opacity-70" style={{ animationDelay: '1s' }}>🎉</div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-fredoka text-primary-foreground mb-4 drop-shadow-lg">
          Dulceria Medina
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 font-nunito font-semibold mb-2">
          🇲🇽 Mexican Candy • Piñatas • Fresh Kitchen
        </p>
        <p className="text-lg text-primary-foreground/70 font-nunito mb-10">
          St. Louis's favorite spot for authentic Mexican treats & flavors
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('menu')}
            className="bg-gradient-fiesta text-primary-foreground font-bold text-lg px-8 py-4 rounded-full shadow-fiesta hover:scale-105 transition-transform"
          >
            🍽️ Order Now
          </button>
          <button
            onClick={() => scrollTo('candy')}
            className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground font-bold text-lg px-8 py-4 rounded-full border-2 border-primary-foreground/30 hover:bg-primary-foreground/30 transition-colors"
          >
            🪅 Explore Candy Shop
          </button>
        </div>
      </div>

      <button
        onClick={() => scrollTo('candy')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/80 animate-bounce-gentle"
      >
        <ChevronDown size={36} />
      </button>
    </section>
  );
};

export default HeroSection;
