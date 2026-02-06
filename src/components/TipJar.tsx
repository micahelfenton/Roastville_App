import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const tipAmounts = [2, 5, 10];

const TipJar = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (selected !== null) setSent(true);
  };

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 border border-border/50">
      <div className="flex items-center gap-3 mb-3">
        <Heart className="w-5 h-5 text-accent" />
        <h3 className="font-display text-lg text-foreground">Tip the Team</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Show some love to the baristas who make the magic.
      </p>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div key="select" className="space-y-3">
            <div className="flex gap-2">
              {tipAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelected(amount)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    selected === amount
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border/50 text-foreground hover:border-primary/40"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSend}
              disabled={selected === null}
              className="w-full py-3 rounded-xl bg-accent text-accent-foreground text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40"
            >
              Send Tip ❤️
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-3"
          >
            <p className="text-sm text-accent font-medium">☕ ${selected} tip sent!</p>
            <p className="text-xs text-muted-foreground mt-1">The team thanks you!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TipJar;
