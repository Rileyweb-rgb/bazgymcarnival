const AUDIENCES = [
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "BazGym Families",
    text: "Come support your gymnast and bring friends along for the fun.",
  },
  {
    emoji: "🌟",
    title: "First-Timers",
    text: "Pop-up classes are built for you — no experience needed.",
  },
  {
    emoji: "🏅",
    title: "Gym Fans",
    text: "The competitive performance showcase is the main event.",
  },
];

const FAQ = [
  {
    q: "Do I need to register?",
    a: "The carnival is free to attend! Pop-up class slots are first-come, first-served — arrive early to secure your spot.",
  },
  {
    q: "Are pop-up classes really free?",
    a: "Yes! Andrew and Cheechia will run trial classes throughout the day for Tiny to Intermediate levels.",
  },
  {
    q: "Can I just watch?",
    a: "Absolutely. Cheer on our students, enjoy the performances, and try the fringe challenges at your own pace.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable clothes and socks. Leotards optional for performers.",
  },
];

export function PracticalInfo() {
  return (
    <section id="info" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-[#2dd4a0]">
            Everyone Belongs
          </span>
          <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">Who Is This For?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            No BazGym membership required. Just bring energy (and socks).
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="ticket-card p-6 text-center">
              <span className="text-4xl">{a.emoji}</span>
              <h3 className="font-display mt-3 text-xl font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-white/70">{a.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="ticket-card p-6 md:p-8">
            <h3 className="font-display text-2xl font-bold">Plan Your Trip</h3>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-sm font-semibold text-[#ffd23f]">Venue</dt>
                <dd className="mt-1 text-white/85">Bedok HomeTeamNS</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-[#ffd23f]">Hours</dt>
                <dd className="mt-1 text-white/85">10am – 5pm, 5 &amp; 6 September 2025</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-[#ffd23f]">Getting There</dt>
                <dd className="mt-1 text-white/85">
                  Near Bedok MRT. Parking available at HomeTeamNS.
                </dd>
              </div>
            </dl>
            <a
              href="https://maps.google.com/?q=Bedok+HomeTeamNS"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold transition hover:bg-white/20"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="ticket-card p-6 md:p-8">
            <h3 className="font-display text-2xl font-bold">FAQ</h3>
            <div className="mt-6 space-y-4">
              {FAQ.map((item) => (
                <details key={item.q} className="group border-b border-white/10 pb-4">
                  <summary className="cursor-pointer font-semibold text-white/90 transition group-open:text-[#ffd23f]">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
