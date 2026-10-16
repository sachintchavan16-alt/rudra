import { BasePage } from './BasePage.js';

/**
 * RegistrationFormPage models the "User Registration & Practice Form" section
 * and the many control types it exposes.
 */
export class RegistrationFormPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.email = page.locator('#email');
    this.testDate = page.locator('#testDate');
    this.country = page.locator('#country');
    this.amount = page.locator('#amount');
    this.colorSelect = page.locator('#colorSelect');
    this.bsMultiBtn = page.locator('#bsMultiBtn');
    this.bsMultiOptions = page.locator('.bs-multi-opt');
    this.skillCheckboxes = page.locator('.multi-check');
    this.rangeSlider = page.locator('#rangeSlider');
    this.fileUpload = page.locator('#fileUpload');
    this.submitButton = page.locator('#submitButton');
    this.resetButton = page.locator('#resetButton');
    this.result = page.locator('#result');
  }

  /** Select a gender radio by its exact label text. */
  async selectGender(gender) {
    await this.page.getByRole('radio', { name: gender, exact: true }).check();
    return this;
  }

  /** Tick every skill whose value is in the provided list. */
  async selectSkills(skills) {
    for (const skill of skills) {
      await this.page.locator(`.multi-check[value="${skill}"]`).check();
    }
    return this;
  }

  /** Fill the core text fields. */
  async fillBasicDetails({ username, password, email }) {
    if (username !== undefined) await this.fill(this.username, username);
    if (password !== undefined) await this.fill(this.password, password);
    if (email !== undefined) await this.fill(this.email, email);
    return this;
  }

  /** Submit the form (fires a registration alert). */
  async submit() {
    await this.click(this.submitButton);
    return this;
  }
}
