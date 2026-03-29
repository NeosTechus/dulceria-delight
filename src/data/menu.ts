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
  { id: 'c4', name: 'Beverages (cooler)', description: 'Assorted sodas & drinks', price: 0, emoji: '🧃', tag: 'Beverages' },
  { id: 'c5', name: 'Maizena Atole Fresa', description: 'Strawberry atole mix', price: 0, emoji: '🧃', tag: 'Beverages' },
  { id: 'c6', name: 'Millville Buttermilk Pancake Mix', description: 'Complete — just add water', price: 3.25, emoji: '🧃', tag: 'Beverages' },
  { id: 'c7', name: 'Millville Original Syrup', description: 'Pancake syrup', price: 0, emoji: '🧃', tag: 'Beverages' },
  { id: 'c8', name: '3 Ballerina Herbal Tea (18 bags)', description: 'Tea', price: 6.99, emoji: '🧃', tag: 'Beverages' },
  { id: 'c9', name: 'Tadin Eucalyptus Tea / Canelita Cinnamon Tea (24 bags)', description: 'Tea', price: 4.49, emoji: '🧃', tag: 'Beverages' },
  { id: 'c10', name: 'Tadin Linden Tea / Té de Tila (24 bags)', description: 'Tea', price: 4.49, emoji: '🧃', tag: 'Beverages' },

  // Bulk Candy
  { id: 'c11', name: 'Bulk Assorted Lollipops', description: 'Mixed lollipops — sold individually', price: 0, emoji: '🪣', tag: 'Bulk Candy' },
  { id: 'c12', name: 'Bulk Chiclets / Mini Gum', description: 'Assorted mini gum pieces', price: 0, emoji: '🪣', tag: 'Bulk Candy' },
  { id: 'c13', name: 'Bulk Mixed Candy & Lollipops', description: 'Assorted candy — sold individually', price: 0, emoji: '🪣', tag: 'Bulk Candy' },
  { id: 'c14', name: 'Bulk Wrapped Candy / Taffy', description: 'Assorted wrapped candies', price: 0, emoji: '🪣', tag: 'Bulk Candy' },

  // Candy
  { id: 'c15', name: 'Airheads', description: 'Assorted fruit taffy bars', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c16', name: 'Banderillas Coconut Candy (20 pcs, tri-color)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c17', name: 'Butter Toffee Café (13 pcs)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c18', name: 'Canel\'s Miniatura Gum (220 pcs) / Luxus Enchilados Lollipops', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c19', name: 'Cazuela Surtida — Assorted Candy in Clay Bowl (60 pc)', description: 'Candy', price: 26.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c20', name: 'Changuitocos Tamarind Candy', description: 'Candy', price: 5.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c21', name: 'Combo Piñata Assorted Candies with Chili (4.5 lb)', description: 'Candy', price: 16.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c22', name: 'Crazy Your Candy Rings Tub / Mazapán box', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c23', name: 'De la Rosa Jumbo Cereza Cherry Bubble Gum Lollipops', description: 'Candy', price: 8.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c24', name: 'De la Rosa Jumbo Surtida Lollipops (bubble gum filled)', description: 'Candy', price: 9.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c25', name: 'De la Rosa Malvaviscos Corazón de Chocolate (marshmallow hearts)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c26', name: 'Dulces Típicos Chico Rico (tamarind candy cups)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c27', name: 'El Piñatero Candy & Gum Mix (4 lb)', description: 'Candy', price: 18.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c28', name: 'Hola Salted Apricot Chamoy Candy', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c29', name: 'Huevitos Chocolate Egg Candy', description: 'Candy', price: 7.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c30', name: 'Jarritos Gummies', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c31', name: 'Jelly Pop Fruit Jelly Jar (assorted)', description: 'Candy', price: 6.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c32', name: 'Jelly Snack Fruit Jelly Candy (20 pcs)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c33', name: 'Jelly Stick Assorted (jelly candy sticks)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c34', name: 'La Vaquita Chiclosos Café (coffee caramel candy)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c35', name: 'Lucas Muecas Lollipops (assorted flavors, 10 pc)', description: 'Candy', price: 7.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c36', name: 'Lucas Muecas Skwinkles (10 pcs, pink)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c37', name: 'Lucas Skwinkles (assorted green & red packs)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c38', name: 'Lucas Skwinkles Salsagheti (6-pack boxes)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c39', name: 'Mini Rockaleta Lollipops (50 pcs)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c40', name: 'Orrta Rica Tamarind Candy with Chili (12 pc)', description: 'Candy', price: 5.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c41', name: 'Paleta Limón Plus (salt & lemon lollipops)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c42', name: 'Pelón Pelo Rico Chamoy (12 oz bag)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c43', name: 'Pelón Pelo Rico Mini (36 pc box — top view)', description: 'Candy', price: 11.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c44', name: 'Pelón Pelo Rico Mini Tamarind Candy (12 pc bag)', description: 'Candy', price: 2.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c45', name: 'Pink candy balls (tamarind/similar)', description: 'Candy', price: 4.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c46', name: 'Pollitos Chocolate Candy (box)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c47', name: 'Productos Liz Gelatin Gum (top view, 180 pcs)', description: 'Candy', price: 8.15, emoji: '🍬', tag: 'Candy' },
  { id: 'c48', name: 'Pulparindo Tamarind Bars (Mango/Watermelon/Original/Chamoy)', description: 'Candy', price: 4.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c49', name: 'Pulparindots Watermelon (12 packets)', description: 'Candy', price: 4.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c50', name: 'Ricolino Paleta Payaso (10 pack, marshmallow/chocolate)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c51', name: 'Serpentinas Tamarind Candy', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c52', name: 'Skwinkle Candy (red sour strips)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c53', name: 'Tutsi Pop Lollipops (30 paletas)', description: 'Candy', price: 8.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c54', name: 'Zumba Pica Tiras Enchiladas (12 pc boxes)', description: 'Candy', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c55', name: 'Fruti Losso Mini Barrel', description: 'Mini barrel with jelly sticks inside', price: 5.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c56', name: 'Gira Sprinkles', description: 'Straws with sweet and sour candies, 60 pcs', price: 9.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c57', name: 'Happy Time Truck', description: 'Candy-filled toy truck container', price: 10.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c58', name: 'Jelly Stick', description: 'Caramelo Líquido — liquid candy sticks, fruit flavors', price: 5.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c59', name: 'Jira Chispas', description: 'Straws with sweet and sour candies', price: 6.99, emoji: '🍬', tag: 'Candy' },
  { id: 'c60', name: 'Assorted bulk dulces (piloncillo, coconut, jamaica, etc.)', description: 'Candy/Bulk', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c61', name: 'Candy Truck Container (assorted fruit cups)', description: 'Candy/Novelty', price: 0, emoji: '🍬', tag: 'Candy' },
  { id: 'c62', name: 'Small clay cup with Dulce de Tamarindo candy', description: 'Candy/Pottery', price: 5.5, emoji: '🍬', tag: 'Candy' },
  { id: 'c63', name: 'Feliz Navidad Surtido de Dulces Stocking (211g)', description: 'Candy/Seasonal', price: 2.99, emoji: '🍬', tag: 'Candy' },

  // Chamoy & Sauces
  { id: 'c64', name: 'Zumba Pica Forritos Chamoy (12.9 oz)', description: 'Candy/Chamoy', price: 3.79, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c65', name: 'Chamo Mix Dill Pickle', description: 'Chamoy Pickle — Brownsville style', price: 0, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c66', name: 'Changui Polvo Blueberry', description: 'Blueberry flavored candy powder — large bottle', price: 0, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c67', name: 'Honey (100% Pure Premium)', description: 'Pure honey bottle', price: 3.99, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c68', name: 'Onesó Dulces y Pulpas', description: 'Dulces y pulpas (candies and pulps)', price: 3.99, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c69', name: 'Pelon Chilito Rico (assorted)', description: 'Chamoy, Mango & other flavors — squeeze bottles', price: 3.99, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c70', name: 'Pulparindo Squeeze', description: 'Sweet & spicy tamarind sauce', price: 3.89, emoji: '🫙', tag: 'Chamoy & Sauces', variants: [{ label: 'Mango', price: 3.89 }, { label: 'Tamarind', price: 3.99 }] },
  { id: 'c71', name: 'Chamoy Mega Picosita (32.3 fl oz bottle)', description: 'Condiments/Chamoy', price: 2.99, emoji: '🫙', tag: 'Chamoy & Sauces' },
  { id: 'c72', name: 'La Helada Rim Dip (tamarind/chamoy for drinks)', description: 'Condiments/Chamoy', price: 0, emoji: '🫙', tag: 'Chamoy & Sauces' },

  // Chewy Candy
  { id: 'c73', name: 'Maladito with Chili', description: 'Sweet & sour chewy candy with chili — assorted fruit flavors, 100 pcs', price: 6.99, emoji: '🍬', tag: 'Chewy Candy' },
  { id: 'c74', name: 'Pelon Mini Surtido', description: 'Dulce enchilado — Sandía, Chamoy y Mango soft candy, 18 pcs', price: 5.99, emoji: '🍬', tag: 'Chewy Candy' },
  { id: 'c75', name: 'Vero Rellerindos', description: 'Tamarind flavored candy — \'I Am Feeling Fine!\', 65 pcs', price: 6.99, emoji: '🍬', tag: 'Chewy Candy' },

  // Chocolate
  { id: 'c76', name: 'Bon o Bon', description: 'Chocolate bonbon w/ wafer & cream filling', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c77', name: 'Bubu Lubu 24-pack', description: 'Ricolino — marshmallow & strawberry w/ chocolate', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c78', name: 'Canasta Sabor Rompope 50-pc', description: 'Chocolate w/ eggnog filling', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c79', name: 'Chocoretas Chocomenta', description: 'Ricolino — chocolate mint', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c80', name: 'Chutazo 20-pack', description: 'Ricolino — chocolate w/ bubblegum filling', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c81', name: 'Cremino Bicolor Avellana 24-pc', description: 'Hazelnut praline — bicolor', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c82', name: 'Cremino Blanco Avellana 24-pc', description: 'Hazelnut praline — white', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c83', name: 'Duvalín 18-pc', description: 'Ricolino — hazelnut, strawberry, vanilla cream', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c84', name: 'Ferrero Collection 12-pc', description: 'Assorted Ferrero chocolates', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c85', name: 'Ferrero Rocher', description: 'Hazelnut chocolate', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c86', name: 'Mazapán Chocolate', description: 'De la Rosa — peanut candy w/ chocolate', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c87', name: 'Mazapán Original', description: 'De la Rosa — classic peanut candy', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c88', name: 'Mini Paleta Payaso 15-pack', description: 'Ricolino', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c89', name: 'Nucita Monedas 48-pc', description: 'Chocolate flavored candy coins', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c90', name: 'Nugs Recreo', description: 'Nougat, caramel, peanut w/ chocolate', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c91', name: 'Ranita Croa!', description: 'Chocolate frog', price: 0, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c92', name: 'Bon Bon Cookies and Cream', description: 'Bombón with wafer, cookies, and cream filling — Edición Especial, 18 pcs', price: 6.99, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c93', name: 'Bon Bon Strawberry Choco', description: 'Chocolate with strawberry filling — Sweetness to Share', price: 6.99, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c94', name: 'Carlos V Stick', description: 'Chocolate con leche sticks, 20 pcs', price: 5.99, emoji: '🍫', tag: 'Chocolate' },
  { id: 'c95', name: 'Nucita Trisabor', description: 'Creamy candy — chocolate, vanilla, strawberry, 16 pcs', price: 4.99, emoji: '🍫', tag: 'Chocolate' },

  // Cookies
  { id: 'c96', name: 'Cuétara Surtido Diario', description: 'Assorted cookies — 1 lb', price: 0, emoji: '🍪', tag: 'Cookies' },
  { id: 'c97', name: 'Gamesa Marías 8-pack', description: 'Mexico\'s #1 cookie — classic', price: 0, emoji: '🍪', tag: 'Cookies' },
  { id: 'c98', name: 'La Moderna Malvavisco 8-pack', description: 'Marshmallow cookies', price: 0, emoji: '🍪', tag: 'Cookies' },
  { id: 'c99', name: 'Bocadín Chocolate Wafer (50 piezas, 525g)', description: 'Candy/Cookies', price: 8.99, emoji: '🍪', tag: 'Cookies' },
  { id: 'c100', name: 'Sevillana Obleas (wafer cookies with milk)', description: 'Candy/Cookies', price: 0, emoji: '🍪', tag: 'Cookies' },

  // Dulces de Leche
  { id: 'c101', name: 'Deli', description: 'Milk candy — Wim, Mim, elaborados con leche 100% natural, 100 pcs', price: 5.99, emoji: '🐄', tag: 'Dulces de Leche' },
  { id: 'c102', name: 'La Vaquita Mix', description: 'Milk candy mix — Monito, La Vaquita, RicaNuez', price: 11.99, emoji: '🐄', tag: 'Dulces de Leche' },
  { id: 'c103', name: 'Montés Surtido', description: 'Assorted milk hard candy and toffees, 100 pcs', price: 6.99, emoji: '🐄', tag: 'Dulces de Leche' },
  { id: 'c104', name: 'Ate (block)', description: 'Fruit paste — traditional', price: 2.49, emoji: '🐄', tag: 'Dulces de Leche' },

  // Grocery
  { id: 'c105', name: 'Baker\'s Corner Light Brown Sugar (32 oz)', description: 'Baking', price: 2.89, emoji: '🛒', tag: 'Grocery' },
  { id: 'c106', name: 'Molina Mexican Vanilla Blend (250 ml)', description: 'Baking', price: 2.99, emoji: '🛒', tag: 'Grocery' },
  { id: 'c107', name: 'Rolled Oats Quick Cook (42 oz)', description: 'Breakfast/Grains', price: 6.39, emoji: '🛒', tag: 'Grocery' },
  { id: 'c108', name: 'Nestlé Carnation Evaporated Milk', description: 'Canned Dairy', price: 1.79, emoji: '🛒', tag: 'Grocery' },
  { id: 'c109', name: 'Nestlé La Lechera Original (375g)', description: 'Canned Dairy', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c110', name: 'Nestlé Pastel Sweetened Condensed Milk', description: 'Canned Dairy', price: 3.39, emoji: '🛒', tag: 'Grocery' },
  { id: 'c111', name: 'La Costeña Sliced Jalapeños / La Morena Whole Pickled Jalapeños', description: 'Canned Goods', price: 2.89, emoji: '🛒', tag: 'Grocery' },
  { id: 'c112', name: 'Aunt Jemima Original Syrup (24 fl oz)', description: 'Condiments', price: 5.69, emoji: '🛒', tag: 'Grocery' },
  { id: 'c113', name: 'Coronado Caramel Topping Cinnamon (1 lb 7.28 oz)', description: 'Condiments/Toppings', price: 7.99, emoji: '🛒', tag: 'Grocery' },
  { id: 'c114', name: 'Dried Hibiscus Flowers (Flor de Jamaica)', description: 'Dried Goods/Beverages', price: 4.99, emoji: '🛒', tag: 'Grocery' },
  { id: 'c115', name: 'Canned Goods & Salsas', description: 'Various Mexican brands — shelf items', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c116', name: 'Dried Chile Ristras', description: 'Hanging dried chiles', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c117', name: 'Dakota\'s Pride Green Lentils (16 oz)', description: 'Grains/Dry Goods', price: 2.39, emoji: '🛒', tag: 'Grocery' },
  { id: 'c118', name: 'Earthly Grains White Rice (3 lb)', description: 'Grains/Dry Goods', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c119', name: 'Pueblo Lindo Pinto Beans (32 oz)', description: 'Grains/Dry Goods', price: 0, emoji: '🛒', tag: 'Grocery' },
  { id: 'c120', name: 'Kraft Mac & Cheese Original (7.25 oz)', description: 'Pantry Staples', price: 1.89, emoji: '🛒', tag: 'Grocery' },
  { id: 'c121', name: 'Stonemill Iodized Salt (26 oz)', description: 'Pantry Staples', price: 1.79, emoji: '🛒', tag: 'Grocery' },

  // Gum
  { id: 'c122', name: 'Canel\'s Chewing Gum', description: 'Assorted — Cherry, Banana, Apple, Grape, Strawberry', price: 4.49, emoji: '🫧', tag: 'Gum', variants: [{ label: 'Tray', price: 4.49 }, { label: 'Large Tray', price: 5.49 }] },
  { id: 'c123', name: 'Bubbaloo Fresa 47-pc', description: 'Strawberry liquid-filled gum', price: 0, emoji: '🫧', tag: 'Gum' },
  { id: 'c124', name: 'Bubbaloo Yerbabuena 47-pc', description: 'Mint liquid-filled gum', price: 0, emoji: '🫧', tag: 'Gum' },

  // Gummy
  { id: 'c125', name: 'Borrachines', description: 'La Coculense — fruit gelatin candy', price: 0, emoji: '🐻', tag: 'Gummy' },

  // Hard Candy
  { id: 'c126', name: 'Tomy El Original', description: 'Rich butterscotch candy (caramelo macizo sabor ron y mantequilla), 100 pcs', price: 0, emoji: '💎', tag: 'Hard Candy' },
  { id: 'c127', name: 'Bolonchas Sandía Candies', description: 'Acidulated hard candy filled and covered with chile — Watermelon, 60 pcs', price: 6.99, emoji: '💎', tag: 'Hard Candy' },
  { id: 'c128', name: 'Pika Slice', description: 'Chili covered watermelon slice candy (Cubierta con Chile), 40 pcs', price: 5.99, emoji: '💎', tag: 'Hard Candy' },
  { id: 'c129', name: 'Tamborines', description: 'Tamarind and chili flavored candy — mortar/molcajete character', price: 6.99, emoji: '💎', tag: 'Hard Candy' },

  // Lollipops
  { id: 'c130', name: 'Lolly Cream Surtidas', description: 'Mara — assorted lollipops/paletas', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c131', name: 'Teddy Bear Pop Lollipops', description: 'Bear-shaped lollipops', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c132', name: 'Braided Twist', description: 'Rainbow braided hard candy lollipops, 10 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c133', name: 'Canel\'s Lollipops', description: 'Hard candy — Lemon, Grape, Pineapple, Strawberry & Orange, 100 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c134', name: 'Carrito de Elotes Cubierto', description: 'Corn-shaped lollipops', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c135', name: 'Chamoyadas', description: 'Chamoy-flavored lollipops — spin and dip style, 20 pcs', price: 8.79, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c136', name: 'Chipileta Mix', description: 'Lollipop and hot candy powder — Orange, Chamoy, Watermelon, 30 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c137', name: 'Chipileta Naranja', description: 'Orange flavor lollipop and hot powder', price: 5.89, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c138', name: 'Chupa Chups Cremosa', description: 'Creamy lollipops — assorted cream flavors, 40 pcs', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c139', name: 'Chupa Chups Sabores Selectos', description: 'Select flavors mix — red bag, 40 pcs', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c140', name: 'Chupirul', description: 'Hard candy lollipop — rainbow striped, 25 pcs', price: 5.69, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c141', name: 'Jumbo Cereza', description: 'Jumbo cherry pop with bubble gum filling', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c142', name: 'Manzana Roja', description: 'Apple lollipops filled with chile', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c143', name: 'Mara Sandía', description: 'Watermelon lollipops with chile, king size, 40 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c144', name: 'Mara Sandía Cubierta', description: 'Watermelon lollipops covered with chile powder', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c145', name: 'Mara Sandía Fuego', description: 'Watermelon lollipop & chili powder — extra hot, 30 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c146', name: 'Maralindo', description: 'Tamarind flavor lollipops with chile, acidulated, 40 pcs', price: 4.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c147', name: 'Molcajetes', description: 'Lollipops with hot chili coating, 40 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c148', name: 'Pale Amor', description: 'Heart-shaped lollipops, 40 pcs', price: 4.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c149', name: 'Pale-Locas', description: 'Hard candy lollipop — multi-colored, 25 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c150', name: 'Paleta Gummy Pop Mango', description: 'Gummy lollipop — Mango flavor, con chile, 55 pcs', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c151', name: 'Paleta Gummy Pop Sandía', description: 'Gummy lollipop — Watermelon flavor, 55 pcs', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c152', name: 'Paleta Malva Bony Pop', description: 'Chocolate flavor coated marshmallow on a stick, 40 pcs', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c153', name: 'Paleta Payaso', description: 'Candy lollipop filled with bubble gum', price: 9.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c154', name: 'Paleta Trenzada', description: 'Braided/swirl candy lollipop — Burgundy, Yellow, Multicolored, Orange, Green, 10 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c155', name: 'Pelon Pelonazo', description: 'Hard candy with chili powder and Pelon layer — Tamarind', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c156', name: 'Piña Loca', description: 'Crazy Pineapple — acidulated lollipop filled with chile, 40 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c157', name: 'Rockaleta', description: '4 Chili Layers & Gum Center lollipop, 20 pcs', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c158', name: 'Semáforo', description: 'Traffic light shaped lollipops — Strawberry, Pineapple', price: 8.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c159', name: 'Super Piña Loca', description: 'Crazy Pineapple — hard candy lollipops with chili powder, pineapple flavor, 40 pcs', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c160', name: 'Tutsi Pop', description: 'Cherry hard candy lollipops filled with bubble gum, 24 pcs', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c161', name: 'Vero Bombas Surtidas', description: 'Assorted bomb-shaped lollipops, 40 pcs', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c162', name: 'Vero Mango', description: 'Chili pepper powder covered mango lollipops, 40 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c163', name: 'Vero Manita de la Suerte', description: 'Hand-shaped lollipops — \'Talk to the Hand\'', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c164', name: 'Vero Mix (Pink - shapes)', description: 'Assorted shapes — Chupadedo, Manita, Tarro, Heart, Cupcake', price: 4.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c165', name: 'Vero Mix Banda Fuego', description: 'Spicy lollipop mix — Elotes, Sandi Brochas, Mango, 20 pcs', price: 0, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c166', name: 'Vero Mix Banda Intensa', description: 'Spicy & acidulated — Trabalenguas, Elotes, Sandi Brochas, Mango, 40 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c167', name: 'Vero Mix Clásico', description: 'Assorted shaped lollipops (classic mix)', price: 18.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c168', name: 'Vero Pinta Azul', description: 'Blue tongue lollipops — Strawberry and Raspberry, 40 pcs', price: 6.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c169', name: 'Vero Risandías con Chile', description: 'Watermelon flavor with chile', price: 7.99, emoji: '🍭', tag: 'Lollipops' },
  { id: 'c170', name: 'Vero Takis Fuego', description: 'Inspired by Takis Fuego, with chili powder to dip, 20 pcs', price: 5.99, emoji: '🍭', tag: 'Lollipops' },

  // Marshmallow
  { id: 'c171', name: 'Barquillos y Dulces D\'Eliz', description: 'Wafers and marshmallow cones', price: 7.99, emoji: '☁️', tag: 'Marshmallow' },
  { id: 'c172', name: 'Bianchi Mini Mini Marshmallows', description: 'Strawberry, Vanilla, Orange, Lemon, Banana, 30 packs', price: 12.99, emoji: '☁️', tag: 'Marshmallow' },
  { id: 'c173', name: 'Extra Giant Marshmallows', description: 'Strawberry and Vanilla flavors — extra giant', price: 7.59, emoji: '☁️', tag: 'Marshmallow' },

  // Other
  { id: 'c174', name: 'Bluetooth Tablet & Smartphone Speaker', description: 'Electronics', price: 0, emoji: '🏪', tag: 'Other' },
  { id: 'c175', name: 'HierbasMex Moringa Seeds', description: 'Health/Herbal', price: 0, emoji: '🏪', tag: 'Other' },
  { id: 'c176', name: 'Olla Bola (decorated clay pot)', description: 'Pottery/Kitchenware', price: 0, emoji: '🏪', tag: 'Other' },
  { id: 'c177', name: 'Tarro Cervecero Deco (clay beer mug)', description: 'Pottery/Kitchenware', price: 14.99, emoji: '🏪', tag: 'Other' },
  { id: 'c178', name: 'Veladora Preparada (prayer candles)', description: 'Religious/Home', price: 19.99, emoji: '🏪', tag: 'Other' },
  { id: 'c179', name: 'Action Toy Monster Trucks (2-pack, red & blue)', description: 'Toys', price: 0, emoji: '🏪', tag: 'Other' },
  { id: 'c180', name: 'Tool Butler Toy Tool Set', description: 'Toys', price: 22.99, emoji: '🏪', tag: 'Other' },

  // Party Supplies
  { id: 'c181', name: '"Oh Baby!" Favor Bags (pack of 10)', description: 'Baby Shower Supplies', price: 3.59, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c182', name: 'Voila Tissue Paper (8 sheets, baby themed)', description: 'Baby Shower Supplies', price: 1.59, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c183', name: 'Pink Baby Bottle Candy Favors (jar)', description: 'Baby Shower/Candy', price: 0, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c184', name: 'Piñatas (assorted)', description: 'Various character piñatas', price: 0, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c185', name: '"Let\'s Party" Blue Polka Dot Party Set (cups, forks, blowers)', description: 'Party Supplies', price: 0, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c186', name: 'Safari Confetti — Colored Paper (11.2 oz)', description: 'Party Supplies', price: 4.99, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c187', name: 'Papel Picado Banner (colorful cut-out)', description: 'Party Supplies/Decor', price: 9.99, emoji: '🎉', tag: 'Party Supplies' },
  { id: 'c188', name: 'Plastic Papel Picado Banner (large, on string)', description: 'Party Supplies/Decor', price: 10.99, emoji: '🎉', tag: 'Party Supplies' },

  // Piñata Mix
  { id: 'c189', name: 'Canel\'s Mega Candy & Gum Mix', description: 'Tueni, Chooz, Whatta Bubble, Cherry Sours, Jelly Beans', price: 35.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c190', name: 'Canel\'s Piñatero Candy & Gum Mix', description: 'Candy & gum mix (pink bag)', price: 18.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c191', name: 'Changuitrozos Piñatero', description: 'Fruit pulp pieces with salt and chili, 50 pcs', price: 19.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c192', name: 'Combo Piñata', description: 'Assorted piñata combo candy bag', price: 14.99, emoji: '🪅', tag: 'Piñata Mix', variants: [{ label: 'Dulces Ravi', price: 14.99 }, { label: 'Classic', price: 16.99 }] },
  { id: 'c193', name: 'Combo Piñata con Chile', description: 'Assorted chile candies — bull piñata design', price: 16.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c194', name: 'Imperio Piñatera + Toys', description: 'Assorted candy with toys — ¡Con Chile!', price: 13.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c195', name: 'Mexican Fiesta', description: 'Surtido dulces de leche — Damy, Tomy, Ricos Besos, Super Natilla', price: 12.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c196', name: 'Paket Mix', description: 'Assorted candy — Incluye 1 Sorpresa', price: 22.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c197', name: 'Paquete Beny', description: 'Assorted Beny candies — new presentation', price: 26.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c198', name: 'Paquete Diversión', description: 'Bubu Lubu, Pecositas, Kranky, Chocoretas', price: 21.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c199', name: 'Piñata Assorted (large bag)', description: 'Large assorted piñata candy bag', price: 36.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c200', name: 'Piñata Mix', description: 'Assorted candies with Pulparindo, bubble gum pops', price: 17.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c201', name: 'Piñata Mix Chocolate', description: 'Malva Bony Pop, Confichocky, Bianchi, Malvabón, Mr. Wafer', price: 22.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c202', name: 'Piñata Surprise', description: 'Assorted lollipops (Paint-Eat variety)', price: 19.99, emoji: '🪅', tag: 'Piñata Mix' },
  { id: 'c203', name: 'Ricofiesta', description: 'Duvalín Bi Sabor, Panditas Classic, Panditas Sour', price: 14.99, emoji: '🪅', tag: 'Piñata Mix' },

  // Snacks
  { id: 'c204', name: 'La Canasta Pepitoria de Ajonjolí / Sesame Seed Candy', description: 'Candy/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c205', name: 'Obleas Arcoiris Raspada (wheat flour wafers)', description: 'Candy/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c206', name: 'Palanqueta Mixta (peanut/seed brittle bars)', description: 'Candy/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c207', name: 'Ricolino Kranky Chocolate Corn Flakes (10 pack)', description: 'Candy/Snacks', price: 7.99, emoji: '🌮', tag: 'Snacks' },
  { id: 'c208', name: 'Assorted Mexican Chips Display (Cheetos, Turbos, Fritos, etc.)', description: 'Chips/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c209', name: 'Crujitos (fried wheat snack, chile/lime)', description: 'Chips/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c210', name: 'Doritos Nachos (Mexican version)', description: 'Chips/Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c211', name: 'Cachitos Chile & Lime 30-pc', description: 'Botanas — puffed wheat, red bag', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c212', name: 'Cachitos Super Chile & Lime 27-pc', description: 'Botanas — puffed wheat, green bag', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c213', name: 'Chicharrón Curly (bag)', description: 'Fried wheat curls', price: 2.79, emoji: '🌮', tag: 'Snacks' },
  { id: 'c214', name: 'Chicharrón Wheels (bag)', description: 'Dulcería — fried wheat wheels', price: 1.99, emoji: '🌮', tag: 'Snacks' },
  { id: 'c215', name: 'Japanese Style Peanuts 10-bag', description: 'Coated peanuts', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c216', name: 'Maizuazo Japanese Peanuts 10-bag', description: 'Coated peanuts', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c217', name: 'Peanuts in Shell (bag)', description: 'Raw peanuts', price: 4.99, emoji: '🌮', tag: 'Snacks' },
  { id: 'c218', name: 'Pellizco Snacks 100-pc', description: 'El Azteca — chile snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c219', name: 'Pepe Donas', description: 'Pepito — wheat flour snack, chili flavor', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c220', name: 'Piñatero Japanese Peanuts 50-bag', description: 'Manzela — piñata mix', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c221', name: 'Semilla de Calabaza', description: 'Pumpkin seeds', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c222', name: 'El Portal Chicharrón 10x10', description: 'Wheat pellets (chicharrón preparado style)', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c223', name: 'Manzela Snack Mix (Japanese peanuts mix)', description: 'Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c224', name: 'Pepitas & Coconut Candy Tube (front view)', description: 'Snacks', price: 0, emoji: '🌮', tag: 'Snacks' },
  { id: 'c225', name: 'Imperio Beef Jerky Fuego', description: 'Snacks/Jerky', price: 0, emoji: '🌮', tag: 'Snacks' },

  // Sour Candy
  { id: 'c226', name: 'Baby Bottles 6-pack', description: 'Powder candy in baby bottle shape', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c227', name: 'Hard Candy (bulk bag)', description: 'Orange & white swirl candies', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c228', name: 'Indy Dedos', description: 'Sour & spicy candy', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c229', name: 'Pica Limón', description: 'Salt & lemon hot powder', price: 3.99, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c230', name: 'Piña con Chile 8-pc', description: 'Pineapple w/ chili — grande', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c231', name: 'Selz Soda', description: 'Effervescent lemon hard candy', price: 0, emoji: '🍋', tag: 'Sour Candy' },
  { id: 'c232', name: 'Fruti Kukas Sour Candy Balls', description: 'Sour candy balls — assorted flavors (orange, green, purple, pink), 12 pcs/box', price: 3.99, emoji: '🍋', tag: 'Sour Candy' },

  // Tamarind/Chile
  { id: 'c233', name: 'Hola Sweet & Salted Plum', description: 'Agridulce — ciruela salada', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c234', name: 'Karla Vasito Tamango 8-pc', description: 'Karla — tamarind & mango', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c235', name: 'Pulparindo', description: 'Tamarind candy w/ real fruit', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c236', name: 'Tamarind Pods (loose bag)', description: 'Natural tamarind', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c237', name: 'Vasito Chamoy 24-pc', description: 'Mara — chamoy flavor', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c238', name: 'Vasito Fuego 24-pc', description: 'Spicy soft tamarind candy', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c239', name: 'Vero PicaGomas Mango', description: 'Vero — mango gummy w/ chili', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c240', name: 'Vero PicaTamarind', description: 'Vero — tamarind gummy w/ chili', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c241', name: 'Banderilla (red lid tub)', description: 'Tamarind candy sticks with chili', price: 12.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c242', name: 'Cisne Pulpa de Tamarindo', description: 'Tamarind pulp acidified with salt', price: 7.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c243', name: 'Cucharita Rica', description: 'Tamarind flavored candy spoon, 22 pcs', price: 3.69, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c244', name: 'Flechazos (red lid tub)', description: 'Sour candy sticks', price: 14.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c245', name: 'Flechazos Blueberry', description: 'Sour and salted blueberry candy — spicy & sour, 45 pcs', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c246', name: 'Jabalina Xtreme', description: 'Tamarind flavor candy sticks, 50 pcs', price: 16.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c247', name: 'La Helada Banderilla Tamarind', description: 'Fruit candy with chili powder — sweet and spicy, 50 pcs', price: 12.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c248', name: 'La Helada Mega Cucharas', description: 'Soft candy with chili powder — spoon-shaped, with Chamoy sauce, 10 pcs', price: 4.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c249', name: 'Mini Cucharazo Piñatero', description: 'Tamarind flavored candy — mini spoon-shaped, 100 pcs', price: 0, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c250', name: 'Palebola', description: 'Natural tamarind candy with salt & chili — push-up style, 12 pcs', price: 11.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c251', name: 'Pellizco', description: 'Natural tamarind candy with salt & chili — Since 1975, 40 pcs', price: 9.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
  { id: 'c252', name: 'Tamarindo (yellow lid tub)', description: 'Tamarind candy, 50 pcs', price: 16.99, emoji: '🌶️', tag: 'Tamarind/Chile' },
];
