import Link from "next/link";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-3 text-white/60">
        For EvoCore support, access issues, or partnership questions.
      </p>

      <div className="evo-card mt-8 p-6">
        <Mail className="text-[#C4B5FD]" size={28} />
        <h2 className="mt-4 text-2xl font-semibold">Email</h2>
        <Link
          href="mailto:nathanayling@googlemail.com"
          className="mt-3 inline-block text-white/65 transition hover:text-[#C4B5FD]"
        >
          nathanayling@googlemail.com
        </Link>
      </div>
    </div>
  );
}