"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RegisterButton } from "@/components/poster/RegisterButton";
import { RegistrationModal } from "@/components/poster/RegistrationModal";
import { ScrollReveal } from "@/components/poster/ScrollReveal";
import {
  CoralSectionBackdrop,
  DarkSectionBackdrop,
  SectionBackdrop,
} from "@/components/poster/SectionBackdrop";
import {
  BLIND_BOX_PRIZE,
  CARNIVAL_GALLERY,
  CARNIVAL_MEDIA,
  CARNIVAL_PRIZES,
  GRAND_PRIZE,
  PERFORMANCE_SCHEDULE,
  POPUP_CLASS_TAGS,
  POPUP_SCHEDULE,
} from "@/lib/carnival-media";
import { ticketCtaLabel } from "@/lib/payment-config";

const MARQUEE = [
  "Try",
  "Watch",
  "Strength Challenge",
  "Prizes",
  "5–6 Sept",
  "Bedok HomeTeamNS",
  "Register now",
];

export function PosterLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date("2026-09-05T10:00:00+08:00").getTime();
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      diff -= d * 86400000;
      const h = Math.floor(diff / 3600000);
      diff -= h * 3600000;
      const m = Math.floor(diff / 60000);
      diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      setCountdown({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <RegistrationModal open={registerOpen} onClose={() => setRegisterOpen(false)} />

      {/* Sticky nav — Apple-style minimal */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-glass border-b border-[#0c1a2e]/5 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <Image
            src="/figma-assets/circle-icon.png"
            alt="BazGym"
            width={100}
            height={36}
            className={`h-7 w-auto transition-all ${scrolled ? "invert" : ""}`}
          />
          <div className="flex items-center gap-3">
            <span
              className={`hidden text-sm font-semibold sm:block ${
                scrolled ? "text-[#0c1a2e]/70" : "text-white/80"
              }`}
            >
              5–6 Sept 2026 · Bedok
            </span>
            <RegisterButton
              onClick={() => setRegisterOpen(true)}
              variant="nav"
              className="!px-4 !py-2 text-sm"
            >
              Register now
            </RegisterButton>
            <Link
              href="#details"
              className={`hidden rounded-full px-4 py-2 text-sm font-bold transition sm:block ${
                scrolled
                  ? "border border-[#0c1a2e]/15 text-[#0c1a2e] hover:bg-[#0c1a2e]/5"
                  : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              }`}
            >
              Event Info
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO POSTER ── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#0c1a2e]">
        <Image
          src={CARNIVAL_MEDIA.hero}
          alt="Participant at BazGym Carnival in a straddle stretch wearing the carnival shirt"
          fill
          priority
          className="object-cover object-[center_35%] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e] via-[#0c1a2e]/40 to-[#0c1a2e]/20" />

        {/* Decorative blobs */}
        <div className="blob-float absolute right-[8%] top-[22%] h-20 w-20 rounded-full bg-[#ffc93c]/80 blur-sm" />
        <div className="blob-float absolute left-[6%] top-[30%] h-14 w-14 rounded-full bg-[#ff4d8d]/70 blur-sm [animation-delay:1s]" />
        <div className="blob-float absolute right-[20%] top-[55%] h-10 w-10 rounded-full bg-[#3db8ff]/70 blur-sm [animation-delay:2s]" />

        <div className="relative z-10 w-full px-6 pb-16 pt-32 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="sticker mb-6 w-fit bg-[#ffc93c] text-[#0c1a2e]">
              🎟️ Register now · Open to All
            </div>

            <h1 className="font-display leading-[0.9] tracking-tight text-white">
              <span className="block text-[clamp(3.5rem,14vw,9rem)] font-bold">BazGym</span>
              <span className="poster-shadow block text-[clamp(4rem,16vw,10rem)] font-bold text-poster-gradient">
                Carnival
              </span>
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="sticker bg-white text-[#0c1a2e]">📅 5 &amp; 6 Sept 2026</div>
              <div className="sticker sticker-right bg-[#ff5c4d] text-white">⏰ 10am – 5pm</div>
              <div className="sticker bg-[#3db8ff] text-[#0c1a2e]">📍 Bedok HomeTeamNS</div>
            </div>

            <div className="mt-6 inline-flex items-baseline gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/55">
                Showtime in
              </span>
              <span className="font-display text-xl font-bold text-[#ffc93c]">
                {countdown.d}
                <span className="text-sm text-white/60">d</span>
              </span>
              <span className="font-display text-xl font-bold text-white">
                {String(countdown.h).padStart(2, "0")}
                <span className="text-sm text-white/60">h</span>
              </span>
              <span className="font-display text-xl font-bold text-white">
                {String(countdown.m).padStart(2, "0")}
                <span className="text-sm text-white/60">m</span>
              </span>
              <span className="font-display text-xl font-bold text-white">
                {String(countdown.s).padStart(2, "0")}
                <span className="text-sm text-white/60">s</span>
              </span>
            </div>

            <p className="mt-10 max-w-md text-lg text-white/75 md:text-xl">
              Two days of flips, thrills &amp; first tries.
              <br />
              <span className="font-display font-semibold text-[#ffc93c]">
                Try · Watch · Challenge · Prizes
              </span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <RegisterButton onClick={() => setRegisterOpen(true)} variant="primary">
                {ticketCtaLabel()}
              </RegisterButton>
              <Link
                href="#try"
                className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-display text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                See What&apos;s On ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ribbon */}
      <div className="overflow-hidden bg-[#0c1a2e] py-3">
        <div className="marquee-inner flex w-max gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/60"
            >
              {item} ✦
            </span>
          ))}
        </div>
      </div>

      {/* Photo strip */}
      <section className="bg-[#0c1a2e] py-6">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 pb-2 snap-x snap-mandatory scrollbar-hide">
          {CARNIVAL_GALLERY.map((photo) => (
            <div
              key={photo.src}
              className="relative h-44 w-64 shrink-0 snap-start overflow-hidden rounded-2xl md:h-52 md:w-80"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── TRY ── Full color block like Apple product colorways */}
      <section id="try" className="poster-section relative overflow-hidden bg-[#ff5c4d] px-6">
        <CoralSectionBackdrop src={CARNIVAL_MEDIA.try} alt="" />
        <div className="relative z-10 mx-auto max-w-6xl w-full">
          <ScrollReveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-white/60">
              01 — Pop-Up Classes
            </p>
            <h2 className="font-display mt-4 text-[clamp(4rem,18vw,11rem)] font-bold leading-none text-white">
              Try.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/80 md:text-2xl">
              Walk in curious, walk out tumbling. Pop-up classes for all levels — zero experience
              needed.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="mt-12 overflow-hidden rounded-3xl bg-white/15 backdrop-blur-sm">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={CARNIVAL_MEDIA.details}
                  alt="BazGym coaches guiding a young gymnast during a pop-up class"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
              </div>
              <div className="p-8 md:p-10">
              <p className="font-display text-2xl font-bold text-white md:text-3xl">
                Tiny → Intermediate
              </p>
              <p className="mt-3 text-lg text-white/75">
                with BazGym coaches · Both days · 5 &amp; 6 Sept
              </p>
              <p className="mt-2 font-display text-base font-bold text-white/90">
                $25 per class
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {POPUP_CLASS_TAGS.map((tag) => (
                  <span
                    key={tag.id}
                    className="group relative cursor-default rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-white/30"
                    title={`${tag.altNames} · ${tag.detail}`}
                  >
                    {tag.label}
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-2xl bg-[#0c1a2e] px-3 py-2 text-center text-xs font-semibold leading-snug text-white opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-within:opacity-100"
                    >
                      <span className="block text-[#ffc93c]">{tag.altNames}</span>
                      <span className="mt-1 block text-white/60">{tag.detail}</span>
                    </span>
                  </span>
                ))}
              </div>
              <RegisterButton
                onClick={() => setRegisterOpen(true)}
                variant="coral"
                className="mt-8"
              >
                {ticketCtaLabel()}
              </RegisterButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WATCH ── Apple-style big word section */}
      <section id="watch" className="poster-section relative overflow-hidden bg-[#fff8f0] px-6">
        <SectionBackdrop src={CARNIVAL_MEDIA.watch} alt="" opacity={16} />
        <div className="relative z-10 mx-auto max-w-6xl w-full">
          <ScrollReveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-[#ff5c4d]">
              02 — Showcase
            </p>
            <h2 className="font-display mt-4 text-[clamp(4rem,18vw,11rem)] font-bold leading-none text-[#0c1a2e]">
              Watch.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#0c1a2e]/65 md:text-2xl">
              From first cartwheel to full routine — our students take the spotlight. Every level, every win.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="mt-12 space-y-6">
              <div className="ticket-outline overflow-hidden">
                <div className="relative aspect-video w-full bg-[#0c1a2e]">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    poster={CARNIVAL_MEDIA.competitivePerformancePhoto}
                    aria-label="Competitive team performance highlights from BazGym Carnival 2025"
                  >
                    <source
                      src={CARNIVAL_MEDIA.competitivePerformanceVideo}
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
                  <div>
                    <p className="font-display text-3xl font-bold md:text-4xl">
                      Competitive Team Performance
                    </p>
                    <p className="mt-2 text-lg text-[#0c1a2e]/55">
                      Boys competitive team — highlights from Carnival 2025, back bigger this
                      September
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#ff5c4d]">
                      Live showcase on 5 September
                    </p>
                  </div>
                </div>
              </div>

              <div className="ticket-outline overflow-hidden">
                <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
                  <Image
                    src={CARNIVAL_MEDIA.competitivePerformancePhoto}
                    alt="Girls competitive team performing at BazGym Carnival"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 1152px"
                  />
                </div>
                <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
                  <div>
                    <p className="font-display text-3xl font-bold md:text-4xl">
                      Girls Competitive Team Performance
                    </p>
                    <p className="mt-2 text-lg text-[#0c1a2e]/55">
                      Power, precision, and podium energy — our girls competitive squad on stage
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#ff5c4d]">
                      Live showcase on 5 September
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PRIZES (dark blue banner) ── */}
      <section id="spin" className="poster-section relative overflow-hidden bg-[#0c1a2e] px-6 py-20">
        <DarkSectionBackdrop src={CARNIVAL_MEDIA.spin} alt="" opacity={18} />
        <div className="relative z-10 mx-auto max-w-6xl w-full text-center">
          <ScrollReveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-[#ffc93c]">
              03 — Prizes
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,10vw,5.5rem)] font-bold leading-none text-white">
              Spin for prizes.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/60">
              Big prize wheel on carnival day — 25 slots. Grand prize plus limited-edition merch
              &amp; e-vouchers.
            </p>
          </ScrollReveal>

          {/* Grand prize — graphic already has title; caption sits below (no overlay clash) */}
          <ScrollReveal delay={150}>
            <div className="mx-auto mt-12 max-w-xl">
              <div className="overflow-hidden rounded-[1.75rem] border border-[#ffc93c]/40 bg-[#06101c] shadow-[0_20px_60px_-20px_rgba(255,201,60,0.35)]">
                <div className="relative aspect-square w-full">
                  <Image
                    src={GRAND_PRIZE.src}
                    alt={GRAND_PRIZE.label}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, 576px"
                    priority
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">{GRAND_PRIZE.note}</p>
              <p className="mt-1 text-xs text-white/40">
                Prize wheel: 1 grand slot + prizes 2–9 each ×3 = 25 slots total
              </p>
            </div>
          </ScrollReveal>

          {/* Crochet blind box — full poster width, then copy */}
          <ScrollReveal delay={180}>
            <div className="mx-auto mt-10 max-w-lg overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#12081f] md:max-w-xl">
              <Image
                src={BLIND_BOX_PRIZE.src}
                alt={BLIND_BOX_PRIZE.label}
                width={900}
                height={1200}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 576px"
              />
              <div className="px-6 py-7 text-left sm:px-8">
                <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#c4b5fd]">
                  Limited edition
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
                  Blind box crochet
                </h3>
                <p className="mt-2 text-base font-semibold text-white/70">Mystery collection</p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {BLIND_BOX_PRIZE.note}. Collect Ribbit, Teddy, Hammy, crochet cheesecake wedge —
                  or the rare mystery gymnast figure.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Other prizes — even grid, cover-fill so merch headers stay visible */}
          <ScrollReveal delay={220}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {CARNIVAL_PRIZES.map((prize) => (
                <div key={prize.id} className="group text-left">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f8fc] ring-1 ring-white/10">
                    <Image
                      src={prize.src}
                      alt={prize.label}
                      fill
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <p className="font-display mt-2.5 px-0.5 text-sm font-bold leading-snug text-white">
                    {prize.shortLabel}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── STRENGTH CHALLENGE ── */}
      <section
        id="challenge"
        className="poster-section relative overflow-hidden bg-[#fff8f0] px-6 py-20"
      >
        <SectionBackdrop
          src={CARNIVAL_MEDIA.parentChildChallenge}
          alt=""
          opacity={22}
          overlay="from-[#fff8f0]/88 via-[#fff8f0]/78 to-[#fff8f0]/92"
        />
        <div className="relative z-10 mx-auto max-w-6xl w-full">
          <ScrollReveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-[#34d399]">
              04 — Challenge yourself and win more prizes
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.5rem,12vw,7rem)] font-bold leading-none text-[#0c1a2e]">
              Strength
              <br />
              <span className="text-poster-gradient">Challenge.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#0c1a2e]/70 md:text-2xl">
              Take on the stations, stack the wins, and walk away with more prizes.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#0c1a2e]/8 bg-white/85 shadow-xl backdrop-blur-sm">
              <div className="grid items-stretch md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[240px] w-full md:min-h-[320px]">
                  <Image
                    src={CARNIVAL_MEDIA.parentChildChallenge}
                    alt="Singaporean Asian mum and child high-fiving after a fun strength challenge"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#ff5c4d]">
                    Parent &amp; child
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-bold leading-tight text-[#0c1a2e] md:text-3xl">
                    Join the challenges with your child!
                  </h3>
                  <p className="mt-3 text-lg font-semibold text-poster-gradient">
                    Bond together, win together.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#0c1a2e]/60">
                    Team up for parent–child strength stations — cartwheels, holds, balances and
                    more. Finish challenges, stack prizes, make memories.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EVENT POSTER CARD ── */}
      <section id="details" className="poster-section relative overflow-hidden bg-[#ffe8d6] px-6 py-24">
        <SectionBackdrop
          src={CARNIVAL_MEDIA.details}
          alt=""
          opacity={12}
          overlay="from-[#ffe8d6]/94 via-[#ffe8d6]/90 to-[#ffe8d6]/96"
        />
        <div className="relative z-10 mx-auto max-w-lg w-full">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl shadow-[#ff5c4d]/10 md:p-12">
              {/* Poster top strip */}
              <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#ff5c4d] via-[#ffc93c] to-[#3db8ff]" />

              <div className="mt-4 text-center">
                <Image
                  src="/figma-assets/circle-icon.png"
                  alt="BazGym"
                  width={120}
                  height={40}
                  className="mx-auto h-10 w-auto invert"
                />

                <h2 className="font-display mt-6 text-5xl font-bold leading-none md:text-6xl">
                  <span className="text-[#0c1a2e]">BazGym</span>
                  <br />
                  <span className="text-poster-gradient">Carnival</span>
                </h2>

                <div className="my-8 h-px bg-[#0c1a2e]/10" />

                <dl className="space-y-5 text-left">
                  <div className="flex justify-between gap-4">
                    <dt className="font-bold text-[#0c1a2e]/45">When</dt>
                    <dd className="text-right font-display font-bold text-[#0c1a2e]">
                      5 &amp; 6 September 2026
                      <br />
                      <span className="text-base font-semibold text-[#0c1a2e]/55">
                        10am – 5pm daily
                      </span>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-bold text-[#0c1a2e]/45">Where</dt>
                    <dd className="text-right font-display font-bold text-[#0c1a2e]">
                      Bedok HomeTeamNS
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-bold text-[#0c1a2e]/45">Entry</dt>
                    <dd className="text-right font-display font-bold text-[#ff5c4d]">
                      Pop-up class $25
                      <br />
                      <span className="text-base font-semibold text-[#0c1a2e]/55">
                        Register ahead to secure a slot
                      </span>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-bold text-[#0c1a2e]/45">Who</dt>
                    <dd className="text-right font-display font-bold text-[#0c1a2e]">
                      Everyone welcome
                    </dd>
                  </div>
                </dl>

                <RegisterButton
                  onClick={() => setRegisterOpen(true)}
                  className="mt-4 w-full !rounded-2xl"
                >
                  {ticketCtaLabel()}
                </RegisterButton>

                <a
                  href="https://maps.google.com/?q=Bedok+HomeTeamNS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full rounded-2xl bg-[#0c1a2e] py-4 font-display font-bold text-white transition hover:bg-[#0c1a2e]/90"
                >
                  Get Directions →
                </a>
              </div>

              {/* Tear-off ticket perforation */}
              <div className="mt-8 flex justify-center gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-[#ffe8d6]" />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROGRAMME — two tracks ── */}
      <section className="bg-[#fff8f0] px-6 py-24">
        <div className="mx-auto max-w-6xl w-full">
          <ScrollReveal>
            <h2 className="font-display text-center text-4xl font-bold text-[#0c1a2e] md:text-5xl">
              Programme
            </h2>
            <p className="mt-3 text-center text-sm text-[#0c1a2e]/45">
              Times approximate · Pop-up classes both days · Showcase on 5 Sept
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {/* Performance Showcase */}
              <div className="rounded-[2rem] border border-[#0c1a2e]/8 bg-white p-6 shadow-sm md:p-8">
                <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#ff5c4d]">
                  Track A
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-[#0c1a2e] md:text-3xl">
                  Performance Showcase
                </h3>
                <p className="mt-2 text-xs font-semibold text-[#ff5c4d]">
                  5 September only
                </p>
                <div className="relative mt-8 pl-8">
                  <div className="schedule-line absolute bottom-0 left-[11px] top-0 w-0.5 rounded-full" />
                  {PERFORMANCE_SCHEDULE.map((item) => (
                    <div key={`perf-${item.time}`} className="relative pb-7 last:pb-0">
                      <div
                        className={`absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-[3px] border-white ${
                          item.star ? "bg-[#ffc93c]" : "bg-[#0c1a2e]/20"
                        }`}
                      />
                      <p className="font-display text-sm font-bold text-[#ff5c4d]">{item.time}</p>
                      <p
                        className={`mt-0.5 font-medium ${
                          item.star
                            ? "font-display text-base font-bold text-[#0c1a2e]"
                            : "text-[#0c1a2e]/65"
                        }`}
                      >
                        {item.star && "★ "}
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pop-up classes */}
              <div className="rounded-[2rem] border border-[#0c1a2e]/8 bg-white p-6 shadow-sm md:p-8">
                <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#3db8ff]">
                  Track B
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-[#0c1a2e] md:text-3xl">
                  Pop-up classes
                </h3>
                <p className="mt-2 text-xs text-[#0c1a2e]/45">
                  Both days · 5 &amp; 6 September
                </p>
                <div className="relative mt-6 pl-8">
                  <div className="schedule-line absolute bottom-0 left-[11px] top-0 w-0.5 rounded-full" />
                  {POPUP_SCHEDULE.map((item) => (
                    <div key={`pop-${item.time}`} className="relative pb-7 last:pb-0">
                      <div className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-[3px] border-white bg-[#3db8ff]/40" />
                      <p className="font-display text-sm font-bold text-[#3db8ff]">{item.time}</p>
                      <p className="mt-0.5 font-medium text-[#0c1a2e]/80">{item.title}</p>
                      {"subtitle" in item && item.subtitle ? (
                        <p className="mt-0.5 text-xs text-[#0c1a2e]/45">{item.subtitle}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FINALE ── */}
      <section className="relative overflow-hidden bg-[#0c1a2e] px-6 py-32 text-center">
        <div className="blob-float absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-[#ffc93c]/20 blur-2xl" />
        <div className="blob-float absolute right-[10%] bottom-[20%] h-40 w-40 rounded-full bg-[#ff4d8d]/15 blur-2xl [animation-delay:1.5s]" />

        <ScrollReveal>
          <p className="font-display text-[clamp(2.5rem,8vw,5rem)] font-bold leading-tight text-white">
            See you at
            <br />
            <span className="text-poster-gradient">the carnival.</span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <RegisterButton onClick={() => setRegisterOpen(true)} variant="primary">
              {ticketCtaLabel()}
            </RegisterButton>
            <a
              href="https://bazgym.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-4 font-display font-bold text-[#0c1a2e] transition hover:scale-105"
            >
              bazgym.com
            </a>
            <Link
              href="#try"
              className="rounded-full border border-white/20 px-8 py-4 font-display font-bold text-white transition hover:bg-white/10"
            >
              Back to top ↑
            </Link>
          </div>
        </ScrollReveal>

        <footer className="mt-20 border-t border-white/10 pt-8">
          <Image
            src="/figma-assets/circle-icon.png"
            alt="BazGym"
            width={90}
            height={30}
            className="mx-auto h-6 w-auto opacity-40"
          />
          <p className="mt-3 text-xs text-white/25">
            © BazGym Gymnastics · 5–6 Sept 2026 · Bedok HomeTeamNS
          </p>
        </footer>
      </section>
    </>
  );
}


