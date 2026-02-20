const Footer = () => (
  <footer className="bg-fiesta-dark text-primary-foreground/70 py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="font-fredoka text-xl text-primary-foreground mb-2">🪅 Dulceria Medina</p>
      <p className="text-sm">© {new Date().getFullYear()} Dulceria Medina — St. Louis, MO</p>
      <p className="text-xs mt-2 text-primary-foreground/40">Made with ❤️ and lots of chamoy</p>
    </div>
  </footer>
);

export default Footer;
