export const PAYMENT_CONFIG = {
  ticketPrice: process.env.NEXT_PUBLIC_TICKET_PRICE ?? "$15",
  paymentMethod: process.env.NEXT_PUBLIC_PAYMENT_METHOD ?? "PayNow",
  paynowQrSeed:
    process.env.NEXT_PUBLIC_PAYNOW_QR_SEED ??
    "BAZGYM-PAYNOW-15",
  instructions:
    "Scan the QR with your banking app, pay the ticket fee, screenshot the receipt, then upload it below.",
} as const;

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
