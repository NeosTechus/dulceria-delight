import { Link } from 'react-router-dom';
import { Candy, UtensilsCrossed, PartyPopper, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import store3 from '@/assets/store/store-3.jpg';
import store6 from '@/assets/store/store-6.jpg';
import store11 from '@/assets/store/store-11.jpg';

const LandingHighlights = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Candy,
      title: t('highlights.candy.title'),
      desc: t('highlights.candy.desc'),
      color: 'bg-fiesta-pink/10 text-fiesta-pink',
      link: '/candy-shop',
    },
    {
      icon: UtensilsCrossed,
      title: t('highlights.kitchen.title'),
      desc: t('highlights.kitchen.desc'),
      color: 'bg-fiesta-orange/10 text-fiesta-orange',
      link: '/menu',
    },
    {
      icon: PartyPopper,
      title: t('highlights.party.title'),
      desc: t('highlights.party.desc'),
      color: 'bg-fiesta-turquoise/10 text-fiesta-turquoise',
      link: '/candy-shop',
    },
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

  return (
    <>
      {/* Highlights */}
      <section id="highlights" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-bold text-secondary uppercase tracking-wider mb-3">
              {t('highlights.subtitle')}
            </span>
            <h2 className="text-3xl md:text-5xl font-fredoka text-foreground mb-3">
              {t('highlights.title')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('highlights.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {highlights.map((h) => (
              <Link
                key={h.title}
                to={h.link}
                className="group bg-card rounded-2xl border border-border p-8 text-center hover:shadow-fiesta hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${h.color} flex items-center justify-center mx-auto mb-5`}>
                  <h.icon size={30} />
                </div>
                <h3 className="font-fredoka text-xl text-foreground mb-3">{h.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{h.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all">
                  {t('highlights.explore')} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Photos */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-3">
              {t('featured.subtitle')}
            </span>
            <h2 className="text-3xl md:text-5xl font-fredoka text-foreground mb-3">
              {t('featured.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {featuredPhotos.map((photo) => (
              <Link
                key={photo.label}
                to={photo.link}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fiesta-dark/80 via-fiesta-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-fredoka text-xl text-primary-foreground mb-1">{photo.label}</h3>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-foreground/70 group-hover:text-primary-foreground group-hover:gap-2 transition-all">
                    {t('featured.viewMore')} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-bold text-fiesta-pink uppercase tracking-wider mb-3">
              {t('testimonials.subtitle')}
            </span>
            <h2 className="text-3xl md:text-5xl font-fredoka text-foreground mb-3">
              {t('testimonials.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((review, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border p-8 hover:shadow-fiesta-orange transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} size={18} className="fill-fiesta-yellow text-fiesta-yellow" />
                  ))}
                </div>
                <p className="text-foreground mb-5 leading-relaxed italic">"{review.text}"</p>
                <p className="font-fredoka text-sm text-muted-foreground">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-fiesta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-fredoka text-primary-foreground mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            {t('cta.desc')}
          </p>
          <Link
            to="/menu"
            className="inline-block bg-primary-foreground text-foreground font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingHighlights;
