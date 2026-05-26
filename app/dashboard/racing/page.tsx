"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Trophy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import EvoCoreChat from "@/components/EvoCoreChat";

const suggestions = [
  "Analyse today’s strongest racing signals",
  "Which horse has the best profile in this race?",
  "Find the key risk in this race card",
  "Explain the strongest value angle today",
];

export default function RacingChatPage() {
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
        Loading Racing Intelligence...
      </div>
    );
  }

  return (
    <EvoCoreChat
      title="Racing Intelligence"
      subtitle="Ask EvoCore about race cards, horse profiles, trainer form, pace setup, market movement, and value angles."
      lockedTitle="Racing Intelligence locked"
      lockedDesc="This section requires RaceEvo Pro access. Sign in with the same email you use for RaceEvo."
      unlocked={!!entitlements?.raceEvoPro}
      icon={<Trophy size={24} />}
      suggestions={suggestions}
      initialMessage="Welcome to EvoCore Racing Intelligence. Ask me about race cards, horse profiles, pace setup, trainer form, market movement, and value angles."
      comingNext="This chat connects to the EvoCore API, OpenAI, The Racing API, and RaceEvo prediction data."
      apiEndpoint="/api/chat/racing"
      userName={user.displayName || user.email || "You"}
    />
  );
}