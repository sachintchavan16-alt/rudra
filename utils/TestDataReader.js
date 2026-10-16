import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'test-data');

/** Read and parse a JSON file from the /test-data folder. */
export function readJson(fileName) {
  const filePath = path.isAbsolute(fileName) ? fileName : path.join(DATA_DIR, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/** Read a flat CSV file from /test-data into an array of objects. */
export function readCsv(fileName) {
  const filePath = path.isAbsolute(fileName) ? fileName : path.join(DATA_DIR, fileName);
  const [header, ...rows] = fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
  const columns = header.split(',').map((c) => c.trim());
  return rows.map((row) => {
    const values = row.split(',').map((v) => v.trim());
    return Object.fromEntries(columns.map((col, i) => [col, values[i]]));
  });
}

export const TestDataReader = { readJson, readCsv };
