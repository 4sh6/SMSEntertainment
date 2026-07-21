/**
 * Google Apps Script — bound to the SMS Entertainment contact form sheet.
 * https://docs.google.com/spreadsheets/d/1GwqTS5V7nIay4igAYKG5hmOZ3tyzp7n30Pe4o8ebQsw/edit
 *
 * Setup:
 * 1. Open the sheet above.
 * 2. Extensions > Apps Script.
 * 3. Delete any starter code and paste this file's contents in.
 * 4. Save (Ctrl/Cmd+S), name the project (e.g. "Contact Form Receiver").
 * 5. Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy, authorize the requested permissions (it's your own sheet).
 * 7. Copy the "Web app URL" it gives you.
 * 8. Paste that URL into js/main.js as GOOGLE_SHEET_WEBAPP_URL.
 *
 * Whenever you edit this script after the first deploy, use
 * Deploy > Manage deployments > edit (pencil) > New version > Deploy,
 * so the same URL picks up your changes.
 */

var SHEET_NAME = "Sheet1";

var HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Brand Name",
  "Brand Website / Instagram",
  "Interested In",
  "Message"
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.website || "",
      data.interest || "",
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }

  return sheet;
}
