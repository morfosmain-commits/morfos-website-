/**
 * MORFOS — booking endpoint
 * ---------------------------------------------------------------
 * Stores every booking as a row in a Google Sheet and sends the
 * client a confirmation email, plus a copy to you.
 *
 * ---- SETUP (about 4 minutes, one time) ------------------------
 *
 * 1. Go to https://sheets.new and make a new spreadsheet.
 *    Name it something like "Morfos bookings".
 *
 * 2. In that sheet: Extensions -> Apps Script.
 *    Delete whatever code is in the editor and paste this whole file in.
 *
 * 3. Edit the three values in CONFIG just below if you want to.
 *
 * 4. Click Deploy -> New deployment.
 *      - Click the gear next to "Select type", choose "Web app".
 *      - Description:      morfos booking
 *      - Execute as:       Me (morfosmain@gmail.com)
 *      - Who has access:   Anyone            <-- this matters
 *    Click Deploy. Google will ask you to authorise it: choose your
 *    account, click "Advanced" -> "Go to ... (unsafe)" -> Allow.
 *    That warning is normal for your own unpublished script.
 *
 * 5. Copy the "Web app" URL it gives you. It looks like
 *      https://script.google.com/macros/s/AKfyc.../exec
 *
 * 6. Open morfos.html, find BOOK_CFG near the bottom, and paste the
 *    URL into `endpoint`. That is the only change needed.
 *
 * If you ever edit this script, you must Deploy -> Manage deployments
 * -> edit -> Version: New version, or the live URL keeps the old code.
 */

var CONFIG = {
  /* Where a copy of each booking is emailed. */
  notify: "morfosmain@gmail.com",

  /* The name the client sees the confirmation come from. */
  fromName: "Morfos",

  /* Shown in the confirmation email as the way to reach you. */
  replyTo: "hello@morfos.studio",

  /* Sheet tab the rows go into. Created automatically. */
  sheetName: "Bookings"
};

var HEADERS = [
  "Received", "Name", "Email", "Phone", "Type",
  "Slot", "Slot ISO", "Timezone", "Page"
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.mode === "call" ? "Call me back" : "Booked slot",
      data.slot || "",
      data.slotISO || "",
      data.tz || "",
      data.page || ""
    ]);

    if (data.email) sendClientEmail_(data);
    sendOwnerEmail_(data);

    return json_({ ok: true });
  } catch (err) {
    // Still record that something came in, so a booking is never lost.
    try {
      getSheet_().appendRow([new Date(), "ERROR", String(err), "", "", "", "", "",
        e && e.postData ? e.postData.contents : ""]);
    } catch (ignored) {}
    return json_({ ok: false, error: String(err) });
  }
}

/* A GET on the URL just says hello — handy for checking the deployment. */
function doGet() {
  return json_({ ok: true, service: "morfos booking" });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.sheetName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendClientEmail_(data) {
  var isCall = data.mode === "call";
  var when = isCall ? "in the next few minutes" : data.slot;
  var subject = isCall
    ? "Morfos — we are calling you shortly"
    : "Morfos — your 15-minute call, " + data.slot;

  var body =
    "Hi " + (data.name || "there") + ",\n\n" +
    (isCall
      ? "Thanks — we have your number and we will ring you in the next few minutes.\n\n"
      : "Your 15-minute call with Morfos is booked for:\n\n    " + when + "\n\n") +
    "It is 15 minutes and it stays 15 minutes. No deck, no discovery\n" +
    "questionnaire. We will scope your store and give you a fixed number\n" +
    "we will hold.\n\n" +
    (data.phone ? "We have your number as " + data.phone + ".\n\n" : "") +
    "If the time stops working, just reply to this email and we will move it.\n\n" +
    "— Morfos\n" +
    CONFIG.replyTo;

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body,
    name: CONFIG.fromName,
    replyTo: CONFIG.replyTo
  });
}

function sendOwnerEmail_(data) {
  var lines = [
    "New booking from the site.",
    "",
    "Name:   " + (data.name || "-"),
    "Email:  " + (data.email || "-"),
    "Phone:  " + (data.phone || "-"),
    "Type:   " + (data.mode === "call" ? "CALL BACK NOW" : "Booked slot"),
    "Slot:   " + (data.slot || "-"),
    "TZ:     " + (data.tz || "-"),
    "",
    "Submitted " + (data.submittedAt || new Date().toISOString())
  ];
  MailApp.sendEmail({
    to: CONFIG.notify,
    subject: (data.mode === "call" ? "[CALL NOW] " : "[Booking] ")
             + (data.name || "Someone") + " — " + (data.slot || ""),
    body: lines.join("\n"),
    name: CONFIG.fromName,
    replyTo: data.email || CONFIG.replyTo
  });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
