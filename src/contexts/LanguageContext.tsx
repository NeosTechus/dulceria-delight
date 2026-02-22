import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'es';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.candyShop': { en: 'Candy Shop', es: 'Dulcería' },
  'nav.readyToEat': { en: 'Ready to Eat', es: 'Listo para Comer' },
  'nav.about': { en: 'About', es: 'Nosotros' },
  'nav.order': { en: 'Order', es: 'Ordenar' },

  // Hero
  'hero.subtitle': { en: '🇲🇽 Mexican Candy • Piñatas • Fresh Kitchen', es: '🇲🇽 Dulces Mexicanos • Piñatas • Cocina Fresca' },
  'hero.desc': { en: "St. Louis's favorite spot for authentic Mexican treats & flavors", es: 'El lugar favorito de St. Louis para dulces y sabores mexicanos auténticos' },
  'hero.location': { en: '📍 Cherokee Street, St. Louis', es: '📍 Cherokee Street, St. Louis' },
  'hero.orderNow': { en: '🍽️ Order Now', es: '🍽️ Ordenar Ahora' },
  'hero.exploreCandyShop': { en: '🪅 Explore Candy Shop', es: '🪅 Explorar Dulcería' },

  // Highlights
  'highlights.subtitle': { en: 'What We Offer', es: 'Lo Que Ofrecemos' },
  'highlights.title': { en: 'Everything Under One Roof', es: 'Todo Bajo Un Mismo Techo' },
  'highlights.desc': { en: 'From sweet treats to savory bites — your one-stop shop for all things Mexican.', es: 'De dulces a antojitos — tu tienda para todo lo mexicano.' },
  'highlights.candy.title': { en: 'Authentic Candy', es: 'Dulces Auténticos' },
  'highlights.candy.desc': { en: 'Hundreds of imported Mexican candies — Mazapán, Pulparindo, Lucas & more.', es: 'Cientos de dulces mexicanos importados — Mazapán, Pulparindo, Lucas y más.' },
  'highlights.kitchen.title': { en: 'Fresh Kitchen', es: 'Cocina Fresca' },
  'highlights.kitchen.desc': { en: 'Made-to-order tortas, jugos naturales & street snacks every day.', es: 'Tortas, jugos naturales y antojitos hechos al momento todos los días.' },
  'highlights.party.title': { en: 'Piñatas & Party', es: 'Piñatas y Fiesta' },
  'highlights.party.desc': { en: 'Handmade piñatas, party supplies & decorations for every celebration.', es: 'Piñatas hechas a mano, artículos y decoraciones para toda celebración.' },
  'highlights.explore': { en: 'Explore', es: 'Explorar' },

  // Featured Photos
  'featured.subtitle': { en: 'Come Visit Us', es: 'Visítanos' },
  'featured.title': { en: 'A Taste of the Experience', es: 'Una Probadita de la Experiencia' },
  'featured.viewMore': { en: 'View more', es: 'Ver más' },
  'featured.pinata': { en: 'Piñata Paradise', es: 'Paraíso de Piñatas' },
  'featured.juice': { en: 'Fresh Juice Counter', es: 'Barra de Jugos Frescos' },
  'featured.crafts': { en: 'Mexican Crafts', es: 'Artesanías Mexicanas' },

  // Testimonials
  'testimonials.subtitle': { en: 'Customer Love', es: 'Amor de Clientes' },
  'testimonials.title': { en: 'What Our Community Says', es: 'Lo Que Dice Nuestra Comunidad' },
  'testimonials.1': { en: 'Best Mexican candy store in all of St. Louis! The tortas are amazing too.', es: '¡La mejor dulcería mexicana en todo St. Louis! Las tortas también son increíbles.' },
  'testimonials.2': { en: 'My kids love picking out piñatas here. The staff is always so friendly!', es: '¡A mis hijos les encanta escoger piñatas aquí. El personal siempre es muy amable!' },
  'testimonials.3': { en: 'The jugos naturales are fresh and delicious. We come here every weekend.', es: 'Los jugos naturales son frescos y deliciosos. Venimos todos los fines de semana.' },

  // CTA
  'cta.title': { en: 'Ready to Order? 🌮', es: '¿Listo para Ordenar? 🌮' },
  'cta.desc': { en: 'Fresh tortas, natural juices & street snacks — made to order for pickup.', es: 'Tortas frescas, jugos naturales y antojitos — hechos al momento para recoger.' },
  'cta.button': { en: '🍽️ View Menu & Order', es: '🍽️ Ver Menú y Ordenar' },

  // Contact
  'contact.title': { en: '📍 Visit Us', es: '📍 Visítanos' },
  'contact.desc': { en: 'Come experience the full Dulceria Medina magic in person!', es: '¡Ven a vivir toda la magia de Dulceria Medina en persona!' },
  'contact.address': { en: 'Address', es: 'Dirección' },
  'contact.hours': { en: 'Hours', es: 'Horario' },
  'contact.contact': { en: 'Contact', es: 'Contacto' },
  'contact.followFacebook': { en: 'Follow us on Facebook', es: 'Síguenos en Facebook' },

  // Candy Shop
  'candy.title': { en: '🪅 Candy Shop & Piñatas', es: '🪅 Dulcería y Piñatas' },
  'candy.desc': { en: 'Discover hundreds of authentic Mexican candies, party supplies, and handmade piñatas. Come visit us in store!', es: '¡Descubre cientos de dulces mexicanos auténticos, artículos de fiesta y piñatas hechas a mano. Visítanos en la tienda!' },
  'candy.viewInStore': { en: 'View in Store', es: 'Ver en Tienda' },
  'candy.insideStore': { en: 'Inside Our Store', es: 'Dentro de Nuestra Tienda' },
  'candy.visitUs': { en: '📍 Visit Us for the Full Selection!', es: '📍 ¡Visítanos para Ver Todo!' },
  'candy.visitDesc': { en: '100s more candies, piñatas & party supplies in store', es: 'Cientos de dulces, piñatas y artículos de fiesta más en la tienda' },
  'candy.all': { en: 'All', es: 'Todos' },

  // Restaurant Menu
  'menu.title': { en: '🍽️ Fresh Kitchen Menu', es: '🍽️ Menú de Cocina Fresca' },
  'menu.desc': { en: 'Made fresh daily — order online for pickup!', es: '¡Hecho fresco todos los días — ordena en línea para recoger!' },
  'menu.addToOrder': { en: 'Add to Order', es: 'Agregar al Pedido' },
  'menu.jugos.label': { en: '🍊 Jugos Naturales', es: '🍊 Jugos Naturales' },
  'menu.jugos.desc': { en: 'Fresh-squeezed juices & aguas frescas', es: 'Jugos frescos y aguas frescas' },
  'menu.tortas.label': { en: '🥪 Tortas', es: '🥪 Tortas' },
  'menu.tortas.desc': { en: 'Authentic Mexican sandwiches', es: 'Tortas mexicanas auténticas' },
  'menu.snacks.label': { en: '🌽 Snacks', es: '🌽 Antojitos' },
  'menu.snacks.desc': { en: 'Street-style bites & treats', es: 'Antojitos y botanas callejeras' },

  // Cart
  'cart.title': { en: '🛒 Your Order', es: '🛒 Tu Pedido' },
  'cart.empty': { en: 'Your cart is empty', es: 'Tu carrito está vacío' },
  'cart.addItems': { en: 'Add items from the menu!', es: '¡Agrega artículos del menú!' },
  'cart.total': { en: 'Total', es: 'Total' },
  'cart.checkout': { en: 'Proceed to Checkout', es: 'Proceder al Pago' },

  // Payment
  'pay.checkout': { en: 'Checkout', es: 'Pagar' },
  'pay.summary': { en: 'Order Summary', es: 'Resumen del Pedido' },
  'pay.subtotal': { en: 'Subtotal', es: 'Subtotal' },
  'pay.tax': { en: 'Tax', es: 'Impuesto' },
  'pay.name': { en: 'Name', es: 'Nombre' },
  'pay.namePlaceholder': { en: 'Your full name', es: 'Tu nombre completo' },
  'pay.phone': { en: 'Phone', es: 'Teléfono' },
  'pay.cardNumber': { en: 'Card Number', es: 'Número de Tarjeta' },
  'pay.expiry': { en: 'Expiry', es: 'Vencimiento' },
  'pay.thanks': { en: 'Your order has been placed. We\'ll have it ready for pickup!', es: '¡Tu pedido ha sido realizado. Lo tendremos listo para recoger!' },
  'pay.demo': { en: '🔒 Demo only — no real payment processed', es: '🔒 Solo demostración — no se procesa pago real' },

  // About
  'about.title': { en: '🪅 About Us', es: '🪅 Sobre Nosotros' },
  'about.subtitle': { en: 'Bringing authentic Mexican flavors & culture to St. Louis', es: 'Trayendo sabores y cultura mexicana auténtica a St. Louis' },
  'about.storyTitle': { en: 'Our Story', es: 'Nuestra Historia' },
  'about.story1': { en: 'Dulceria Medina started as a family dream — to bring the vibrant flavors and traditions of Mexico right to the heart of St. Louis. Located on Cherokee Street, we\'ve become a beloved neighborhood destination for authentic Mexican candy, handmade piñatas, and freshly prepared food.', es: 'Dulceria Medina comenzó como un sueño familiar — traer los sabores vibrantes y tradiciones de México al corazón de St. Louis. Ubicados en Cherokee Street, nos hemos convertido en un destino querido del vecindario para dulces mexicanos auténticos, piñatas hechas a mano y comida recién preparada.' },
  'about.story2': { en: 'From the sweet crumble of a Mazapán to the tangy kick of a Pulparindo, every item in our shop is carefully selected to bring a taste of home to our community. Our kitchen serves up fresh jugos, tortas, and street snacks made with love every single day.', es: 'Desde el dulce desmoronarse de un Mazapán hasta el toque picante de un Pulparindo, cada artículo en nuestra tienda es cuidadosamente seleccionado para traer un sabor de hogar a nuestra comunidad. Nuestra cocina sirve jugos frescos, tortas y antojitos hechos con amor todos los días.' },
  'about.authentic': { en: 'Authentic', es: 'Auténtico' },
  'about.authenticDesc': { en: 'Real Mexican products sourced directly from trusted suppliers', es: 'Productos mexicanos reales de proveedores de confianza' },
  'about.family': { en: 'Family-Owned', es: 'Negocio Familiar' },
  'about.familyDesc': { en: 'Operated with love and pride by the Medina family', es: 'Operado con amor y orgullo por la familia Medina' },
  'about.community': { en: 'Community', es: 'Comunidad' },
  'about.communityDesc': { en: 'A Cherokee Street staple serving our neighbors since day one', es: 'Un pilar de Cherokee Street sirviendo a nuestros vecinos desde el primer día' },

  // Footer
  'footer.madeWith': { en: 'Made with ❤️ and lots of chamoy', es: 'Hecho con ❤️ y mucho chamoy' },

  // Store photo labels
  'store.juiceCounter': { en: 'Juice & Food Counter', es: 'Barra de Jugos y Comida' },
  'store.candyCounter': { en: 'Candy Counter', es: 'Mostrador de Dulces' },
  'store.pinataAisle': { en: 'Piñata Aisle', es: 'Pasillo de Piñatas' },
  'store.partySupplies': { en: 'Party Supplies', es: 'Artículos de Fiesta' },
  'store.mexicanCrafts': { en: 'Mexican Crafts', es: 'Artesanías Mexicanas' },
  'store.pinatasGalore': { en: 'Piñatas Galore', es: 'Piñatas a Montón' },
  'store.snackAisle': { en: 'Snack Aisle', es: 'Pasillo de Botanas' },
  'store.religiousItems': { en: 'Religious Items', es: 'Artículos Religiosos' },
  'store.miniCollectibles': { en: 'Mini Collectibles', es: 'Mini Coleccionables' },
  'store.freshDesserts': { en: 'Fresh Desserts', es: 'Postres Frescos' },
  'store.storeOverview': { en: 'Store Overview', es: 'Vista de la Tienda' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'es' : 'en'));

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
