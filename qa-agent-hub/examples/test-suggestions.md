# Manual Test Cases - My Offers Wagering Progress Display

```markdown
**Generic Precondition:** Authenticated user on staging with the `my-offers-v2` flag enabled, an active multi-step campaign in Wager state, and access to the expanded offer card.

| Objective | Preconditions | Steps | Expected Result | Technique |
|---|---|---|---|---|
| Verify integer wager progress renders correctly | User has `wagerProgress = 50` and requirement = 100 | 1. Open My Offers. 2. Open the expanded offer card. 3. Read the progress label. | Progress label shows `50/100` and matches the API response. | Equivalence Partitioning |
| Verify fractional wager progress renders correctly | User has `wagerProgress = 12.5` and requirement = 100 | 1. Open the expanded offer card. 2. Read the progress label. | Progress label shows `12.5/100` and matches the API response. | Equivalence Partitioning |
| Verify boundary just below requirement | User has `wagerProgress = 99.99` and requirement = 100 | 1. Open the expanded offer card. 2. Read the progress label and stepper state. | Progress label shows `99.99/100`; stepper is still on Wager step. | Boundary Value Analysis |
| Verify completion at exactly the requirement | User has `wagerProgress = 100` and requirement = 100 | 1. Open the expanded offer card. 2. Observe progress label and stepper state. | Progress shows `100/100`; stepper advances to Reward step. | Boundary Value Analysis |
| Verify wagering multiplier appears on the card | Campaign has multiplier = 35x | 1. Open the expanded offer card. 2. Locate the multiplier label. | Multiplier `35x` is visible next to the wagering requirement. | Positive Testing |
| Verify zero progress state | User has `wagerProgress = 0` and requirement = 100 | 1. Open the expanded offer card. 2. Read the progress label. | Progress label shows `0/100`; stepper is on Wager step. | Equivalence Partitioning |
| Verify missing `wagerProgress` field | API returns `wagerProgress = null` | 1. Open the expanded offer card. 2. Observe the progress area. | A safe fallback (e.g., `0/100` or hidden state) is shown; no `NaN/100` rendered. | Negative Testing |
| Verify decimal separator in non-default locale | User locale uses comma as decimal separator; `wagerProgress = 12.5` | 1. Switch the account language to a comma-decimal locale. 2. Open the expanded offer card. | Progress label shows `12,5/100` formatted for the locale. | Positive Testing |
| Verify stepper syncs after a real wager | Bender available; small wager triggerable | 1. Open the expanded offer card. 2. Trigger a small wager via Bender. 3. Refresh or wait for state update. | Both card and stepper reflect the new progress; no stale value. | State Transition Testing |
| Verify API contract mapping | Postman access to `/offers/:id` | 1. Hit `/offers/:id` for the test user. 2. Compare `wageringMultiplier` and `wagerProgress` to the values shown on the card. | API values match the UI exactly. | Positive Testing |
| Verify forfeit cancels mid-wager | User has partial progress on an active offer | 1. Open the expanded offer card. 2. Click Forfeit. 3. Cancel the confirmation modal. | Modal closes; offer remains active; progress is unchanged. | Negative Testing |
| Verify behavior on `/offers` 400 error | Network throttling or DevTools block applied | 1. Block `/offers` to return 400. 2. Open My Offers. | Empty/error state is shown; no `NaN/100` and no console errors. | Negative Testing |
| Verify cross-browser rendering | Chrome, Firefox, Safari, iOS Safari available | 1. Open the expanded offer card on each browser. 2. Compare the progress label and multiplier. | Visual layout and values are consistent across browsers. | Exploratory |
| Verify navbar counter consistency | User has 3 active offers | 1. Note the navbar counter. 2. Forfeit one offer. 3. Re-check the counter. | Counter decrements by 1 immediately after forfeit confirmation. | State Transition Testing |
| Verify long-text locale does not break layout | A long-text locale is configured | 1. Switch language to the long-text locale. 2. Open the expanded card. | Progress label and CTAs remain on screen; no overflow or clipping. | Exploratory |
```
