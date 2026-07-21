export type PreferredDay = "5-sept" | "6-sept";

/** Pop-up class hourly slots (class names TBA). */
export type PreferredTime =
  | "10-11"
  | "11-12"
  | "12-13"
  | "13-14"
  | "14-15"
  | "15-16";

export const PREFERRED_TIME_SLOTS: PreferredTime[] = [
  "10-11",
  "11-12",
  "12-13",
  "13-14",
  "14-15",
  "15-16",
];

export type RegistrationPayload = {
  childName: string;
  parentGuardianName: string;
  parentEmail: string;
  contactNumber: string;
  childDateOfBirth: string;
  preferredDay: PreferredDay;
  preferredTime: PreferredTime;
  waiverAccepted: boolean;
};

export const PREFERRED_DAY_LABELS: Record<PreferredDay, string> = {
  "5-sept": "5 September 2026",
  "6-sept": "6 September 2026",
};

export const PREFERRED_TIME_LABELS: Record<PreferredTime, string> = {
  "10-11": "10am – 11am",
  "11-12": "11am – 12pm",
  "12-13": "12pm – 1pm",
  "13-14": "1pm – 2pm",
  "14-15": "2pm – 3pm",
  "15-16": "3pm – 4pm",
};

/** External Google Form for performance / competitive showcase sign-up. */
export const PERFORMANCE_FORM_URL =
  process.env.NEXT_PUBLIC_PERFORMANCE_FORM_URL?.trim() ||
  "https://forms.gle/w3jn1rMov3D5f5d28";

export const WAIVER_TEXT = `BAZGYM CARNIVAL 2026 — PARTICIPANT WAIVER & RELEASE

I, the parent or legal guardian named in this registration form, acknowledge and agree to the following on behalf of myself and the child participant:

1. ASSUMPTION OF RISK
I understand that gymnastics and carnival activities involve inherent risks, including but not limited to falls, collisions, muscle strains, and other injuries. I voluntarily assume all risks associated with my child's participation in the BazGym Carnival 2026 at Bedok HomeTeamNS on 5–6 September 2026.

2. RELEASE OF LIABILITY
I hereby release, waive, and discharge BazGym Gymnastics, its owners, coaches, staff, volunteers, partners, and HomeTeamNS from any and all liability, claims, demands, or causes of action arising from my child's participation in carnival activities, including pop-up classes, showcases, challenge stations, and performances.

3. MEDICAL AUTHORISATION
In the event of injury or illness, I authorise BazGym staff to seek emergency medical treatment for my child. I accept financial responsibility for any medical costs incurred.

4. RULES & CONDUCT
I agree that my child will follow all instructions from BazGym coaches and staff, and that BazGym reserves the right to remove any participant whose behaviour is unsafe or disruptive.

5. ACCURACY OF INFORMATION
I confirm that the information provided in this registration is true and accurate to the best of my knowledge.

6. PHOTO & VIDEO
I understand that photographs and videos may be taken during the event for promotional purposes by BazGym Gymnastics.

By checking the box below and submitting this form, I confirm that I have read, understood, and agree to this waiver on behalf of myself and my child.`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegistration(
  body: unknown,
): { ok: true; data: RegistrationPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const b = body as Record<string, unknown>;

  const childName = typeof b.childName === "string" ? b.childName.trim() : "";
  const parentGuardianName =
    typeof b.parentGuardianName === "string" ? b.parentGuardianName.trim() : "";
  const parentEmail = typeof b.parentEmail === "string" ? b.parentEmail.trim() : "";
  const contactNumber = typeof b.contactNumber === "string" ? b.contactNumber.trim() : "";
  const childDateOfBirth =
    typeof b.childDateOfBirth === "string" ? b.childDateOfBirth.trim() : "";
  const preferredDay = b.preferredDay;
  const preferredTime = b.preferredTime;
  const waiverAccepted = b.waiverAccepted === true;

  if (!childName || childName.length < 2) {
    return { ok: false, error: "Please enter the child's full name." };
  }
  if (!parentGuardianName || parentGuardianName.length < 2) {
    return { ok: false, error: "Please enter the parent/guardian's full name." };
  }
  if (!parentEmail || !EMAIL_PATTERN.test(parentEmail)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!contactNumber || contactNumber.length < 8) {
    return { ok: false, error: "Please enter a valid contact number." };
  }
  if (!childDateOfBirth || !/^\d{4}-\d{2}-\d{2}$/.test(childDateOfBirth)) {
    return { ok: false, error: "Please enter a valid date of birth." };
  }
  const dob = new Date(childDateOfBirth);
  if (Number.isNaN(dob.getTime())) {
    return { ok: false, error: "Please enter a valid date of birth." };
  }
  if (preferredDay !== "5-sept" && preferredDay !== "6-sept") {
    return { ok: false, error: "Please select a preferred day." };
  }
  if (
    preferredTime !== "10-11" &&
    preferredTime !== "11-12" &&
    preferredTime !== "12-13" &&
    preferredTime !== "13-14" &&
    preferredTime !== "14-15" &&
    preferredTime !== "15-16"
  ) {
    return { ok: false, error: "Please select a preferred time." };
  }
  if (!waiverAccepted) {
    return { ok: false, error: "You must accept the waiver before registering." };
  }

  return {
    ok: true,
    data: {
      childName,
      parentGuardianName,
      parentEmail,
      contactNumber,
      childDateOfBirth,
      preferredDay,
      preferredTime,
      waiverAccepted,
    },
  };
}
