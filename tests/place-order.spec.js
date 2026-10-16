import { test, expect } from '../fixtures/pom.fixture.js';
import { env } from '../utils/env.js';
import { readJson } from '../utils/TestDataReader.js';

/** Wait for the next browser dialog, capture its text and accept it. */
async function acceptNextDialog(page) {
  const dialog = await page.waitForEvent('dialog');
  const message = dialog.message();
  await dialog.accept();
  return message;
}

test.describe('Place Order - Wireless Headphones', () => {
  test('user can log in, add Wireless Headphones to cart and click Place Order Now', async ({
    homePage,
    loginPage,
    productsPage,
    cartPage,
    page,
  }) => {
    const users = readJson('users.json');
    const username = env.username || users.valid.username;
    const password = env.password || users.valid.password;
    const product = 'Wireless Headphones';

    await test.step('Open the application', async () => {
      await homePage.open();
      await expect(homePage.mainHeading).toBeVisible();
    });

    await test.step('Step 1: Enter Username', async () => {
      await loginPage.fill(loginPage.usernameInput, username);
      await expect(loginPage.usernameInput).toHaveValue(username);
    });

    await test.step('Step 2: Enter Password', async () => {
      await loginPage.fill(loginPage.passwordInput, password);
      await expect(loginPage.passwordInput).toHaveValue(password);
    });

    await test.step('Step 3: Click on the Login button', async () => {
      const [message] = await Promise.all([
        acceptNextDialog(page),
        loginPage.click(loginPage.loginButton),
      ]);
      expect(message).toContain('Login Successful');
      await expect(productsPage.pageNext).toBeVisible();
    });

    await test.step(`Step 4: Add "${product}" to the cart`, async () => {
      await productsPage.scrollTo(productsPage.productList);
      const [message] = await Promise.all([
        acceptNextDialog(page),
        productsPage.addProductToCart(product),
      ]);
      expect(message).toContain(product);
      await expect(cartPage.pageCart).toBeVisible();
      await expect(cartPage.cartItems).toContainText(product);
    });

    await test.step('Step 5: Click on the Place Order Now button', async () => {
      await expect(cartPage.placeOrderButton).toBeVisible();
      await expect(cartPage.placeOrderButton).toBeEnabled();

      const [message] = await Promise.all([
        acceptNextDialog(page),
        cartPage.placeOrder(),
      ]);

      expect(message).toContain('Order Placed Successfully');
    });
  });
});
