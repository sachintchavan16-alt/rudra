import { test, expect } from '../fixtures/pom.fixture.js';
import { env } from '../utils/env.js';

test.describe('Smoke - application loads', () => {
  test('home page renders with the expected title and heading', async ({ homePage, page }) => {
    await homePage.open();

    await expect(page).toHaveTitle(/Automation Practice Store/i);
    await expect(homePage.mainHeading).toBeVisible();

    await homePage.screenshot('smoke-home');
  });
});
