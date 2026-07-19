/**
 * BazGym Carnival 2026 — Google Sheets webhook + payment verification emails
 * Spreadsheet: 1JbLNRsxOS93Bov_gJGX6X_RSwLY7TxWMbUE0593cdmI
 *
 * Deploy as Web App: Execute as Me, Anyone can access.
 * Also add an installable onEdit trigger for sendConfirmationOnVerify (or use simple onEdit below).
 */

const SPREADSHEET_ID = "1JbLNRsxOS93Bov_gJGX6X_RSwLY7TxWMbUE0593cdmI";
const REGISTRATION_TAB = "registration";
const WAIVER_TAB = "indemnity waiver form";
const SHEET_SECRET = "";
const PAYMENTS_FOLDER_NAME = "BazGym Carnival 2026 — Payment Screenshots";
const EVENT_NAME = "BazGym Carnival 2026";

const REGISTRATION_HEADERS = [
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
  "Attendee Code",
  "Event",
];

function doGet() {
  return jsonResponse({
    success: true,
    message: "BazGym Carnival webhook is running.",
    version: 2,
  });
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

    if (data.action === "register" || !data.action) {
      return handleRegistration(data);
    }

    return jsonResponse({ success: false, error: "Unknown action." });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function handleRegistration(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const registrationSheet = getTab(ss, REGISTRATION_TAB);
  const waiverSheet = getTab(ss, WAIVER_TAB);

  const submittedAt = data.submittedAt || new Date().toISOString();
  const preferredDay = data.preferredDayLabel || data.preferredDay || "";
  const preferredTime = data.preferredTimeLabel || data.preferredTime || "";
  const event = data.event || EVENT_NAME;
  const attendeeCode = data.attendeeCode || "";
  const registrationId = attendeeCode || "REG-" + Date.now();
  const ticketPrice = data.ticketPrice || "";
  const paymentStatus = data.paymentStatus || "pending";

  var screenshotUrl = "";
  if (data.paymentScreenshotBase64) {
    screenshotUrl = savePaymentScreenshot(
      data.paymentScreenshotBase64,
      data.paymentScreenshotMimeType || "image/png",
      registrationId,
    );
  }

  appendRowIfNeeded(registrationSheet, REGISTRATION_HEADERS, [
    registrationId,
    submittedAt,
    data.childName || "",
    data.parentGuardianName || "",
    data.parentEmail || "",
    data.contactNumber || "",
    data.childDateOfBirth || "",
    preferredDay,
    preferredTime,
    ticketPrice,
    attendeeCode,
    paymentStatus,
    screenshotUrl,
    "No",
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
    attendeeCode,
    event,
  ]);

  return jsonResponse({ success: true, attendeeCode: attendeeCode });
}

/**
 * Fires when staff changes Payment Status to "verified" in the registration tab.
 * Sends confirmation email with thank-you message, unique code, and QR code.
 */
function onEdit(e) {
  try {
    if (!e || !e.range) return;

    const sheet = e.range.getSheet();
    if (sheet.getName().toLowerCase() !== REGISTRATION_TAB.toLowerCase()) return;
    if (e.range.getRow() === 1) return;

    const headers = getHeaderMap(sheet);
    const statusCol = headers["payment status"];
    if (!statusCol || e.range.getColumn() !== statusCol) return;

    const newStatus = String(e.range.getValue()).trim().toLowerCase();
    if (newStatus !== "verified") return;

    const row = e.range.getRow();
    sendConfirmationEmailForRow(sheet, row, headers);
  } catch (err) {
    Logger.log("onEdit error: " + err);
  }
}

function sendConfirmationEmailForRow(sheet, row, headers) {
  const emailSentCol = headers["confirmation email sent"];
  const emailCol = headers["email"];
  const codeCol = headers["attendee code"];
  const childCol = headers["child name"];
  const parentCol = headers["parent / guardian name"];
  const dayCol = headers["preferred day"];
  const timeCol = headers["preferred time"];

  if (!emailCol || !codeCol) {
    throw new Error("Missing Email or Attendee Code column.");
  }

  const emailSent = emailSentCol
    ? String(sheet.getRange(row, emailSentCol).getValue()).trim().toLowerCase()
    : "";
  if (emailSent === "yes") return;

  const email = String(sheet.getRange(row, emailCol).getValue()).trim();
  const attendeeCode = String(sheet.getRange(row, codeCol).getValue()).trim();
  if (!email || !attendeeCode) return;

  const childName = childCol ? String(sheet.getRange(row, childCol).getValue()) : "";
  const parentName = parentCol ? String(sheet.getRange(row, parentCol).getValue()) : "";
  const preferredDay = dayCol ? String(sheet.getRange(row, dayCol).getValue()) : "";
  const preferredTime = timeCol ? String(sheet.getRange(row, timeCol).getValue()) : "";

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" +
    encodeURIComponent(attendeeCode);

  const subject = "You're in! BazGym Carnival 2026 — " + attendeeCode;
  const htmlBody =
    "<div style='font-family:Nunito,Arial,sans-serif;max-width:520px;color:#0c1a2e'>" +
    "<h1 style='font-family:Fredoka,Arial,sans-serif;color:#ff5c4d'>Thank you for registering!</h1>" +
    "<p>Hi " +
    escapeHtml(parentName || "there") +
    ",</p>" +
    "<p>Your payment for <strong>" +
    escapeHtml(childName) +
    "</strong> has been verified. We can't wait to see you at <strong>" +
    EVENT_NAME +
    "</strong>!</p>" +
    "<p><strong>Your ticket code:</strong> " +
    escapeHtml(attendeeCode) +
    "</p>" +
    (preferredDay
      ? "<p><strong>When:</strong> " +
        escapeHtml(preferredDay) +
        (preferredTime ? " · " + escapeHtml(preferredTime) : "") +
        "</p>"
      : "") +
    "<p><strong>Where:</strong> Bedok HomeTeamNS</p>" +
    "<p>Show this QR code at the door:</p>" +
    "<p><img src='" +
    qrUrl +
    "' alt='Ticket QR code' width='240' height='240' style='border-radius:12px;border:1px solid #eee' /></p>" +
    "<p style='color:#666;font-size:14px'>Bring socks and plenty of energy. See you at the carnival!</p>" +
    "<p>— BazGym Gymnastics</p>" +
    "</div>";

  const plainBody =
    "Thank you for registering for " +
    EVENT_NAME +
    "!\n\nYour ticket code: " +
    attendeeCode +
    "\n\nShow this code at the door.\n\n— BazGym Gymnastics";

  GmailApp.sendEmail(email, subject, plainBody, {
    htmlBody: htmlBody,
    name: "BazGym Carnival",
  });

  if (emailSentCol) {
    sheet.getRange(row, emailSentCol).setValue("Yes");
  }
}

function savePaymentScreenshot(base64Data, mimeType, registrationId) {
  const folder = getOrCreateFolder(PAYMENTS_FOLDER_NAME);
  const ext = mimeType.indexOf("png") >= 0 ? "png" : mimeType.indexOf("webp") >= 0 ? "webp" : "jpg";
  const blob = Utilities.newBlob(
    Utilities.base64Decode(base64Data),
    mimeType,
    registrationId + "-payment." + ext,
  );
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function getHeaderMap(sheet) {
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const map = {};
  for (var i = 0; i < headers.length; i++) {
    map[String(headers[i]).trim().toLowerCase()] = i + 1;
  }
  return map;
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

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
