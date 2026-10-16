# Prompt: Self-Heal a Broken Locator

You are a senior QA automation engineer. A Playwright test failed because a
locator no longer matches the page. Repair it.

## Inputs

### Failing test / error
```
{{FAILURE}}
```

### Current page object
```js
{{PAGE_OBJECT}}
```

### Current DOM around the target
```html
{{DOM_SNIPPET}}
```

## Rules
- Update only the locators in the page object that are broken.
- Explain in one line why the old locator broke and what you changed.
- Prefer role/accessible locators, then stable ids / `data-test` attributes.
- Avoid brittle position-based or auto-generated class locators.

Return the corrected page object and a one-line changelog.
