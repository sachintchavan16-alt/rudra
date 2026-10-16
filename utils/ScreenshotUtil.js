import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'screenshots');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function buildFileName(name, ext) {
  const safe = String(name).replace(/[^a-z0-9-_]/gi, '_').slice(0, 80);
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  return `${safe}_${ts}.${ext}`;
}

/** Capture a full page (or viewport) screenshot and return the file path. */
export async function captureScreenshot(page, name = 'screenshot', options = {}) {
  ensureDir(SCREENSHOT_DIR);
  const filePath = path.join(SCREENSHOT_DIR, buildFileName(name, 'png'));
  await page.screenshot({ path: filePath, fullPage: options.fullPage ?? true });
  return filePath;
}

/** Capture a screenshot of a single element and return the file path. */
export async function captureElementScreenshot(locator, name = 'element') {
  ensureDir(SCREENSHOT_DIR);
  const filePath = path.join(SCREENSHOT_DIR, buildFileName(name, 'png'));
  await locator.screenshot({ path: filePath });
  return filePath;
}

export { SCREENSHOT_DIR };
