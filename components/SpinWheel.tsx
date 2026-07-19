"use client";

import { useState } from "react";

const SEGMENTS = [
  { label: "Cartwheel", color: "#ffd23f" },
  { label: "Balance", color: "#ff6b4a" },
  { label: "Handstand", color: "#4db8ff" },
  { label: "Jump", color: "#ff4d8d" },
  { label: "Roll", color: "#8b5cf6" },
  { label: "Stretch", color: "#2dd4a0" },
];

export function SpinWheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const segmentIndex = Math.floor(Math.random() * SEGMENTS.length);
    const extraSpins = 5 * 360;
    const segmentAngle = 360 / SEGMENTS.length;
    const targetAngle = extraSpins + segmentIndex * segmentAngle + segmentAngle / 2;

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(SEGMENTS[segmentIndex].label);
    }, 3000);
  }

  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-display text-sm font-semibold uppercase tracking-widest text-[#ff4d8d]">
          Fringe Activity
        </span>
        <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">Challenges &amp; Prizes</h2>
        <p className="mt-3 text-white/70">
          Try your luck — spin to get a carnival challenge. Complete it at the event to win prizes!
        </p>

        <div className="relative mx-auto mt-10 flex flex-col items-center">
          <div className="absolute -top-4 z-10 text-3xl">▼</div>
          <button
            type="button"
            onClick={spin}
            disabled={spinning}
            aria-label="Spin the carnival wheel"
            className="relative h-64 w-64 rounded-full border-4 border-white/20 shadow-2xl transition hover:scale-105 disabled:cursor-not-allowed md:h-72 md:w-72"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
              background: `conic-gradient(${SEGMENTS.map((s, i) => {
                const start = (i / SEGMENTS.length) * 100;
                const end = ((i + 1) / SEGMENTS.length) * 100;
                return `${s.color} ${start}% ${end}%`;
              }).join(", ")})`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0a1628] font-display text-sm font-bold shadow-lg md:h-20 md:w-20">
                SPIN
              </div>
            </div>
          </button>

          {result && (
            <p className="animate-bounce-in mt-8 font-display text-xl font-bold text-[#ffd23f]">
              Your challenge: <span className="text-white">{result}!</span>
            </p>
          )}

          <p className="mt-4 text-sm text-white/50">
            {spinning ? "Spinning..." : "Tap the wheel to try a challenge"}
          </p>
        </div>
      </div>
    </section>
  );
}
