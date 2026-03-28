function FileIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const chats = [
  { name: "Lot 2 Marooda street, Cranbourne VIC", size: "11Mb", owner: "Sam" },
  { name: "2/48 Jefferies street, Parramatta NSW", size: "6Mb", owner: "Nick" },
  { name: "4/18 Martin Lane, Brighton VIC", size: "12Mb", owner: "John" },
  { name: "10A Arthurs Road, Point Cook VIC", size: "14Mb", owner: "Cruz" },
  { name: "10A Arthurs Road, Point Cook VIC", size: "14Mb", owner: "Cruz" },
];

export default function ComplianceChatsCard() {
  return (
    <div className="relative flex flex-col bg-[#111318] rounded-2xl border border-white/[0.06] p-5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_0%_100%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
      {/* Header */}
      <h2 className="text-white font-semibold text-base mb-4 shrink-0">
        Recent Compliance Chats
      </h2>

      {/* Search */}
      <div className="relative flex items-center mb-4 shrink-0">
        <span className="absolute left-3 text-[#4a5568]">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder-[#4a5568] outline-none focus:border-white/20 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_60px_64px] gap-x-4 px-1 mb-2">
          <span className="text-xs text-[#5a6072] font-medium">Chat Name</span>
          <span className="text-xs text-[#5a6072] font-medium text-right">Size</span>
          <span className="text-xs text-[#5a6072] font-medium text-right">Owner</span>
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {chats.map((chat, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_60px_64px] gap-x-4 items-center px-1 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[#4a5568]">
                  <FileIcon />
                </span>
                <span className="text-sm text-white/80 truncate">{chat.name}</span>
              </div>
              <span className="text-sm text-white/50 text-right">{chat.size}</span>
              <span className="text-sm text-white/80 text-right">{chat.owner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
