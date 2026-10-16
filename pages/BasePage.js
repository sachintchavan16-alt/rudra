import { expect } from '@playwright/test';
import { logger } from '../utils/Logger.js';
import { captureScreenshot } from '../utils/ScreenshotUtil.js';
import { env } from '../utils/env.js';

/**
 * BasePage holds behaviour shared by every page object.
 * Page objects extend this class to inherit navigation, waits and screenshots.
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.log = logger;
  }

  /**
   * Open a page. With no argument it loads the configured baseURL, which works
   * for both http(s) sites and local file:// pages.
   */
  async goto(path = '') {
    await this.page.goto(path || env.baseUrl, { waitUntil: 'domcontentloaded' });
    return this;
  }

  /** Return the current document title. */
  async getTitle() {
    return this.page.title();
  }

  /** Return the current URL. */
  getUrl() {
    return this.page.url();
  }

  /** Wait until the element is visible. */
  async waitForVisible(locator, timeout) {
    await locator.waitFor({ state: 'visible', timeout });
    return this;
  }

  /** Click an element after ensuring it is visible. */
  async click(locator, options) {
    await this.waitForVisible(locator);
    await locator.click(options);
    return this;
  }

  /** Fill an input after clearing it. */
  async fill(locator, value) {
    await this.waitForVisible(locator);
    await locator.fill(String(value));
    return this;
  }

  /** Assert that the element contains the expected text. */
  async expectText(locator, text) {
    await expect(locator).toContainText(text);
    return this;
  }

  /** Assert that the element is visible. */
  async expectVisible(locator) {
    await expect(locator).toBeVisible();
    return this;
  }

  /** Scroll the element into view. */
  async scrollTo(locator) {
    await locator.scrollIntoViewIfNeeded();
    return this;
  }

  /** Take a named screenshot into the /screenshots folder. */
  async screenshot(name, options = { fullPage: true }) {
    return captureScreenshot(this.page, name, options);
  }
}
