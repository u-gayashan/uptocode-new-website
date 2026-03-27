/* eslint-disable react/no-unknown-property */
"use client";

import * as React from "react";
import type { OAuthStrategy } from "@clerk/shared/types";
import { useSignUp } from "@clerk/nextjs";
import type { AuthProvider } from "@/types/auth";

export function SocialButton({
  provider,
}: {
  provider: AuthProvider;
}) {
  const label = provider === "google" ? "Google" : provider === "outlook" ? "Outlook" : "Apple";

  const { signUp } = useSignUp();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  function normalizeError(err: unknown): string {
    if (!err) return "OAuth sign-up failed.";
    if (typeof err === "string") return err;
    try {
      const anyErr = err as any;
      const msg =
        anyErr?.errors?.[0]?.message ||
        anyErr?.error?.message ||
        anyErr?.message ||
        JSON.stringify(anyErr);
      return typeof msg === "string" ? msg : "OAuth sign-up failed.";
    } catch {
      return "OAuth sign-up failed.";
    }
  }

  const strategy = React.useMemo<OAuthStrategy>(() => {
    if (provider === "google") return "oauth_google";
    if (provider === "outlook") return "oauth_microsoft";
    return "oauth_apple";
  }, [provider]);

  async function onClick() {
    if (!signUp) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await signUp.sso({
        strategy,
        redirectCallbackUrl: "/sso-callback",
        redirectUrl: "/",
      });

      if (error) {
        console.error("Clerk signUp.sso error:", error);
        setErrorMessage(normalizeError(error).slice(0, 600));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(normalizeError(err).slice(0, 600));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="flex h-10 xl:h-12 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-[#2a2d31] text-[14px] xl:text-[15px] text-[#e4e8ee] transition hover:bg-[#343840] disabled:opacity-70"
      >
        {!loading && provider === "google" && (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
            <path d="M5.84 14.09A6.68 6.68 0 0 1 5.5 12c0-.72.12-1.43.35-2.09V7.07H2.18A11.01 11.01 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/>
          </svg>
        )}
        {!loading && provider === "outlook" && (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M11.4 24H0V12L11.4 24Z" fill="#0A2767"/>
            <path d="M11.4 0H24v12L11.4 0Z" fill="#0A2767"/>
            <path d="M24 12v12H11.4L24 12Z" fill="#28A8EA"/>
            <path d="M24 0v12H11.4L24 0Z" fill="#50D9FF"/>
            <path d="M11.4 0v24L0 12V0h11.4Z" fill="#0364B8"/>
            <path d="M0 12l11.4 12V12H0Z" fill="#0078D4"/>
          </svg>
        )}
        {!loading && provider === "apple" && (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"/>
          </svg>
        )}
        {loading ? "Please wait..." : label}
      </button>

      {/* Keep layout stable while still showing errors for debugging */}
      <div className="h-0 overflow-hidden" aria-live="polite" aria-atomic="true">
        {errorMessage ? errorMessage : null}
      </div>
    </div>
  );
}

