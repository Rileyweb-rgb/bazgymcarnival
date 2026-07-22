import { generateAttendeeCode } from "@/lib/attendee-code";
import { appendToGoogleSheet } from "@/lib/google-sheets";
import {
  getMembershipOption,
  PAYMENT_SCREENSHOT_MAX_BYTES,
  PAYMENT_SCREENSHOT_TYPES,
} from "@/lib/payment-config";
import {
  MEMBERSHIP_LABELS,
  PREFERRED_DAY_LABELS,
  PREFERRED_TIME_LABELS,
  validateRegistration,
} from "@/lib/registration";
import { NextResponse } from "next/server";

export const maxDuration = 30;

function isAllowedImageType(type: string): boolean {
  return (PAYMENT_SCREENSHOT_TYPES as readonly string[]).includes(type);
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const payloadRaw = formData.get("payload");
  if (typeof payloadRaw !== "string") {
    return NextResponse.json({ error: "Missing registration payload." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = JSON.parse(payloadRaw);
  } catch {
    return NextResponse.json({ error: "Invalid registration payload." }, { status: 400 });
  }

  const result = validateRegistration(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const screenshot = formData.get("paymentScreenshot");
  if (!(screenshot instanceof File) || screenshot.size === 0) {
    return NextResponse.json(
      { error: "Please upload your payment screenshot." },
      { status: 400 },
    );
  }

  if (!isAllowedImageType(screenshot.type)) {
    return NextResponse.json(
      { error: "Payment screenshot must be a JPG, PNG, or WebP image." },
      { status: 400 },
    );
  }

  if (screenshot.size > PAYMENT_SCREENSHOT_MAX_BYTES) {
    return NextResponse.json(
      { error: "Payment screenshot must be under 4 MB." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await screenshot.arrayBuffer());
  const paymentScreenshotBase64 = buffer.toString("base64");
  const attendeeCode = generateAttendeeCode();
  const { data } = result;
  const membership = getMembershipOption(data.membershipType);

  const record = {
    ...data,
    preferredDayLabel: PREFERRED_DAY_LABELS[data.preferredDay],
    preferredTimeLabel: PREFERRED_TIME_LABELS[data.preferredTime],
    membershipLabel: MEMBERSHIP_LABELS[data.membershipType],
    submittedAt: new Date().toISOString(),
    event: "BazGym Carnival 2026",
    attendeeCode,
    ticketPrice: `${membership.price} (${MEMBERSHIP_LABELS[data.membershipType]})`,
    paymentStatus: "pending" as const,
    paymentScreenshotBase64,
    paymentScreenshotMimeType: screenshot.type,
  };

  try {
    await appendToGoogleSheet(record);
  } catch {
    return NextResponse.json(
      {
        error:
          "Registration could not be saved. Please try again or contact BazGym directly.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true, attendeeCode }, { status: 201 });
}
