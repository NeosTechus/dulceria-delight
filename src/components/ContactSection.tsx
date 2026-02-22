import { MapPin, Phone, Clock, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-fredoka text-foreground mb-3">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('contact.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-fiesta transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={28} className="text-primary" />
            </div>
            <h3 className="font-fredoka text-lg text-foreground mb-2">{t('contact.address')}</h3>
            <p className="text-muted-foreground text-sm">
              3515 Cherokee St<br />St. Louis, MO 63118
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-fiesta transition-shadow">
            <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={28} className="text-secondary" />
            </div>
            <h3 className="font-fredoka text-lg text-foreground mb-2">{t('contact.hours')}</h3>
            <p className="text-muted-foreground text-sm">
              Mon–Sat: 9AM – 8PM<br />Sunday: 10AM – 6PM
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-fiesta transition-shadow">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={28} className="text-accent" />
            </div>
            <h3 className="font-fredoka text-lg text-foreground mb-2">{t('contact.contact')}</h3>
            <a href="tel:+13145551234" className="text-muted-foreground text-sm hover:text-primary transition-colors block mb-2">
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
