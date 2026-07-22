export const CARNIVAL_MEDIA = {
  hero: "/media/hero-carnival-shirt.png",
  watch: "/media/showcase-class.png",
  try: "/media/tiny-tots-class.png",
  spin: "/media/challenge-beam.png",
  celebrate: "/media/coaching-balance.png",
  /** Parent + child high-five — strength challenge banner */
  parentChildChallenge: "/media/parent-child-challenge.jpg",
  details: "/media/coaching-moment.png",
  groupStretch: "/media/group-stretch.png",
  competitivePerformancePhoto: "/media/competitive-performance.png",
  competitivePerformanceVideo: "/media/competitive-performance.mp4",
} as const;

/** Hover tags on the Try banner — class names + alt marketing names. */
export const POPUP_CLASS_TAGS = [
  {
    id: "beginner-am",
    label: "Beginner",
    altNames: "Intro to gymnastics · Gymnastics Discovery/Fundamentals",
    detail: "10am – 11am · Atrium · 5.5 Y.O & above",
  },
  {
    id: "tiny-mini",
    label: "TinyBear & Minibear",
    altNames: "Parent & Toddler fun · Little Movers/Explorers",
    detail: "11am – 12pm · Gym · 2 – 4 Y.O",
  },
  {
    id: "beginner-pm",
    label: "Beginner",
    altNames: "Intro to gymnastics · Gymnastics Discovery/Fundamentals",
    detail: "1pm – 2pm · Gym · 5.5 Y.O & above",
  },
  {
    id: "gym-bear",
    label: "Gym Bear",
    altNames: "Junior/Adventure/Independent Gym",
    detail: "2pm – 3pm · Atrium · 4 – 5 Y.O",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    altNames: "Gymnastics/Cartwheel in motion · Dynamic Movers · All Stars",
    detail: "3pm – 4pm · Gym · Inter 1 & above",
  },
] as const;

export type PrizeItem = {
  id: string;
  label: string;
  shortLabel: string;
  note?: string;
  src: string;
  color: string;
  isGrand?: boolean;
  /** How the image fills the card — vouchers are square; merch posters are taller. */
  imageFit?: "cover" | "contain";
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
/** Featured under the $500 grand prize — crochet blind box mystery collection. */
export const BLIND_BOX_PRIZE: PrizeItem = {
  id: "blind-box",
  label: "BazGym limited edition blind box crochet toy",
  shortLabel: "Blind box crochet · Mystery collection",
  note: "Includes rare mystery gymnast crochet",
  src: "/media/prizes/prize-crochet-poster.jpg",
  color: "#a78bfa",
  imageFit: "contain",
};

/** Grid prizes (blind box is featured separately under grand prize). */
export const CARNIVAL_PRIZES: PrizeItem[] = [
  {
    id: "voucher-50",
    label: "$50 Baz e-voucher",
    shortLabel: "$50 e-voucher",
    src: "/media/prizes/prize-voucher-50.jpg",
    color: "#ff5c4d",
    imageFit: "cover",
  },
  {
    id: "voucher-10",
    label: "$10 Baz e-voucher",
    shortLabel: "$10 e-voucher",
    src: "/media/prizes/prize-voucher-10.jpg",
    color: "#3db8ff",
    imageFit: "cover",
  },
  {
    id: "uniform",
    label: "1 set BazGym uniform",
    shortLabel: "Uniform set",
    src: "/media/prizes/prize-uniform.jpg",
    color: "#ff7a3d",
    imageFit: "cover",
  },
  {
    id: "tumbler",
    label: "BazGym limited edition tumbler",
    shortLabel: "Tumbler",
    src: "/media/prizes/bazgym-tumbler.jpg",
    color: "#0c1a2e",
    imageFit: "cover",
  },
  {
    id: "towel",
    label: "BazGym limited edition towel",
    shortLabel: "Towel",
    src: "/media/prizes/bazgym-towel.jpg",
    color: "#6b7c93",
    imageFit: "cover",
  },
  {
    id: "bag",
    label: "BazGym limited edition recyclable bag",
    shortLabel: "Recyclable bag",
    src: "/media/prizes/bazgym-recyclable-bag.jpg",
    color: "#ff5c4d",
    imageFit: "cover",
  },
  {
    id: "patch",
    label: "BazGym limited edition iron-on patch",
    shortLabel: "Iron-on patch",
    src: "/media/prizes/prize-patch.jpg",
    color: "#34d399",
    imageFit: "cover",
  },
];

/**
 * Build 25 prize-wheel slots for reference copy:
 * 1× grand + each of prizes 2–9 × 3.
 */
export function buildPrizeWheelSlots(): PrizeItem[] {
  const slots: PrizeItem[] = [GRAND_PRIZE];
  for (const p of [...CARNIVAL_PRIZES, BLIND_BOX_PRIZE]) {
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

/** Performance Showcase — 5 September only. */
export const PERFORMANCE_SCHEDULE = [
  { time: "10:00 – 10:45", title: "Mini Bear & Gym Bear", star: false },
  { time: "11:15 – 12:00", title: "Beginner", star: false },
  { time: "13:00 – 13:45", title: "Intermediate", star: false },
  { time: "14:15 – 15:00", title: "PhysioGym", star: false },
  { time: "15:30 – 16:15", title: "Mini Bear & Gym Bear", star: false },
  { time: "16:00 – 16:30", title: "Advanced (Exhibition)", star: true },
] as const;

/** Pop-up classes — both 5 & 6 September. */
export const POPUP_SCHEDULE = [
  {
    time: "10:00 – 11:00",
    title: "Beginner (Atrium, 5.5 Y.O & above)",
    subtitle: "Intro to gymnastics · Gymnastics Discovery/Fundamentals",
    star: false,
  },
  {
    time: "11:00 – 12:00",
    title: "TinyBear & Minibear (Gym, 2 – 4 Y.O)",
    subtitle: "Parent & Toddler fun · Little Movers/Explorers",
    star: false,
  },
  {
    time: "12:00 – 13:00",
    title: "Performance / Lunch Break",
    subtitle: "Showcase performance on 5 Sept · lunch / free roam both days",
    star: false,
  },
  {
    time: "13:00 – 14:00",
    title: "Beginner (Gym, 5.5 Y.O & above)",
    subtitle: "Intro to gymnastics · Gymnastics Discovery/Fundamentals",
    star: false,
  },
  {
    time: "14:00 – 15:00",
    title: "Gym Bear (Atrium, 4 – 5 Y.O)",
    subtitle: "Junior/Adventure/Independent Gym",
    star: false,
  },
  {
    time: "15:00 – 16:00",
    title: "Intermediate (Gym, Inter 1 & above)",
    subtitle: "Gymnastics/Cartwheel in motion · Dynamic Movers · All Stars",
    star: false,
  },
] as const;
