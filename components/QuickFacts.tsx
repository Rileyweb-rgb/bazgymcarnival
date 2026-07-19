const FACTS = [
  { emoji: "🎪", label: "2 Days", detail: "Fri 5 & Sat 6 Sept" },
  { emoji: "⏰", label: "7 Hours", detail: "10am – 5pm daily" },
  { emoji: "📍", label: "Bedok", detail: "HomeTeamNS" },
  { emoji: "🎟️", label: "Open to All", detail: "Families & first-timers welcome" },
];

export function QuickFacts() {
  return (
    <section className="relative -mt-8 z-20 px-5">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {FACTS.map((fact) => (
          <div
            key={fact.label}
            className="ticket-card flex flex-col items-center p-5 text-center backdrop-blur-md md:p-6"
          >
            <span className="text-3xl md:text-4xl">{fact.emoji}</span>
            <span className="font-display mt-2 text-lg font-bold md:text-xl">{fact.label}</span>
            <span className="mt-1 text-sm text-white/70">{fact.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
