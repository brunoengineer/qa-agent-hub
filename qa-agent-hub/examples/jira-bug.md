# 🐛 Forfeit button color is orange instead of red on preview cards and expanded card in Offers and Bonuses

**Priority:** Low
**Environment:** Production / Staging (all browsers)
**Component:** Offers and Bonuses – UI

---

### Description
The forfeit button in the Offers and Bonuses section is displaying in orange instead of the expected red color. This affects both the preview cards list view and the individual offer expanded card view. The incorrect color reduces visual consistency and may weaken the intent of the destructive-action styling that red conveys.

### ✅ Expected Result
The forfeit button should be **red** on:
- Offer preview cards in the Offers and Bonuses list
- Bonus preview cards in the Offers and Bonuses list
- The expanded offer card detail view

### ⛔ Actual Result
The forfeit button is **orange** in all three locations listed above.

### 🔄 Steps to Reproduce
1. Log in to the application with an account that has active offers or bonuses.
2. Navigate to the **Offers and Bonuses** section.
3. Observe the forfeit button on any preview card — the button color is orange.
4. Click on an offer to open the expanded card view.
5. Observe the forfeit button on the expanded card — the button color is also orange.

### 💡 Reproduction Tips
- Verify across multiple browsers (Chrome, Firefox, Edge) to confirm it is not browser-specific.
- Check whether the color is set via a CSS variable/token or is hardcoded — may be a theme token misconfiguration.
- Compare with other destructive-action buttons in the app to confirm the expected red value.

### 📸 Screenshots
- Screenshot of a preview card in Offers and Bonuses showing the orange forfeit button
- Screenshot of the expanded offer card showing the orange forfeit button
- Screenshot or design reference showing the expected red color for comparison

### 🏷️ Labels
`bug`, `offers-and-bonuses`, `ui`, `low-priority`
