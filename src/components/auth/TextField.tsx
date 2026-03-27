"use client";

import * as React from "react";

type IconProps = {
  className?: string;
};

function UserIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.8-3.4 4.8-5 8-5s6.2 1.6 8 5" />
    </svg>
  );
}

function LockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 11h12v10H6z" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function EyeOffIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="2.8" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

function EyeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export type TextFieldProps = {
  id: string;
  label: string;
  labelRight?: React.ReactNode;
  hideLabel?: boolean;
  placeholder: string;
  type?: "text" | "email" | "password";
  name: string;
  autoComplete?: string;
  icon: "user" | "mail" | "lock";
  showPasswordToggle?: boolean;
  defaultValue?: string;
  error?: string;
};

export function TextField({
  id,
  label,
  labelRight,
  hideLabel = false,
  placeholder,
  type = "text",
  name,
  autoComplete,
  icon,
  showPasswordToggle = false,
  defaultValue,
  error,
}: TextFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const resolvedType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <label className="block space-y-1.5" htmlFor={id}>
      {hideLabel ? null : (
        <div className="flex items-center justify-between gap-4">
          <span className="text-[15px] sm:text-[16px] xl:text-[18px] text-[#dae1ea]">{label}</span>
          {labelRight ? (
            <div className="text-[13px] text-[#8f98a2]">{labelRight}</div>
          ) : null}
        </div>
      )}
      <span
        className={`flex h-[44px] xl:h-[50px] items-center gap-3 rounded-md border px-3 bg-[#2a2d30] text-[#9ea7b2] ${
          error ? "border-[#ff4d4d]/60" : "border-white/10"
        }`}
      >
        {icon === "user" ? (
          <UserIcon className="h-5 w-5 shrink-0 opacity-80" />
        ) : null}
        {icon === "mail" ? (
          <MailIcon className="h-5 w-5 shrink-0 opacity-80" />
        ) : null}
        {icon === "lock" ? (
          <LockIcon className="h-5 w-5 shrink-0 opacity-80" />
        ) : null}

        <input
          id={id}
          name={name}
          type={resolvedType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-label={hideLabel ? label : undefined}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8f98a2]"
        />

        {showPasswordToggle ? (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            className="ml-auto inline-flex h-5 w-5 items-center justify-center opacity-80"
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5 shrink-0" />
            ) : (
              <EyeOffIcon className="h-5 w-5 shrink-0" />
            )}
          </button>
        ) : null}
      </span>
      {error ? (
        <span id={`${id}-error`} className="text-xs text-[#ff7a7a]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

