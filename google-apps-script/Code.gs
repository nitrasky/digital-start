/**
 * Digital Start — Google Sheets enrolment backend
 *
 * 1. Create a blank Google Sheet.
 * 2. Open Extensions > Apps Script and replace the default code with this file.
 * 3. Deploy it as a Web app (Execute as: Me; Who has access: Anyone).
 * 4. Paste the deployed /exec URL into app.js in the website project.
 */

const SPREADSHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const ENROLMENTS_SHEET = 'Enrolments';

function doGet() {
  return jsonResponse({ ok: true, service: 'Digital Start enrolment service' });
}

function doPost(e) {
  try {
    const data = e.parameter || {};

    if (data.action !== 'enrol') {
      return jsonResponse({ ok: false, message: 'Unknown action.' });
    }

    const name = clean(data.name, 120);
    const contact = clean(data.contact, 160);
    const course = clean(data.course, 160);

    if (!name || !contact || !course) {
      return jsonResponse({ ok: false, message: 'Name, contact and course are required.' });
    }

    const sheet = getEnrolmentsSheet();
    sheet.appendRow([new Date(), name, contact, course, 'New', 'Website']);
    return jsonResponse({ ok: true, message: 'Enrolment saved.' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: 'Unable to save enrolment.' });
  }
}

function getEnrolmentsSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(ENROLMENTS_SHEET);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(ENROLMENTS_SHEET);
    sheet.appendRow(['Submitted at', 'Learner name', 'Email or phone', 'Course', 'Status', 'Source']);
    sheet.setFrozenRows(1);
    sheet.getRange('A1:F1').setFontWeight('bold').setBackground('#D9F0DD');
    sheet.autoResizeColumns(1, 6);
  }
  return sheet;
}

function clean(value, maxLength) {
  return String(value || '').trim().replace(/[<>]/g, '').slice(0, maxLength);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
