// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { env } from './utils/env.js';

/**
 * Playwright configuration for the RUDRA framework.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Where per-test artifacts (traces, videos, failure screenshots) are written */
  outputDir: 'test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: env.retries ?? (process.env.CI ? 2 : 0),
  /* Opt out of parallel tests on CI */
  workers: env.workers ?? (process.env.CI ? 1 : undefined),
  /* Global test timeout */
  timeout: 60_000,
  expect: { timeout: 10_000 },

  /* Reporters: console list, HTML, Allure and a custom JSON/HTML summary */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    [
      'allure-playwright',
      {
        resultsDir: 'reports/allure-results',
        detail: true,
        suiteTitle: false,
        environmentInfo: {
          framework: 'Playwright',
          language: 'JavaScript',
          project: 'RUDRA',
        },
      },
    ],
    ['./reporters/custom-reporter.js', { outputDir: 'reports/custom' }],
  ],

  /* Shared settings for all the projects below */
  use: {
    baseURL: env.baseUrl,
    headless: env.headless,
    /* Capture a screenshot only when a test fails */
    screenshot: 'only-on-failure',
    /* Keep video only for failed tests */
    video: 'retain-on-failure',
    /* Collect trace on the first retry of a failed test */
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    /* Folder for the ScreenshotUtil helper to write named screenshots */
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'chromium',
      testIgnore: /.*\.api\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: /.*\.api\.spec\.js/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: /.*\.api\.spec\.js/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.js/,
      use: { baseURL: env.apiBaseUrl },
    },
  ],
});
