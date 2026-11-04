# Test Stability Check - tests/e2e/my-offers

**Stability Grade:** 83% (Low) · **Passed:** 20 of 8 × 3 executions · **Environment:** Staging, `my-offers-v2` enabled, retries off · **Framework:** Playwright 1.45 + TypeScript

> Do not use this suite as a release gate yet: 5 of 8 tests are stable, but 3 are not. The pattern is seed drift plus timing problems that CI retries were hiding, and all of it can be fixed without product changes. Fixing the seed and the two waits should bring the suite above 95%.

```bash
npx playwright test tests/e2e/my-offers --repeat-each=3 --retries=0 --reporter=list,html
```

## Unstable Tests

| Test | Passed | Avg Duration | Verdict | Cause |
|---|---|---|---|---|
| `expanded-card.spec.ts` › renders fractional wager progress | 1/3 | 5.4s | Flaky | Test Data |
| `forfeit.spec.ts` › forfeit confirmed updates list | 2/3 | 6.8s | Flaky | Flaky / Timing |
| `navbar-counter.spec.ts` › decrement on forfeit | 2/3 | 5.9s | Flaky | Selector / Locator |

Stable: 5 tests passed every run.

## Top Failure Reasons

| Failure reason | Category | Occurrences | Tests | Suggested fix |
|---|---|---|---|---|
| `toHaveText('12.5/100')` received `12/100` | Test Data | 2 | fractional progress | Restore fractional seed values, or pin a fixture user at 12.5 |
| Toast appeared after `waitForTimeout(2000)` and the assertion window | Flaky / Timing | 1 | forfeit confirmed | Use `waitForResponse('**/offers/forfeit')` and an auto-retrying assertion |
| `navbar-counter` read before the `/offers` refetch finished | Selector / Locator | 1 | decrement on forfeit | Wait for the refetch, or expose a `data-state` attribute |

## Recommendations
1. **Now:** Fix fractional `wagerProgress` in the staging seed (Test Data, High).
2. **Now:** Replace `waitForTimeout` in `forfeit.spec.ts` with deterministic waits (Flaky / Timing, High).
3. **Next:** Add a smoke project with the 5 stable tests for PR pipelines (Automation maintenance, Low).
4. **Later:** Turn off suite-level retries in CI once stability is above 95% (Flaky / Timing, Medium).

**Artifacts:** `playwright-report/index.html`, `reports/junit.xml`, `test-results/*/trace.zip`
