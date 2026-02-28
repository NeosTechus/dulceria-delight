import { Plus } from 'lucide-react';
import { type CartItem, menuItems, candyItems } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface CartSuggestionsProps {
  cartItems: CartItem[];
}

const CartSuggestions = ({ cartItems }: CartSuggestionsProps) => {
  const { addMenuItem, addCandyItem } = useCart();
  const { t } = useLanguage();
  const cartIds = new Set(cartItems.map((i) => i.id));
  const cartCategories = new Set(cartItems.map((i) => i.category));

  // Suggest items from categories NOT already in the cart, then fill from same categories
  const allItems = [
    ...menuItems.map((m) => ({ ...m, type: 'menu' as const })),
    ...candyItems.map((c) => ({ ...c, type: 'candy' as const, category: 'candy' as const })),
  ].filter((i) => !cartIds.has(i.id) && i.id !== 's6'); // exclude test item

  const crossCategory = allItems.filter((i) => !cartCategories.has(i.category));
  const sameCategory = allItems.filter((i) => cartCategories.has(i.category));
  const suggestions = [...crossCategory, ...sameCategory].slice(0, 3);

  if (suggestions.length === 0) return null;

  const handleAdd = (item: (typeof suggestions)[0]) => {
    if (item.type === 'candy') {
      const candy = candyItems.find((c) => c.id === item.id);
      if (candy) addCandyItem(candy);
    } else {
      const menu = menuItems.find((m) => m.id === item.id);
      if (menu) addMenuItem(menu);
    }
  };

  return (
    <div className="border border-border rounded-xl p-4 mb-4">
      <p className="text-sm font-bold text-foreground mb-3">✨ You might also like</p>
      <div className="space-y-2">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-muted/40 rounded-lg p-2.5 group"
          >
            <span className="text-lg">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleAdd(item)}
              className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
            >
              <Plus size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSuggestions;
