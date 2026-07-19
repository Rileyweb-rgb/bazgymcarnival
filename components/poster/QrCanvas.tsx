"use client";

import { useEffect, useRef } from "react";

type QrCanvasProps = {
  seed: string;
  size?: number;
  className?: string;
};

/** Deterministic placeholder QR (matches Claude design prototype). */
export function QrCanvas({ seed, size = 220, className = "" }: QrCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const N = 29;
    const cell = canvas.width / N;
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const rnd = () => {
      h ^= h << 13;
      h ^= h >>> 17;
      h ^= h << 5;
      return (h >>> 0) / 4294967296;
    };

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0c1a2e";

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const inFinder =
          (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8);
        if (!inFinder && rnd() > 0.52) {
          ctx.fillRect(x * cell, y * cell, cell - 0.5, cell - 0.5);
        }
      }
    }

    const finder = (fx: number, fy: number) => {
      ctx.fillStyle = "#0c1a2e";
      ctx.fillRect(fx * cell, fy * cell, 7 * cell, 7 * cell);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect((fx + 1) * cell, (fy + 1) * cell, 5 * cell, 5 * cell);
      ctx.fillStyle = "#0c1a2e";
      ctx.fillRect((fx + 2) * cell, (fy + 2) * cell, 3 * cell, 3 * cell);
    };

    finder(0, 0);
    finder(N - 7, 0);
    finder(0, N - 7);
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`mx-auto block rounded-xl border border-[#0c1a2e]/8 ${className}`}
      aria-hidden
    />
  );
}
