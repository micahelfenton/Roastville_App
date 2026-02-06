import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

interface Post {
  id: number;
  user: string;
  tier: "Seed" | "Bloom" | "Roastmaster";
  avatar: string;
  caption: string;
  mood: string;
  toasts: number;
  time: string;
  image?: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    user: "Sarah K.",
    tier: "Roastmaster",
    avatar: "SK",
    caption: "Day 45 of the ritual. This pour-over hits different when the sun's out ☀️",
    mood: "Blissful",
    toasts: 23,
    time: "2h ago",
  },
  {
    id: 2,
    user: "Marcus T.",
    tier: "Bloom",
    avatar: "MT",
    caption: "First cold brew of the season. Marrickville summer is officially here.",
    mood: "Energised",
    toasts: 15,
    time: "4h ago",
  },
  {
    id: 3,
    user: "Lina W.",
    tier: "Seed",
    avatar: "LW",
    caption: "Just joined Roastville! The kimchi waffles are insane 🧇",
    mood: "Excited",
    toasts: 8,
    time: "6h ago",
  },
];

const moodColors: Record<string, string> = {
  Blissful: "bg-brick-green-glow/15 text-brick-green-glow",
  Energised: "bg-accent/15 text-accent",
  Excited: "bg-gold/15 text-gold",
  Chill: "bg-primary/15 text-primary",
};

const CommunityFeed = () => {
  const [toasted, setToasted] = useState<Set<number>>(new Set());

  const handleToast = (postId: number) => {
    setToasted((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {MOCK_POSTS.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-5 rounded-2xl bg-card card-inner-shadow"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-primary text-primary-foreground ${
                post.tier === "Roastmaster" ? "gold-ring" : ""
              }`}
            >
              {post.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-foreground">{post.user}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${moodColors[post.mood] || "bg-secondary text-muted-foreground"}`}>
                  {post.mood}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{post.time}</span>
            </div>
          </div>

          {/* Content */}
          <p className="text-sm text-foreground/90 leading-relaxed mb-4">{post.caption}</p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleToast(post.id)}
              className="toast-button flex items-center gap-1.5 text-sm"
            >
              <AnimatePresence mode="wait">
                {toasted.has(post.id) ? (
                  <motion.span
                    key="toasted"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="text-base"
                  >
                    🥂
                  </motion.span>
                ) : (
                  <motion.span
                    key="untoasted"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-base opacity-50"
                  >
                    🍻
                  </motion.span>
                )}
              </AnimatePresence>
              <span className={toasted.has(post.id) ? "text-accent font-medium" : "text-muted-foreground"}>
                {post.toasts + (toasted.has(post.id) ? 1 : 0)}
              </span>
            </button>

            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Reply</span>
            </button>

            <button className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CommunityFeed;
