"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Goal,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleEmailLogin() {
    try {
      setBusy(true);
      setError("");

      await signInWithEmail(email, password);

      router.push("/dashboard");
    } catch {
      setError("Could not sign in. Check your email and password.");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setBusy(true);
      setError("");

      await signInWithGoogle();

      router.push("/dashboard");
    } catch {
      setError("Google sign in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(100,49,253,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(100,49,253,0.16),transparent_34%)]" />

      <section className="relative mx-auto grid min-h-[calc(100vh-180px)] max-w-7xl gap-10 px-6 py-16 md:grid-cols-[.95fr_1.05fr] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6431FD]/20 bg-[#8B39FB]/10 px-3 py-1 text-sm text-[#C4B5FD]">
            <Sparkles size={14} />
            <span>EvoCore Access</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            Sign in to unlock the intelligence layer.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
            Use the same email you use on FootyEvo or RaceEvo. If you signed up
            with Google, use Google here too.
          </p>

          <div className="mt-8 grid max-w-xl gap-3">
            <AccessItem
              icon={<Goal size={18} />}
              title="FootyEvo Pro"
              desc="Unlock football match analysis, predictions, and data chat."
            />
            <AccessItem
              icon={<Trophy size={18} />}
              title="RaceEvo Pro"
              desc="Unlock racing analysis, horse profiles, race cards, and value insights."
            />
            <AccessItem
              icon={<ShieldCheck size={18} />}
              title="Access checked by email"
              desc="EvoCore checks whether your email has Pro access on FootyEvo or RaceEvo."
            />
          </div>
        </div>

        <div className="evo-card p-6 md:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <div className="text-xs tracking-[0.35em] text-white/35">
                SECURE LOGIN
              </div>
              <h2 className="mt-2 text-2xl font-semibold">Launch EvoCore</h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6431FD]/20 bg-[#8B39FB]/10 text-[#C4B5FD]">
              <Bot size={22} />
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={busy}
            className="evo-button-primary w-full"
          >
            <span>Continue with Google</span>
            <ArrowRight size={17} />
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/35">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <Mail size={18} className="text-white/35" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <Lock size={18} className="text-white/35" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleEmailLogin}
              disabled={busy}
              className="evo-button-outline w-full"
            >
              <span>{busy ? "Signing in..." : "Sign in with email"}</span>
            </button>
          </form>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/55">
            Don’t have access yet? Subscribe through FootyEvo Pro or RaceEvo
            Pro, then sign in here with the same email.
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
          >
            <span>Back to homepage</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function AccessItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-[#6431FD]/20 bg-[#8B39FB]/10 text-[#C4B5FD]">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-white/55">{desc}</p>
        </div>
      </div>
    </div>
  );
}