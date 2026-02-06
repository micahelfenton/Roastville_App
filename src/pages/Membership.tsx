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

        <section className="mt-8">
          <h3 className="font-display text-xl text-foreground mb-3">Choose a plan</h3>
          <p className="text-sm text-muted-foreground mb-6">Pick the membership that fits your ritual.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{
              id: 'Seed',
              name: 'Seed',
              price: 55,
              desc: 'Intro plan — perfect to start your ritual',
            },{
              id: 'Bloom',
              name: 'Bloom',
              price: 100,
              desc: 'Most popular — extra perks and priority',
            },{
              id: 'Coffeeholic',
              name: 'Coffeeholic',
              price: 130,
              desc: 'For the true aficionado — VIP benefits',
            }].map((plan) => (
              <div key={plan.id} className={`p-4 rounded-xl ${user.tier === plan.id ? 'border-2 border-primary bg-primary/6' : 'bg-card'} text-foreground`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">{plan.name}</p>
                    <p className="font-display text-lg mt-1">${plan.price}/month</p>
                  </div>
                  {user.tier === plan.id && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground">Current</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                <div className="flex gap-2">
                  <button className={`flex-1 py-2 rounded-lg font-medium ${user.tier === plan.id ? 'opacity-70 cursor-default' : 'bg-primary text-primary-foreground'}`}>
                    {user.tier === plan.id ? 'Your plan' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

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
