# Mediaq

Mediaq is a small browser library for listening to media query changes in JavaScript.

This repository contains:

- `packages/mediaq` for the publishable library
- `apps/demo` for the demo app
- `packages/test` for the Playwright fixture and browser tests

## Development

```bash
pnpm install
pnpm demo
pnpm test
```

## Demo

The demo app shows the library running in the browser. Use `pnpm demo` to start it locally.

## Tests

The browser tests run from `packages/test`. Use `pnpm test` from the workspace root.
