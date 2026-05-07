# Exploratory Test Charter - My Offers Expanded Card

**Mission:** Discover inconsistencies in stepper state, wagering display, and language handling on the expanded offer card after the latest campaign config release.
**Timebox:** 90 minutes
**Focus:** Expanded offer card behavior across campaign states and locales

## Target Risks
- Stepper icon does not match the actual current step
- Wagering multiplier missing or shown as integer when fractional progress applies
- Expanded card text inconsistent or untranslated across supported languages
- Stale state after opt-in / forfeit (counter, CTA, stepper not refreshing)

## Test Setup
- Staging environment with feature flag `my-offers-v2` enabled
- Two test accounts: one with an active multi-step campaign, one with no offers
- Chrome (latest) on desktop and Safari on iOS for cross-platform comparison
- Browser DevTools Network tab open to capture `/offers/:id` payloads
- Locale switcher accessible from account settings (default + two non-default locales)

## Suggested Tours and Heuristics
- Goldilocks tour: too few offers, expected number of offers, too many offers — observe layout and counter accuracy
- State transition heuristic: drive an offer through each step and verify icon, copy, and CTA
- Localization scan: switch language between actions and observe whether content updates without refresh
- Boundary heuristic: wager values just below, equal to, and just above the requirement (e.g., 99.99 / 100 / 100.01)
- Interruption heuristic: opt-in, navigate away mid-flow, return, observe state

## Charter Scenarios
1. Open expanded card for a campaign at each step (Opt-in, Deposit, Wager, Reward) and verify the icon and task copy match the current step.
2. Trigger a small wager and confirm the multiplier and fractional progress (e.g., 12.5/100) update on the expanded card and via API.
3. Switch language to a non-default locale on the expanded card and check headings, CTAs, expiry, and T&C text for missing or mismatched strings.
4. Forfeit an active offer, cancel from the confirmation modal, then forfeit again and confirm; verify list, counter, and stepper consistency.
5. Force a 400 from `/offers` (block via DevTools) and observe how the expanded card and navbar counter degrade.

## What to Capture
- Screenshots of each step icon and the corresponding step label
- API payloads for `/offers/:id` showing multiplier and progress fields
- Notes on any stale UI state, untranslated strings, or missing fractional progress
- Console errors and failed network requests during state transitions
- Discrepancies between desktop Chrome and iOS Safari behavior

## Exit Conditions
- Each campaign step has been observed at least once on both platforms
- At least two languages have been compared against the default locale
- Any defect candidate has reproducible steps and supporting evidence captured
- Stop early and escalate if a critical regression in opt-in or forfeit is observed
