# Test Approach - My Offers Wagering Progress Display

**Overall Risk:** Medium · **Tools:** Postman, Bender

> **Objective:** Validate that the expanded card and stepper show the wagering multiplier and fractional progress correctly for all campaign states, matching the API contract and the acceptance criteria of MYOFF-482.

## Scope

**In Scope**
- Wagering progress and multiplier on the expanded offer card.
- Stepper sync with the card.
- `/offers/:id` mapping and the `formatWagerProgress()` helper.

**Out of Scope**
- Wager service backend logic.
- Payment and deposit flow.
- Push notifications.
- Performance under load.

## Test Levels and Techniques

| Level | Technique | What it checks |
|---|---|---|
| Component | Equivalence partitioning | Integer, fractional, zero, complete, and over-progress values |
| Component | Boundary value analysis, negative testing | Just below, at, and above the requirement; null and non-finite values |
| Integration | Positive testing | `/offers/:id` payload maps to the displayed values |
| System | State transition testing | Opt-in, small wager, and progress refresh, end to end |

## Environment and Data
- **Postman:** check `wageringMultiplier` and `wagerProgress` in the `/offers/:id` payload.
- **Bender:** trigger small wagers on a real test account.
- **Accounts:** an active multi-step campaign in Wager state, with a non-default multiplier such as 35x.
- **Locales:** default plus two non-default, to validate decimal separators.

## Top Risks

| Risk | Priority | Mitigation |
|---|---|---|
| Fractional progress or the multiplier is missing from the card | High | Pair API checks with UI assertions and add a Playwright case |
| Wrong decimal separator in some locales | High | Run cross-locale spot checks |
| Stepper out of sync with the card after a refresh or real wager | Medium | Assert both after each state change |

## Exit Criteria
- All high-priority cases pass on Chrome and Safari, on desktop and iOS.
- No Critical or High defects are open on the wagering progress display.
- At least one automated case covers fractional progress.
