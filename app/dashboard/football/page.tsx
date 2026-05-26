"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Goal } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import EvoCoreChat from "@/components/EvoCoreChat";

const suggestions = [
  "Analyse today’s strongest football signals",
  "Which teams are overperforming xG?",
  "Explain the safest football angle today",
  "What should I look for before backing a team?",
];

export default function FootballChatPage() {
  const router = useRouter();
  const { user, loading, entitlements } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-white/60">
        Loading Football Intelligence...
      </div>
    );
  }

  return (
    <EvoCoreChat
      title="Football Intelligence"
      subtitle="Ask EvoCore about football matches, team form, xG trends, prediction reasoning, and match risk."
      lockedTitle="Football Intelligence locked"
      lockedDesc="This section requires FootyEvo Pro access. Sign in with the same email you use for FootyEvo."
      unlocked={!!entitlements?.footyEvoPro}
      icon={<Goal size={24} />}
      suggestions={suggestions}
      initialMessage="Welcome to EvoCore Football Intelligence. Ask me about football form, predictions, team trends, match risk, xG, and model reasoning."
      comingNext="This chat connects to the EvoCore API, OpenAI, SportsMonk, and FootyEvo prediction data."
      apiEndpoint="/api/chat/football"
      userName={user.displayName || user.email || "You"}
    />
  );
}