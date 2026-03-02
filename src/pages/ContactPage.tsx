import { MapPin, Phone, Clock, Facebook, Instagram, Mail, Navigation } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const ContactPage = () => {
  const { lang } = useLanguage();
  const { cart, cartCount, cartOpen, setCartOpen, updateQty, removeItem } = useCart();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const infoCards = [
    {
      icon: MapPin,
      color: 'fiesta-pink',
      title: lang === 'en' ? 'Our Location' : 'Ubicación',
      content: '2753 Cherokee St\nSt. Louis, MO 63118',
      action: {
        label: lang === 'en' ? 'Get Directions' : 'Cómo Llegar',
        href: 'https://maps.google.com/?q=2753+Cherokee+St,+St.+Louis,+MO+63118',
      },
    },
    {
      icon: Clock,
      color: 'fiesta-orange',
      title: lang === 'en' ? 'Hours' : 'Horario',
      content: lang === 'en'
        ? 'Mon – Sat: 10 AM – 8 PM\nSunday: Closed'
        : 'Lun – Sáb: 10 AM – 8 PM\nDomingo: Cerrado',
    },
    {
      icon: Phone,
      color: 'fiesta-turquoise',
      title: lang === 'en' ? 'Call Us' : 'Llámanos',
      content: '(314) 771-8648',
      action: {
        label: lang === 'en' ? 'Call Now' : 'Llamar',
        href: 'tel:+13147718648',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={() => {}}
      />

      {/* Hero */}
      <section className="pt-[140px] pb-16 bg-gradient-to-b from-fiesta-orange/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-fredoka text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {lang === 'en' ? 'Contact Us' : 'Contáctanos'}
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-gradient-fiesta mx-auto rounded-full mb-5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {lang === 'en'
              ? "We'd love to hear from you! Visit us on historic Cherokee Street."
              : '¡Nos encantaría saber de ti! Visítanos en la histórica calle Cherokee.'}
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="pb-20" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {infoCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="group bg-card rounded-3xl border border-border/50 p-8 text-center hover:shadow-fiesta-lg hover:-translate-y-2 transition-all duration-500"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i}
              >
                <div className={`w-16 h-16 bg-${card.color}/15 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <card.icon size={30} className={`text-${card.color}`} />
                </div>
                <h3 className="font-fredoka text-xl text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground whitespace-pre-line mb-4">{card.content}</p>
                {card.action && (
                  <a
                    href={card.action.href}
                    target={card.action.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80 transition-opacity"
                  >
                    <Navigation size={14} />
                    {card.action.label}
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social + Map */}
          <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-8">
            {/* Map Embed */}
            <motion.div
              className="rounded-3xl overflow-hidden border border-border/50 shadow-elevated aspect-square md:aspect-auto"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <iframe
                title="Dulceria Medina Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3117.5!2d-90.2154!3d38.5883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b4e4c1a00001%3A0x1234567890abcdef!2s2753%20Cherokee%20St%2C%20St.%20Louis%2C%20MO%2063118!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 300 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Social & Connect */}
            <motion.div
              className="bg-card rounded-3xl border border-border/50 p-8 flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-fredoka text-2xl text-foreground mb-3">
                {lang === 'en' ? 'Connect With Us' : 'Conéctate'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {lang === 'en'
                  ? 'Follow us on social media for updates, specials, and more!'
                  : '¡Síguenos en redes sociales para ofertas y novedades!'}
              </p>

              <div className="space-y-4">
                <a
                  href="https://www.facebook.com/dulceria.medina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-fiesta-pink/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Facebook size={22} className="text-fiesta-pink" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Facebook</p>
                    <p className="text-sm text-muted-foreground">@dulceria.medina</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-fiesta-orange/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram size={22} className="text-fiesta-orange" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Instagram</p>
                    <p className="text-sm text-muted-foreground">@dulceriamedina</p>
                  </div>
                </a>

                <a
                  href="mailto:info@dulceriamedina.com"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-fiesta-turquoise/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={22} className="text-fiesta-turquoise" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@dulceriamedina.com</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
