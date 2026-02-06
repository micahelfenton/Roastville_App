import WeatherMenu from "@/components/WeatherMenu";

const Menu = () => {
  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <div className="px-5">
        <h2 className="font-display text-2xl text-foreground mb-1">Today's Menu</h2>
        <p className="text-sm text-muted-foreground mb-6">Curated by the weather gods</p>
        <WeatherMenu />
      </div>
    </div>
  );
};

export default Menu;
