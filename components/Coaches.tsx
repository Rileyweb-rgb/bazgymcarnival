const COACHES = [
  {
    name: "Jeremy & Jean",
    role: "Student Moves Showcase",
    emoji: "⭐",
    quote: "Celebrating every student's journey — from first cartwheel to fearless routines.",
    gradient: "from-[#4db8ff] to-[#1e4fd9]",
  },
  {
    name: "Andrew & Cheechia",
    role: "Pop-Up Classes",
    emoji: "🤸",
    quote: "Your trial class guides — patient, fun, and ready for tiny tumblers to intermediate movers.",
    gradient: "from-[#ffd23f] to-[#ff6b4a]",
  },
];

export function Coaches() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-[#ffd23f]">
            Your Hosts
          </span>
          <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">Meet the Carnival Crew</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {COACHES.map((coach) => (
            <article key={coach.name} className="ticket-card overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${coach.gradient}`} />
              <div className="p-6 md:p-8">
                <span className="text-5xl">{coach.emoji}</span>
                <h3 className="font-display mt-4 text-2xl font-bold">{coach.name}</h3>
                <p className="mt-1 font-semibold text-[#ffd23f]">{coach.role}</p>
                <p className="mt-4 italic leading-relaxed text-white/75">&ldquo;{coach.quote}&rdquo;</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
