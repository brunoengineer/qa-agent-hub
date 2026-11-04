# Write Tests Plan - My Offers Wagering Progress (Playwright)

**Framework:** Playwright with TypeScript · **Target:** `tests/e2e/my-offers/`

> **Goal:** Add deterministic coverage for the wagering multiplier and fractional progress on the expanded card, so the regression from MYOFF-482 cannot return unnoticed.

## Files
- `tests/e2e/my-offers/expanded-card-wager-progress.spec.ts` (new): the scenarios below.
- `tests/e2e/my-offers/fixtures/offer-details.ts` (updated): overrides for progress and multiplier.
- `tests/e2e/my-offers/page-objects/ExpandedCardPage.ts` (updated): `getWagerProgressLabel()` and `getMultiplierLabel()`.

## Scenarios

| Scenario | Expected result |
|---|---|
| API returns `wagerProgress: 12.5` | Label shows `12.5/100` |
| API returns `wagerProgress: null` | Safe fallback, never `NaN/100` |
| API returns `wageringMultiplier: 35` | Label shows `35x` |
| Progress reaches `100/100` | Stepper advances to Reward |
| Comma-decimal locale with `12.5` | Label shows `12,5/100` |
| API returns `wagerProgress: 50` | Label shows `50/100` |

## Skeleton
```ts
import { test, expect } from '../fixtures/authenticated-user';
import { ExpandedCardPage } from './page-objects/ExpandedCardPage';
import { offerDetails } from './fixtures/offer-details';

test('renders fractional progress', async ({ page }) => {
  await page.route('**/offers/*', (route) =>
    route.fulfill({ json: offerDetails({ wagerProgress: 12.5, requirement: 100 }) }),
  );
  const card = new ExpandedCardPage(page);
  await card.open();
  await expect(card.getWagerProgressLabel()).toHaveText('12.5/100');
});
```

## Not Covered
- Real backend round-trip: left to a nightly smoke spec on staging, because these tests use mocked routes.
- Locale cases depend on a `localePage` fixture that sets the language cookie before navigation.
- Visual regression on the progress label, unless the design changes again.
- Performance of the expanded card.
