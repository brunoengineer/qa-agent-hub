# Test Approach - My Offers Wagering Progress Display

🎯 Objective
Validate that the expanded offer card and the stepper display the wagering multiplier and fractional progress correctly for all supported campaign states, matching the API contract and the acceptance criteria of MYOFF-482.

📋 Test Scope
**Focus:** Wagering progress display on the expanded offer card and stepper, including the multiplier and fractional values.
**Components:** My Offers expanded card, stepper component, `/offers/:id` API consumer, `formatWagerProgress()` helper.
**Exclusions:** Wager service backend logic, payment/deposit flow, push notifications, performance under load.

🔍 Test Levels
- **Component Testing:** Render the expanded card and stepper with mocked progress values (integer, fractional, zero, complete).
- **Integration Testing:** Verify `/offers/:id` payload is correctly mapped to the displayed values.
- **System Testing:** End-to-end opt-in → small wager → progress refresh on the expanded card.
- **Usability Testing:** Confirm the progress label remains readable across viewport sizes and locales.
- **Regression Testing:** Confirm previously passing integer cases (e.g., `50/100`) still render correctly.

🧪 Test Techniques
- **Equivalence Partitioning:** Integer progress, fractional progress, zero, complete (100/100), over-progress (>100).
- **Boundary Value Analysis:** Just below, equal to, and just above the wagering requirement.
- **Positive/Negative Testing:** Valid numeric payloads vs missing/null/non-finite values.
- **State Transition Testing:** Progress updates as the user moves between Opt-in, Deposit, and Wager steps.

🖥️ Test Environment
- **Postman:** Hit `/offers/:id` directly to validate `wageringMultiplier` and `wagerProgress` fields in the payload.
- **Bender:** Trigger small wagers on a test casino game to update progress on a real account.
- **Kibana:** Monitor `wager-service` logs for rounding or formatting errors during execution.
- **BO (BackOffice):** Verify offer state and persisted progress for the test user after each transition.

📝 Test Data Requirements
- Test account with an active multi-step campaign in Wager state
- Offer fixtures covering integer, fractional, zero, and complete progress
- Locale set covering default plus at least two non-default locales for decimal-separator validation
- A campaign config that uses a non-default multiplier (e.g., 35x) to verify display

⚠️ Risk-Based Testing
**High Priority:** Fractional progress not displayed; multiplier missing from the card; locale-specific decimal-separator formatting incorrect.
**Medium Priority:** Stepper out of sync with the card after a refresh; progress not updating after a real wager.
**Mitigation:** Pair API-level checks with UI assertions, run cross-locale spot checks, and add a Playwright case for the fractional path.

✅ Exit Criteria
- 100% of high-priority cases pass on Chrome and Safari (desktop + iOS).
- No open Critical or High defects on the wagering progress display.
- At least one automated case covers the fractional progress path.
