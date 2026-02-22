import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-fiesta-dark text-primary-foreground/70 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-50" />
      <div className="container mx-auto px-4 text-center relative">
        <p className="font-fredoka text-2xl text-gradient-fiesta inline-block mb-3">🪅 Dulceria Medina</p>
        <p className="text-sm text-primary-foreground/50 mb-3">© {new Date().getFullYear()} Dulceria Medina — St. Louis, MO</p>
        <p className="text-xs text-primary-foreground/30 inline-flex items-center gap-1">
          {t('footer.madeWith')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
