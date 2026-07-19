"use client";

import { useState } from "react";

type Day = "day1" | "day2";

type ScheduleItem = {
  time: string;
  title: string;
  tag: "watch" | "try" | "spin" | "perform" | "all";
  highlight?: boolean;
};

const SCHEDULE: Record<Day, ScheduleItem[]> = {
  day1: [
    { time: "10:00", title: "Doors open — Challenges & prizes live", tag: "spin" },
    { time: "10:30", title: "Pop-up classes begin (rolling slots)", tag: "try" },
    { time: "11:00", title: "Student Moves Showcase — Session 1", tag: "watch" },
    { time: "12:00", title: "Competitive Performance Showcase — Show 1", tag: "perform", highlight: true },
    { time: "13:00", title: "Lunch break / free roam", tag: "all" },
    { time: "14:00", title: "Student Moves Showcase — Session 2", tag: "watch" },
    { time: "15:00", title: "Competitive Performance Showcase — Show 2", tag: "perform", highlight: true },
    { time: "16:00", title: "Pop-up classes — last slots", tag: "try" },
    { time: "17:00", title: "Carnival closes — see you tomorrow!", tag: "all" },
  ],
  day2: [
    { time: "10:00", title: "Doors open — Challenges & prizes live", tag: "spin" },
    { time: "10:30", title: "Pop-up classes begin (rolling slots)", tag: "try" },
    { time: "11:00", title: "Student Moves Showcase — Session 1", tag: "watch" },
    { time: "12:00", title: "Competitive Performance Showcase — Show 1", tag: "perform", highlight: true },
    { time: "13:00", title: "Lunch break / free roam", tag: "all" },
    { time: "14:00", title: "Student Moves Showcase — Session 2", tag: "watch" },
    { time: "15:00", title: "Competitive Performance Showcase — Show 2", tag: "perform", highlight: true },
    { time: "16:00", title: "Pop-up classes — last slots", tag: "try" },
    { time: "17:00", title: "Carnival closes — thanks for coming!", tag: "all" },
  ],
};

const TAG_STYLES: Record<ScheduleItem["tag"], string> = {
  watch: "bg-[#4db8ff]/20 text-[#4db8ff]",
  try: "bg-[#ffd23f]/20 text-[#ffd23f]",
  spin: "bg-[#ff4d8d]/20 text-[#ff4d8d]",
  perform: "bg-[#2dd4a0]/20 text-[#2dd4a0]",
  all: "bg-white/10 text-white/60",
};

const TAG_LABELS: Record<ScheduleItem["tag"], string> = {
  watch: "Watch",
  try: "Try",
  spin: "Spin",
  perform: "Perform",
  all: "All",
};

export function Schedule() {
  const [day, setDay] = useState<Day>("day1");

  return (
    <section id="schedule" className="px-5 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-[#4db8ff]">
            Programme
          </span>
          <h2 className="font-display mt-2 text-4xl font-bold md:text-5xl">Your Carnival Schedule</h2>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setDay("day1")}
            className={`rounded-full px-6 py-2.5 font-display font-bold transition ${
              day === "day1"
                ? "bg-[#ffd23f] text-[#0a1628]"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Day 1 — 5 Sept
          </button>
          <button
            type="button"
            onClick={() => setDay("day2")}
            className={`rounded-full px-6 py-2.5 font-display font-bold transition ${
              day === "day2"
                ? "bg-[#ffd23f] text-[#0a1628]"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Day 2 — 6 Sept
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {SCHEDULE[day].map((item) => (
            <div
              key={`${day}-${item.time}-${item.title}`}
              className={`ticket-card flex items-start gap-4 p-4 md:p-5 ${
                item.highlight ? "ring-2 ring-[#ffd23f]/50" : ""
              }`}
            >
              <time className="font-display shrink-0 text-lg font-bold text-[#ffd23f] md:w-16">
                {item.time}
              </time>
              <div className="min-w-0 flex-1">
                <p className={`font-medium ${item.highlight ? "text-white" : "text-white/85"}`}>
                  {item.highlight && <span className="mr-1">★</span>}
                  {item.title}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold uppercase ${TAG_STYLES[item.tag]}`}
                >
                  {TAG_LABELS[item.tag]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-white/50">
          Times are approximate — check on the day for any updates.
        </p>
      </div>
    </section>
  );
}
