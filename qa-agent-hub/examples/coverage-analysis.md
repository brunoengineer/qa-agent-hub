# Test Coverage Analysis - My Offers Expanded Card

## Coverage Analysis

### Requirements Categories Identified
1. Opt-in flow
2. Stepper progression (Opt-in → Deposit → Wager → Reward)
3. Wagering requirement display (multiplier, fractional progress)
4. Forfeit flow
5. Expanded card content and localization
6. Error and empty states (400, no offers available)
7. Navigation and navbar counter

### Test Case Coverage Breakdown

| Requirement Category | Requirements Count | Test Cases Covering | Coverage % | Notes |
|---|---|---|---|---|
| Opt-in flow | 4 | 4 | ~100% | Strong manual + automation overlap |
| Stepper progression | 6 | 3 | ~50% | Deposit and Wager step transitions not asserted |
| Wagering requirement display | 4 | 1 | ~25% | Fractional progress and multiplier missing |
| Forfeit flow | 3 | 2 | ~65% | Confirmation cancel path not covered |
| Expanded card content / localization | 5 | 1 | ~20% | Only default language asserted |
| Error and empty states | 3 | 0 | 0% | UC-OFF-401, UC-OFF-402 not covered |
| Navigation / navbar counter | 3 | 2 | ~65% | Counter decrement on opt-out missing |

## Overall Coverage Estimate: **~45-55%**

### Strengths
✅ **Well Covered Areas:**
- Opt-in flow - ~100% coverage
- Forfeit flow - ~65% coverage
- Navigation / navbar counter - ~65% coverage

### Critical Gaps
❌ **Poorly Covered Areas:**
- Error and empty states - 0% coverage (UC-OFF-401, UC-OFF-402 missing)
- Expanded card localization - ~20% coverage (UC-OFF-310 to UC-OFF-313 not covered)
- Wagering requirement display - ~25% coverage (UC-OFF-220 fractional progress missing)

## Recommendations

### High Priority
1. Add coverage for the 400 error state on `/offers` and the no-offers-available empty state.
2. Add tests for wagering multiplier presence and fractional progress (e.g., 12.5/100 wager).
3. Add deposit-step and wager-step transition assertions on the stepper.

### Medium Priority
1. Add localization checks for at least two non-default languages on the expanded card.
2. Cover the forfeit confirmation cancel path (user opens modal, cancels, offer remains active).

### Low Priority
1. Visual regression on stepper icons across themes.

---

**Analysis Date:** 2026-05-07
