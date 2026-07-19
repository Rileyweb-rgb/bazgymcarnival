import Image from "next/image";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden px-5 py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b4a]/20 via-[#8b5cf6]/10 to-[#4db8ff]/20" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-bold md:text-5xl">Don&apos;t Miss the Drop!</h2>
        <p className="mt-4 text-lg text-white/80">
          The carnival is free to attend. Pop-up class slots may fill up — come early!
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="#popup-classes"
            className="cta-glow rounded-full bg-[#ffd23f] px-8 py-4 font-display text-lg font-bold text-[#0a1628] transition hover:scale-105"
          >
            Try a Free Class
          </Link>
          <a
            href="https://bazgym.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-display text-lg font-bold backdrop-blur-sm transition hover:bg-white/20"
          >
            Visit BazGym.com
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Image
          src="/figma-assets/circle-icon.png"
          alt="BazGym"
          width={120}
          height={40}
          className="h-8 w-auto opacity-80"
        />
        <p className="text-center text-sm text-white/50">
          Proudly hosted by{" "}
          <a href="https://bazgym.com" className="text-white/70 underline hover:text-white">
            BazGym Gymnastics
          </a>
        </p>
        <p className="text-sm text-white/40">5–6 Sept 2025 · Bedok HomeTeamNS</p>
      </div>
    </footer>
  );
}
