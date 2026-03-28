"use client";

import { useState } from "react";
import Image from "next/image";

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      {/* Title */}
      <div className="flex items-center gap-3 mb-2">
        <Image src="/logo.png" alt="Uptocode" width={120} height={40} className="p-1"/>
        <span className="text-white/50 text-xs font-semibold border border-white/15 rounded px-2 py-0.5 tracking-wider uppercase">
          Plus
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-white/40 text-sm mb-8">
        Do you have anything you need support with?
      </p>

      {/* Input bar */}
      <div className="relative w-full max-w-2xl">
        <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
        <div className="relative flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3">
          <button className="text-[#4a5568] hover:text-white/60 transition-colors shrink-0">
            <FileIcon />
          </button>
          <button className="text-[#4a5568] hover:text-white/60 transition-colors shrink-0">
            <LinkIcon />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/30 outline-none"
          />
          <button className="text-[#4a5568] hover:text-white/60 transition-colors shrink-0">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
