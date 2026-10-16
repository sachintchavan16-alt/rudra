# Prompt: Generate Playwright Tests

You are a senior QA automation engineer working in this Playwright JavaScript
framework.

## Task
Write Playwright tests for the feature below.

## Rules
- Create the spec in `tests/<name>.spec.js`.
- Import test/expect from `../fixtures/pom.fixture.js` (page objects are injected).
- Use page objects for all interactions - no raw selectors in the spec.
- Read inputs from `test-data/*.json` via `utils/TestDataReader.js`.
- Cover: happy path, negative path, and one edge case.
- Handle browser dialogs explicitly with `page.waitForEvent('dialog')`.
- Use `test.describe` + `test.beforeEach` to open the app once.

## Feature / user story
{{USER_STORY}}

## Available page objects
{{PAGE_OBJECTS}}

## Test data shape
{{TEST_DATA}}

Return only the full contents of the new spec file.
