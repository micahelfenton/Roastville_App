const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="max-w-md mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">☕</span>
          <h1 className="font-display text-lg tracking-tight text-foreground">Roastville</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brick-green-glow breathing-glow" />
          <span className="text-xs text-muted-foreground">Open</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
