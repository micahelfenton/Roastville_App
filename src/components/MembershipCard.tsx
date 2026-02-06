import { motion } from "framer-motion";

interface MembershipCardProps {
  name: string;
  tier: string;
  memberId: string;
  defaultOrder: string;
  isNearby: boolean;
}

const tierColors: Record<string, string> = {
  Seed: "from-primary/80 to-primary",
  Bloom: "from-primary to-brick-green-light",
  Roastmaster: "from-primary via-brick-green-light to-gold/30",
};

const MembershipCard = ({ name, tier, memberId, defaultOrder, isNearby }: MembershipCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="shimmer-card rounded-2xl overflow-hidden"
    >
      <div className={`bg-gradient-to-br ${tierColors[tier] || tierColors.Seed} p-6 text-primary-foreground relative`}>
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-80 font-body">Roastville Coffee</p>
            <h3 className="font-display text-2xl mt-1">{name}</h3>
          </div>
          {isNearby && (
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brick-green-glow breathing-glow" />
              <span className="text-xs opacity-80">Nearby</span>
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] opacity-60 mb-1">Default Order</p>
            <p className="text-sm font-medium">{defaultOrder}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.15em] opacity-60 mb-1">{tier} Member</p>
            <p className="text-xs font-mono opacity-70">{memberId}</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full border border-primary-foreground/10" />
        <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-primary-foreground/10" />
      </div>
    </motion.div>
  );
};

export default MembershipCard;
