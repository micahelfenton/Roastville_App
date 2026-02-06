import { useState } from "react";
import CommunityFeed from "@/components/CommunityFeed";
import PayItForward from "@/components/PayItForward";
import TipJar from "@/components/TipJar";
import Leaderboard from "@/components/Leaderboard";

const tabs = ["Feed", "Top Caffeine"] as const;

const Community = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Feed");

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <div className="px-5">
        <h2 className="font-display text-2xl text-foreground mb-4">The Circuit</h2>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeTab === tab
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "Top Caffeine" && "☕ "}{tab}
            </button>
          ))}
        </div>

        {activeTab === "Feed" ? (
          <div className="space-y-6">
            <PayItForward />
            <TipJar />
            <CommunityFeed />
          </div>
        ) : (
          <Leaderboard />
        )}
      </div>
    </div>
  );
};

export default Community;
