import type * as React from "react";
import AuthMarketingPanel from "@/components/auth/AuthMarketingPanel";

export default function AuthPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0d10] text-[#f2f4f7]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_30%),linear-gradient(135deg,#121417_0%,#0b0d10_45%,#101216_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.12)_0.7px,transparent_0.7px)] [background-size:3px_3px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1140px] items-center justify-center px-4 py-6 sm:px-6 lg:px-8 lg:py-6 xl:px-10 xl:py-0">
        <div className="flex w-full items-stretch gap-16 lg:gap-24 xl:gap-36">
          <AuthMarketingPanel />
          <div className="flex min-w-0 flex-1 flex-col justify-center lg:max-w-[689px]">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

