# Connect Digital Start to Google Sheets

## Create the data sheet

1. In Google Drive, create a **blank Google Sheet** named `Digital Start - Learners`.
2. Copy its ID from the address bar. It is the part between `/d/` and `/edit`.
3. Open **Extensions → Apps Script** in that Sheet.
4. Replace the starter code with the contents of `Code.gs`.
5. In `Code.gs`, replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the Sheet ID you copied.

## Publish the enrolment service

1. Click **Deploy → New deployment**.
2. Choose **Web app**.
3. Set **Execute as** to `Me` and **Who has access** to `Anyone`.
4. Click **Deploy**, approve Google's permissions, then copy the Web App URL ending in `/exec`.
5. In the website's `app.js`, replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL.

## Test it

Open the portal, select a course, choose **Enrol now**, enter a name and a contact, then choose **Save my place**. A row will appear in the `Enrolments` tab of your Google Sheet.

## Important next step

This public enrolment endpoint is suitable for an initial pilot. Before collecting sensitive learner information, add authenticated learner accounts and server-side anti-spam/rate limiting. Do not put passwords, national IDs, health details, or payment information in this Sheet.
