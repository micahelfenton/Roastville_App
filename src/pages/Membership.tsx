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
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          {/* Left: Card */}
          <div className="flex justify-center lg:justify-start lg:sticky lg:top-24">
            <div className="w-full max-w-[380px]">
              <div className="mb-6 lg:mb-8">
                <h2 className="font-display text-2xl text-foreground">Membership</h2>
                <p className="text-sm text-muted-foreground mt-1">Your Roastville card</p>
              </div>

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
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 space-y-2 text-center lg:text-left"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium text-foreground">{new Date(user.memberSince).toLocaleDateString()}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4">Total Orders</p>
                <p className="text-sm font-medium text-foreground">{user.orderCount}</p>
              </motion.div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            {/* Simple recommended title */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="max-w-3xl">
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Plan that fits your habits</p>
                <p className="text-lg text-foreground mt-1">Something that works for you.</p>
              </div>
            </motion.div>

            {/* Plans - polished cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              }].map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className={`flex flex-col justify-between p-6 rounded-2xl transition-all h-full ${user.tier === plan.id ? 'bg-gradient-to-br from-white/6 to-white/3 border border-primary shadow-lg' : 'bg-card border border-border hover:shadow-md'} text-foreground`}
                >
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{plan.name}</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-display text-2xl">${plan.price}</span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{plan.desc}</p>
                  </div>

                  <div className="mt-6">
                    {user.tier === plan.id ? (
                      <button className="w-full py-2 rounded-lg bg-transparent border border-primary text-primary font-medium opacity-80 cursor-default">Your plan</button>
                    ) : (
                      <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-md active:scale-95">Select</button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Settings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="space-y-3 max-w-3xl"
            >
              <h3 className="font-display text-lg text-foreground mb-4">Account</h3>
              {[
                { label: "Subscription", value: `${user.tier} — $${user.tier === 'Bloom' ? 100 : user.tier === 'Seed' ? 55 : 130}/mo` },
                { label: "Payment Method", value: "•••• 4242" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center p-4 rounded-xl bg-card border border-border">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
