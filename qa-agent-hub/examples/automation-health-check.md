# Automation Health Check - tests/e2e/my-offers

**Health Score:** Medium · **Analyzed:** 14 spec files, 6 fixtures, 2 config files, 4 page objects

> Hardcoded waits and brittle selectors are the biggest source of nightly noise, so fix those first. Duplicated setup and a single CI project are slowing the suite down, but they carry less risk.

## Code Quality
- Specs use `page.waitForTimeout(2000)` to wait for the offer list instead of a network response or visible state.
- Specs mix `data-testid` with CSS class and `nth-child` selectors, so markup changes break tests.
- Specs repeat the opt-in flow inline instead of using the existing `OffersPage.optInToCampaign()`.
- Fixture JSON hardcodes user and bonus IDs that drift from staging seed data.

## Architecture
- No shared fixture exists for an authenticated user with an active campaign, so each spec rebuilds login and opt-in.
- Tests call backend seeding directly inside `test()` blocks, with no split between API setup and UI flows.
- `OffersPage` exposes low-level selectors publicly, which lets tests bypass its action methods.
- `playwright.config.ts` has one project, so CI cannot run smoke and regression separately.

## Proposed Jira Tasks

### 1. Replace hardcoded waits and brittle selectors in My Offers specs `High`

Flaky failures are dominated by `waitForTimeout` calls and selectors on generated CSS classes. Deterministic waits and `data-testid` selectors will cut nightly noise.

**In Scope:** Specs under `tests/e2e/my-offers/**`, the `OffersPage` page object, required `data-testid` additions.

**Out of Scope:** Visual regression, new functional scenarios.

**Acceptance Criteria**

- [ ] No `page.waitForTimeout` calls remain in the suite.
- [ ] Offer card and stepper interactions use `data-testid` or `getByRole`.
- [ ] Nightly pass rate is at least 98% over five consecutive runs.

### 2. Add a shared `authenticatedUserWithCampaign` Playwright fixture `Medium`

Each spec repeats login and opt-in, which adds run time and inconsistent setup. A shared fixture centralizes this.

**In Scope:** New fixture in `tests/fixtures/`, the five most-used specs, the suite README.

**Out of Scope:** Unrelated suites such as deposits and KYC.

**Acceptance Criteria**

- [ ] The fixture seeds an authenticated user with a configurable campaign state.
- [ ] At least five specs use the fixture.
- [ ] Average suite run time drops by at least 15%.

### 3. Split the Playwright config into `smoke` and `regression` projects `Low`

The suite runs as one project, so PR pipelines run everything or nothing. A 10-minute smoke project gives faster PR feedback.

**In Scope:** `@smoke` tags, `playwright.config.ts`, the CI workflow for PR builds.

**Out of Scope:** Parallelization tuning and sharding.

**Acceptance Criteria**

- [ ] `playwright.config.ts` exposes `smoke` and `regression` projects.
- [ ] At least 10 specs are tagged `@smoke` and run in under 10 minutes.
