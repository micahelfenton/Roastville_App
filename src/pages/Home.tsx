import { motion } from "framer-motion";
import MembershipCard from "@/components/MembershipCard";
import CoffeePlant from "@/components/CoffeePlant";
import heroImage from "@/assets/hero-coffee.jpg";

const Home = () => {
  // Mock user data
  const user = {
    name: "Alex Chen",
    tier: "Bloom",
    memberId: "RV-2024-0847",
    defaultOrder: "Flat White, Oat Milk",
    streakDays: 14,
    isNearby: true,
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-16">
      {/* Hero section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={heroImage}
          alt="Roastville Coffee"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="absolute bottom-4 left-5">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground"
          >
            Good morning
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-2xl text-foreground"
          >
            {user.name}
          </motion.h2>
        </div>
      </div>

      <div className="px-5 space-y-8 mt-6">
        {/* Membership Card */}
        <MembershipCard
          name={user.name}
          tier={user.tier}
          memberId={user.memberId}
          defaultOrder={user.defaultOrder}
          isNearby={user.isNearby}
        />

        {/* Quick Action - Default Order */}
        {user.isNearby && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-medium text-sm card-elevated transition-all hover:opacity-90"
          >
            Activate Ritual — {user.defaultOrder}
          </motion.button>
        )}

        {/* Seed to Roast Growth */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="py-6"
        >
          <h3 className="font-display text-lg text-center mb-6 text-foreground">
            Seed to Roast
          </h3>
          <CoffeePlant streakDays={user.streakDays} />
        </motion.section>

        {/* Streak stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Current Streak", value: `${user.streakDays} days` },
            { label: "Total Rituals", value: "47" },
            { label: "Coffees Gifted", value: "3" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="p-3 rounded-xl bg-card card-inner-shadow text-center"
            >
              <p className="font-display text-lg text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
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
