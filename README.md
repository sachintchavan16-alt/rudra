# RUDRA - AI-based Playwright (JavaScript) Framework

A Page Object Model (POM) automation framework built on **Playwright Test** with
screenshots, a custom report, Allure reporting, test data, shared utilities and
an AI prompt library.

The default `BASE_URL` points at a local practice page
(`file:///C:/Users/DELL/OneDrive/Desktop/rudra.html`) and credentials are read
from `.env`.

## Structure

```
.
├── pages/                     # Page Object Model
│   ├── BasePage.js            # shared actions (goto, click, fill, screenshot)
│   ├── HomePage.js            # landing / search / header
│   ├── LoginPage.js           # member quick-login widget
│   ├── RegistrationFormPage.js# practice form controls
│   ├── ProductsPage.js        # product listing
│   └── CartPage.js            # cart & checkout
├── fixtures/
│   └── pom.fixture.js         # injects page objects + api helper + auto screenshot
├── tests/                     # specs
│   ├── smoke.spec.js
│   ├── login.spec.js
│   ├── registration.spec.js
│   ├── reqres.api.spec.js     # runs under the "api" project
│   └── example.spec.js        # default Playwright sample
├── test-data/                 # data driven inputs
│   ├── users.json
│   ├── urls.json
│   └── products.csv
├── utils/                     # helpers
│   ├── env.js                 # reads .env
│   ├── Logger.js
│   ├── ScreenshotUtil.js
│   ├── DataGenerator.js
│   ├── ApiHelper.js
│   └── TestDataReader.js
├── reporters/
│   └── custom-reporter.js     # writes JSON + HTML summary
├── prompts/                   # AI prompt templates
├── scripts/
│   └── clean.js               # removes generated reports
├── screenshots/               # named screenshots (ScreenshotUtil)
├── reports/                   # html-report, allure-results, allure-report, custom
├── playwright.config.js
├── .env / .env.example
└── package.json
```

## Setup

```bash
npm install
npx playwright install      # download browsers
cp .env.example .env        # then edit values
```

**.env**

```
BASE_URL=file:///C:/Users/DELL/OneDrive/Desktop/rudra.html
API_BASE_URL=https://reqres.in/api
USERNAME=sachin
PASSWORD=sachin
```

## Running tests

| Command | Description |
| --- | --- |
| `npm test` | Run all projects |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:debug` | Debug with the inspector |
| `npm run test:chromium` | Only Chromium |
| `npx playwright test --project=api` | Only API tests |
| `npx playwright test tests/login.spec.js` | A single spec |

## Reports

- **HTML**: `npm run report:html`
- **Allure**:
  ```bash
  npm run report:allure:generate   # build from reports/allure-results
  npm run report:allure:open       # open reports/allure-report
  ```
- **Custom**: written to `reports/custom/` on every run (`summary.html`, `results.json`)
- **Screenshots**: failures go to `test-results/`; named captures go to `screenshots/`
- Clear everything with `npm run clean:reports`

## Conventions

- Specs import `test`/`expect` from `fixtures/pom.fixture.js`, never raw selectors.
- Page objects extend `BasePage` and keep every locator in the constructor.
- Test inputs come from `test-data/` through `TestDataReader`.
- AI prompts for generating POMs, tests, API tests and self-healing live in `prompts/`.
