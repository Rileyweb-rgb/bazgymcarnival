const TENTS = [
  {
    id: "showcase",
    badge: "Watch & Cheer",
    emoji: "⭐",
    title: "Student Moves Showcase",
    hosts: "Jeremy & Jean",
    description:
      "Our students show what they've learned — every level, every win. From beginner onwards, see BazGym skills in action.",
    accent: "from-[#4db8ff] to-[#1e4fd9]",
    badgeBg: "bg-[#4db8ff]",
  },
  {
    id: "popup-classes",
    badge: "Try It Free",
    emoji: "🤸",
    title: "Pop-Up Classes",
    hosts: "Andrew & Cheechia",
    description:
      "Walk in curious, walk out having tumbled. Open for all — trial classes from Tiny to Intermediate. No experience needed!",
    accent: "from-[#ffd23f] to-[#ff6b4a]",
    badgeBg: "bg-[#ffd23f] text-[#0a1628]",
  },
  {
    id: "fringe",
    badge: "Spin & Win",
    emoji: "🎡",
    title: "Fringe Challenges",
    hosts: "Carnival Games",
    description:
      "Take on challenges, complete them, win prizes! Carnival games meet gym skills — fun for the whole family.",
    accent: "from-[#ff4d8d] to-[#8b5cf6]",
    badgeBg: "bg-[#ff4d8d]",
  },
  {
    id: "performance",
    badge: "Main Stage",
    emoji: "🏆",
    title: "Competitive Performance Showcase",
    hosts: "2 Shows Daily",
    description:
      "The main stage. Serious skills, big applause. Two competitive performances each day — don't miss the highlight of the carnival!",
    accent: "from-[#2dd4a0] to-[#1e4fd9]",
    badgeBg: "bg-[#2dd4a0] text-[#0a1628]",
  },
];

export function ActivityTents() {
  return (
    <section id="activities" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-[#ffd23f]">
            What&apos;s On
          </span>
          <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">
            The Carnival Map
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Four big tents of fun — pick your adventure or do them all!
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TENTS.map((tent) => (
            <article
              key={tent.id}
              id={tent.id}
              className="ticket-card group p-6 transition hover:scale-[1.02] md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-4xl">{tent.emoji}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${tent.badgeBg}`}
                >
                  {tent.badge}
                </span>
              </div>

              <h3 className="font-display mt-4 text-2xl font-bold">{tent.title}</h3>
              <p className="mt-1 text-sm font-semibold text-[#ffd23f]">with {tent.hosts}</p>
              <p className="mt-3 leading-relaxed text-white/75">{tent.description}</p>

              <div
                className={`mt-5 h-1 w-full rounded-full bg-gradient-to-r ${tent.accent} opacity-60 transition group-hover:opacity-100`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
