import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  'reports/html-report',
  'reports/allure-results',
  'reports/allure-report',
  'reports/custom',
  'test-results',
];

for (const target of TARGETS) {
  fs.rmSync(path.join(ROOT, target), { recursive: true, force: true });
  console.log(`removed ${target}`);
}
