import { test, expect } from '../fixtures/pom.fixture.js';
import { readJson } from '../utils/TestDataReader.js';

test.describe('Registration form', () => {
  test('fills the practice form and submits it', async ({ homePage, registrationFormPage, page }) => {
    const users = readJson('users.json');

    await homePage.open();
    await registrationFormPage.fillBasicDetails({
      username: users.valid.username,
      password: users.valid.password,
      email: 'sachin@example.com',
    });
    await registrationFormPage.selectGender('Male');
    await registrationFormPage.selectSkills(['Playwright', 'Selenium']);

    const [message] = await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        const text = dialog.message();
        await dialog.accept();
        return text;
      }),
      registrationFormPage.submit(),
    ]);

    expect(message).toContain('Registration Form Submitted');
    expect(message).toContain(users.valid.username);
  });
});
