import { google } from "googleapis";
import type { RegistrationRecord } from "@/lib/google-sheets";

const GOOGLE_SPREADSHEET_ID = "1JbLNRsxOS93Bov_gJGX6X_RSwLY7TxWMbUE0593cdmI";

const GOOGLE_SHEET_TABS = {
  registration: "registration",
  waiver: "indemnity waiver form",
} as const;

function getOAuthClient() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google OAuth credentials are not configured.");
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ refresh_token: refreshToken });
  return auth;
}

async function appendRow(sheetName: string, values: string[]) {
  const auth = getOAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SPREADSHEET_ID,
    range: `'${sheetName}'!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}

export async function appendRegistrationViaSheetsApi(
  record: RegistrationRecord,
): Promise<void> {
  const submittedAt = record.submittedAt;
  const preferredDay = record.preferredDayLabel;
  const preferredTime = record.preferredTimeLabel;
  const event = record.event;

  await appendRow(GOOGLE_SHEET_TABS.registration, [
    record.attendeeCode,
    submittedAt,
    record.childName,
    record.parentGuardianName,
    record.parentEmail,
    record.contactNumber,
    record.childDateOfBirth,
    preferredDay,
    preferredTime,
    record.ticketPrice,
    record.attendeeCode,
    record.paymentStatus,
    "(via API — upload screenshot manually)",
    "No",
    event,
    record.membershipLabel,
  ]);

  await appendRow(GOOGLE_SHEET_TABS.waiver, [
    submittedAt,
    record.parentGuardianName,
    record.childName,
    record.childDateOfBirth,
    record.parentEmail,
    record.contactNumber,
    preferredDay,
    preferredTime,
    record.waiverAccepted ? "Yes" : "No",
    record.attendeeCode,
    event,
  ]);
}
