export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'bebidas' | 'antojitos' | 'helados' | 'candy';
  emoji?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'bebidas' | 'antojitos' | 'helados';
  emoji: string;
}

export const menuItems: MenuItem[] = [
  // Bebidas (Drinks)
  { id: 'b1', name: 'Mangonada', description: 'Mango sorbet blended with chamoy, fresh mango chunks, lime & tajín', price: 7.99, category: 'bebidas', emoji: '🥭' },
  { id: 'b2', name: 'Agua de Horchata', description: 'Classic cinnamon rice drink — refreshing & creamy', price: 4.99, category: 'bebidas', emoji: '🥛' },
  { id: 'b3', name: 'Agua de Jamaica', description: 'Hibiscus flower iced tea — sweet & tangy', price: 4.49, category: 'bebidas', emoji: '🌺' },
  { id: 'b4', name: 'Jugo de Naranja', description: 'Freshly squeezed orange juice', price: 5.99, category: 'bebidas', emoji: '🍊' },
  { id: 'b5', name: 'Licuado de Fresa', description: 'Strawberry smoothie blended with milk', price: 6.49, category: 'bebidas', emoji: '🍓' },
  { id: 'b6', name: 'Mango con Chile', description: 'Fresh mango juice with chili & lime', price: 5.99, category: 'bebidas', emoji: '🌶️' },

  // Antojitos (Kitchen Prepared Items)
  { id: 'a1', name: 'Papas Locas', description: 'Fries loaded with repollo, mayonesa, jitomate, cueritos, jamón, elote y queso', price: 8.99, category: 'antojitos', emoji: '🍟' },
  { id: 'a2', name: 'Chicharrón Preparado', description: 'Crispy chicharrón topped with mayonesa, repollo, jitomate, cueritos, aguacate y jamón', price: 7.99, category: 'antojitos', emoji: '🫓' },
  { id: 'a3', name: 'Elote en Vaso', description: 'Corn in a cup with mayo, cotija cheese, chili & lime', price: 5.49, category: 'antojitos', emoji: '🌽' },
  { id: 'a4', name: 'Tostilocos', description: 'Tostitos with cucumber, jicama, chamoy & Japanese peanuts', price: 6.99, category: 'antojitos', emoji: '🥒' },
  { id: 'a5', name: 'Fruta con Chile', description: 'Fresh cut fruit with chili, lime & chamoy', price: 5.99, category: 'antojitos', emoji: '🍉' },
  { id: 'a6', name: 'Nachos con Queso', description: 'Loaded nachos with melted cheese & jalapeños', price: 7.49, category: 'antojitos', emoji: '🧀' },

  // Helados (Frozen Treats)
  { id: 'h1', name: 'Paleta de Fresa', description: 'Strawberry ice cream bar — La Michoacana style', price: 3.49, category: 'helados', emoji: '🍓' },
  { id: 'h2', name: 'Paleta de Mango Chile', description: 'Mango ice cream bar with chili — spicy & sweet', price: 3.49, category: 'helados', emoji: '🥭' },
  { id: 'h3', name: 'Paleta de Coco', description: 'Coconut cream ice cream bar', price: 3.49, category: 'helados', emoji: '🥥' },
  { id: 'h4', name: 'Paleta de Limón', description: 'Lime sorbet popsicle — refreshing & tangy', price: 3.49, category: 'helados', emoji: '🍋' },
  { id: 'h5', name: 'Paleta de Arroz con Leche', description: 'Rice pudding flavored ice cream bar', price: 3.49, category: 'helados', emoji: '🍚' },
  { id: 'h6', name: 'Paleta de Chocolate', description: 'Rich chocolate ice cream bar', price: 3.49, category: 'helados', emoji: '🍫' },
];

export interface CandyVariant {
  label: string;
  price: number;
}

export interface CandyItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  tag: string;
  image?: string;
  variants?: CandyVariant[];
}

export const candyItems: CandyItem[] = [
  // Beverages
  { id: 'c1', name: 'Coronado Rompope Vanilla (1 liter)', description: 'Beverages', price: 0, emoji: '🧃', tag: 'Beverages' },
  { id: 'c2', name: 'Klass Aguas Frescas Grape Drink Mix (400g)', description: 'Beverages', price: 2.49, emoji: '🧃', tag: 'Beverages' },
  { id: 'c3', name: 'Nestlé Abuelita Hot Chocolate (6 tablets)', description: 'Beverages', price: 5.99, emoji: '🧃', tag: 'Beverages' },
  { id: 'c4', name: 'Maizena Atole Fresa', description: 'Strawberry atole mix', price: 0, emoji: '🧃', tag: 'Beverages' },
  { id: 'c5', name: 'Millville Buttermilk Pancake Mix', description: 'Complete — just add water', price: 3.25, emoji: '🧃', tag: 'Beverages' },
  { id: 'c6', name: 'Millville Original Syrup', description: 'Pancake syrup', price: 0, emoji: '🧃', tag: 'Beverages' },
  { id: 'c7', name: '3 Ballerina Herbal Tea (18 bags)', description: 'Tea', price: 6.99, emoji: '🧃', tag: 'Beverages' },
  { id: 'c8', name: 'Tadin Eucalyptus Tea / Canelita Cinnamon Tea (24 bags)', description: 'Tea', price: 4.49, emoji: '🧃', tag: 'Beverages' },
  { id: 'c9', name: 'Tadin Linden Tea / Té de Tila (24 bags)', description: 'Tea', price: 4.49, emoji: '🧃', tag: 'Beverages' },

  // Bulk Candy
  { id: 'c10', name: 'Bulk Assorted Lollipops', description: 'Mixed lollipops — sold individually', price: 0, emoji: '🪣', tag: 'Bulk Candy' },
  { id: 'c11', name: 'Bulk Chiclets / Mini Gum', description: 'Assorted mini gum pieces', price: 0, emoji: '🪣', tag: 'Bulk Candy' },

  // Candy
  { id: 'c12', name: 'Airheads', description: 'Assorted fruit taffy bars', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c13', name: 'Banderillas Coconut Candy (20 pcs, tri-color)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c14', name: 'Butter Toffee Café (13 pcs)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c15', name: 'Canel\'s Miniatura Gum (220 pcs) / Luxus Enchilados Lollipops', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c16', name: 'Cazuela Surtida — Assorted Candy in Clay Bowl (60 pc)', description: 'Candy', price: 26.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c17', name: 'Changuitocos Tamarind Candy', description: 'Candy', price: 5.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c18', name: 'Combo Piñata Assorted Candies with Chili (4.5 lb)', description: 'Candy', price: 16.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c19', name: 'Crazy Your Candy Rings Tub', description: 'Assorted candy rings', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c20', name: 'Mazapán Box', description: 'Peanut marzipan candy box', price: 0, emoji: '🥜', tag: 'Candy' },
  { id: 'c21', name: 'De la Rosa Jumbo Lollipops', description: 'Candy', price: 8.99, emoji: '🍬', tag: 'Candy' , variants: [{ label: 'Cereza', price: 8.99 }, { label: 'Surtida', price: 9.99 }] },
  { id: 'c22', name: 'De la Rosa Malvaviscos Corazón de Chocolate (marshmallow hearts)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c23', name: 'Dulces Típicos Chico Rico (tamarind candy cups)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c24', name: 'El Piñatero Candy & Gum Mix (4 lb)', description: 'Candy', price: 18.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c25', name: 'Hola Salted Apricot Chamoy Candy', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c26', name: 'Huevitos Chocolate Egg Candy', description: 'Candy', price: 7.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c27', name: 'Jarritos Gummies', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c28', name: 'Jelly Pop Fruit Jelly Jar (assorted)', description: 'Candy', price: 6.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c29', name: 'Jelly Snack Fruit Jelly Candy (20 pcs)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c30', name: 'La Vaquita Chiclosos Café (coffee caramel candy)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c31', name: 'Lucas Muecas Lollipops (assorted flavors, 10 pc)', description: 'Candy', price: 7.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c32', name: 'Lucas Skwinkles (assorted green & red packs)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c33', name: 'Mini Rockaleta Lollipops (50 pcs)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c34', name: 'Orrta Rica Tamarind Candy with Chili (12 pc)', description: 'Candy', price: 5.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c35', name: 'Paleta Limón Plus (salt & lemon lollipops)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c36', name: 'Pelón Pelo Rico Mini', description: 'Candy', price: 2.99, emoji: '🍬', tag: 'Candy' , variants: [{ label: '12 pc bag', price: 2.99 }, { label: '36 pc box', price: 11.99 }] },
  { id: 'c37', name: 'Pink candy balls (tamarind/similar)', description: 'Candy', price: 4.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c38', name: 'Pollitos Chocolate Candy (box)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c39', name: 'Productos Liz Gelatin Gum (top view, 180 pcs)', description: 'Candy', price: 8.15, emoji: '🍬', tag: 'Candy' },
  { id: 'c40', name: 'Pulparindo Tamarind Bars (Mango/Watermelon/Original/Chamoy)', description: 'Candy', price: 4.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c41', name: 'Pulparindots Watermelon (12 packets)', description: 'Candy', price: 4.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c42', name: 'Ricolino Paleta Payaso (10 pack, marshmallow/chocolate)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c43', name: 'Serpentinas Tamarind Candy', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c44', name: 'Skwinkle Candy (red sour strips)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c45', name: 'Tutsi Pop Lollipops (30 paletas)', description: 'Candy', price: 8.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c46', name: 'Zumba Pica Tiras Enchiladas (12 pc boxes)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c47', name: 'Fruti Losso Mini Barrel', description: 'Mini barrel with jelly sticks inside', price: 5.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c48', name: 'Gira Sprinkles', description: 'Straws with sweet and sour candies, 60 pcs', price: 9.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c49', name: 'Happy Time Truck', description: 'Candy-filled toy truck container', price: 10.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c50', name: 'Jelly Stick', description: 'Caramelo Líquido — liquid candy sticks, fruit flavors', price: 5.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c51', name: 'Jira Chispas', description: 'Straws with sweet and sour candies', price: 6.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c52', name: 'Assorted bulk dulces (piloncillo, coconut, jamaica, etc.)', description: 'Candy/Bulk', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c53', name: 'Candy Truck Container (assorted fruit cups)', description: 'Candy/Novelty', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c54', name: 'Small clay cup with Dulce de Tamarindo candy', description: 'Candy/Pottery', price: 5.5, emoji: '🍬', tag: 'Candy' },
  { id: 'c55', name: 'Feliz Navidad Surtido de Dulces Stocking (211g)', description: 'Candy/Seasonal', price: 2.99, emoji: '🍬', tag: 'Candy' },

  // Chamoy & Sauces
  { id: 'c56', name: 'Zumba Pica Forritos Chamoy (12.9 oz)', description: 'Candy/Chamoy', price: 3.79, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c57', name: 'Chamo Mix Dill Pickle', description: 'Chamoy Pickle — Brownsville style', price: 0, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c58', name: 'Changui Polvo Blueberry', description: 'Blueberry flavored candy powder — large bottle', price: 0, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c59', name: 'Honey (100% Pure Premium)', description: 'Pure honey bottle', price: 3.99, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c60', name: 'Onesó Dulces y Pulpas', description: 'Dulces y pulpas (candies and pulps)', price: 3.99, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c61', name: 'Pelon Chilito Rico (assorted)', description: 'Chamoy, Mango & other flavors — squeeze bottles', price: 3.99, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c62', name: 'Pulparindo Squeeze', description: 'Sweet & spicy tamarind sauce', price: 3.89, emoji: '🫙', tag: 'Chamoy & Sauces', variants: [{ label: 'Mango', price: 3.89 }, { label: 'Tamarind', price: 3.99 }] },
  { id: 'c63', name: 'Chamoy Mega Picosita (32.3 fl oz bottle)', description: 'Condiments/Chamoy', price: 2.99, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c64', name: 'La Helada Rim Dip (tamarind/chamoy for drinks)', description: 'Condiments/Chamoy', price: 0, emoji: '🫙', tag: 'Chamoy & Sauces' },

  // Chewy Candy
  { id: 'c65', name: 'Maladito with Chili', description: 'Sweet & sour chewy candy with chili — assorted fruit flavors, 100 pcs', price: 6.99, emoji: '🍬', tag: 'Chewy Candy' },
  { id: 'c66', name: 'Pelon Mini Surtido', description: 'Dulce enchilado — Sandía, Chamoy y Mango soft candy, 18 pcs', price: 5.99, emoji: '🍬', tag: 'Chewy Candy' },
  { id: 'c67', name: 'Vero Rellerindos', description: 'Tamarind flavored candy — \'I Am Feeling Fine!\', 65 pcs', price: 6.99, emoji: '🍬', tag: 'Chewy Candy' },

  // Chocolate
  { id: 'c68', name: 'Bon o Bon', description: 'Chocolate bonbon w/ wafer & cream filling', price: 0, emoji: '🍫', tag: 'Chocolate' , variants: [{ label: 'Original', price: 0 }, { label: 'Cookies & Cream', price: 6.99 }, { label: 'Strawberry', price: 6.99 }] },
  { id: 'c69', name: 'Bubu Lubu 24-pack', description: 'Ricolino — marshmallow & strawberry w/ chocolate', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c70', name: 'Canasta Sabor Rompope 50-pc', description: 'Chocolate w/ eggnog filling', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c71', name: 'Chocoretas Chocomenta', description: 'Ricolino — chocolate mint', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c72', name: 'Chutazo 20-pack', description: 'Ricolino — chocolate w/ bubblegum filling', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c73', name: 'Cremino Bicolor Avellana 24-pc', description: 'Hazelnut praline — bicolor', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c74', name: 'Cremino Blanco Avellana 24-pc', description: 'Hazelnut praline — white', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c75', name: 'Duvalín 18-pc', description: 'Ricolino — hazelnut, strawberry, vanilla cream', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c76', name: 'Ferrero Collection 12-pc', description: 'Assorted Ferrero chocolates', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c77', name: 'Ferrero Rocher', description: 'Hazelnut chocolate', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c78', name: 'Mazapán Chocolate', description: 'De la Rosa — peanut candy w/ chocolate', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c79', name: 'Mazapán Original', description: 'De la Rosa — classic peanut candy', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c80', name: 'Mini Paleta Payaso 15-pack', description: 'Ricolino', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c81', name: 'Nucita Monedas 48-pc', description: 'Chocolate flavored candy coins', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c82', name: 'Nugs Recreo', description: 'Nougat, caramel, peanut w/ chocolate', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c83', name: 'Ranita Croa!', description: 'Chocolate frog', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c84', name: 'Carlos V Stick', description: 'Chocolate con leche sticks, 20 pcs', price: 5.99, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c85', name: 'Nucita Trisabor', description: 'Creamy candy — chocolate, vanilla, strawberry, 16 pcs', price: 4.99, emoji: '🍫', tag: 'Chocolate' },

  // Cookies
  { id: 'c86', name: 'Cuétara Surtido Diario', description: 'Assorted cookies — 1 lb', price: 0, emoji: '🍪', tag: 'Cookies' },
  { id: 'c87', name: 'Gamesa Marías 8-pack', description: 'Mexico\'s #1 cookie — classic', price: 0, emoji: '🍪', tag: 'Cookies' },
  { id: 'c88', name: 'La Moderna Malvavisco 8-pack', description: 'Marshmallow cookies', price: 0, emoji: '🍪', tag: 'Cookies' },
  { id: 'c89', name: 'Bocadín Chocolate Wafer (50 piezas, 525g)', description: 'Candy/Cookies', price: 8.99, emoji: '🍪', tag: 'Cookies' },
  { id: 'c90', name: 'Sevillana Obleas (wafer cookies with milk)', description: 'Candy/Cookies', price: 0, emoji: '🍪', tag: 'Cookies' },

  // Dulces de Leche
  { id: 'c91', name: 'Deli', description: 'Milk candy — Wim, Mim, elaborados con leche 100% natural, 100 pcs', price: 5.99, emoji: '🐄', tag: 'Dulces de Leche' },
  { id: 'c92', name: 'La Vaquita Mix', description: 'Milk candy mix — Monito, La Vaquita, RicaNuez', price: 11.99, emoji: '🐄', tag: 'Dulces de Leche' },
  { id: 'c93', name: 'Montés Surtido', description: 'Assorted milk hard candy and toffees, 100 pcs', price: 6.99, emoji: '🐄', tag: 'Dulces de Leche' },
  { id: 'c94', name: 'Ate (block)', description: 'Fruit paste — traditional', price: 2.49, emoji: '🐄', tag: 'Dulces de Leche' },

  // Grocery
  { id: 'c95', name: 'Baker\'s Corner Light Brown Sugar (32 oz)', description: 'Baking', price: 2.89, emoji: '🛒', tag: 'Grocery' },
  { id: 'c96', name: 'Molina Mexican Vanilla Blend (250 ml)', description: 'Baking', price: 2.99, emoji: '🛒', tag: 'Grocery' },
  { id: 'c97', name: 'Rolled Oats Quick Cook (42 oz)', description: 'Breakfast/Grains', price: 6.39, emoji: '🛒', tag: 'Grocery' },
  { id: 'c98', name: 'Nestlé Carnation Evaporated Milk', description: 'Canned Dairy', price: 1.79, emoji: '🛒', tag: 'Grocery' },
  { id: 'c99', name: 'Nestlé La Lechera Original (375g)', description: 'Canned Dairy', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c100', name: 'Nestlé Pastel Sweetened Condensed Milk', description: 'Canned Dairy', price: 3.39, emoji: '🛒', tag: 'Grocery' },
  { id: 'c101', name: 'La Costeña Sliced Jalapeños / La Morena Whole Pickled Jalapeños', description: 'Canned Goods', price: 2.89, emoji: '🛒', tag: 'Grocery' },
  { id: 'c102', name: 'Aunt Jemima Original Syrup (24 fl oz)', description: 'Condiments', price: 5.69, emoji: '🛒', tag: 'Grocery' },
  { id: 'c103', name: 'Coronado Caramel Topping Cinnamon (1 lb 7.28 oz)', description: 'Condiments/Toppings', price: 7.99, emoji: '🛒', tag: 'Grocery' },
  { id: 'c104', name: 'Dried Hibiscus Flowers (Flor de Jamaica)', description: 'Dried Goods/Beverages', price: 4.99, emoji: '🛒', tag: 'Grocery' },
  { id: 'c105', name: 'Canned Goods & Salsas', description: 'Various Mexican brands — shelf items', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c106', name: 'Dried Chile Ristras', description: 'Hanging dried chiles', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c107', name: 'Dakota\'s Pride Green Lentils (16 oz)', description: 'Grains/Dry Goods', price: 2.39, emoji: '🛒', tag: 'Grocery' },
  { id: 'c108', name: 'Earthly Grains White Rice (3 lb)', description: 'Grains/Dry Goods', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c109', name: 'Pueblo Lindo Pinto Beans (32 oz)', description: 'Grains/Dry Goods', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c110', name: 'Kraft Mac & Cheese Original (7.25 oz)', description: 'Pantry Staples', price: 1.89, emoji: '🛒', tag: 'Grocery' },
  { id: 'c111', name: 'Stonemill Iodized Salt (26 oz)', description: 'Pantry Staples', price: 1.79, emoji: '🛒', tag: 'Grocery' },

  // Gum
  { id: 'c112', name: 'Canel\'s Chewing Gum', description: 'Assorted — Cherry, Banana, Apple, Grape, Strawberry', price: 4.49, emoji: '🫧', tag: 'Gum', variants: [{ label: 'Tray', price: 4.49 }, { label: 'Large Tray', price: 5.49 }] },
  { id: 'c113', name: 'Bubbaloo Fresa 47-pc', description: 'Strawberry liquid-filled gum', price: 0, emoji: '🫧', tag: 'Gum' },
  { id: 'c114', name: 'Bubbaloo Yerbabuena 47-pc', description: 'Mint liquid-filled gum', price: 0, emoji: '🫧', tag: 'Gum' },

  // Gummy
  { id: 'c115', name: 'Borrachines', description: 'La Coculense — fruit gelatin candy', price: 0, emoji: '🐻', tag: 'Gummy' },

  // Hard Candy
  { id: 'c116', name: 'Tomy El Original', description: 'Rich butterscotch candy (caramelo macizo sabor ron y mantequilla), 100 pcs', price: 0, emoji: '💎', tag: 'Hard Candy' },
  { id: 'c117', name: 'Bolonchas Sandía Candies', description: 'Acidulated hard candy filled and covered with chile — Watermelon, 60 pcs', price: 6.99, emoji: '💎', tag: 'Hard Candy' },
  { id: 'c118', name: 'Pika Slice', description: 'Chili covered watermelon slice candy (Cubierta con Chile), 40 pcs', price: 5.99, emoji: '💎', tag: 'Hard Candy' },
  { id: 'c119', name: 'Tamborines', description: 'Tamarind and chili flavored candy — mortar/molcajete character', price: 6.99, emoji: '💎', tag: 'Hard Candy' },

  // Lollipops
  { id: 'c120', name: 'Lolly Cream Surtidas', description: 'Mara — assorted lollipops/paletas', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c121', name: 'Teddy Bear Pop Lollipops', description: 'Bear-shaped lollipops', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c122', name: 'Braided Twist', description: 'Rainbow braided hard candy lollipops, 10 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c123', name: 'Canel\'s Lollipops', description: 'Hard candy — Lemon, Grape, Pineapple, Strawberry & Orange, 100 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c124', name: 'Carrito de Elotes Cubierto', description: 'Corn-shaped lollipops', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c125', name: 'Chamoyadas', description: 'Chamoy-flavored lollipops — spin and dip style, 20 pcs', price: 8.79, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c126', name: 'Chipileta Mix', description: 'Lollipop and hot candy powder — Orange, Chamoy, Watermelon, 30 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c127', name: 'Chipileta Naranja', description: 'Orange flavor lollipop and hot powder', price: 5.89, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c128', name: 'Chupa Chups', description: 'Creamy lollipops — assorted cream flavors, 40 pcs', price: 7.99, emoji: '🍭', tag: 'Lollipops' , variants: [{ label: 'Cremosa', price: 7.99 }, { label: 'Sabores Selectos', price: 7.99 }] },
  { id: 'c129', name: 'Chupirul', description: 'Hard candy lollipop — rainbow striped, 25 pcs', price: 5.69, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c130', name: 'Jumbo Cereza', description: 'Jumbo cherry pop with bubble gum filling', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c131', name: 'Manzana Roja', description: 'Apple lollipops filled with chile', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c132', name: 'Mara Sandía', description: 'Watermelon lollipops with chile, king size, 40 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' , variants: [{ label: 'Regular', price: 6.99 }, { label: 'Cubierta', price: 5.99 }, { label: 'Fuego', price: 5.99 }] },
  { id: 'c133', name: 'Maralindo', description: 'Tamarind flavor lollipops with chile, acidulated, 40 pcs', price: 4.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c134', name: 'Molcajetes', description: 'Lollipops with hot chili coating, 40 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c135', name: 'Pale Amor', description: 'Heart-shaped lollipops, 40 pcs', price: 4.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c136', name: 'Pale-Locas', description: 'Hard candy lollipop — multi-colored, 25 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c137', name: 'Paleta Gummy Pop', description: 'Gummy lollipop — Watermelon flavor, 55 pcs', price: 7.99, emoji: '🍭', tag: 'Lollipops' , variants: [{ label: 'Sandía', price: 7.99 }, { label: 'Mango', price: 0 }] },
  { id: 'c138', name: 'Paleta Malva Bony Pop', description: 'Chocolate flavor coated marshmallow on a stick, 40 pcs', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c139', name: 'Paleta Payaso', description: 'Candy lollipop filled with bubble gum', price: 9.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c140', name: 'Paleta Trenzada', description: 'Braided/swirl candy lollipop — Burgundy, Yellow, Multicolored, Orange, Green, 10 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c141', name: 'Pelon Pelonazo', description: 'Hard candy with chili powder and Pelon layer — Tamarind', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c142', name: 'Piña Loca', description: 'Crazy Pineapple — acidulated lollipop filled with chile, 40 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c143', name: 'Rockaleta', description: '4 Chili Layers & Gum Center lollipop, 20 pcs', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c144', name: 'Semáforo', description: 'Traffic light shaped lollipops — Strawberry, Pineapple', price: 8.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c145', name: 'Super Piña Loca', description: 'Crazy Pineapple — hard candy lollipops with chili powder, pineapple flavor, 40 pcs', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c146', name: 'Vero Bombas Surtidas', description: 'Assorted bomb-shaped lollipops, 40 pcs', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c147', name: 'Vero Mango', description: 'Chili pepper powder covered mango lollipops, 40 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c148', name: 'Vero Manita de la Suerte', description: 'Hand-shaped lollipops — \'Talk to the Hand\'', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c149', name: 'Vero Mix', description: 'Assorted shaped lollipops (classic mix)', price: 18.99, emoji: '🍭', tag: 'Lollipops' , variants: [{ label: 'Clásico', price: 18.99 }, { label: 'Intensa', price: 6.99 }] },
  { id: 'c150', name: 'Vero Pinta Azul', description: 'Blue tongue lollipops — Strawberry and Raspberry, 40 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c151', name: 'Vero Risandías con Chile', description: 'Watermelon flavor with chile', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c152', name: 'Vero Takis Fuego', description: 'Inspired by Takis Fuego, with chili powder to dip, 20 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },

  // Marshmallow
  { id: 'c153', name: 'Barquillos y Dulces D\'Eliz', description: 'Wafers and marshmallow cones', price: 7.99, emoji: '☁️', tag: 'Marshmallow' },
  { id: 'c154', name: 'Bianchi Mini Mini Marshmallows', description: 'Strawberry, Vanilla, Orange, Lemon, Banana, 30 packs', price: 12.99, emoji: '☁️', tag: 'Marshmallow' },
  { id: 'c155', name: 'Extra Giant Marshmallows', description: 'Strawberry and Vanilla flavors — extra giant', price: 7.59, emoji: '☁️', tag: 'Marshmallow' },

  // Other
  { id: 'c156', name: 'HierbasMex Moringa Seeds', description: 'Health/Herbal', price: 0, emoji: '🏪', tag: 'Other' },
  { id: 'c157', name: 'Olla Bola (decorated clay pot)', description: 'Pottery/Kitchenware', price: 0, emoji: '🏪', tag: 'Other' },
  { id: 'c158', name: 'Tarro Cervecero Deco (clay beer mug)', description: 'Pottery/Kitchenware', price: 14.99, emoji: '🏪', tag: 'Other' },
  { id: 'c159', name: 'Veladora Preparada (prayer candles)', description: 'Religious/Home', price: 19.99, emoji: '🏪', tag: 'Other' },
  { id: 'c160', name: 'Action Toy Monster Trucks (2-pack, red & blue)', description: 'Toys', price: 0, emoji: '🏪', tag: 'Other' },
  { id: 'c161', name: 'Tool Butler Toy Tool Set', description: 'Toys', price: 22.99, emoji: '🏪', tag: 'Other' },

  // Party Supplies
  { id: 'c162', name: 'Voila Tissue Paper (8 sheets, baby themed)', description: 'Baby Shower Supplies', price: 1.59, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c163', name: 'Piñatas (assorted)', description: 'Various character piñatas', price: 0, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c164', name: '"Let\'s Party" Blue Polka Dot Party Set (cups, forks, blowers)', description: 'Party Supplies', price: 0, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c165', name: 'Papel Picado Banner (colorful cut-out)', description: 'Party Supplies/Decor', price: 9.99, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c166', name: 'Plastic Papel Picado Banner (large, on string)', description: 'Party Supplies/Decor', price: 10.99, emoji: '🎉', tag: 'Party Supplies' },

  // Piñata Mix
  { id: 'c167', name: 'Canel\'s Mega Candy & Gum Mix', description: 'Tueni, Chooz, Whatta Bubble, Cherry Sours, Jelly Beans', price: 35.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c168', name: 'Canel\'s Piñatero Candy & Gum Mix', description: 'Candy & gum mix (pink bag)', price: 18.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c169', name: 'Changuitrozos Piñatero', description: 'Fruit pulp pieces with salt and chili, 50 pcs', price: 19.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c170', name: 'Combo Piñata', description: 'Assorted piñata combo candy bag', price: 14.99, emoji: '🪅', tag: 'Piñata Mix', variants: [{ label: 'Dulces Ravi', price: 14.99 }, { label: 'Classic', price: 16.99 }] },
  { id: 'c171', name: 'Imperio Piñatera + Toys', description: 'Assorted candy with toys — ¡Con Chile!', price: 13.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c172', name: 'Mexican Fiesta', description: 'Surtido dulces de leche — Damy, Tomy, Ricos Besos, Super Natilla', price: 12.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c173', name: 'Paket Mix', description: 'Assorted candy — Incluye 1 Sorpresa', price: 22.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c174', name: 'Paquete Beny', description: 'Assorted Beny candies — new presentation', price: 26.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c175', name: 'Paquete Diversión', description: 'Bubu Lubu, Pecositas, Kranky, Chocoretas', price: 21.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c176', name: 'Piñata Assorted (large bag)', description: 'Large assorted piñata candy bag', price: 36.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c177', name: 'Piñata Mix', description: 'Assorted candies with Pulparindo, bubble gum pops', price: 17.99, emoji: '🪅', tag: 'Piñata Mix' , variants: [{ label: 'Regular', price: 17.99 }, { label: 'Chocolate', price: 22.99 }] },
  { id: 'c178', name: 'Piñata Surprise', description: 'Assorted lollipops (Paint-Eat variety)', price: 19.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c179', name: 'Ricofiesta', description: 'Duvalín Bi Sabor, Panditas Classic, Panditas Sour', price: 14.99, emoji: '🪅', tag: 'Piñata Mix' },

  // Snacks
  { id: 'c180', name: 'La Canasta Pepitoria de Ajonjolí / Sesame Seed Candy', description: 'Candy/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c181', name: 'Obleas Arcoiris Raspada (wheat flour wafers)', description: 'Candy/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c182', name: 'Palanqueta Mixta (peanut/seed brittle bars)', description: 'Candy/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c183', name: 'Ricolino Kranky Chocolate Corn Flakes (10 pack)', description: 'Candy/Snacks', price: 7.99, emoji: '🌮', tag: 'Snacks' },
  { id: 'c184', name: 'Assorted Mexican Chips Display (Cheetos, Turbos, Fritos, etc.)', description: 'Chips/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c185', name: 'Crujitos (fried wheat snack, chile/lime)', description: 'Chips/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c186', name: 'Doritos Nachos (Mexican version)', description: 'Chips/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c187', name: 'Cachitos Chile & Lime 30-pc', description: 'Botanas — puffed wheat, red bag', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c188', name: 'Cachitos Super Chile & Lime 27-pc', description: 'Botanas — puffed wheat, green bag', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c189', name: 'Chicharrón Curly (bag)', description: 'Fried wheat curls', price: 2.79, emoji: '🌮', tag: 'Snacks' },
  { id: 'c190', name: 'Chicharrón Wheels (bag)', description: 'Dulcería — fried wheat wheels', price: 1.99, emoji: '🌮', tag: 'Snacks' },
  { id: 'c191', name: 'Japanese Style Peanuts 10-bag', description: 'Coated peanuts', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c192', name: 'Maizuazo Japanese Peanuts 10-bag', description: 'Coated peanuts', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c193', name: 'Peanuts in Shell (bag)', description: 'Raw peanuts', price: 4.99, emoji: '🌮', tag: 'Snacks' },
  { id: 'c194', name: 'Pellizco Snacks 100-pc', description: 'El Azteca — chile snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c195', name: 'Pepe Donas', description: 'Pepito — wheat flour snack, chili flavor', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c196', name: 'Piñatero Japanese Peanuts 50-bag', description: 'Manzela — piñata mix', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c197', name: 'Semilla de Calabaza', description: 'Pumpkin seeds', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c198', name: 'El Portal Chicharrón 10x10', description: 'Wheat pellets (chicharrón preparado style)', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c199', name: 'Manzela Snack Mix (Japanese peanuts mix)', description: 'Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c200', name: 'Pepitas & Coconut Candy Tube (front view)', description: 'Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c201', name: 'Imperio Beef Jerky Fuego', description: 'Snacks/Jerky', price: 0, emoji: '🌮', tag: 'Snacks' },

  // Sour Candy
  { id: 'c202', name: 'Baby Bottles 6-pack', description: 'Powder candy in baby bottle shape', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c203', name: 'Hard Candy (bulk bag)', description: 'Orange & white swirl candies', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c204', name: 'Indy Dedos', description: 'Sour & spicy candy', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c205', name: 'Pica Limón', description: 'Salt & lemon hot powder', price: 3.99, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c206', name: 'Piña con Chile 8-pc', description: 'Pineapple w/ chili — grande', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c207', name: 'Selz Soda', description: 'Effervescent lemon hard candy', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c208', name: 'Fruti Kukas Sour Candy Balls', description: 'Sour candy balls — assorted flavors (orange, green, purple, pink), 12 pcs/box', price: 3.99, emoji: '🍋', tag: 'Sour Candy' },

  // Tamarind/Chile
  { id: 'c209', name: 'Hola Sweet & Salted Plum', description: 'Agridulce — ciruela salada', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c210', name: 'Karla Vasito Tamango 8-pc', description: 'Karla — tamarind & mango', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c211', name: 'Pulparindo', description: 'Tamarind candy w/ real fruit', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c212', name: 'Tamarind Pods (loose bag)', description: 'Natural tamarind', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c213', name: 'Vasito Chamoy 24-pc', description: 'Mara — chamoy flavor', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c214', name: 'Vasito Fuego 24-pc', description: 'Spicy soft tamarind candy', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c215', name: 'Vero PicaGomas Mango', description: 'Vero — mango gummy w/ chili', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c216', name: 'Vero PicaTamarind', description: 'Vero — tamarind gummy w/ chili', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c217', name: 'Banderilla (red lid tub)', description: 'Tamarind candy sticks with chili', price: 12.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c218', name: 'Cisne Pulpa de Tamarindo', description: 'Tamarind pulp acidified with salt', price: 7.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c219', name: 'Cucharita Rica', description: 'Tamarind flavored candy spoon, 22 pcs', price: 3.69, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c220', name: 'Flechazos (red lid tub)', description: 'Sour candy sticks', price: 14.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c221', name: 'Flechazos Blueberry', description: 'Sour and salted blueberry candy — spicy & sour, 45 pcs', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c222', name: 'Jabalina Xtreme', description: 'Tamarind flavor candy sticks, 50 pcs', price: 16.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c223', name: 'La Helada Banderilla Tamarind', description: 'Fruit candy with chili powder — sweet and spicy, 50 pcs', price: 12.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c224', name: 'La Helada Mega Cucharas', description: 'Soft candy with chili powder — spoon-shaped, with Chamoy sauce, 10 pcs', price: 4.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c225', name: 'Mini Cucharazo Piñatero', description: 'Tamarind flavored candy — mini spoon-shaped, 100 pcs', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c226', name: 'Palebola', description: 'Natural tamarind candy with salt & chili — push-up style, 12 pcs', price: 11.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c227', name: 'Pellizco', description: 'Natural tamarind candy with salt & chili — Since 1975, 40 pcs', price: 9.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c228', name: 'Tamarindo (yellow lid tub)', description: 'Tamarind candy, 50 pcs', price: 16.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
];
