const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm font-bold text-foreground tracking-tight">KIITO</p>
        <nav className="flex gap-6">
          {["Features", "About", "Privacy", "Contact"].map((link) => (
            <a key={link} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {link}
            </a>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">&copy; 2026 KIITO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
