import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Goal,
  LineChart,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const intelligenceAreas = [
  {
    title: "Football Intelligence",
    label: "FootyEvo",
    desc: "AI match analysis, fixture reasoning, form context, signal summaries, and risk checks.",
    icon: Goal,
    href: "/dashboard/football",
    status: "Live",
  },
  {
    title: "Racing Intelligence",
    label: "RaceEvo",
    desc: "Racecard analysis, horse profiles, likely winners, value angles, and structured signal cards.",
    icon: Trophy,
    href: "/dashboard/racing",
    status: "Live",
  },
  {
    title: "Odds Intelligence",
    label: "OddsEvo",
    desc: "Market movement, odds comparison, price shifts, value detection, and market signal tracking.",
    icon: Target,
    href: "/access",
    status: "Planned",
  },
];

const capabilities = [
  "Ask natural-language questions about sports data",
  "Turn raw API data into structured intelligence cards",
  "Explain predictions, risk factors, and value angles",
  "Unlock access based on FootyEvo Pro and RaceEvo Pro",
];

export default function IntelligencePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(100,49,253,0.28),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(100,49,253,0.12),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,8,13,0.4),#07080D)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-18 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6431FD]/20 bg-[#8B39FB]/10 px-3 py-1 text-sm text-[#C4B5FD]">
              <BrainCircuit size={14} />
              EvoCore Intelligence
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              One AI layer powering the Evo sports products.
            </h1>

            <p className="mt-5 text-lg leading-8 text-white/62 md:text-xl">
              EvoCore turns football, racing, and odds data into structured
              analysis, clear reasoning, and interactive intelligence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="evo-button-primary">
                <Bot size={17} />
                <span>Open Dashboard</span>
                <ArrowRight size={17} />
              </Link>

              <Link href="/access" className="evo-button-outline">
                <span>Check Access</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {intelligenceAreas.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="evo-card evo-card-hover p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6431FD]/20 bg-[#8B39FB]/10 text-[#C4B5FD]">
                    <Icon size={22} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Live"
                        ? "border border-green-400/20 bg-green-400/10 text-green-200"
                        : "border border-white/10 bg-white/[0.03] text-white/45"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]/80">
                  {item.label}
                </div>

                <h2 className="mt-3 text-2xl font-semibold">{item.title}</h2>

                <p className="mt-3 text-sm leading-6 text-white/55">
                  {item.desc}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/65">
                  <span>Open intelligence</span>
                  <ArrowRight size={15} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0D14] p-6 md:p-10">
          <div className="absolute right-[-120px] top-[-160px] h-80 w-80 rounded-full bg-[#8B39FB]/18 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6431FD]/20 bg-[#8B39FB]/10 px-3 py-1 text-sm text-[#C4B5FD]">
                <Zap size={14} />
                How EvoCore works
              </div>

              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
                Data first. AI second. Clean output always.
              </h2>

              <p className="mt-3 text-white/62">
                EvoCore is designed to fetch sports data, compress it into useful
                context, then use AI to explain what matters in a clean, readable
                format.
              </p>
            </div>

            <div className="grid gap-3">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/65"
                >
                  <LineChart size={16} className="text-[#C4B5FD]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}