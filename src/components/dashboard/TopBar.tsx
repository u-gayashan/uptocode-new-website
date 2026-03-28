"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const BREADCRUMBS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/chat": "AI Chat",
};

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export default function TopBar() {
  const pathname = usePathname();
  const breadcrumb = BREADCRUMBS[pathname] ?? pathname.split("/").pop() ?? "";

  return (
    <header className="flex items-center h-14 pl-0 pr-5 bg-[#0b0d10] shrink-0 gap-4">
      {/* Logo */}
      <Image src="/logo.png" alt="Uptocode" width={50} height={28} className="shrink-0 m-2 p-1" />

      {/* Menu + breadcrumb */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="text-[#4a5568] hover:text-white/70 transition-colors">
          <MenuIcon />
        </button>
        <span className="text-white/60 text-sm">{breadcrumb}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="max-w-md w-full">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-[#4a5568]">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder-[#4a5568] outline-none focus:border-white/20 transition-colors"
          />
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-3 shrink-0">
        <button className="flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.08] text-[#4a5568] hover:text-white/70 transition-colors">
          <HelpIcon />
        </button>
        <button className="text-[#4a5568] hover:text-white/70 transition-colors">
          <BellIcon />
        </button>
        <UserButton />
      </div>
    </header>
  );
}
