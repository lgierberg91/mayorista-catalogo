/**
 * Mayorista 2027 · Suscriptores del pop-up → Google Sheets
 *
 * Pegar en la planilla: Extensiones → Apps Script. Implementar como
 * Aplicación web (Ejecutar como: Yo · Quién tiene acceso: Cualquier persona)
 * y copiar la URL /exec en newsletterEndpoint de catalog-config.js.
 */
const SHEET_NAME = 'Suscriptores';
const HEADERS = ['Fecha', 'Email', 'Origen', 'Página'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const email = String(data.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
      return json({ ok: false, error: 'invalid_email' });
    }

    const sheet = getSheet();
    const last = sheet.getLastRow();
    if (last > 1) {
      const existing = sheet.getRange(2, 2, last - 1, 1).getValues().flat();
      if (existing.includes(email)) return json({ ok: true, duplicate: true });
    }

    sheet.appendRow([
      new Date(),
      email,
      String(data.source || '').slice(0, 40),
      String(data.page || '').slice(0, 200)
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'server_error' });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json({ ok: true, service: 'mayorista-newsletter' });
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function json(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
