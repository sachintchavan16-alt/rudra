import { test, expect } from '@playwright/test';

/**
 * API example. Runs under the "api" project (see playwright.config.js).
 * Demonstrates the ApiHelper without a browser.
 */
test.describe('API - reqres', () => {
  test('lists users', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/users?page=2`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('creates a user', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/users`, {
      data: { name: 'Sachin', job: 'QA' },
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('id');
  });
});
