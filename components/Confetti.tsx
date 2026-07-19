"use client";

import { useEffect, useState } from "react";

const CONFETTI_COLORS = [
  "#ffd23f",
  "#ff6b4a",
  "#4db8ff",
  "#ff4d8d",
  "#8b5cf6",
  "#2dd4a0",
];

export function Confetti() {
  const [pieces, setPieces] = useState<
    { id: number; left: number; delay: number; duration: number; color: string; size: number }[]
  >([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 8,
      })),
    );
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
