export type MembershipType = "hometeamns" | "non-hometeamns";

export const MEMBERSHIP_OPTIONS: {
  id: MembershipType;
  label: string;
  shortLabel: string;
  price: string;
  qrSeed: string;
}[] = [
  {
    id: "hometeamns",
    label: "HomeTeamNS member",
    shortLabel: "HomeTeamNS",
    // Pop-up class fee is $25; HTNS vs non may still use different PayNow QRs
    price: process.env.NEXT_PUBLIC_TICKET_PRICE_HOMETEAMNS ?? "$25",
    qrSeed:
      process.env.NEXT_PUBLIC_PAYNOW_QR_SEED_HOMETEAMNS ??
      "BAZGYM-PAYNOW-HOMETEAMNS-DUMMY",
  },
  {
    id: "non-hometeamns",
    label: "Non-HomeTeamNS member",
    shortLabel: "Non-member",
    price: process.env.NEXT_PUBLIC_TICKET_PRICE_NON_HOMETEAMNS ?? "$25",
    qrSeed:
      process.env.NEXT_PUBLIC_PAYNOW_QR_SEED_NON_HOMETEAMNS ??
      "BAZGYM-PAYNOW-NONMEMBER-DUMMY",
  },
];

export const PAYMENT_CONFIG = {
  paymentMethod: process.env.NEXT_PUBLIC_PAYMENT_METHOD ?? "PayNow",
  /** Pop-up class fee */
  ticketPrice: process.env.NEXT_PUBLIC_TICKET_PRICE ?? "$25",
  paynowQrSeed:
    process.env.NEXT_PUBLIC_PAYNOW_QR_SEED ?? "BAZGYM-PAYNOW-25",
  instructions:
    "Scan the QR with your banking app, pay the ticket fee, screenshot the receipt, then upload it below.",
} as const;

export function getMembershipOption(type: MembershipType) {
  const found = MEMBERSHIP_OPTIONS.find((o) => o.id === type);
  if (!found) {
    return MEMBERSHIP_OPTIONS[1]!;
  }
  return found;
}

export const PAYMENT_SCREENSHOT_MAX_BYTES = 4 * 1024 * 1024;

export const PAYMENT_SCREENSHOT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export function ticketCtaLabel(): string {
  return "Register now";
}
