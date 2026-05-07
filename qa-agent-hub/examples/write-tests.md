# Write Tests Plan - My Offers Wagering Progress (Playwright)

**Goal:** Add deterministic Playwright coverage for the wagering multiplier and fractional progress on the My Offers expanded card so the regression introduced in MYOFF-482 cannot recur unnoticed.

**Target framework:** Playwright with TypeScript, existing suite under `tests/e2e/my-offers/`.

## Files to Add or Update

- `tests/e2e/my-offers/expanded-card-wager-progress.spec.ts` (new)
- `tests/e2e/my-offers/fixtures/offer-details.ts` (extend existing fixtures)
- `tests/e2e/my-offers/page-objects/ExpandedCardPage.ts` (extend with `getWagerProgressLabel()` and `getMultiplierLabel()`)

## Reused Patterns

- `authenticatedUserWithCampaign` Playwright fixture for setup
- Network interception via `page.route('**/offers/*', ...)` to inject deterministic payloads
- `data-testid` selectors already present on the expanded card
- Auto-retrying `expect(locator).toHaveText(...)` assertions

## Scenarios to Cover

1. Integer progress renders as `50/100` when API returns `wagerProgress: 50`.
2. Fractional progress renders as `12.5/100` when API returns `wagerProgress: 12.5`.
3. Multiplier renders as `35x` when API returns `wageringMultiplier: 35`.
4. Boundary at `100/100` advances the stepper to the Reward step.
5. Missing `wagerProgress` (null) renders a safe fallback and no `NaN/100`.
6. Locale switch to a comma-decimal locale renders `12,5/100`.

## Test Skeleton

```ts
import { test, expect } from '../fixtures/authenticated-user';
import { ExpandedCardPage } from './page-objects/ExpandedCardPage';
import { offerDetails } from './fixtures/offer-details';

test.describe('My Offers - expanded card wager progress', () => {
  test('renders integer progress', async ({ page }) => {
    await page.route('**/offers/*', (route) =>
      route.fulfill({ json: offerDetails({ wagerProgress: 50, requirement: 100 }) }),
    );
    const card = new ExpandedCardPage(page);
    await card.open();
    await expect(card.getWagerProgressLabel()).toHaveText('50/100');
  });

  test('renders fractional progress', async ({ page }) => {
    await page.route('**/offers/*', (route) =>
      route.fulfill({ json: offerDetails({ wagerProgress: 12.5, requirement: 100 }) }),
    );
    const card = new ExpandedCardPage(page);
    await card.open();
    await expect(card.getWagerProgressLabel()).toHaveText('12.5/100');
  });

  test('renders multiplier', async ({ page }) => {
    await page.route('**/offers/*', (route) =>
      route.fulfill({ json: offerDetails({ wageringMultiplier: 35 }) }),
    );
    const card = new ExpandedCardPage(page);
    await card.open();
    await expect(card.getMultiplierLabel()).toHaveText('35x');
  });
});
```

## Determinism and Stability Notes

- All scenarios use mocked routes so the suite does not depend on staging seed data drift.
- Assertions use auto-retrying `toHaveText` and `data-testid` selectors; no `waitForTimeout` is used.
- Fixture helper `offerDetails()` accepts overrides so each test states only the values it cares about.
- Locale tests rely on a separate `localePage` fixture that sets the language cookie before navigation.

## Remaining Gaps After This Plan

- Real backend round-trip is not exercised; covered by a smaller smoke spec that runs against staging once per night.
- Visual regression on the progress label is out of scope; recommended only if the design changes again.
- Performance characteristics of the expanded card are not covered.
