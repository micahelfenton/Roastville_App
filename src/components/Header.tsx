const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">☕</div>
          <h1 className="font-display text-lg tracking-tight text-foreground">Roastville</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-4 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            <a href="/community" className="hover:text-foreground">Community</a>
            <a href="/membership" className="hover:text-foreground">Membership</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#58b77a] breathing-glow" />
            <span className="text-xs text-muted-foreground">Open</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
