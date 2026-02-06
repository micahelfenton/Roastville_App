import { motion } from "framer-motion";
import { MapPin, Clock, Coffee } from "lucide-react";

interface ArrivingMember {
  id: number;
  name: string;
  avatar: string;
  tier: string;
  defaultOrder: string;
  eta: string;
  distance: string;
}

const ARRIVING: ArrivingMember[] = [
  { id: 1, name: "Sarah K.", avatar: "SK", tier: "Roastmaster", defaultOrder: "Pour Over, Black", eta: "2 min", distance: "150m" },
  { id: 2, name: "Marcus T.", avatar: "MT", tier: "Bloom", defaultOrder: "Flat White, Full Cream", eta: "5 min", distance: "320m" },
  { id: 3, name: "Lina W.", avatar: "LW", tier: "Seed", defaultOrder: "Oat Latte", eta: "8 min", distance: "480m" },
];

const inventoryNeeds = [
  { item: "Full Cream Milk", amount: "12L", urgency: "normal" },
  { item: "Oat Milk", amount: "8L", urgency: "low" },
  { item: "House Blend Beans", amount: "4.2kg", urgency: "normal" },
  { item: "Single Origin (Ethiopia)", amount: "1.8kg", urgency: "high" },
];

const Staff = () => {
  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">☕</span>
          <h1 className="font-display text-3xl text-foreground">Roastville Staff</h1>
        </div>
        <p className="text-muted-foreground">Live member feed — Tablet View</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arriving members */}
        <section>
          <h2 className="font-display text-xl mb-4 flex items-center gap-2 text-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            Approaching Members
          </h2>
          <div className="space-y-3">
            {ARRIVING.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="p-5 rounded-2xl bg-card card-inner-shadow flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold bg-primary text-primary-foreground ${
                    member.tier === "Roastmaster" ? "gold-ring" : ""
                  }`}
                >
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{member.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {member.tier}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Coffee className="w-3.5 h-3.5" />
                    {member.defaultOrder}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {member.eta}
                  </p>
                  <p className="text-xs text-muted-foreground">{member.distance}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Inventory */}
        <section>
          <h2 className="font-display text-xl mb-4 text-foreground">
            24h Inventory Forecast
          </h2>
          <div className="space-y-3">
            {inventoryNeeds.map((item, i) => (
              <motion.div
                key={item.item}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-card card-inner-shadow flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">{item.item}</p>
                  <p className="text-xs text-muted-foreground">Based on active subscribers</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="font-display text-lg text-foreground">{item.amount}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.urgency === "high"
                        ? "bg-destructive"
                        : item.urgency === "normal"
                        ? "bg-accent"
                        : "bg-primary"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-4 rounded-xl bg-card card-inner-shadow text-center">
              <p className="font-display text-2xl text-foreground">127</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Active Members</p>
            </div>
            <div className="p-4 rounded-xl bg-card card-inner-shadow text-center">
              <p className="font-display text-2xl text-foreground">34</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Expected Today</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Staff;
