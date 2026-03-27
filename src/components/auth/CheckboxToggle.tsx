"use client";

import * as React from "react";

export default function CheckboxToggle({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center gap-2 text-[13px] text-[#aab2bc]"
    >
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
          checked ? "border-[#d5f83e] bg-[#d5f83e]" : "border-white/20 bg-transparent"
        }`}
      >
        {checked ? (
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="#161a10"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : null}
      </span>
      <span>{label}</span>
    </label>
  );
}

