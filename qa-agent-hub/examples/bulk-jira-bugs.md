# Bulk Jira Bugs - My Offers Expanded Offer Validation

**Source:** My Offers expanded card validation notes · **Bugs:** 2 · **Environment:** Not specified in source

> The notes contain two separate defects: a wrong stepper icon and inconsistent translations. They stay separate because the components and likely fixes differ.

| # | Title | Priority | Component |
|---|---|---|---|
| 1 | Expanded offer step icon does not match the current campaign step | Medium | Expanded card stepper |
| 2 | Expanded offer text is inconsistent across supported languages | Medium | Localization |

---

## 1. Expanded offer step icon does not match the current campaign step

**Priority:** Medium · **Environment:** Not specified in source · **Component:** Expanded card stepper · **Labels:** `bug`, `my-offers`, `stepper`

The icon on the expanded offer card does not match the current campaign step, so players get a wrong signal about what to do next.

**Steps to Reproduce**

1. Open an active campaign's expanded card from My Offers.
2. Move through each available step in the stepper.
3. Compare the icon with the step label and task text.

**Expected:** The icon matches the current step (Opt-in, Deposit, Get Reward, or Wager).

**Actual:** The icon shown for the current step is wrong.

**In Scope:** Icon mapping for all four campaign steps.

**Out of Scope:** Stepper layout and task copy.

**Acceptance Criteria**

- [ ] Each campaign step shows its matching icon on the expanded card.
- [ ] The icon updates when the campaign moves to the next step.

---

## 2. Expanded offer text is inconsistent across supported languages

**Priority:** Medium · **Environment:** Not specified in source · **Component:** Localization · **Labels:** `bug`, `localization`, `my-offers`

Expanded offer card text is inconsistent between languages. The source does not say which strings or languages are affected.

**Steps to Reproduce**

1. Open an expanded offer card from My Offers.
2. Change the site or account language to another supported language.
3. Reopen the card and compare the visible text with the default language.

**Expected:** All visible text is translated and matches the selected language.

**Actual:** Text is inconsistent across languages. Affected strings: not specified in source.

**In Scope:** Headings, CTAs, task copy, and T&C text on the expanded card.

**Out of Scope:** Text outside the expanded card.

**Acceptance Criteria**

- [ ] All expanded card text is correct in the default language and two non-default languages.
- [ ] Changing the language updates the text with no strings left in the old language.
