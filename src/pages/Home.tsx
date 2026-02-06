import { motion } from "framer-motion";
import CoffeePlant from "@/components/CoffeePlant";
import roastvilleBuilding from "@/assets/roastville-building.png";

const Home = () => {
  const user = {
    name: "Alex Chen",
    tier: "Bloom",
    memberId: "RV-2024-0847",
    defaultOrder: "Flat White, Oat Milk",
    streakDays: 14,
    isNearby: true,
    memberSince: '2021-06-15',
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-16">
      {/* Hero with Roastville building */}
      <div className="relative h-[42vh] sm:h-[52vh] md:h-[64vh] overflow-hidden">
        <img
          src={roastvilleBuilding}
          alt="Roastville Coffee Roasters"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: '50% 35%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/6" />
        <div className="absolute bottom-4 left-5">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-white/90 drop-shadow-sm"
          >
            Good morning
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-2xl text-white drop-shadow-md"
          >
            {user.name}
          </motion.h2>
        </div>
      </div>

      <div className="px-5 space-y-6 mt-4">
        {/* Membership card moved to Membership page per design */}

        {user.isNearby && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium text-sm card-elevated transition-all hover:opacity-90"
          >
            Activate Ritual — {user.defaultOrder}
          </motion.button>
        )}

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="py-4"
        >
          <h3 className="font-display text-lg text-center mb-4 text-foreground">
            Seed to Roast
          </h3>
          <CoffeePlant streakDays={user.streakDays} />
        </motion.section>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Streak", value: `${user.streakDays}d` },
            { label: "Rituals", value: "47" },
            { label: "Gifted", value: "3" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="p-3 rounded-xl bg-card card-inner-shadow text-center"
            >
              <p className="font-display text-lg text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
