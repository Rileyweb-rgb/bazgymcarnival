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

/** Carnival fun & games prizes (spin the wheel). */
export const CARNIVAL_PRIZES = [
  {
    id: "crochet",
    label: "Crochet plush",
    emoji: "🧶",
    src: "/media/prizes/crochet-plush.jpg",
    color: "#ffc93c",
  },
  {
    id: "bottle",
    label: "Water bottle",
    emoji: "💧",
    src: "/media/prizes/water-bottle.jpg",
    color: "#3db8ff",
  },
  {
    id: "gift",
    label: "Gift surprise",
    emoji: "🎁",
    src: "/media/prizes/gift-box.jpg",
    color: "#ff5c4d",
  },
  {
    id: "teddy",
    label: "Teddy plush",
    emoji: "🧸",
    src: "/media/prizes/teddy-plush.jpg",
    color: "#ff4d8d",
  },
  {
    id: "stickers",
    label: "Stickers & keychain",
    emoji: "✨",
    src: "/media/prizes/keychain-stickers.jpg",
    color: "#a78bfa",
  },
  {
    id: "goodie",
    label: "Goodie bag",
    emoji: "🎒",
    src: "/media/prizes/goodie-bag.jpg",
    color: "#34d399",
  },
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
