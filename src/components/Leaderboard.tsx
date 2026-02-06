import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface LeaderEntry {
  rank: number;
  name: string;
  initials: string;
  tier: "Seed" | "Bloom" | "Roastmaster";
  streak: number;
  toasts: number;
  totalCoffees: number;
}

const MOCK_LEADERBOARD: LeaderEntry[] = [
  { rank: 1, name: "Marcus T.", initials: "MT", tier: "Roastmaster", streak: 22, toasts: 45, totalCoffees: 67 },
  { rank: 2, name: "Emma L.", initials: "EL", tier: "Roastmaster", streak: 18, toasts: 52, totalCoffees: 70 },
  { rank: 3, name: "John D.", initials: "JD", tier: "Bloom", streak: 12, toasts: 34, totalCoffees: 46 },
  { rank: 4, name: "Sarah K.", initials: "SK", tier: "Bloom", streak: 9, toasts: 28, totalCoffees: 37 },
  { rank: 5, name: "Liam R.", initials: "LR", tier: "Seed", streak: 7, toasts: 15, totalCoffees: 22 },
];

const medalEmojis: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

const Leaderboard = () => {
  return (
    <div className="space-y-3">
      {MOCK_LEADERBOARD.map((entry, i) => (
        <motion.div
          key={entry.rank}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-card card-inner-shadow"
        >
          {/* Rank */}
          <div className="w-8 flex-shrink-0 text-center">
            {medalEmojis[entry.rank] ? (
              <span className="text-lg">{medalEmojis[entry.rank]}</span>
            ) : (
              <span className="text-sm font-medium text-muted-foreground">{entry.rank}</span>
            )}
          </div>

          {/* Avatar */}
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-semibold bg-primary text-primary-foreground flex-shrink-0 ${
              entry.tier === "Roastmaster" ? "gold-ring" : ""
            }`}
          >
            {entry.initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm text-foreground truncate">{entry.name}</span>
              {entry.tier === "Roastmaster" && <span className="text-xs">✨</span>}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span>🔥 {entry.streak} streak</span>
              <span>·</span>
              <span>🥂 {entry.toasts} toasts</span>
            </div>
          </div>

          {/* Coffee count */}
          <span className="font-display text-2xl text-foreground flex-shrink-0">{entry.totalCoffees}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default Leaderboard;
