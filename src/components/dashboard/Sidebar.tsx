import Image from "next/image";

const navItems = [
  // { src: "/dashboard/home.png", label: "Home", active: true },
  { src: "/dashboard/image1.png", label: "Projects", active: true },
  { src: "/dashboard/image2.png", label: "Compliance Chats" },
  { src: "/dashboard/image3.png", label: "Reports" },
  { src: "/dashboard/settings.png", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col items-center justify-center w-14 bg-[#0b0d10] shrink-0">
      <div className="flex flex-col items-center gap-2">
        {navItems.map(({ src, label, active }) => (
          <button
            key={label}
            title={label}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
              active
                ? "bg-white/[0.08]"
                : "hover:bg-white/[0.04]"
            }`}
          >
            <Image
              src={src}
              alt={label}
              width={50}
              height={38}
              className={active ? "" : "opacity-60"}
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
