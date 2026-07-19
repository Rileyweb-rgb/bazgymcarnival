const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** Unique attendee / ticket code shown after registration (e.g. BAZ-7X2K). */
export function generateAttendeeCode(): string {
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return `BAZ-${suffix}`;
}
