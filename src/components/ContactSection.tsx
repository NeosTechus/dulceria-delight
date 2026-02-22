import { MapPin, Phone, Clock, Facebook, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-fiesta-pink/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-fredoka text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-fiesta mx-auto rounded-full mb-5" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('contact.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="group bg-gradient-to-br from-fiesta-pink/10 to-transparent rounded-3xl border border-border/50 p-8 text-center hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500 scroll-reveal scroll-reveal-delay-1">
            <div className="w-16 h-16 bg-fiesta-pink/15 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <MapPin size={30} className="text-fiesta-pink" />
            </div>
            <h3 className="font-fredoka text-xl text-foreground mb-3">{t('contact.address')}</h3>
            <p className="text-muted-foreground">
              3515 Cherokee St<br />St. Louis, MO 63118
            </p>
          </div>

          <div className="group bg-gradient-to-br from-fiesta-orange/10 to-transparent rounded-3xl border border-border/50 p-8 text-center hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500 scroll-reveal scroll-reveal-delay-2">
            <div className="w-16 h-16 bg-fiesta-orange/15 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <Clock size={30} className="text-fiesta-orange" />
            </div>
            <h3 className="font-fredoka text-xl text-foreground mb-3">{t('contact.hours')}</h3>
            <p className="text-muted-foreground">
              Mon–Sat: 9AM – 8PM<br />Sunday: 10AM – 6PM
            </p>
          </div>

          <div className="group bg-gradient-to-br from-fiesta-turquoise/10 to-transparent rounded-3xl border border-border/50 p-8 text-center hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500 scroll-reveal scroll-reveal-delay-3">
            <div className="w-16 h-16 bg-fiesta-turquoise/15 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <Phone size={30} className="text-fiesta-turquoise" />
            </div>
            <h3 className="font-fredoka text-xl text-foreground mb-3">{t('contact.contact')}</h3>
            <a href="tel:+13145551234" className="text-muted-foreground hover:text-primary transition-colors block mb-3">
              (314) 555-1234
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80 transition-opacity"
            >
              <Facebook size={16} /> {t('contact.followFacebook')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
