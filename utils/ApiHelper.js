import { expect } from '@playwright/test';
import { logger } from './Logger.js';

/** Small helper around Playwright's APIRequestContext for API tests. */
export class ApiHelper {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} [baseURL]
   */
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async #send(method, endpoint, body) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    if (body !== undefined) options.data = body;
    logger.debug(`${method} ${endpoint}`);
    const response = await this.request[method](endpoint, options);
    return response;
  }

  get(endpoint) {
    return this.#send('get', endpoint);
  }

  post(endpoint, body) {
    return this.#send('post', endpoint, body);
  }

  put(endpoint, body) {
    return this.#send('put', endpoint, body);
  }

  patch(endpoint, body) {
    return this.#send('patch', endpoint, body);
  }

  delete(endpoint) {
    return this.#send('delete', endpoint);
  }

  /** Assert a response has the expected HTTP status. */
  expectStatus(response, status) {
    expect(response.status(), `Unexpected status for ${response.url()}`).toBe(status);
  }
}
