import { MapPin, Phone, Clock, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const ContactSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const cards = [
    {
      icon: MapPin, color: 'fiesta-pink', title: t('contact.address'),
      content: <p className="text-muted-foreground">3515 Cherokee St<br />St. Louis, MO 63118</p>,
    },
    {
      icon: Clock, color: 'fiesta-orange', title: t('contact.hours'),
      content: <p className="text-muted-foreground">Mon–Sat: 9AM – 8PM<br />Sunday: 10AM – 6PM</p>,
    },
    {
      icon: Phone, color: 'fiesta-turquoise', title: t('contact.contact'),
      content: (
        <>
          <a href="tel:+13145551234" className="text-muted-foreground hover:text-primary transition-colors block mb-3">(314) 555-1234</a>
          <a href="https://www.facebook.com/dulceria.medina/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80 transition-opacity">
            <Facebook size={16} /> {t('contact.followFacebook')}
          </a>
        </>
      ),
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-fiesta-pink/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative" ref={ref}>
        <motion.div className="text-center mb-16" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0}>
          <h2 className="text-4xl md:text-6xl font-fredoka text-foreground mb-4">{t('contact.title')}</h2>
          <div className="w-24 h-1 bg-gradient-fiesta mx-auto rounded-full mb-5" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t('contact.desc')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`group bg-gradient-to-br from-${card.color}/10 to-transparent rounded-3xl border border-border/50 p-8 text-center hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500`}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
            >
              <div className={`w-16 h-16 bg-${card.color}/15 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <card.icon size={30} className={`text-${card.color}`} />
              </div>
              <h3 className="font-fredoka text-xl text-foreground mb-3">{card.title}</h3>
              {card.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
