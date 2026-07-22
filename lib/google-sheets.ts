import type { RegistrationPayload } from "@/lib/registration";

export type RegistrationRecord = RegistrationPayload & {
  preferredDayLabel: string;
  preferredTimeLabel: string;
  membershipLabel: string;
  submittedAt: string;
  event: string;
  attendeeCode: string;
  ticketPrice: string;
  paymentStatus: "pending";
  paymentScreenshotBase64?: string;
  paymentScreenshotMimeType?: string;
};

export const GOOGLE_SPREADSHEET_ID = "1JbLNRsxOS93Bov_gJGX6X_RSwLY7TxWMbUE0593cdmI";

export const GOOGLE_SHEET_TABS = {
  registration: "registration",
  waiver: "indemnity waiver form",
} as const;

export const SHEET_COLUMN_HEADERS = {
  registration: [
    "Registration ID",
    "Submitted At",
    "Child Name",
    "Parent / Guardian Name",
    "Email",
    "Contact Number",
    "Child Date of Birth",
    "Preferred Day",
    "Preferred Time",
    "Ticket Price",
    "Attendee Code",
    "Payment Status",
    "Payment Screenshot",
    "Confirmation Email Sent",
    "Event",
    "Membership",
  ],
  waiver: [
    "Submitted At",
    "Parent / Guardian Name",
    "Child Name",
    "Child Date of Birth",
    "Email",
    "Contact Number",
    "Preferred Day",
    "Preferred Time",
    "Waiver Accepted",
    "Attendee Code",
    "Event",
  ],
} as const;

async function appendViaWebhook(record: RegistrationRecord): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "",
      action: "register",
      ...record,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets webhook returned ${response.status}`);
  }

  let result: { success?: boolean; error?: string };
  try {
    result = (await response.json()) as { success?: boolean; error?: string };
  } catch {
    throw new Error("Google Sheets webhook returned an invalid response.");
  }

  if (!result.success) {
    throw new Error(result.error ?? "Google Sheets webhook rejected the submission.");
  }
}

export async function appendToGoogleSheet(record: RegistrationRecord): Promise<void> {
  if (process.env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    const { appendRegistrationViaSheetsApi } = await import("@/lib/google-sheets-api");
    await appendRegistrationViaSheetsApi(record);
    return;
  }

  await appendViaWebhook(record);
}
