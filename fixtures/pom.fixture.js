import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegistrationFormPage } from '../pages/RegistrationFormPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { ApiHelper } from '../utils/ApiHelper.js';
import { logger } from '../utils/Logger.js';
import { captureScreenshot } from '../utils/ScreenshotUtil.js';

/**
 * Framework fixtures. Import `test` and `expect` from this file instead of
 * `@playwright/test` to get page objects and helpers injected automatically.
 *
 *   import { test, expect } from '../fixtures/pom.fixture.js';
 */
export const test = base.extend({
  /** Landing page. */
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  /** Member login widget. */
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  /** Registration / practice form. */
  registrationFormPage: async ({ page }, use) => {
    await use(new RegistrationFormPage(page));
  },

  /** Products listing. */
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  /** Shopping cart. */
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  /** Thin wrapper around Playwright's APIRequestContext. */
  apiHelper: async ({ request, baseURL }, use) => {
    await use(new ApiHelper(request, baseURL));
  },

  /** Auto fixture: logs each test and attaches a screenshot on failure. */
  autoCapture: [
    async ({ page }, use, testInfo) => {
      logger.info(`START: ${testInfo.title}`);
      await use();
      if (testInfo.status !== testInfo.expectedStatus) {
        const file = await captureScreenshot(page, `FAIL_${testInfo.title}`);
        testInfo.attach('failure-screenshot', { path: file, contentType: 'image/png' });
      }
      logger.info(`END: ${testInfo.title} [${testInfo.status}]`);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
