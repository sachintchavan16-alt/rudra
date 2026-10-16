import { BasePage } from './BasePage.js';

/**
 * LoginPage models the "Member Login" quick-login widget on rudra.html.
 * A successful login fires an alert and switches to the products page.
 */
export class LoginPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#quickUser');
    this.passwordInput = page.locator('#quickPass');
    this.loginButton = page.locator('#quickLoginBtn');
  }

  /** Type credentials and click login (does not handle the alert). */
  async quickLogin(username, password) {
    this.log.info(`Quick login as "${username}"`);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    return this;
  }
}
