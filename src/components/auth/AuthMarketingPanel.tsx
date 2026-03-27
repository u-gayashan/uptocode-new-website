export default function AuthMarketingPanel() {
  return (
    <section className="relative hidden w-[300px] shrink-0 flex-col overflow-hidden text-[#d7dde4] lg:flex xl:w-[365px]">
      {/* Soft white light coming from the left side (matches screenshot glow) */}
      <div
        aria-hidden="true"
        className="absolute -left-[240px] top-[-70px] z-0 h-[520px] w-[560px] opacity-60 [mix-blend-mode:screen] blur-[26px] bg-[linear-gradient(90deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.18)_18%,rgba(255,255,255,0)_55%)]"
      />

      <div className="relative z-10">
        <img src="/logo.png" alt="UPTOCO" className="mb-7 h-7 w-auto" />
        <h1 className="text-[28px] font-normal leading-[1.08] tracking-[-0.02em] text-[#f7f9fc] xl:text-[32px]">
          Because creativity should not be buried in bureaucracy
        </h1>
        <p className="mt-5 flex items-start gap-2 max-w-[320px] text-[17px] leading-[1.35] text-[#aab2bc]">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-[#aab2bc]" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          We are not avoiding regulations- just navigating them smarter
        </p>
      </div>

      <div className="relative z-10 mt-10 space-y-7">
        {[
          {
            icon: "check",
            title:
              "Compliance isn't exciting, but getting it right the first time is.",
            body: "By catching errors before submission, our AI reduces costly revisions and project delays.",
          },
          {
            icon: "target",
            title: "Mistakes cost time. Accuracy keeps projects moving.",
            body: "Automated compliance checking ensures precise and consistent analysis, minimizing human error.",
          },
          {
            icon: "clock",
            title: "Deadlines don't wait. Neither should compliance checks.",
            body: "Instant AI verification keeps your project on track by identifying issues before submission.",
          },
        ].map((item) => (
          <article key={item.title} className="max-w-[330px]">
            <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#d8ff3f] text-[#d8ff3f]">
              {item.icon === "check" && (
                <svg viewBox="0 0 24 24" className="h-full w-full p-[5px]" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
              {item.icon === "target" && (
                <svg viewBox="0 0 24 24" className="h-full w-full p-[5px]" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              )}
              {item.icon === "clock" && (
                <svg viewBox="0 0 24 24" className="h-full w-full p-[5px]" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              )}
            </div>
            <h2 className="text-[16px] leading-[1.45] text-[#edf2f8]">
              {item.title}
            </h2>
            <p className="mt-1 text-[14px] leading-[1.45] text-[#98a1ac]">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="relative z-10 mt-auto flex items-center gap-2 pt-14 text-[14px] text-[#8f98a2]">
        <span>Terms</span>
        <span className="text-[10px]">·</span>
        <span>Privacy</span>
        <span className="text-[10px]">·</span>
        <span>Docs</span>
        <span className="text-[10px]">·</span>
        <span>Helps</span>
        <span className="ml-4 flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <ellipse cx="12" cy="12" rx="5" ry="10" />
          </svg>
          English
          <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none">
            <path
              d="m5 8 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
