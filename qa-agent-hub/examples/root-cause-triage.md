# Root Cause Triage - my-offers-expanded-card.spec.ts > displays fractional wager progress

**Most Likely Category:** Test Data Issue
**Confidence:** Medium
**Severity Signal:** Medium

## Issue Summary
The Playwright test `displays fractional wager progress` fails intermittently on the staging pipeline with `expect(locator).toHaveText('12.5/100')` actual `12/100`. The product code, helper `formatWagerProgress()`, and selectors are unchanged in the last 7 days.

## Evidence
- Failure occurs only on the nightly run, not on PR pipelines that use mocked fixtures.
- The staging seed script was updated 3 days ago and now rounds `wagerProgress` to the nearest integer for new test users.
- Other specs depending on the same seeded user pass because they only assert the integer case.
- API response captured in the failing run shows `wagerProgress: 12` rather than `12.5`.

## Likely Root Cause
The staging seed script started persisting `wagerProgress` as an integer after a recent migration, so the fractional assertion never had the expected data on staging. The product code is correct; the test is correct; the seeded data no longer matches the assumption.

## Alternative Hypotheses
- A backend rounding change in the wager service rolled out alongside the seed update.
- A timing issue where the test asserts before the partial wager has been persisted (less likely; the failure is consistent on the same fixture user).

## What to Verify Next
1. Re-run the seed script locally and inspect the persisted `wagerProgress` value for the test user.
2. Check the `wager-service` change log for the past 7 days for any rounding-related changes.
3. Hit `/offers/:id` directly with the failing user and confirm the field type and value.

## Recommended Action
- Restore fractional values in the staging seed script or introduce a dedicated fixture user with a known fractional wager state.
- Do not log a product bug yet; reclassify if step 2 reveals a service-side rounding regression.
- Keep the test enabled but quarantine it from PR-blocking until the seed is fixed to avoid noise.
