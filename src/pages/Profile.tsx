import { motion } from "framer-motion";
import { Settings, ChevronRight, LogOut } from "lucide-react";

const Profile = () => {
  const user = {
    name: "Alex Chen",
    tier: "Bloom",
    email: "alex@roastville.co",
    memberSince: "Jan 2024",
    totalRituals: 47,
    coffeesGifted: 3,
    plan: "$45/fn",
  };

  const menuItems = [
    { label: "Subscription & Plan", detail: `Bloom — ${user.plan}` },
    { label: "Default Order", detail: "Flat White, Oat Milk" },
    { label: "Notification Preferences", detail: "" },
    { label: "Payment Method", detail: "•••• 4242" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <div className="px-5">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-display">
            AC
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.tier} Member since {user.memberSince}</p>
          </div>
        </motion.div>

        {/* Menu items */}
        <div className="space-y-1 mb-8">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                {item.detail && (
                  <span className="text-xs text-muted-foreground">{item.detail}</span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Sign out */}
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
