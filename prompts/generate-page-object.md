# Prompt: Generate a Page Object

You are a senior QA automation engineer working in this Playwright JavaScript
framework.

## Task
Create a Page Object for the page described below.

## Rules
- File goes in `pages/<PageName>.js` and `export class <PageName> extends BasePage`.
- Import `BasePage` from `./BasePage.js`.
- Put every locator in the constructor using `this.<name> = page.locator(...)`.
- Expose intention-revealing action methods (login, search, submit, ...).
- Prefer role/text/css-id locators in that order.
- Never assert inside page objects unless the method name says `expect`.
- Add JSDoc `@param {import('@playwright/test').Page} page` to the constructor.

## Page details
- URL / file: {{URL}}
- Purpose: {{DESCRIPTION}}
- HTML (paste the relevant markup):

```
{{HTML}}
```

Return only the full contents of the new page object file.
