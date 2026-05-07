# Automation Gap Analysis - My Offers and Bonuses

**Automation Readiness:** Medium
**Primary Goal:** Protect the most-used opt-in and progress flows in My Offers from regressions during weekly campaign config releases

## Current State
Manual coverage exists for the full opt-in journey, expanded card content, and forfeit flow across Chrome and Safari. Automated Playwright coverage is limited to the offer list rendering and a single happy-path opt-in scenario. Wagering progress, deposit-step transitions, and language switching are not automated today.

## Coverage Matrix

| Area | Manual Coverage | Automated Coverage | Gap | Risk |
|---|---|---|---|---|
| Offer list rendering | Full | Full | None | Low |
| Opt-in happy path | Full | Partial (one campaign type) | Other campaign types | Medium |
| Stepper progression (Opt-in → Deposit → Wager → Reward) | Full | None | All non-opt-in steps | High |
| Wagering requirement multiplier | Full | None | API + UI display | High |
| Forfeit flow | Full | None | Full flow | Medium |
| Expanded card localization | Full | None | All non-default languages | Medium |
| Navbar counter | Full | None | Counter increment/decrement | Low |
| 400 / empty state handling | Partial | None | Error and empty states | Medium |

## Best Automation Candidates
1. Stepper progression across campaign states — directly tied to revenue-impacting offers and currently re-tested manually every release.
2. Wagering requirement multiplier (API + UI) — recurring defect area; deterministic data shape makes assertions reliable.
3. Forfeit flow including confirmation modal — high user impact and stable selectors already exist in the offer list spec.

## Recommended Order
1. Extend the existing Playwright opt-in spec to cover deposit and wager step transitions using mocked offer state.
2. Add API-level checks for the `/offers/:id` response (multiplier, fractional progress) reused as fixtures for UI tests.
3. Add a forfeit flow spec with explicit confirmation, cancellation, and post-forfeit list refresh assertions.

## Dependencies and Blockers
- Stable `data-testid` attributes on stepper icons and forfeit confirmation buttons
- Test accounts seeded with each campaign step state in the staging environment
- Backend support for forcing offer state transitions without a real deposit
- Localization fixture set covering at least two non-default languages

## Out of Scope for Now
- Visual regression on preview card layout (low ROI, frequent design tweaks)
- Performance testing for offer list scroll under high volume
- Push-notification trigger validation (separate service, separate suite)
