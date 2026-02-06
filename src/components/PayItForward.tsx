import { Gift } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PayItForward = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
      <div className="flex items-center gap-3 mb-3">
        <Gift className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg text-foreground">Marrickville Magic</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Gift a coffee to a random community member. Spread the love.
      </p>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.button
            key="send"
            onClick={() => setSent(true)}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all hover:opacity-90"
          >
            Pay it Forward ☕
          </motion.button>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-3"
          >
            <p className="text-sm text-primary font-medium">🎉 Coffee sent to a lucky member!</p>
            <p className="text-xs text-muted-foreground mt-1">You're making someone's day</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PayItForward;
