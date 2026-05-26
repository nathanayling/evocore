import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  FileText,
  Goal,
  Home,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Scale,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21.5l-7.11 8.123L22.75 22h-6.544l-5.126-6.7L5.214 22H1.956l7.604-8.69L1.55 2h6.71l4.633 6.126L18.244 2Zm-1.142 17.91h1.804L7.28 3.98H5.344L17.102 19.91Z" />
  </svg>
);

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.77l-.44 2.91h-2.33V22c4.78-.76 8.45-4.92 8.45-9.94Z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5Zm8.75 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.9 12l-6.3 3.6Z" />
  </svg>
);

const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-1.87V15.3a5.32 5.32 0 1 1-4.59-5.27v2.79a2.52 2.52 0 1 0 1.77 2.4V2h2.82a4.8 4.8 0 0 0 3.77 1.87v2.816z" />
  </svg>
);

const footerLinks = {
  platform: [
    { label: "Home", href: "/", icon: Home },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Access", href: "/access", icon: ShieldCheck },
    { label: "Launch EvoCore", href: "/login", icon: Bot },
  ],
  ecosystem: [
    { label: "FootyEvo", href: "https://footyevo.com", icon: Goal },
    { label: "RaceEvo", href: "https://raceevo.com", icon: Trophy },
    { label: "OddsEvo", href: "https://oddsevo.com", icon: Target },
    {
      label: "Evo Sports Intelligence",
      href: "https://evosportsintelligence.com",
      icon: ShieldCheck,
    },
  ],
  legal: [
    { label: "Disclaimer", href: "/disclaimer", icon: FileText },
    { label: "Privacy Policy", href: "/privacy", icon: LockKeyhole },
    { label: "Terms", href: "/terms", icon: Scale },
    { label: "Contact", href: "/contact", icon: Mail },
  ],
};

const SOCIALS = [
  { name: "Twitter", href: "https://twitter.com/nathelevate", icon: Twitter },
  { name: "Facebook", href: "https://www.facebook.com/nathelevate/", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/nathelevate", icon: Instagram },
  { name: "YouTube", href: "https://www.youtube.com/@nathelevate", icon: Youtube },
  { name: "TikTok", href: "https://www.tiktok.com/@nathelevate", icon: TikTok },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#07080D]">
      <div className="border-b border-white/10 bg-[#8B39FB] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white">
        EvoCore provides sports intelligence and analysis, not guaranteed outcomes
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-14 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.2fr] lg:px-6">
        <div>
          <Link href="/" className="mb-5 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="EvoCore"
              width={240}
              height={80}
              className="h-14 w-auto object-contain"
            />
          </Link>

          <p className="max-w-md text-sm leading-7 text-white/58">
            EvoCore is the AI intelligence engine powering football, racing,
            and odds analysis across the Evo Sports Intelligence ecosystem.
          </p>

          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.045] text-white/80 ring-1 ring-white/10 transition hover:text-[#C4B5FD] hover:ring-[#6431FD]/40"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <FooterColumn title="Platform" links={footerLinks.platform} />
        <FooterColumn title="Legal" links={footerLinks.legal} />

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-white">
            Evo Ecosystem
          </h3>

          <ul className="space-y-3">
            {footerLinks.ecosystem.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white/58 transition hover:text-[#C4B5FD]"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/30" />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Disclaimer
            </h4>

            <p className="mt-3 text-sm leading-7 text-white/55">
              EvoCore is an analysis tool. It does not guarantee results and
              should be used for information, research, and decision support only.
            </p>

            <Link
              href="/disclaimer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#C4B5FD]"
            >
              Read full disclaimer
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 text-xs text-white/45 sm:flex-row">
          <p className="inline-flex items-center gap-2">
            <Bot className="h-4 w-4 text-[#C4B5FD]" />
            © {new Date().getFullYear()} EvoCore. All rights reserved. Built by Nathe.
          </p>

          <a
            href="https://evosportsintelligence.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition hover:text-white"
          >
            <Image
              src="/logo-2.png"
              alt="Evo Sports Intelligence"
              width={90}
              height={28}
              className="h-5 w-auto object-contain opacity-80"
            />
            <span>The AI intelligence layer behind Evo Sports Intelligence</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#C4B5FD]/80" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; icon: React.ElementType }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-3 text-sm text-white/58 transition hover:text-[#C4B5FD]"
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}