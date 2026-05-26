"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  ExternalLink,
  Home,
  Layers,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserCircle,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [confirmSignOutOpen, setConfirmSignOutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { user, logout } = useAuth();

  const closeMenu = () => {
    setOpen(false);
    setUserMenuOpen(false);
  };

  const displayName = user?.displayName || user?.email || "Account";

  const initials =
    user?.displayName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setConfirmSignOutOpen(false);
    closeMenu();
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080D]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="EvoCore"
              width={260}
              height={80}
              priority
              className="h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <NavItem href="/" icon={<Home size={16} />} label="Home" />
            <NavItem href="/intelligence" icon={<Layers size={16} />} label="Intelligence" />
            <NavItem href="/access" icon={<ShieldCheck size={16} />} label="Access" />

            <a
              href="https://evosportsintelligence.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/65 transition hover:text-white"
            >
              <ExternalLink size={16} className="text-white/60" />
              <span>Main Evo Site</span>
            </a>

            {!user ? (
              <Link
                href="/login"
                className="ml-2 inline-flex items-center gap-2 rounded-xl bg-[#8B39FB] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Bot size={16} />
                <span>Launch EvoCore</span>
              </Link>
            ) : (
              <div className="relative ml-2" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((value) => !value)}
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 transition hover:bg-white/[0.07] hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8B39FB] text-xs font-bold text-white">
                    {initials}
                  </span>

                  <span className="max-w-[150px] truncate">{displayName}</span>
                  <ChevronDown size={15} className="text-white/45" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D14] shadow-2xl">
                    <div className="border-b border-white/10 px-4 py-4">
                      <div className="text-sm font-semibold text-white">
                        {displayName}
                      </div>
                      <div className="mt-1 truncate text-xs text-white/45">
                        {user.email}
                      </div>
                    </div>

                    <div className="p-2">
                      <DropdownLink href="/dashboard" icon={<Bot size={16} />} label="Dashboard" onClick={closeMenu} />
                      <DropdownLink href="/settings" icon={<Settings size={16} />} label="Settings" onClick={closeMenu} />
                      <DropdownLink href="/access" icon={<ShieldCheck size={16} />} label="Access" onClick={closeMenu} />

                      <button
                        type="button"
                        onClick={() => setConfirmSignOutOpen(true)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/65 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        <LogOut size={16} />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-white/15 bg-white/[0.03] p-2.5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-[#07080D] md:hidden">
            <div className="space-y-1 px-6 py-4">
              <MobileItem href="/" icon={<Home size={16} />} label="Home" onClick={closeMenu} />
              <MobileItem href="/intelligence" icon={<Layers size={16} />} label="Intelligence" onClick={closeMenu} />
              <MobileItem href="/access" icon={<ShieldCheck size={16} />} label="Access" onClick={closeMenu} />

              {!user ? (
                <MobileItem href="/login" icon={<Bot size={16} />} label="Launch EvoCore" onClick={closeMenu} />
              ) : (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="mb-2 flex items-center gap-3 px-2 py-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8B39FB] text-xs font-bold text-white">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">
                        {displayName}
                      </div>
                      <div className="truncate text-xs text-white/45">{user.email}</div>
                    </div>
                  </div>

                  <MobileItem href="/dashboard" icon={<Bot size={16} />} label="Dashboard" onClick={closeMenu} />
                  <MobileItem href="/settings" icon={<Settings size={16} />} label="Settings" onClick={closeMenu} />

                  <button
                    type="button"
                    onClick={() => setConfirmSignOutOpen(true)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-white/75 transition hover:bg-white/5 hover:text-white"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {confirmSignOutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setConfirmSignOutOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative z-[101] w-full max-w-md rounded-3xl border border-white/10 bg-[#0B0D14] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold">Sign out?</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              You’ll need to sign back in to access EvoCore intelligence tools.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setConfirmSignOutOpen(false)}
                className="evo-button-outline w-full"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="evo-button-primary w-full"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-white/65 transition hover:text-white">
      <span className="text-white/60">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function MobileItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/75 transition hover:bg-white/5 hover:text-white"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function DropdownLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/[0.05] hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}