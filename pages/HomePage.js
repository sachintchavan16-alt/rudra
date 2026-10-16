import { BasePage } from './BasePage.js';

/**
 * HomePage models the landing surface of rudra.html:
 * header, search, member login and the main navigation.
 */
export class HomePage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.pageHome = page.locator('#pageHome');
    this.mainHeading = page.getByRole('heading', { name: /Automation Practice Festival/i });
    this.searchBox = page.locator('#searchBox');
    this.searchCategory = page.locator('#searchCategory');
    this.searchButton = page.locator('#searchButton');
    this.logoutButton = page.locator('#logoutTopButton');
    this.headerCartButton = page.locator('#headerCartBtn');
    this.cartCount = page.locator('#cartCount');
  }

  /** Load the application. */
  async open() {
    await this.goto();
    await this.pageHome.waitFor({ state: 'visible' });
    return this;
  }

  /** Search for a product by keyword within an optional category. */
  async search(keyword, category) {
    if (category) await this.searchCategory.selectOption({ label: category });
    await this.fill(this.searchBox, keyword);
    await this.click(this.searchButton);
    return this;
  }

  /** Open the shopping cart from the header. */
  async openCart() {
    await this.click(this.headerCartButton);
    return this;
  }
}
