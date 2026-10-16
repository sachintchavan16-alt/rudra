# Prompt: Generate API Tests

You are a senior QA automation engineer working in this Playwright JavaScript
framework.

## Task
Write API tests for the endpoint below.

## Rules
- Create the spec as `tests/<name>.api.spec.js` (runs under the `api` project).
- Use the `request` fixture and `API_BASE_URL` from `.env` (baseURL is injected).
- Assert status code, response shape and at least one field value.
- Cover success, validation error and unauthorized/not-found where relevant.
- Keep no browser dependencies.

## Endpoint
- Method + path: {{METHOD_PATH}}
- Auth: {{AUTH}}
- Request body example:

```json
{{REQUEST_BODY}}
```

- Expected response example:

```json
{{RESPONSE_BODY}}
```

Return only the full contents of the new spec file.
