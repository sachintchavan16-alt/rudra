import { BasePage } from './BasePage.js';

/**
 * ProductsPage models the products listing shown after login/search.
 */
export class ProductsPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.pageNext = page.locator('#pageNext');
    this.productList = page.locator('#productList');
    this.products = page.locator('#productList .product');
    this.addToCartButtons = page.locator('#productList .addCartBtn');
  }

  /** Visible product cards. */
  async getProductCount() {
    return this.products.count();
  }

  /** Add a product to the cart by its visible name (fires an alert). */
  async addProductToCart(productName) {
    const card = this.products.filter({ hasText: productName });
    await this.click(card.locator('.addCartBtn'));
    return this;
  }

  /** Add the first product in the list to the cart (fires an alert). */
  async addFirstProductToCart() {
    await this.click(this.addToCartButtons.first());
    return this;
  }

  /** Read the name of the nth product card. */
  async getProductName(index = 0) {
    return (await this.products.nth(index).innerText()).split('\n')[0].trim();
  }
}
