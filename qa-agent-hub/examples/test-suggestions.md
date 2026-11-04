# Manual Test Cases - My Offers Wagering Progress Display

**Generic Precondition:** Authenticated user on staging with the `my-offers-v2` flag enabled, an active multi-step campaign in Wager state, and access to the expanded offer card.

| Priority | Objective | Preconditions | Steps | Expected Result | Technique |
|---|---|---|---|---|---|
| P1 | Verify fractional wager progress renders correctly | `wagerProgress = 12.5`, requirement = 100 | 1. Open the expanded offer card. 2. Read the progress label. | Label shows `12.5/100` and matches the API response. | Equivalence Partitioning |
| P1 | Verify missing `wagerProgress` is handled | API returns `wagerProgress = null` | 1. Open the expanded offer card. 2. Check the progress area. | A safe fallback is shown. `NaN/100` is never rendered. | Negative Testing |
| P1 | Verify completion at exactly the requirement | `wagerProgress = 100`, requirement = 100 | 1. Open the expanded offer card. 2. Check the label and stepper. | Label shows `100/100` and the stepper advances to Reward. | Boundary Value Analysis |
| P1 | Verify the wagering multiplier appears | Campaign multiplier = 35x | 1. Open the expanded offer card. 2. Find the multiplier label. | `35x` is visible next to the wagering requirement. | Positive Testing |
| P2 | Verify the boundary just below the requirement | `wagerProgress = 99.99`, requirement = 100 | 1. Open the expanded offer card. 2. Check the label and stepper. | Label shows `99.99/100` and the stepper stays on Wager. | Boundary Value Analysis |
| P2 | Verify the decimal separator in a non-default locale | Locale uses a comma decimal; `wagerProgress = 12.5` | 1. Switch to the comma-decimal locale. 2. Open the expanded offer card. | Label shows `12,5/100`. | Equivalence Partitioning |
| P2 | Verify the stepper syncs after a real wager | Bender available for a small wager | 1. Open the expanded offer card. 2. Trigger a small wager in Bender. 3. Refresh the card. | Card and stepper both show the new progress. | State Transition Testing |
| P2 | Verify API values match the UI | Postman access to `/offers/:id` | 1. Call `/offers/:id` for the test user. 2. Compare `wageringMultiplier` and `wagerProgress` with the card. | API and UI values match exactly. | Positive Testing |
| P2 | Verify behavior on an `/offers` 400 error | DevTools can block the request | 1. Make `/offers` return 400. 2. Open My Offers. | An error or empty state is shown, with no `NaN/100` and no console errors. | Negative Testing |
| P2 | Verify integer wager progress still renders | `wagerProgress = 50`, requirement = 100 | 1. Open the expanded offer card. 2. Read the progress label. | Label shows `50/100` and matches the API response. | Equivalence Partitioning |
| P3 | Verify the zero progress state | `wagerProgress = 0`, requirement = 100 | 1. Open the expanded offer card. 2. Read the progress label. | Label shows `0/100` and the stepper is on Wager. | Equivalence Partitioning |
| P3 | Verify cancelling a forfeit keeps progress | Partial progress on an active offer | 1. Open the expanded offer card. 2. Click Forfeit. 3. Cancel the confirmation. | The offer stays active and progress is unchanged. | Negative Testing |

Left out: cross-browser rendering, navbar counter after forfeit, long-text locale layout.
