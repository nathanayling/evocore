"use client";

import Link from "next/link";
import { Bot, Goal, ShieldCheck, Trophy, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AccessPage() {
  const { user, entitlements } = useAuth();
  const [launchModalOpen, setLaunchModalOpen] = useState(false);

  return (
    <>
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
              EvoCore access is being prepared as part of the wider Evo intelligence
              infrastructure.
            </p>

            <button
              type="button"
              onClick={() => setLaunchModalOpen(true)}
              className="evo-button-primary mt-5"
            >
              <Bot size={16} />
              Launch EvoCore
            </button>
          </div>
        )}
      </div>

      {launchModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLaunchModalOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <div className="relative z-[101] w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B0D14] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setLaunchModalOpen(false)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:text-white"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
              <Bot size={14} />
              Beta Infrastructure
            </div>

            <h2 className="pr-8 text-2xl font-semibold text-white">
              EvoCore is preparing the next layer of sports intelligence.
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/60">
              EvoCore is currently being configured to enhance the AI infrastructure
              powering our platform ecosystem. We’re preparing advanced data pipelines,
              contextual intelligence models, automated insight generation, and secure
              cross-platform access for RaceEvo, FootyEvo and OddsEvo.
            </p>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Access will open once the intelligence layer has completed final testing,
              performance validation and platform-level integration.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-sm font-semibold text-white">
                Coming soon
              </div>
              <div className="mt-1 text-xs leading-5 text-white/45">
                AI orchestration, signal processing, platform memory, and sports-specific
                intelligence modules are being prepared.
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLaunchModalOpen(false)}
              className="mt-6 w-full rounded-xl bg-[#8B39FB] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
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
          <a
            href={subscribeHref}
            target="_blank"
            rel="noreferrer"
            className="evo-button-outline"
          >
            View {product}
          </a>
        )}
      </div>
    </div>
  );
}