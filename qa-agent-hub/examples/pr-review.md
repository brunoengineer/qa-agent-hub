# PR Review - feat/my-offers-wagering-progress

**Verdict:** Approve with minor fixes · **Trust:** 65% · **Confirmed:** 0 Critical, 0 High, 2 Medium, 1 Low

> Adds fractional wagering progress to the expanded offer card through a new `formatWagerProgress()` helper. Before approval, the fractional case needs a test, the API response needs a type, and a leftover log needs removing.

**Checked:** Code quality ✅ · Frontend ✅ · Tests and automation ✅

## Confirmed Issues

| # | Severity | Where | Problem and evidence | Fix |
|---|---|---|---|---|
| 1 | Medium | `tests/e2e/my-offers/expanded-card.spec.ts#L120-L155` | The PR exists for fractional progress, but the test only checks an integer: `toHaveText('50/100')` | Add a `12.5/100` case using the same fixture pattern |
| 2 | Medium | `src/features/my-offers/api.ts#L42-L48` | New API fields are untyped, so contract changes will not fail at compile time: `(await res.json()) as any` | Add an `OfferDetailsResponse` type |
| 3 | Low | `src/features/my-offers/ExpandedCard.tsx#L84` | Logs progress data to the browser console in production: `console.log('wager progress', progress)` | Remove the log |

Left out: no `aria-label` on the progress text, magic number `100` in `ExpandedCard.tsx`.

## Verify Before Merge
- The backend always returns `wagerProgress` as a number. The helper has no null check, so the card would show `NaN/100`.
- `api.ts` handles JSON parse errors. They appear to be swallowed instead of reaching the error boundary.
- The helper uses the right decimal separator across locales (comma vs dot).
- The wider label (`12.5/100`) does not shift the stepper or push the forfeit button down on iOS Safari.

**Existing comments:** Reviewer A's request for a unit test on the helper is still valid and not addressed.

## Review Comments

Ready to post on the PR, in the same order as the issues above.

**`tests/e2e/my-offers/expanded-card.spec.ts`, lines 120–155**
> Since this PR introduces fractional wager progress, please add a case that asserts a fractional value such as `12.5/100`. The current assertion only covers the integer case the code already supported.

**`src/features/my-offers/api.ts`, lines 42–48**
> Casting the response to `any` removes type safety here. Could you define an `OfferDetailsResponse` type with `wageringMultiplier` and `wagerProgress` and use it instead?

**`src/features/my-offers/ExpandedCard.tsx`, line 84**
> Please remove this `console.log` before merge. It runs in production and writes progress data to the browser console.
