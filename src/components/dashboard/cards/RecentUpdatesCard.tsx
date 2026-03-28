function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

const AVATAR_COLORS = ["#e57373", "#81c784", "#64b5f6", "#ffb74d"];

function AvatarGroup() {
  return (
    <div className="flex items-center">
      {AVATAR_COLORS.map((color, i) => (
        <span
          key={i}
          className="w-6 h-6 rounded-full border-2 border-[#181c24] -ml-1.5 first:ml-0"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

const updates = [
  {
    title: "New Feature Release!",
    description:
      "Improved performance, faster load times, and a sleeker UI. More updates coming soon!",
  },
  {
    title: "System Maintenance Notice",
    description:
      "Scheduled maintenance this weekend. Some features may be unavailable. Thanks for your patience!",
  },
];

export default function RecentUpdatesCard() {
  return (
    <div className="relative flex flex-col bg-[#111318] rounded-2xl border border-white/[0.06] p-5 gap-3">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_-20%_50%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
      {/* Header */}
      <h2 className="text-white font-semibold text-base shrink-0">
        Recent Updates
      </h2>

      {/* Update items */}
      {updates.map((update, i) => (
        <div
          key={i}
          className="bg-[#181c24] rounded-xl p-4 flex flex-col gap-3 border border-white/[0.04]"
        >
          {/* Title + Read More */}
          <div className="flex items-start justify-between gap-3">
            <p className="text-white font-medium text-sm">{update.title}</p>
            <button className="shrink-0 text-xs text-white/70 bg-white/[0.07] hover:bg-white/[0.12] px-3 py-1.5 rounded-lg transition-colors font-medium">
              Read More
            </button>
          </div>

          {/* Description */}
          <p className="text-white/50 text-xs leading-relaxed">
            {update.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <AvatarGroup />
            <button className="text-[#4a5568] hover:text-white/60 transition-colors">
              <DotsIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
