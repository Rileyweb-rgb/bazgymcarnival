const MARQUEE_ITEMS = [
  "🎪 BazGym Carnival",
  "⭐ Student Showcase",
  "🤸 Free Pop-Up Classes",
  "🏆 Challenges & Prizes",
  "🏆 2 Shows Daily",
  "📍 Bedok HomeTeamNS",
  "🎟️ Open to All",
];

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#0d1f38] py-3">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="font-display text-sm font-semibold text-white/80 md:text-base">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
