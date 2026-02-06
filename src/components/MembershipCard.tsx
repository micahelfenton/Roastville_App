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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shimmer-card rounded-2xl overflow-hidden"
    >
      <div className={`bg-gradient-to-br ${tierColors[tier] || tierColors.Seed} p-4 text-primary-foreground relative`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-70 font-body">Roastville</p>
            <h3 className="font-display text-lg mt-0.5">{name}</h3>
          </div>
          {isNearby && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-brick-green-glow breathing-glow" />
              <span className="text-[10px] opacity-70">Nearby</span>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider opacity-50 mb-0.5">Order</p>
            <p className="text-xs font-medium">{defaultOrder}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider opacity-50 mb-0.5">{tier}</p>
            <p className="text-[10px] font-mono opacity-60">{memberId}</p>
          </div>
        </div>

        <div className="absolute top-3 right-3 w-10 h-10 rounded-full border border-primary-foreground/10" />
      </div>
    </motion.div>
  );
};

export default MembershipCard;
