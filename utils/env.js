import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// override: true so .env wins over pre-existing OS variables such as the
// Windows built-in USERNAME.
dotenv.config({ path: path.resolve(__dirname, '..', '.env'), override: true });

/** Central place to read environment driven settings. */
export const env = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://reqres.in/api',
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || '',
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS !== 'false',
  workers: process.env.WORKERS ? Number(process.env.WORKERS) : undefined,
  retries: process.env.RETRIES ? Number(process.env.RETRIES) : undefined,
};
