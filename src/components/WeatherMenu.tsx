import { Cloud, Sun, CloudRain } from "lucide-react";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  description: string;
  tags: string[];
}

const coldDrinks: MenuItem[] = [
  { name: "Cold Brew", description: "16hr steeped, silky smooth", tags: ["Popular", "Iced"] },
  { name: "Iced Oat Latte", description: "Double shot over oat milk", tags: ["Vegan"] },
  { name: "Espresso Tonic", description: "Sparkling citrus espresso", tags: ["Refreshing"] },
];

const hotDrinks: MenuItem[] = [
  { name: "Flat White", description: "Velvety microfoam, double ristretto", tags: ["Classic"] },
  { name: "Pour Over", description: "Single origin, hand poured", tags: ["Ritual"] },
  { name: "Chai Latte", description: "House-spiced, steamed milk", tags: ["Warming"] },
];

const WeatherMenu = () => {
  // Simulated temperature (Sydney weather)
  const temp = 31; // Simulating > 28°C
  const isHot = temp > 28;
  const isCold = temp < 15;
  const priorityDrinks = isHot ? coldDrinks : hotDrinks;
  const secondaryDrinks = isHot ? hotDrinks : coldDrinks;

  return (
    <div className="space-y-6">
      {/* Weather context */}
      <div className="flex items-center gap-3 px-1">
        {isHot ? (
          <Sun className="w-5 h-5 text-accent" />
        ) : isCold ? (
          <Cloud className="w-5 h-5 text-muted-foreground" />
        ) : (
          <CloudRain className="w-5 h-5 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          {temp}°C in Marrickville — {isHot ? "Cold brews recommended" : "Time for something warm"}
        </p>
      </div>

      {/* Priority drinks */}
      <div>
        <h3 className="font-display text-xl mb-3">
          {isHot ? "Beat the Heat" : "Warm Your Soul"}
        </h3>
        <div className="space-y-3">
          {priorityDrinks.map((drink, i) => (
            <motion.div
              key={drink.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-card card-inner-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{drink.name}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{drink.description}</p>
                </div>
                <div className="flex gap-1.5">
                  {drink.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Secondary drinks */}
      <div>
        <h3 className="font-display text-lg text-muted-foreground mb-3">
          {isHot ? "Also Available" : "Cool Options"}
        </h3>
        <div className="space-y-2">
          {secondaryDrinks.map((drink) => (
            <div key={drink.name} className="p-3 rounded-lg bg-secondary/50">
              <h4 className="text-sm font-medium text-foreground">{drink.name}</h4>
              <p className="text-xs text-muted-foreground">{drink.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherMenu;
