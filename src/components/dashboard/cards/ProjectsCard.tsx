import WorldMap from "@/components/dashboard/WorldMap";

export default function ProjectsCard() {
  return (
    <div className="relative flex flex-col bg-[#111318] rounded-2xl border border-white/[0.06] p-5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_-20%_50%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-white font-semibold text-base">Projects</h2>
        <span className="flex items-center gap-1.5 text-sm text-white/70">
          <span className="w-2 h-2 rounded-full bg-[#c8ff47]" />
          Uptocode
        </span>
      </div>

      {/* Map */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <WorldMap />
      </div>
    </div>
  );
}
