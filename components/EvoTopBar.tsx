import Image from "next/image";
import { ArrowUpRight, BrainCircuit } from "lucide-react";

export default function EvoTopBar() {
  return (
    <div className="border-b border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs text-white/55">
        <div className="flex min-w-0 items-center gap-2">
          <BrainCircuit size={13} className="shrink-0 text-[#C4B5FD]" />
          <span className="hidden sm:inline">
            EvoCore is the AI intelligence layer behind Evo Sports Intelligence
          </span>
          <span className="sm:hidden">AI intelligence layer</span>
        </div>

        <a
          href="https://evosportsintelligence.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 transition hover:text-white"
        >
          <Image
            src="/logo-2.png"
            alt="Evo Sports Intelligence"
            width={90}
            height={28}
            className="hidden h-4 w-auto object-contain opacity-80 sm:block"
          />
          <span>Main platform</span>
          <ArrowUpRight size={12} className="text-[#C4B5FD]" />
        </a>
      </div>
    </div>
  );
}