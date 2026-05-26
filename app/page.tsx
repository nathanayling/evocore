import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  DatabaseZap,
  Goal,
  Lock,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const platforms = [
  {
    name: "FootyEvo",
    label: "Football Intelligence",
    desc: "AI match analysis, team form, prediction reasoning, value signals, and football data chat.",
    icon: Goal,
    href: "https://footyevo.com",
  },
  {
    name: "RaceEvo",
    label: "Racing Intelligence",
    desc: "Race cards, horse profiles, trainer form, pace setup, market movement, and AI race analysis.",
    icon: Trophy,
    href: "https://raceevo.com",
  },
  {
    name: "OddsEvo",
    label: "Odds Intelligence",
    desc: "Odds movement, market signals, betting angles, value detection, and cross-market intelligence.",
    icon: Target,
    href: "https://oddsevo.com",
  },
];

const capabilities = [
  {
    title: "Ask the Data",
    desc: "Ask natural-language questions about football, racing, odds, form, and predictions.",
    icon: MessageSquareText,
  },
  {
    title: "Prediction Explainers",
    desc: "Turn raw probabilities and model signals into clear, readable reasoning.",
    icon: BrainCircuit,
  },
  {
    title: "Live Data Context",
    desc: "Designed to connect SportsMonk, racing data, odds feeds, and your own models.",
    icon: DatabaseZap,
  },
  {
    title: "Pro Entitlement Layer",
    desc: "Unlock access based on FootyEvo Pro, RaceEvo Pro, or future Evo plans.",
    icon: Lock,
  },
];

const prompts = [
  "Analyse today’s strongest football signals",
  "Explain why this team is favoured",
  "Find the key risk in this race",
  "Is there a value angle in this market?",
];

const metrics = [
  { label: "Products", value: "3" },
  { label: "AI Layer", value: "1" },
  { label: "Access", value: "Pro" },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-80px)] border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(100,49,253,0.32),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(100,49,253,0.14),transparent_28%),linear-gradient(to_bottom,#07080D,#07080D)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,8,13,0.25),#07080D_88%)]" />

        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6431FD] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_.95fr] md:items-center md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6431FD]/25 bg-[#6431FD]/10 px-3 py-1 text-sm text-[#C4B5FD]">
              <Sparkles size={14} />
              <span>The intelligence layer behind Evo Sports Intelligence</span>
            </div>

            <div className="mt-7 max-w-lg">
              <Image
                src="/logo.png"
                alt="EvoCore"
                width={520}
                height={160}
                priority
                className="h-auto w-full max-w-[420px] object-contain"
              />
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              Talk to the data behind football, racing, and odds.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
              EvoCore is the shared AI intelligence engine powering smarter
              analysis across FootyEvo, RaceEvo, and OddsEvo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="evo-button-primary">
                <Bot size={17} />
                <span>Launch EvoCore</span>
                <ArrowRight size={17} />
              </Link>

              <Link href="#platforms" className="evo-button-outline">
                <span>Explore ecosystem</span>
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {metrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3"
                >
                  <div className="text-2xl font-semibold">{item.value}</div>
                  <div className="mt-1 text-xs text-white/45">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[#6431FD]/20 blur-3xl" />

            <div className="evo-card relative p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xs tracking-[0.35em] text-white/35">
                    LIVE AI INTERFACE
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold">Ask EvoCore</h2>
                </div>

                <div className="rounded-full border border-[#6431FD]/25 bg-[#6431FD]/10 px-3 py-1 text-xs font-semibold text-[#C4B5FD]">
                  Preview
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/35 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#6431FD]/15 text-[#C4B5FD]">
                    <Bot size={19} />
                  </div>

                  <div>
                    <p className="text-sm leading-6 text-white/82">
                      I can analyse football matches, racing cards, market
                      movement, form trends, prediction reasoning, and risk
                      factors using Evo data.
                    </p>

                    <div className="mt-4 grid gap-2">
                      {prompts.map((prompt) => (
                        <button
                          key={prompt}
                          className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-left text-sm text-white/65 transition hover:border-[#6431FD]/30 hover:bg-[#6431FD]/10 hover:text-white"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <ChartNoAxesCombined size={18} className="text-[#C4B5FD]" />
                  <div className="mt-3 text-sm font-semibold">
                    Model explanations
                  </div>
                  <p className="mt-1 text-xs leading-5 text-white/50">
                    Understand why a signal, prediction, or market angle matters.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <ShieldCheck size={18} className="text-[#C4B5FD]" />
                  <div className="mt-3 text-sm font-semibold">
                    Pro access ready
                  </div>
                  <p className="mt-1 text-xs leading-5 text-white/50">
                    Unlock based on FootyEvo Pro or RaceEvo Pro entitlement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platforms" className="mx-auto max-w-7xl px-6 py-18">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/55">
              <Zap size={14} className="text-[#C4B5FD]" />
              <span>One engine, multiple products</span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
              Powered by EvoCore
            </h2>

            <p className="mt-3 text-white/62">
              EvoCore gives each Evo platform an AI layer without turning it
              into a separate product users have to understand.
            </p>
          </div>

          <Link href="/login" className="evo-button-outline">
            <span>Launch intelligence layer</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;

            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="evo-card evo-card-hover group p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6431FD]/20 bg-[#6431FD]/10 text-[#C4B5FD]">
                    <Icon size={22} />
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/45">
                    Powered by EvoCore
                  </span>
                </div>

                <div className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#C4B5FD]/80">
                  {platform.label}
                </div>

                <h3 className="mt-3 text-2xl font-semibold">
                  {platform.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/58">
                  {platform.desc}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/65 group-hover:text-white">
                  <span>Visit {platform.name}</span>
                  <ArrowRight size={15} />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0D14] p-6 md:p-10">
          <div className="absolute right-[-120px] top-[-160px] h-80 w-80 rounded-full bg-[#6431FD]/18 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6431FD]/20 bg-[#6431FD]/10 px-3 py-1 text-sm text-[#C4B5FD]">
                <BrainCircuit size={14} />
                <span>Core capabilities</span>
              </div>

              <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
                Built as infrastructure, presented as intelligence.
              </h2>

              <p className="mt-3 text-white/62">
                EvoCore sits underneath the ecosystem and turns structured
                sports data into clear AI-powered insight, explanation, and
                guided analysis.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#6431FD]/20 bg-[#6431FD]/10 text-[#C4B5FD]">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-4 font-semibold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] border border-[#6431FD]/20 bg-[#6431FD]/10 p-8 text-center md:p-12">
          <h2 className="text-3xl font-semibold md:text-4xl">
            One AI layer for the whole Evo ecosystem.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-white/64">
            Start with football and racing analysis, then expand EvoCore into
            odds intelligence, alerts, saved insights, and personalised sports
            data workflows.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/login" className="evo-button-primary">
              <Bot size={17} />
              <span>Launch EvoCore</span>
              <ArrowRight size={17} />
            </Link>

            <Link href="#platforms" className="evo-button-outline">
              View platforms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}