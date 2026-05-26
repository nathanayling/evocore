"use client";

import { useAuth } from "@/context/AuthContext";
import { Bot, ShieldCheck, UserCircle } from "lucide-react";

export default function SettingsPage() {
  const { user, entitlements } = useAuth();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-4xl font-semibold">Settings</h1>
      <p className="mt-3 text-white/60">
        Manage your EvoCore account and access status.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="evo-card p-6">
          <UserCircle className="text-[#C4B5FD]" size={28} />
          <h2 className="mt-4 text-2xl font-semibold">Account</h2>
          <p className="mt-2 text-sm text-white/55">
            {user?.email || "Not signed in"}
          </p>
        </div>

        <div className="evo-card p-6">
          <ShieldCheck className="text-[#C4B5FD]" size={28} />
          <h2 className="mt-4 text-2xl font-semibold">Access</h2>
          <div className="mt-4 space-y-2 text-sm text-white/60">
            <p>FootyEvo Pro: {entitlements?.footyEvoPro ? "Unlocked" : "Locked"}</p>
            <p>RaceEvo Pro: {entitlements?.raceEvoPro ? "Unlocked" : "Locked"}</p>
            <p>OddsEvo Pro: {entitlements?.oddsEvoPro ? "Unlocked" : "Coming soon"}</p>
          </div>
        </div>

        <div className="evo-card p-6 md:col-span-2">
          <Bot className="text-[#C4B5FD]" size={28} />
          <h2 className="mt-4 text-2xl font-semibold">EvoCore Preferences</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">
            Personalised preferences, saved chats, and notification settings will be added here.
          </p>
        </div>
      </div>
    </div>
  );
}