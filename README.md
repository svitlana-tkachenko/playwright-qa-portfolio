# Playwright QA Portfolio

End-to-end test automation suite built with [Playwright](https://playwright.dev/) and TypeScript.  
Tests cover a real e-commerce web app (SauceDemo) — login, product catalog, cart, and checkout flows.

![CI](https://github.com/YOUR_USERNAME/playwright-qa-portfolio/actions/workflows/playwright.yml/badge.svg)

---

## What's inside

| Area | Tests | What's covered |
|------|-------|----------------|
| Login | 6 | Happy path, locked user, invalid creds, empty field validation, UI visibility |
| Inventory | 7 | Product count, sorting (A-Z, Z-A, price), add to cart, badge counter |
| Cart & Checkout | 6 | Cart state, item removal, checkout form validation, full purchase flow |

**Total: 19 automated tests** across Chromium, Firefox, and mobile (Pixel 5)

---

## Tech stack

- **Playwright** — browser automation
- **TypeScript** — type-safe test code
- **Page Object Model** — maintainable, reusable page abstractions
- **GitHub Actions** — CI runs on every push + daily scheduled run

---

## Project structure

```
├── pages/              # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
├── tests/              # Test suites
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   └── cart.spec.ts
├── utils/
│   └── testData.ts     # Centralized test data & constants
├── .github/workflows/
│   └── playwright.yml  # CI pipeline
└── playwright.config.ts
```

---

## Run locally

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests (headless)
npm test

# Run with UI mode (great for debugging)
npm run test:ui

# Run a specific suite
npm run test:login
npm run test:inventory
npm run test:cart

# View HTML report after run
npm run test:report
```

---

## Design decisions

**Page Object Model** — selectors and actions live in `pages/`, not scattered across test files. When the UI changes, you update one place.

**Centralized test data** — all usernames, passwords, URLs, and expected error strings are in `utils/testData.ts`. No magic strings in tests.

**Parallel execution** — tests run in parallel by default, with `workers: 1` in CI to avoid flakiness.

**Retry on failure** — CI retries failing tests twice before marking them as failed, reducing noise from transient issues.

**Scheduled runs** — GitHub Actions runs the suite daily at 8am UTC to catch regressions unrelated to code changes (e.g. third-party changes, environment drift).

---

## About

Built by [Svitlana Tkachenko](https://linkedin.com/in/svtkachenko) — QA Engineer with 7+ years across SaaS, mobile, and AI systems.  
Part of an ongoing effort to document hands-on automation work publicly.
