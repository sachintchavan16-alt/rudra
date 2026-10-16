# AI Prompt Library

This folder holds reusable prompts for the RUDRA (AI-based) test automation flow.
Each prompt is a self-contained instruction you can paste into an AI assistant to
generate or maintain parts of the framework.

| Prompt | Purpose |
| --- | --- |
| `generate-page-object.md` | Turn a page's HTML or a URL into a Page Object |
| `generate-test.md` | Generate Playwright tests for a feature or user story |
| `self-heal-locator.md` | Repair a broken locator from a failure trace |
| `api-test.md` | Generate API tests for an endpoint |

## Conventions used by every prompt

- JavaScript (ESM) targeting `@playwright/test`.
- Page objects extend `pages/BasePage.js`.
- Tests import `test`/`expect` from `fixtures/pom.fixture.js`.
- Test data lives in `test-data/` and is read via `utils/TestDataReader.js`.
- No inline selectors inside specs.
