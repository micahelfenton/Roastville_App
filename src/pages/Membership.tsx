import { motion } from "framer-motion";
import MembershipCard from "@/components/MembershipCard";

const Membership = () => {
  const user = {
    name: "Alex Chen",
    tier: "Bloom",
    memberId: "RV-2024-0847",
    defaultOrder: "Flat White, Oat Milk",
    isNearby: true,
    memberSince: '2021-06-15',
    orderCount: 47,
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <div className="px-5">
        <h2 className="font-display text-2xl text-foreground mb-1">Membership</h2>
        <p className="text-sm text-muted-foreground mb-6">Your Roastville card</p>

        <MembershipCard
          name={user.name}
          tier={user.tier}
          memberId={user.memberId}
          defaultOrder={user.defaultOrder}
          isNearby={user.isNearby}
          memberSince={user.memberSince}
          orderCount={user.orderCount}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 space-y-3"
        >
          {[
            { label: "Subscription", value: "Bloom — $45/fn" },
            { label: "Default Order", value: "Flat White, Oat Milk" },
            { label: "Payment", value: "•••• 4242" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between p-4 rounded-xl bg-card card-inner-shadow">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;
