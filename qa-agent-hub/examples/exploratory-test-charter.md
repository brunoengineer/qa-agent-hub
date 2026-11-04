# Exploratory Test Charter - My Offers Expanded Card

**Timebox:** 90 minutes · **Focus:** Expanded card behavior across campaign states and locales

> **Mission:** Find inconsistencies in stepper state, wagering display, and language handling on the expanded offer card after the latest campaign config release.

## Target Risks
- Wagering multiplier missing, or an integer shown when progress is fractional.
- Stepper icon does not match the current step.
- Stale counter, CTA, or stepper after opt-in or forfeit.
- Text untranslated or inconsistent across languages.

## Setup
- Staging with `my-offers-v2` enabled, on Chrome desktop and Safari iOS.
- Two accounts: one with an active multi-step campaign, one with no offers.
- DevTools Network tab open to capture `/offers/:id` payloads.
- Locale switcher set up for the default and two non-default locales.

## Scenarios
1. **State transition:** Open the card at each campaign step and check that the icon and task copy match.
2. **Boundary:** Trigger small wagers near the requirement (99.99, 100, 100.01) and check the multiplier and progress on the card and in the API.
3. **Localization scan:** Switch language on the open card and look for untranslated or mismatched text.
4. **Interruption:** Cancel a forfeit, navigate away, then confirm it on return. Check that the counter and stepper agree.

## What to Capture
- `/offers/:id` payloads showing the multiplier and progress fields.
- Screenshots of each step icon next to its label.
- Console errors and failed requests during state changes.
- Differences between Chrome desktop and Safari iOS.

## Stop When
- A critical regression appears in opt-in or forfeit: stop and escalate.
- Each campaign step has been seen on both platforms.
- Two languages have been compared with the default.
- Every defect candidate has reproducible steps and evidence.
