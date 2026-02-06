import CommunityFeed from "@/components/CommunityFeed";
import PayItForward from "@/components/PayItForward";

const Community = () => {
  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <div className="px-5">
        <h2 className="font-display text-2xl text-foreground mb-1">The Circuit</h2>
        <p className="text-sm text-muted-foreground mb-6">Your coffee community</p>

        <div className="space-y-6">
          <PayItForward />
          <CommunityFeed />
        </div>
      </div>
    </div>
  );
};

export default Community;
