"use client";

import Link from "next/link";
import { Bot, Goal, ShieldCheck, Trophy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AccessPage() {
  const { user, entitlements } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#6431FD]/20 bg-[#8B39FB]/10 px-3 py-1 text-sm text-[#C4B5FD]">
          <ShieldCheck size={14} />
          EvoCore Access
        </div>

        <h1 className="mt-5 text-4xl font-semibold md:text-5xl">
          Access is unlocked through your Evo products.
        </h1>

        <p className="mt-4 text-lg leading-8 text-white/62">
          EvoCore checks your FootyEvo Pro and RaceEvo Pro access using the email
          you sign in with.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <AccessCard
          title="Football Intelligence"
          product="FootyEvo Pro"
          icon={<Goal size={24} />}
          unlocked={!!entitlements?.footyEvoPro}
          href="/dashboard/football"
          subscribeHref="https://footyevo.com"
        />

        <AccessCard
          title="Racing Intelligence"
          product="RaceEvo Pro"
          icon={<Trophy size={24} />}
          unlocked={!!entitlements?.raceEvoPro}
          href="/dashboard/racing"
          subscribeHref="https://raceevo.com"
        />
      </div>

      {!user && (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Not signed in</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">
            Sign in to check whether your account has EvoCore access.
          </p>

          <Link href="/login" className="evo-button-primary mt-5">
            <Bot size={16} />
            Launch EvoCore
          </Link>
        </div>
      )}
    </div>
  );
}

function AccessCard({
  title,
  product,
  icon,
  unlocked,
  href,
  subscribeHref,
}: {
  title: string;
  product: string;
  icon: React.ReactNode;
  unlocked: boolean;
  href: string;
  subscribeHref: string;
}) {
  return (
    <div className="evo-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6431FD]/20 bg-[#8B39FB]/10 text-[#C4B5FD]">
          {icon}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            unlocked
              ? "border border-green-400/20 bg-green-400/10 text-green-200"
              : "border border-white/10 bg-white/[0.03] text-white/45"
          }`}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>

      <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/55">
        Requires {product}. Once active, EvoCore unlocks this intelligence area.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {unlocked ? (
          <Link href={href} className="evo-button-primary">
            Open
          </Link>
        ) : (
          <a href={subscribeHref} target="_blank" rel="noreferrer" className="evo-button-outline">
            View {product}
          </a>
        )}
      </div>
    </div>
  );
}