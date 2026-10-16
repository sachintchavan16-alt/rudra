import { test, expect } from '../fixtures/pom.fixture.js';
import { env } from '../utils/env.js';

test.describe('Member login', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('quick login with valid credentials opens the products page', async ({ page, loginPage, productsPage }) => {
    const [message] = await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        const text = dialog.message();
        await dialog.accept();
        return text;
      }),
      loginPage.quickLogin(env.username, env.password),
    ]);

    expect(message).toContain('Login Successful');
    await expect(productsPage.pageNext).toBeVisible();
  });

  test('quick login alert greets the entered user', async ({ page, loginPage }) => {
    const [message] = await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        const text = dialog.message();
        await dialog.accept();
        return text;
      }),
      loginPage.quickLogin('sachin', 'sachin'),
    ]);

    expect(message).toContain('sachin');
  });
});
