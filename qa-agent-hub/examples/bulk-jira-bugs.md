# 🐛 Bulk Jira Bugs - My Offers Expanded Offer Validation

**Source:** My Offers expanded offer card validation execution notes
**Bugs Identified:** 2
**Environment:** My Offers main page and expanded offer card flow; exact browser, device, and release not specified in source notes

## Summary

| # | Proposed Title | Priority | Component | Reason to Separate |
|---|---|---|---|---|
| 1 | Expanded offer step icon does not match the current campaign step | Medium | My Offers Expanded Card / Stepper | Incorrect icon mapping is a UI behavior defect in the stepper/task area |
| 2 | Expanded offer text is inconsistent across supported languages | Medium | Localization / My Offers Expanded Card | Language consistency is a separate content and localization defect area |

## Tickets

### 1. Expanded offer step icon does not match the current campaign step
**Priority:** Medium
**Environment:** My Offers expanded offer card
**Component:** My Offers Expanded Card / Stepper

#### Description
In the expanded offer card, the task description and icon are expected to reflect the current campaign step, such as Opt-in, Deposit, Get Reward, or Wager. During validation, the icon shown for the step was incorrect.

#### ✅ Expected Result
The task description and icon should update to match the current step purpose and state shown in the campaign flow.

#### ⛔ Actual Result
The icon displayed for the current campaign step is not correct.

#### 🔄 Steps to Reproduce
1. Navigate to the My Offers main page.
2. Open the expanded card for an active campaign.
3. View the progress stepper and enter each available campaign step.
4. Check the task description and icon shown for the current step.

#### 💡 Reproduction Tips
- Validate across multiple campaign states if available, including Opt-in, Deposit, Get Reward, and Wager.
- Compare the displayed icon with the step label and task wording.
- Use a campaign that clearly advances through multiple steps to confirm the icon mapping issue.

#### 🏷️ Labels
`bug`, `my-offers`, `expanded-card`, `stepper`, `medium`

---

### 2. Expanded offer text is inconsistent across supported languages
**Priority:** Medium
**Environment:** My Offers expanded card in different language settings
**Component:** Localization / My Offers Expanded Card

#### Description
The expanded offer card content is expected to remain consistent when viewed in different languages. During validation, the multilingual text consistency check failed.

#### ✅ Expected Result
All visible texts in the expanded offer card should be correctly localized and remain consistent with the selected language.

#### ⛔ Actual Result
The text is not consistent across languages in the expanded offer card. The source notes do not specify which strings or languages are affected.

#### 🔄 Steps to Reproduce
1. Open the My Offers main page.
2. Open an expanded offer card.
3. Change the site or account language to another supported language.
4. Reopen or refresh the expanded card content.
5. Compare the visible texts across languages.

#### 💡 Reproduction Tips
- Check headings, CTA labels, task copy, expiry text, and T&C-related content.
- Compare at least two non-default languages against the default language.
- Capture which strings remain untranslated, mismatched, or inconsistent once specific languages are identified.

#### 🏷️ Labels
`bug`, `localization`, `my-offers`, `expanded-card`, `medium`
