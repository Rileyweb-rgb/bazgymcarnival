export const CARNIVAL_MEDIA = {
  hero: "/media/hero-carnival-shirt.png",
  watch: "/media/showcase-class.png",
  try: "/media/tiny-tots-class.png",
  spin: "/media/challenge-beam.png",
  celebrate: "/media/coaching-balance.png",
  details: "/media/coaching-moment.png",
  groupStretch: "/media/group-stretch.png",
  competitivePerformancePhoto: "/media/competitive-performance.png",
  competitivePerformanceVideo: "/media/competitive-performance.mp4",
} as const;

export type PrizeItem = {
  id: string;
  label: string;
  shortLabel: string;
  note?: string;
  src: string;
  color: string;
  isGrand?: boolean;
};

/** Grand prize — large banner on the prizes section. */
export const GRAND_PRIZE: PrizeItem = {
  id: "voucher-500",
  label: "$500 BazGym e-voucher",
  shortLabel: "$500 e-voucher",
  note: "Grand prize · max 10 winners",
  src: "/media/prizes/prize-voucher-500.jpg",
  color: "#ffc93c",
  isGrand: true,
};

/**
 * Prizes 2–9 for the carnival prize wheel.
 * On event day: each of these repeats 3× + 1 grand = 25 slots.
 */
export const CARNIVAL_PRIZES: PrizeItem[] = [
  {
    id: "voucher-50",
    label: "$50 Baz e-voucher",
    shortLabel: "$50 e-voucher",
    src: "/media/prizes/prize-voucher-50.jpg",
    color: "#ff5c4d",
  },
  {
    id: "voucher-10",
    label: "$10 Baz e-voucher",
    shortLabel: "$10 e-voucher",
    src: "/media/prizes/prize-voucher-10.jpg",
    color: "#3db8ff",
  },
  {
    id: "uniform",
    label: "1 set BazGym uniform",
    shortLabel: "Uniform set",
    src: "/media/prizes/prize-uniform.jpg",
    color: "#ff7a3d",
  },
  {
    id: "tumbler",
    label: "BazGym limited edition tumbler",
    shortLabel: "Tumbler",
    src: "/media/prizes/bazgym-tumbler.jpg",
    color: "#0c1a2e",
  },
  {
    id: "towel",
    label: "BazGym limited edition towel",
    shortLabel: "Towel",
    src: "/media/prizes/bazgym-towel.jpg",
    color: "#6b7c93",
  },
  {
    id: "bag",
    label: "BazGym limited edition recyclable bag",
    shortLabel: "Recyclable bag",
    src: "/media/prizes/bazgym-recyclable-bag.jpg",
    color: "#ff5c4d",
  },
  {
    id: "blind-box",
    label: "BazGym limited edition blind box crochet toy",
    shortLabel: "Blind box crochet",
    note: "Surprise figure inside — including rare mystery gymnast",
    src: "/media/prizes/prize-blind-box-crew.jpg",
    color: "#a78bfa",
  },
  {
    id: "patch",
    label: "BazGym limited edition iron-on patch",
    shortLabel: "Iron-on patch",
    src: "/media/prizes/prize-patch.jpg",
    color: "#34d399",
  },
];

/** Silhouette tease for the mystery gymnast crochet (blind-box rare). */
export const MYSTERY_CROCHET = {
  label: "Mystery gymnast crochet",
  note: "Blind-box surprise · silhouette only",
  src: "/media/prizes/prize-mystery-gymnast.jpg",
} as const;

/**
 * Build 25 prize-wheel slots for reference copy:
 * 1× grand + each of prizes 2–9 × 3.
 */
export function buildPrizeWheelSlots(): PrizeItem[] {
  const slots: PrizeItem[] = [GRAND_PRIZE];
  for (const p of CARNIVAL_PRIZES) {
    slots.push(p, p, p);
  }
  return slots;
}

/** Interactive site wheel = strength challenges (not prize odds). */
export const STRENGTH_CHALLENGES = [
  { label: "Cartwheel", emoji: "🤸", color: "#ffc93c" },
  { label: "Handstand hold", emoji: "🙌", color: "#ff5c4d" },
  { label: "Beam balance", emoji: "⚖️", color: "#3db8ff" },
  { label: "Tuck jump", emoji: "⬆️", color: "#ff4d8d" },
  { label: "Forward roll", emoji: "🔄", color: "#a78bfa" },
  { label: "Bridge hold", emoji: "🌉", color: "#34d399" },
  { label: "Pike stretch", emoji: "🦵", color: "#f59e0b" },
  { label: "Wall handstand", emoji: "🧱", color: "#60a5fa" },
] as const;

export const CARNIVAL_GALLERY = [
  {
    src: CARNIVAL_MEDIA.groupStretch,
    alt: "Children stretching together during a BazGym carnival class",
  },
  {
    src: CARNIVAL_MEDIA.watch,
    alt: "Instructor demonstrating a pose to a line of children",
  },
  {
    src: CARNIVAL_MEDIA.try,
    alt: "Coaches guiding toddlers through a pop-up gymnastics class",
  },
  {
    src: CARNIVAL_MEDIA.details,
    alt: "One-on-one coaching moment at BazGym Carnival",
  },
  {
    src: CARNIVAL_MEDIA.celebrate,
    alt: "Young gymnast practising balance with a coach",
  },
  {
    src: CARNIVAL_MEDIA.spin,
    alt: "Adults taking on a carnival balance beam challenge",
  },
] as const;

export const PERFORMANCE_SCHEDULE = [
  { time: "10:00 – 10:45", title: "Mini Bear & Gym Bear", star: false },
  { time: "11:15 – 12:00", title: "Beginner", star: false },
  { time: "13:00 – 13:45", title: "Intermediate", star: false },
  { time: "14:15 – 15:00", title: "PhysioGym", star: false },
  { time: "15:30 – 16:15", title: "Mini Bear & Gym Bear", star: false },
  { time: "16:00 – 16:30", title: "Advanced (Exhibition)", star: true },
] as const;

/** Estimated pop-up class blocks (aligned with registration hourly slots). */
export const POPUP_SCHEDULE = [
  { time: "10:00 – 11:00", title: "Pop-up class slot 1", star: false },
  { time: "11:00 – 12:00", title: "Pop-up class slot 2", star: false },
  { time: "12:00 – 13:00", title: "Pop-up class slot 3", star: false },
  { time: "13:00 – 14:00", title: "Pop-up class slot 4", star: false },
  { time: "14:00 – 15:00", title: "Pop-up class slot 5", star: false },
  { time: "15:00 – 16:00", title: "Pop-up class slot 6", star: false },
] as const;
