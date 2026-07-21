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

/** Limited-edition merch prizes (spin the wheel + gallery). */
export const CARNIVAL_PRIZES = [
  {
    id: "tumbler",
    label: "BazGym Tumbler",
    emoji: "🥤",
    src: "/media/prizes/bazgym-tumbler.jpg",
    color: "#0c1a2e",
  },
  {
    id: "towel",
    label: "BazGym Towel",
    emoji: "🧼",
    src: "/media/prizes/bazgym-towel.jpg",
    color: "#3db8ff",
  },
  {
    id: "bag",
    label: "Recyclable Bag",
    emoji: "🛍️",
    src: "/media/prizes/bazgym-recyclable-bag.jpg",
    color: "#ff5c4d",
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
