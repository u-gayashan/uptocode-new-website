"use client";

import { useState } from "react";

export default function ComplianceAssistantCard() {
  const [value, setValue] = useState("");

  return (
    <div className="relative flex flex-col bg-[#111318] rounded-2xl border border-white/[0.06] p-5">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_-20%_50%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
      {/* Header */}
      <h2 className="text-white font-semibold text-base mb-4 shrink-0">
        Compliance Assistant
      </h2>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=""
        className="flex-1 w-full bg-[#0d0f14] border border-white/[0.06] rounded-xl p-4 text-sm text-white/80 placeholder-[#3a3f4a] outline-none focus:border-white/15 transition-colors resize-none min-h-[120px]"
      />

      {/* Button */}
      {/* <button className="mt-4 w-full max-w-md bg-[#c8ff47] hover:bg-[#d4ff6a] active:bg-[#b8ef37] text-black font-semibold text-sm py-3 rounded-xl transition-colors shrink-0">
        AI Compliance
      </button> */}

      <button className="mt-4 w-full bg-[#c8ff47] hover:bg-[#d4ff6a] active:bg-[#b8ef37] text-black font-semibold text-sm py-3 rounded-xl transition-colors shrink-0">
        AI Compliance
      </button>
    </div>
  );
}
