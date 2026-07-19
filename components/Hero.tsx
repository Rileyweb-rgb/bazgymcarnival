import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="bunting" />
      <Image
        src="/figma-assets/hero-bg.png"
        alt="Kids jumping into a foam pit at BazGym"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/50 to-[#0a1628]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-16 pt-6">
        <header className="flex items-center justify-between">
          <Image
            src="/figma-assets/circle-icon.png"
            alt="BazGym"
            width={140}
            height={48}
            className="h-10 w-auto md:h-12"
          />
          <Link
            href="#schedule"
            className="cta-glow rounded-full bg-[#ffd23f] px-5 py-2.5 text-sm font-bold text-[#0a1628] transition hover:scale-105 md:text-base"
          >
            Plan Your Visit
          </Link>
        </header>

        <div className="flex flex-1 flex-col justify-center py-12">
          <div className="animate-bounce-in mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            <span className="text-[#ffd23f]">🎪</span>
            <span>5 &amp; 6 September 2025</span>
          </div>

          <h1 className="font-display animate-bounce-in text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block text-white">BazGym</span>
            <span className="block bg-gradient-to-r from-[#ffd23f] via-[#ff6b4a] to-[#ff4d8d] bg-clip-text text-transparent">
              Carnival
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
            Two days of flips, fun, and first-time tries. Watch our students soar,
            try a free class, take on challenges &amp; prizes — open to everyone!
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-semibold md:text-base">
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <span className="text-xl">⏰</span>
              <span>10am – 5pm daily</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <span className="text-xl">📍</span>
              <span>Bedok HomeTeamNS</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#popup-classes"
              className="cta-glow rounded-full bg-[#ffd23f] px-8 py-4 text-base font-bold text-[#0a1628] transition hover:scale-105"
            >
              Try a Free Class
            </Link>
            <Link
              href="#schedule"
              className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-bold backdrop-blur-sm transition hover:bg-white/20"
            >
              See the Schedule
            </Link>
          </div>

          <p className="mt-8 font-display text-lg font-medium tracking-wide text-[#ffd23f] md:text-xl">
            Watch · Try · Spin · Cheer
          </p>
        </div>
      </div>
    </section>
  );
}
