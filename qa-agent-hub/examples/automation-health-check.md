# Automation Health Check - tests/e2e/my-offers

**Health Score:** Medium
**Analyzed:** 14 spec files, 6 fixtures, 2 config files, 4 page objects

---

## Improvement Report

### Code Quality
- Several specs rely on `page.waitForTimeout(2000)` to wait for the offer list to render instead of awaiting a network response or visible state.
- Selectors mix `data-testid`, raw CSS class names, and `nth-child` access in the same spec, leading to fragile tests when the offer card markup changes.
- Multiple specs duplicate the opt-in flow inline rather than reusing the `OffersPage.optInToCampaign()` helper that already exists.
- Fixture JSON files contain hardcoded user IDs and bonus IDs that drift from the staging seed data; assertions occasionally fail for data reasons unrelated to the product.

### Architecture
- No clear separation between API setup helpers and UI flows; tests call backend seeding code directly inside `test()` blocks.
- The `OffersPage` page object exposes low-level selectors as public properties, which encourages tests to bypass action methods.
- There is no shared fixture for an "authenticated user with active campaign" — each spec re-implements login and opt-in.
- The `playwright.config.ts` runs all specs in a single project, so smoke and full-regression runs cannot be triggered separately in CI.

---

## Proposed Jira Tasks

### Priority 1 — Replace hardcoded waits and brittle selectors in My Offers specs `High`
**Description:** Flaky failures in the My Offers suite are dominated by `waitForTimeout` calls and selectors that target generated CSS classes. Replacing these with deterministic waits and `data-testid` selectors will materially reduce nightly run noise.
**In Scope:** All spec files under `tests/e2e/my-offers/**`, the `OffersPage` page object, and required `data-testid` additions in product code.
**Out of Scope:** Visual regression coverage and any new functional scenarios.
**Acceptance Criteria:**
- [ ] No `page.waitForTimeout` calls remain in the My Offers suite.
- [ ] All offer card and stepper interactions use `data-testid` or `getByRole` selectors.
- [ ] Nightly pass rate for the My Offers suite is at or above 98% over five consecutive runs.

### Priority 2 — Introduce a shared `authenticatedUserWithCampaign` Playwright fixture `Medium`
**Description:** Each My Offers spec re-implements login and campaign opt-in, which inflates execution time and creates inconsistent setup. A shared fixture will centralize setup and make specs focus on behavior under test.
**In Scope:** New fixture in `tests/fixtures/`, refactor of at least the five most-used My Offers specs, and documentation in the suite README.
**Out of Scope:** Refactor of unrelated suites (deposits, KYC, etc.).
**Acceptance Criteria:**
- [ ] Fixture seeds an authenticated user with a configurable campaign state.
- [ ] At least five specs are migrated to use the fixture.
- [ ] Average suite execution time decreases by at least 15%.

### Priority 3 — Split Playwright config into `smoke` and `regression` projects `Low`
**Description:** Today the suite runs as a single project, so PR pipelines either run everything or nothing. Splitting into `smoke` (10 minutes) and `regression` (full) projects will enable faster PR feedback.
**In Scope:** Tag selected specs with `@smoke`, update `playwright.config.ts`, and update the CI workflow to call the smoke project on PR builds.
**Out of Scope:** Test parallelization tuning and sharding.
**Acceptance Criteria:**
- [ ] `playwright.config.ts` exposes a `smoke` and `regression` project.
- [ ] At least 10 specs are tagged `@smoke` and execute in under 10 minutes.
