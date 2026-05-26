"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ArrowRight,
  Bot,
  Goal,
  Lock,
  LogOut,
  Trophy,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, entitlements, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-white/60">
        Loading EvoCore...
      </div>
    );
  }

  const hasAnyAccess =
    entitlements?.footyEvoPro || entitlements?.raceEvoPro;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="text-sm text-[#C4B5FD]">EvoCore Dashboard</div>
          <h1 className="mt-2 text-4xl font-semibold">
            Welcome back{user.displayName ? `, ${user.displayName}` : ""}.
          </h1>
          <p className="mt-3 text-white/60">
            Signed in as {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="evo-button-outline"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>

      {!hasAnyAccess && (
        <div className="mt-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <div className="flex items-start gap-4">
            <Lock className="mt-1 text-yellow-200" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-100">
                No Pro access found
              </h2>
              <p className="mt-2 text-sm leading-6 text-yellow-100/70">
                EvoCore could not find FootyEvo Pro or RaceEvo Pro access for
                this email. Make sure you signed in with the same email you used
                to subscribe.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <AccessCard
          title="Football Intelligence"
          desc="Ask EvoCore about football matches, form, predictions, risks, and model reasoning."
          icon={<Goal size={24} />}
          unlocked={!!entitlements?.footyEvoPro}
          href="/dashboard/football"
        />

        <AccessCard
          title="Racing Intelligence"
          desc="Ask EvoCore about race cards, horse profiles, trainer form, pace setup, and value angles."
          icon={<Trophy size={24} />}
          unlocked={!!entitlements?.raceEvoPro}
          href="/dashboard/racing"
        />
      </div>
    </div>
  );
}

function AccessCard({
  title,
  desc,
  icon,
  unlocked,
  href,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  unlocked: boolean;
  href: string;
}) {
  return (
    <div className="evo-card p-6">
      <div className="flex items-start justify-between gap-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6431FD]/20 bg-[#6431FD]/10 text-[#C4B5FD]">
          {icon}
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            unlocked
              ? "border border-green-400/20 bg-green-400/10 text-green-200"
              : "border border-white/10 bg-white/[0.03] text-white/45"
          }`}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </div>
      </div>

      <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/58">{desc}</p>

      {unlocked ? (
        <Link href={href} className="evo-button-primary mt-6">
          <Bot size={16} />
          <span>Open chat</span>
          <ArrowRight size={16} />
        </Link>
      ) : (
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/40">
          <Lock size={16} />
          <span>Requires Pro access</span>
        </div>
      )}
    </div>
  );
}