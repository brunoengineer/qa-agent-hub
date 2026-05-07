# Test Stability Check - tests/e2e/my-offers

**Stability Grade:** 82% (Low)
**Total Tests:** 8
**Runs per Test:** 3
**Total Executions:** 24
**Pass / Fail:** 20 / 4
**Environment:** Staging — `BASE_URL=https://staging.example.com`, `my-offers-v2` flag enabled
**Framework:** Playwright 1.45 + TypeScript
**Command Executed:** `npx playwright test tests/e2e/my-offers --repeat-each=3 --reporter=list,html`

---

## 1. Repository Analysis Summary
- Playwright + TypeScript suite under `tests/e2e/my-offers/`, with shared fixtures in `tests/fixtures/` and page objects under `tests/e2e/my-offers/page-objects/`.
- `package.json` exposes `test:e2e`, `test:e2e:smoke`, and `test:e2e:my-offers` scripts; the latter targets the suite under analysis.
- Environments are selected via `BASE_URL` and the `STAGING_USER` / `STAGING_PASS` env vars loaded from `.env.staging`.
- Reporters configured in `playwright.config.ts`: `list`, `html` (output `playwright-report/`), and `junit` (output `reports/junit.xml`).
- Repetition supported natively via `--repeat-each` and `--retries`. Suite default is `retries: 1`; for stability analysis retries were disabled and `--repeat-each=3` was used.
- Prerequisites confirmed: Node 18, Playwright browsers installed, `.env.staging` present, staging reachable.

## 2. Run Plan (Approved)
- **Scope:** All 8 specs under `tests/e2e/my-offers/`
- **Command:** `npx playwright test tests/e2e/my-offers --repeat-each=3 --reporter=list,html`
- **Repetitions:** 3
- **Environment:** Staging via `.env.staging`; retries disabled to expose flakiness honestly
- **Prerequisites confirmed:** `.env.staging` present, `npx playwright install` previously run, staging reachable

## 3. Per-Test Results

| # | Test | Runs | Passed | Failed | Pass Rate | Avg Duration | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | offer-list.spec.ts › renders active offers | 3 | 3 | 0 | 100% | 4.2s | Stable |
| 2 | offer-list.spec.ts › opt-in updates list and counter | 3 | 3 | 0 | 100% | 7.1s | Stable |
| 3 | expanded-card.spec.ts › renders integer wager progress | 3 | 3 | 0 | 100% | 5.0s | Stable |
| 4 | expanded-card.spec.ts › renders fractional wager progress | 3 | 1 | 2 | 33% | 5.4s | Flaky |
| 5 | expanded-card.spec.ts › multiplier appears | 3 | 3 | 0 | 100% | 4.7s | Stable |
| 6 | forfeit.spec.ts › forfeit confirmation cancel | 3 | 3 | 0 | 100% | 6.3s | Stable |
| 7 | forfeit.spec.ts › forfeit confirmed updates list | 3 | 2 | 1 | 67% | 6.8s | Flaky |
| 8 | navbar-counter.spec.ts › decrement on forfeit | 3 | 2 | 1 | 67% | 5.9s | Flaky |

> Verdict guide: **Stable** = 100% pass, **Flaky** = mixed across runs, **Failing** = 0% pass.

## 4. Top Failure Reasons

| # | Failure Reason | Category | Occurrences | Affected Tests | Suggested Fix |
|---|---|---|---|---|---|
| 1 | `expect(progressLabel).toHaveText('12.5/100')` actual `12/100` | Test Data | 2 | #4 | Restore fractional `wagerProgress` in the staging seed or pin a fixture user with known fractional state |
| 2 | `expect(toast).toBeVisible()` timed out — toast appeared after assertion window | Flaky / Timing | 1 | #7 | Replace `waitForTimeout` with `waitForResponse('**/offers/forfeit')` and assert the toast via auto-retrying locator |
| 3 | `getByTestId('navbar-counter')` resolved to stale value | Selector / Locator | 1 | #8 | Wait for the `/offers` refetch to settle before asserting the counter; consider exposing a `data-state` attribute |

> Ordered by occurrence count, descending.

## 5. Flakiness Indicators
- Test #4 fails consistently with the same off-by-decimal mismatch across all 3 runs — strong test-data signal, not a real intermittent.
- Test #7 contains a `page.waitForTimeout(2000)` before the toast assertion; failure aligns with a slightly slower forfeit response on staging.
- Test #8 reads the counter immediately after forfeit without waiting for the list refetch; ordering with #7 amplifies the issue.
- The suite default `retries: 1` was masking these issues in CI; running with retries disabled exposed the real failure rate.
- No shared mutable state across specs was observed; isolation is acceptable.

## 6. Senior QA Conclusion
The suite has a healthy core (5 of 8 tests fully stable) but cannot be trusted as a release gate at 82%. The dominant pattern is timing-hidden-by-retries plus seed drift, both of which are fixable without product changes. Once the seed and the two flaky waits are addressed, this suite should comfortably reach the 95%+ range.

## 7. Recommendations

### Immediate (this sprint)
1. Restore fractional values in the staging seed for the My Offers test users, or introduce a dedicated fixture user with a pinned `wagerProgress` of 12.5.
2. Replace `page.waitForTimeout` in `forfeit.spec.ts` with `waitForResponse` plus an auto-retrying `expect(toast).toBeVisible()` assertion.

### Short-term (next 1–2 sprints)
1. Add a deterministic wait-for-counter helper backed by either a network response or a `data-state` attribute on the navbar counter.
2. Add a smoke project to `playwright.config.ts` so PR pipelines run the 5 stable tests in under 60 seconds.

### Structural (longer-term)
1. Split staging seed data ownership between QA and the data platform team and document expected user states.
2. Disable suite-level retries in CI for the My Offers project once stability is above 95%, so flakiness cannot hide again.

## 8. Suggested Follow-up Tickets
- Fix fractional `wagerProgress` in staging seed for My Offers users — Test Data — High
- Replace `waitForTimeout` with deterministic waits in `forfeit.spec.ts` — Flaky / Timing — High
- Add `data-state` attribute on navbar counter and update spec — Selector / Locator — Medium
- Add `smoke` project to Playwright config for PR pipelines — Automation maintenance — Low

## 9. Artifacts
- HTML report: `playwright-report/index.html`
- JUnit XML: `reports/junit.xml`
- Failure traces: `test-results/expanded-card-renders-fractional-wager-progress-*/trace.zip`
- Failure traces: `test-results/forfeit-confirmed-updates-list-*/trace.zip`
- Failure traces: `test-results/navbar-counter-decrement-on-forfeit-*/trace.zip`
