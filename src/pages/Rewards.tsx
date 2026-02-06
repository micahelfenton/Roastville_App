import { motion } from "framer-motion";
import { Gift, Coffee, Award, Shirt, Star, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Milestone {
  coffees: number;
  label: string;
  tier: string;
  reward: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

const milestones: Milestone[] = [
  { coffees: 5, label: "Seedling", tier: "Seed", reward: "Free coffee on us!", icon: <Coffee className="w-4 h-4" />, unlocked: true },
  { coffees: 15, label: "Sprout", tier: "Seed", reward: "Free pastry with any order", icon: <Gift className="w-4 h-4" />, unlocked: true },
  { coffees: 30, label: "Sapling", tier: "Bloom", reward: "Exclusive tasting event invite", icon: <Star className="w-4 h-4" />, unlocked: false },
  { coffees: 50, label: "Bloom", tier: "Bloom", reward: "Roastville keep cup (limited ed.)", icon: <Coffee className="w-4 h-4" />, unlocked: false },
  { coffees: 75, label: "Roast Ready", tier: "Roastmaster", reward: "Free coffee for a week", icon: <Award className="w-4 h-4" />, unlocked: false },
  { coffees: 100, label: "Roastmaster", tier: "Roastmaster", reward: "Roastville tee + lifetime 10% off", icon: <Shirt className="w-4 h-4" />, unlocked: false },
];

const Rewards = () => {
  const currentCoffees = 47;
  const currentTier = "Bloom";
  const nextMilestone = milestones.find((m) => !m.unlocked) || milestones[milestones.length - 1];
  const progressToNext = Math.min((currentCoffees / nextMilestone.coffees) * 100, 100);

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <div className="px-5">
        <h2 className="font-display text-2xl text-foreground mb-1">Rewards</h2>
        <p className="text-sm text-muted-foreground mb-6">Your journey from seed to roast</p>

        {/* Current progress card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-border/50 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Tier</p>
              <p className="font-display text-xl text-foreground">{currentTier}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl text-primary">{currentCoffees}</p>
              <p className="text-xs text-muted-foreground">total coffees</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Next: {nextMilestone.label}</span>
              <span>{nextMilestone.coffees - currentCoffees} to go</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
          </div>
        </motion.div>

        {/* Milestones */}
        <div className="space-y-3">
          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.coffees}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                milestone.unlocked
                  ? "bg-primary/5 border-primary/20"
                  : currentCoffees >= milestone.coffees * 0.7
                  ? "bg-card border-border/50"
                  : "bg-card/50 border-border/30 opacity-60"
              }`}
            >
              {/* Stage indicator */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  milestone.unlocked
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {milestone.unlocked ? <Check className="w-4 h-4" /> : milestone.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground">{milestone.label}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {milestone.coffees} coffees
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{milestone.reward}</p>
              </div>

              {milestone.unlocked && (
                <span className="text-xs text-primary font-medium flex-shrink-0">Claimed</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
