"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  Lock,
  Send,
  Sparkles,
  TrendingUp,
  UserCircle,
} from "lucide-react";
import { auth } from "@/lib/firebase";

type SignalItem = {
  race?: string;
  event?: string;
  selection?: string;
  odds?: string;
  confidence?: "High" | "Medium" | "Low" | string;
  risk?: "High" | "Medium" | "Low" | string;
  reasons?: string[];
  summary?: string;
};

type RiskItem = {
  race?: string;
  event?: string;
  selection?: string;
  risk?: string;
  reason?: string;
};

type StructuredResponse = {
  type?: "racing_signals" | "football_signals" | "racing_analysis" | "football_analysis";
  title?: string;
  summary?: string;
  topSignals?: SignalItem[];
  riskWatch?: RiskItem[];
  keyTakeaways?: string[];
  disclaimer?: string;
};

type Message = {
  role: "assistant" | "user";
  content: string;
  structured?: StructuredResponse | null;
};

type EvoCoreChatProps = {
  title: string;
  subtitle: string;
  lockedTitle: string;
  lockedDesc: string;
  unlocked: boolean;
  icon: React.ReactNode;
  suggestions: string[];
  initialMessage: string;
  comingNext: string;
  apiEndpoint: string;
  userName?: string | null;
};

export default function EvoCoreChat({
  title,
  subtitle,
  lockedTitle,
  lockedDesc,
  unlocked,
  icon,
  suggestions,
  initialMessage,
  comingNext,
  apiEndpoint,
  userName,
}: EvoCoreChatProps) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: initialMessage },
  ]);

  if (!unlocked) {
    return <LockedAccess title={lockedTitle} desc={lockedDesc} />;
  }

  async function sendMessage(text?: string) {
    const value = text || message;

    if (!value.trim() || busy) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: value },
    ];

    setMessages(nextMessages);
    setMessage("");
    setBusy(true);

    try {
      const token = await auth.currentUser?.getIdToken();

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ||
            data.structured?.summary ||
            "I could not generate a response. Please try again.",
          structured: data.structured || null,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong connecting to EvoCore.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[.72fr_.28fr]">
        <section className="evo-card overflow-hidden">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6431FD]/20 bg-[#6431FD]/10 text-[#C4B5FD]">
                {icon}
              </div>

              <div>
                <h1 className="text-3xl font-semibold">{title}</h1>
                <p className="mt-1 text-sm text-white/55">{subtitle}</p>
              </div>
            </div>
          </div>

          <div className="min-h-[520px] space-y-5 p-6">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`flex ${
                  item.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[92%]">
                  <div
                    className={`mb-1 flex items-center gap-2 text-xs ${
                      item.role === "user"
                        ? "justify-end text-[#C4B5FD]"
                        : "text-white/40"
                    }`}
                  >
                    {item.role === "user" ? (
                      <>
                        <span>{userName || "You"}</span>
                        <UserCircle size={13} />
                      </>
                    ) : (
                      <>
                        <Bot size={13} />
                        <span>EvoCore</span>
                      </>
                    )}
                  </div>

                  {item.structured ? (
                    <StructuredPanel data={item.structured} />
                  ) : (
                    <div
                      className={`rounded-3xl border p-4 text-sm leading-6 ${
                        item.role === "user"
                          ? "border-[#6431FD]/30 bg-[#6431FD]/20 text-white"
                          : "border-white/10 bg-white/[0.035] text-white/72"
                      }`}
                    >
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {busy && (
              <div className="text-sm text-white/40">
                EvoCore is analysing the data...
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 p-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Ask EvoCore..."
                className="w-full bg-transparent px-2 text-white outline-none placeholder:text-white/30"
              />

              <button
                type="button"
                disabled={busy}
                onClick={() => sendMessage()}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6431FD] text-white transition hover:opacity-90 disabled:opacity-50"
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="evo-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#C4B5FD]">
              <Sparkles size={16} />
              Suggested prompts
            </div>

            <div className="mt-4 grid gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => sendMessage(item)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-white/60 transition hover:border-[#6431FD]/30 hover:bg-[#6431FD]/10 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="evo-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Bot size={16} className="text-[#C4B5FD]" />
              Coming next
            </div>

            <p className="mt-3 text-sm leading-6 text-white/55">
              {comingNext}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StructuredPanel({ data }: { data: StructuredResponse }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B0D14] p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C4B5FD]">
            EvoCore Intelligence
          </div>

          <h2 className="mt-2 text-2xl font-semibold">
            {data.title || "Analysis"}
          </h2>

          {data.summary && (
            <p className="mt-2 text-sm leading-6 text-white/62">
              {data.summary}
            </p>
          )}
        </div>

        <div className="rounded-full border border-[#6431FD]/20 bg-[#6431FD]/10 px-3 py-1 text-xs font-semibold text-[#C4B5FD]">
          Live data
        </div>
      </div>

      {data.topSignals && data.topSignals.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <TrendingUp size={16} className="text-[#C4B5FD]" />
            Top Signals
          </div>

          <div className="grid gap-3">
            {data.topSignals.map((signal, index) => (
              <div
                key={`${signal.selection}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="text-xs text-white/40">
                      {signal.event || signal.race || "Event"}
                    </div>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {signal.selection}
                    </h3>

                    {signal.summary && (
                      <p className="mt-2 text-sm leading-6 text-white/58">
                        {signal.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {signal.odds && <Pill label={`Odds ${signal.odds}`} />}
                    {signal.confidence && (
                      <Pill label={`${signal.confidence} confidence`} />
                    )}
                    {signal.risk && <Pill label={`${signal.risk} risk`} />}
                  </div>
                </div>

                {signal.reasons && signal.reasons.length > 0 && (
                  <ul className="mt-4 grid gap-2">
                    {signal.reasons.map((reason) => (
                      <li
                        key={reason}
                        className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/58"
                      >
                        {reason}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.riskWatch && data.riskWatch.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <AlertTriangle size={16} className="text-yellow-200" />
            Risk Watch
          </div>

          <div className="grid gap-3">
            {data.riskWatch.map((risk, index) => (
              <div
                key={`${risk.selection}-${index}`}
                className="rounded-2xl border border-yellow-400/15 bg-yellow-400/5 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-yellow-100/45">
                      {risk.event || risk.race}
                    </div>

                    <h3 className="mt-1 font-semibold text-yellow-100">
                      {risk.selection}
                    </h3>
                  </div>

                  {risk.risk && (
                    <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-100">
                      {risk.risk}
                    </div>
                  )}
                </div>

                {risk.reason && (
                  <p className="mt-2 text-sm leading-6 text-yellow-100/65">
                    {risk.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.keyTakeaways && data.keyTakeaways.length > 0 && (
        <div className="mt-6 rounded-2xl border border-[#6431FD]/20 bg-[#6431FD]/10 p-4">
          <div className="text-sm font-semibold text-[#C4B5FD]">
            Key Takeaways
          </div>

          <ul className="mt-3 grid gap-2">
            {data.keyTakeaways.map((takeaway) => (
              <li key={takeaway} className="text-sm leading-6 text-white/68">
                • {takeaway}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.disclaimer && (
        <p className="mt-5 text-xs leading-5 text-white/35">
          {data.disclaimer}
        </p>
      )}
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[#6431FD]/20 bg-[#6431FD]/10 px-3 py-1 text-xs font-semibold text-[#C4B5FD]">
      {label}
    </span>
  );
}

function LockedAccess({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="evo-card p-8 text-center">
        <Lock size={34} className="mx-auto text-[#C4B5FD]" />

        <h1 className="mt-4 text-3xl font-semibold">{title}</h1>

        <p className="mx-auto mt-3 max-w-xl text-white/60">{desc}</p>

        <Link href="/dashboard" className="evo-button-primary mt-6">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}