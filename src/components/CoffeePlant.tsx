import { motion } from "framer-motion";

interface CoffeePlantProps {
  streakDays: number;
}

const CoffeePlant = ({ streakDays }: CoffeePlantProps) => {
  const getTier = () => {
    if (streakDays >= 22) return { name: "Roastmaster", emoji: "☕", stage: 3 };
    if (streakDays >= 8) return { name: "Sprout", emoji: "🌿", stage: 2 };
    return { name: "Seed", emoji: "🌱", stage: 1 };
  };

  const tier = getTier();

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center gap-3"
    >
      {/* Plant visualization */}
      <div className="relative">
        {/* Glow ring */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            tier.stage === 3 ? "breathing-glow" : ""
          }`}
        />

        {/* Plant container */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Soil/pot */}
          <div className="absolute bottom-4 w-20 h-8 rounded-b-2xl bg-primary/20" />

          {/* Stem */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: tier.stage === 1 ? 20 : tier.stage === 2 ? 50 : 70 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-12 w-1 bg-brick-green-light rounded-full origin-bottom"
          />

          {/* Leaves / emoji representation */}
          <motion.div
            className="text-6xl animate-float"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          >
            {tier.emoji}
          </motion.div>
        </div>
      </div>

      {/* Tier label */}
      <div className="text-center">
        <p className="font-display text-lg text-foreground">{tier.name}</p>
        <p className="text-sm text-muted-foreground">
          Day {streakDays} of your ritual
        </p>
      </div>

      {/* Progress to next tier */}
      {tier.stage < 3 && (
        <div className="w-full max-w-[200px]">
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  tier.stage === 1
                    ? (streakDays / 7) * 100
                    : ((streakDays - 7) / 14) * 100
                }%`,
              }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {tier.stage === 1 ? 7 - streakDays : 21 - streakDays} days to{" "}
            {tier.stage === 1 ? "Sprout" : "Roastmaster"}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CoffeePlant;
