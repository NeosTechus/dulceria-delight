export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'jugos' | 'tortas' | 'snacks' | 'candy';
  emoji?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'jugos' | 'tortas' | 'snacks';
  emoji: string;
}

export const menuItems: MenuItem[] = [
  // Jugos Naturales
  { id: 'j1', name: 'Jugo de Naranja', description: 'Freshly squeezed orange juice', price: 5.99, category: 'jugos', emoji: '🍊' },
  { id: 'j2', name: 'Jugo Verde', description: 'Green juice with spinach, celery & lime', price: 6.99, category: 'jugos', emoji: '🥬' },
  { id: 'j3', name: 'Agua de Horchata', description: 'Classic cinnamon rice drink', price: 4.99, category: 'jugos', emoji: '🥛' },
  { id: 'j4', name: 'Licuado de Fresa', description: 'Strawberry smoothie with milk', price: 6.49, category: 'jugos', emoji: '🍓' },
  { id: 'j5', name: 'Agua de Jamaica', description: 'Hibiscus flower iced tea', price: 4.49, category: 'jugos', emoji: '🌺' },
  { id: 'j6', name: 'Mango con Chile', description: 'Mango juice with chili & lime', price: 5.99, category: 'jugos', emoji: '🥭' },

  // Tortas
  { id: 't1', name: 'Torta de Jamón', description: 'Ham, cheese, lettuce, tomato & avocado', price: 8.99, category: 'tortas', emoji: '🥪' },
  { id: 't2', name: 'Torta de Milanesa', description: 'Breaded beef cutlet with all the fixings', price: 10.99, category: 'tortas', emoji: '🥩' },
  { id: 't3', name: 'Torta Cubana', description: 'The works: ham, chorizo, milanesa & cheese', price: 12.99, category: 'tortas', emoji: '🔥' },
  { id: 't4', name: 'Torta de Carnitas', description: 'Slow-cooked pulled pork', price: 10.49, category: 'tortas', emoji: '🐷' },
  { id: 't5', name: 'Torta de Pollo', description: 'Grilled chicken with jalapeños', price: 9.99, category: 'tortas', emoji: '🍗' },

  // Snacks
  { id: 's1', name: 'Elote en Vaso', description: 'Corn in a cup with mayo, cheese & chili', price: 5.49, category: 'snacks', emoji: '🌽' },
  { id: 's2', name: 'Tostilocos', description: 'Tostitos with cucumber, jicama & chamoy', price: 6.99, category: 'snacks', emoji: '🥒' },
  { id: 's3', name: 'Fruta con Chile', description: 'Fresh fruit with chili, lime & salt', price: 5.99, category: 'snacks', emoji: '🍉' },
  { id: 's4', name: 'Nachos con Queso', description: 'Loaded nachos with cheese & jalapeños', price: 7.49, category: 'snacks', emoji: '🧀' },
  { id: 's5', name: 'Churros', description: 'Crispy cinnamon sugar churros', price: 4.99, category: 'snacks', emoji: '🍩' },
  { id: 's6', name: 'Test Item $90', description: 'For testing delivery minimum', price: 90.00, category: 'snacks', emoji: '🧪' },
];

export interface CandyItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  tag: string;
  image?: string;
}

export const candyItems: CandyItem[] = [
  { id: 'c1', name: 'Mazapán', description: 'Classic peanut candy that crumbles perfectly', price: 2.49, emoji: '🥜', tag: 'Best Seller' },
  { id: 'c2', name: 'Pulparindo', description: 'Tamarind candy with chili — sweet & spicy!', price: 1.99, emoji: '🌶️', tag: 'Spicy' },
  { id: 'c3', name: 'Lucas Muecas', description: 'Lollipop with chili powder dip', price: 2.29, emoji: '🍭', tag: 'Fun' },
  { id: 'c4', name: 'Obleas', description: 'Wafer sandwich with cajeta filling', price: 3.49, emoji: '🧇', tag: 'Sweet' },
  { id: 'c5', name: 'Pelon Pelo Rico', description: 'Tamarind push-up candy with chili', price: 2.49, emoji: '🍬', tag: 'Classic' },
  { id: 'c6', name: 'Duvalin', description: 'Creamy hazelnut and vanilla treat', price: 1.79, emoji: '🍫', tag: 'Creamy' },
  { id: 'c7', name: 'Piñatas', description: 'Handmade piñatas for every occasion', price: 24.99, emoji: '🪅', tag: 'Party' },
  { id: 'c8', name: 'Vero Mango', description: 'Mango-flavored lollipop with chili', price: 1.99, emoji: '🥭', tag: 'Tangy' },
];
