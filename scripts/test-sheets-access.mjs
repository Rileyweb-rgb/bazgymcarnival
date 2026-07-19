import { google } from "googleapis";
import fs from "fs";
import path from "path";

async function main() {
  const claspPath = path.join(process.env.USERPROFILE, ".clasprc.json");
  const clasp = JSON.parse(fs.readFileSync(claspPath, "utf8"));
  const tokens = clasp.tokens.default;

  const auth = new google.auth.OAuth2(tokens.client_id, tokens.client_secret);
  auth.setCredentials({
    refresh_token: tokens.refresh_token,
    access_token: tokens.access_token,
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1JbLNRsxOS93Bov_gJGX6X_RSwLY7TxWMbUE0593cdmI";

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  console.log(
    "Sheets:",
    meta.data.sheets?.map((s) => s.properties?.title).join(", "),
  );
}

main().catch((err) => {
  console.error(err.response?.data?.error || err.message);
  process.exit(1);
});
