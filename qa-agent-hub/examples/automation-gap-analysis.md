# Automation Gap Analysis - My Offers and Bonuses

**Readiness:** Medium · **Goal:** Protect opt-in and progress flows from regressions during weekly campaign config releases

> **Automate first:** Stepper progression across campaign states. It is tied to revenue-impacting offers and is re-tested by hand every release.

## Coverage Gaps

| Area | Manual | Automated | Gap | Risk |
|---|---|---|---|---|
| Stepper progression (Opt-in → Deposit → Wager → Reward) | Full | None | All non-opt-in steps | High |
| Wagering requirement multiplier | Full | None | API and UI display | High |
| Forfeit flow | Full | None | Full flow | Medium |
| Opt-in happy path | Full | Partial | Other campaign types | Medium |
| Expanded card localization | Full | None | All non-default languages | Medium |
| 400 and empty states | Partial | None | Error and empty states | Medium |
| Navbar counter | Full | None | Increment and decrement | Low |

## Recommended Order
1. **Stepper progression:** Extend the Playwright opt-in spec to the deposit and wager steps, using mocked offer state.
2. **Wagering multiplier:** Add API checks on `/offers/:id` and reuse them as UI fixtures. This is a recurring defect area with a stable data shape.
3. **Forfeit flow:** Add a spec for confirm, cancel, and list refresh. Stable selectors already exist.

## Blockers
- Stable `data-testid` attributes on stepper icons and forfeit confirmation buttons.
- Test accounts seeded in each campaign step on staging.
- Backend support for forcing offer state changes without a real deposit.
- Localization fixtures for at least two non-default languages.

## Not Worth Automating Now
- Visual regression on preview cards: low return, frequent design changes.
- Offer list scroll performance under high volume.
- Push-notification triggers: separate service and suite.
