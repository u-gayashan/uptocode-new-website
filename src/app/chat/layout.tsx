import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0b0d10]">
      <TopBar />
      <div className="relative flex flex-1 min-h-0">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_35%,transparent_65%)]" />
        <Sidebar />
        <main className="relative flex-1 overflow-hidden">
          <div className="relative h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
