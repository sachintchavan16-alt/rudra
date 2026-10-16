import { BasePage } from './BasePage.js';

/**
 * CartPage models the shopping cart and checkout surface.
 */
export class CartPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.pageCart = page.locator('#pageCart');
    this.cartItems = page.locator('#cartItemsList');
    this.removeButtons = page.locator('#cartItemsList .removeCartBtn');
    this.checkoutButton = page.locator('#checkoutBtn');
    this.placeOrderButton = page.getByRole('button', { name: /Place Order Now/i });
    this.totalAmount = page.locator('#cartTotalAmount');
  }

  /** Number of line items currently in the cart. */
  async getItemCount() {
    return this.removeButtons.count();
  }

  /** Total payable text, e.g. "₹1200". */
  async getTotal() {
    return (await this.totalAmount.innerText()).trim();
  }

  /** Click "Place Order Now" (fires an alert). */
  async placeOrder() {
    await this.click(this.placeOrderButton);
    return this;
  }
}
