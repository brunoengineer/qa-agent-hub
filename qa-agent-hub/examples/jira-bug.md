# Forfeit button is orange instead of red on Offers and Bonuses cards

**Priority:** Low · **Environment:** Production and Staging, all browsers · **Component:** Offers and Bonuses UI · **Labels:** `bug`, `offers-and-bonuses`, `ui`

## Description
The forfeit button is orange on the preview cards and on the expanded offer card. Red signals a destructive action, so the wrong color weakens that warning for players.

## Steps to Reproduce
**Preconditions:** Account with an active offer or bonus.

1. Open **Offers and Bonuses**.
2. Check the forfeit button on a preview card.
3. Open the offer and check the forfeit button on the expanded card.

## Expected vs Actual
**Expected:** The forfeit button is red in both places.

**Actual:** The forfeit button is orange in both places.

## In Scope
- Offer and bonus preview cards in the list view.
- The expanded offer card.

## Out of Scope
- Other button colors in Offers and Bonuses.
- Changes to shared theme tokens used outside this section.

## Acceptance Criteria
- [ ] The forfeit button matches the app's destructive red on offer and bonus preview cards.
- [ ] The forfeit button matches the same red on the expanded offer card.
- [ ] The color is the same in Chrome, Firefox, and Edge.
