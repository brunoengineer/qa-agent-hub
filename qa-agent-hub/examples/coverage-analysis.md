# Test Coverage Analysis - My Offers Expanded Card

**Overall Coverage:** ~45–55% (Moderate) · **Requirements:** 28 · **Test Cases:** 13 · **Date:** 2026-05-07

> Opt-in is well protected, but error states have no tests and wagering and localization are barely covered. Add the error state and wagering tests first.

## Coverage by Category

| Category | Reqs | Tests | Coverage | Gap |
|---|---|---|---|---|
| Error and empty states | 3 | 0 | 0% | UC-OFF-401, UC-OFF-402 not covered |
| Content and localization | 5 | 1 | ~20% | Only the default language is asserted (UC-OFF-310 to UC-OFF-313) |
| Wagering requirement display | 4 | 1 | ~25% | Fractional progress and multiplier missing (UC-OFF-220) |
| Stepper progression | 6 | 3 | ~50% | Deposit and Wager transitions not asserted |
| Forfeit flow | 3 | 2 | ~65% | Confirmation cancel path missing |
| Navigation and navbar counter | 3 | 2 | ~65% | Counter decrement on opt-out missing |
| Opt-in flow | 4 | 4 | ~100% | None |

## Tests to Add First
1. **High:** The 400 error on `/offers` and the no-offers empty state.
2. **High:** Wagering multiplier and fractional progress (for example, `12.5/100`).
3. **High:** Deposit and Wager step transitions on the stepper.
4. **Medium:** Localization on two non-default languages.

Left out: forfeit cancel path, navbar counter decrement.
