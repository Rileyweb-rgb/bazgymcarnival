/**
 * BazGym Carnival 2026 — Google Sheets webhook
 */

const SPREADSHEET_ID = "1JbLNRsxOS93Bov_gJGX6X_RSwLY7TxWMbUE0593cdmI";
const REGISTRATION_TAB = "registration";
const WAIVER_TAB = "indemnity waiver form";
const SHEET_SECRET = "";

const REGISTRATION_HEADERS = [
  "Submitted At",
  "Child Name",
  "Parent / Guardian Name",
  "Email",
  "Contact Number",
  "Child Date of Birth",
  "Preferred Day",
  "Preferred Time",
  "Event",
];

const WAIVER_HEADERS = [
  "Submitted At",
  "Parent / Guardian Name",
  "Child Name",
  "Child Date of Birth",
  "Email",
  "Contact Number",
  "Preferred Day",
  "Preferred Time",
  "Waiver Accepted",
  "Event",
];

function doGet() {
  return jsonResponse({ success: true, message: "BazGym Carnival webhook is running." });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: "Missing POST body." });
    }

    const data = JSON.parse(e.postData.contents);

    if (SHEET_SECRET && data.secret !== SHEET_SECRET) {
      return jsonResponse({ success: false, error: "Unauthorized" });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const registrationSheet = getTab(ss, REGISTRATION_TAB);
    const waiverSheet = getTab(ss, WAIVER_TAB);

    const submittedAt = data.submittedAt || new Date().toISOString();
    const preferredDay = data.preferredDayLabel || data.preferredDay || "";
    const preferredTime = data.preferredTimeLabel || data.preferredTime || "";
    const event = data.event || "BazGym Carnival 2026";

    appendRowIfNeeded(registrationSheet, REGISTRATION_HEADERS, [
      submittedAt,
      data.childName || "",
      data.parentGuardianName || "",
      data.parentEmail || "",
      data.contactNumber || "",
      data.childDateOfBirth || "",
      preferredDay,
      preferredTime,
      event,
    ]);

    appendRowIfNeeded(waiverSheet, WAIVER_HEADERS, [
      submittedAt,
      data.parentGuardianName || "",
      data.childName || "",
      data.childDateOfBirth || "",
      data.parentEmail || "",
      data.contactNumber || "",
      preferredDay,
      preferredTime,
      data.waiverAccepted ? "Yes" : "No",
      event,
    ]);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function getTab(spreadsheet, tabName) {
  const sheets = spreadsheet.getSheets();
  const target = tabName.toLowerCase();

  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName().toLowerCase() === target) {
      return sheets[i];
    }
  }

  const available = sheets
    .map(function (s) {
      return s.getName();
    })
    .join(", ");

  throw new Error('Tab "' + tabName + '" not found. Available tabs: ' + available);
}

function appendRowIfNeeded(sheet, headers, row) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  sheet.appendRow(row);
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
