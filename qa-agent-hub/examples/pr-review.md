# PR Review - feat/my-offers-wagering-progress

### Trust level to approve: `65%`

**Meaning:**
| Range | Meaning |
|-------|---------|
| 0 % | Do not approve — severe issue, security problem, broken production flow, or highly risky change |
| 100 % | Safe to approve — at most minor code-quality or structural improvements |

---

### Executive summary
- Adds fractional wagering progress display to the expanded offer card.
- Introduces a helper `formatWagerProgress()` used by both the card and the stepper.
- Updates one Playwright spec but does not cover the fractional case the PR is meant to fix.
- Contains a leftover `console.log` and an `any` cast around the API response.

---

### Overall verdict
Approve with minor fixes

---

### Confirmed issues

| Field | Value |
|-------|-------|
| **Title** | Leftover `console.log` in production code path |
| **Severity** | Low |
| **File & line** | `src/features/my-offers/ExpandedCard.tsx#L84` |
| **Why it matters** | Pollutes the browser console in production and can leak progress data to logs. |
| **Evidence** | `console.log('wager progress', progress);` |
| **Recommendation** | Remove the log before merge. |

| Field | Value |
|-------|-------|
| **Title** | `any` cast hides a real type contract for `/offers/:id` |
| **Severity** | Medium |
| **File & line** | `src/features/my-offers/api.ts#L42-L48` |
| **Why it matters** | The new `wageringMultiplier` and `wagerProgress` fields are not typed, so future consumers will not get compile-time errors when the API contract changes. |
| **Evidence** | `const data = (await res.json()) as any;` |
| **Recommendation** | Define an `OfferDetailsResponse` type with the new fields and use it instead of `any`. |

| Field | Value |
|-------|-------|
| **Title** | New behavior is not covered by the updated test |
| **Severity** | Medium |
| **File & line** | `tests/e2e/my-offers/expanded-card.spec.ts#L120-L155` |
| **Why it matters** | The PR exists to display fractional wager progress, but the only updated test asserts the integer case. A regression in the fractional path would not be caught. |
| **Evidence** | `await expect(progressLabel).toHaveText('50/100');` |
| **Recommendation** | Add a case asserting fractional progress (e.g., `12.5/100`) using the same fixture pattern. |

---

### Potential risks / things to verify before merge
- Confirm the backend always returns `wagerProgress` as a number; the helper does not handle `null`/`undefined`.
- Verify the new helper rounds correctly across locales (e.g., comma vs dot decimal).
- Verify the change does not regress the stepper layout on narrow viewports.

---

### Code-quality & good-practices checks
1. **Leftover debugging artifacts** — `console.log` in `ExpandedCard.tsx` (see confirmed issues).
2. **Function & method correctness** — `formatWagerProgress()` does not guard against negative or non-finite numbers; consider an early return.
3. **Error handling** — The `api.ts` change swallows JSON parse errors silently; surface them to the existing error boundary.
4. **Naming & readability** — Magic number `100` appears twice in `ExpandedCard.tsx`; extract as a named constant or read from API.
5. **Dead or duplicated code** — None found.
6. **Security basics** — None found.
7. **Performance** — None found.

---

### Frontend-specific checks
1. **Functional correctness** — Behavior matches intent for the integer case; fractional case is unverified by tests.
2. **Regression risk** — Stepper layout could shift when the progress label widens (e.g., `12.5/100` vs `50/100`).
3. **Component contract compatibility** — `ExpandedCardProps` did not change; safe.
4. **Event handling & side effects** — None added.
5. **Rendering stability** — Loading and empty states for `wagerProgress` are not handled; renders `NaN/100` if the field is missing.
6. **Accessibility** — Progress is rendered as plain text without an `aria-label`; consider exposing it as a progressbar role for screen readers.
7. **Styling / layout risk** — Verify wider labels do not push the forfeit button below the fold on iOS Safari.
8. **Type safety / maintainability** — `any` cast in `api.ts` (see confirmed issues).

---

### Test & automation checks
1. **Missing test coverage** — Fractional progress case missing.
2. **Test correctness** — Existing assertion is valid but vacuous for the new behavior.
3. **Playwright / E2E specifics**:
   - Selectors use `data-testid` — good.
   - No `waitForTimeout` introduced — good.
   - Assertions use auto-retrying `expect(locator).toHaveText` — good.
4. **Unit / integration tests** — No unit test for `formatWagerProgress()`; recommend adding one with boundary inputs.
5. **Test naming & structure** — Test names are clear.

---

### Existing review comments
- Reviewer A asked for a unit test on the helper — still valid, not addressed.

---

### Proposed inline review comments

📁 File: src/features/my-offers/ExpandedCard.tsx
📍 Line: 84
💬 Comment:
Please remove this `console.log` before merge — it will run in production and leak progress data to the browser console.

📁 File: src/features/my-offers/api.ts
📍 Line: 42-48
💬 Comment:
Casting the response to `any` removes the type safety we get on the rest of the surface. Could you define an `OfferDetailsResponse` type with `wageringMultiplier` and `wagerProgress` and use it here?

📁 File: tests/e2e/my-offers/expanded-card.spec.ts
📍 Line: 120-155
💬 Comment:
Since the PR introduces fractional wager progress, please add a case that asserts a fractional value such as `12.5/100`. The current assertion only covers the integer case the code already supported.

📁 File: src/features/my-offers/format.ts
📍 Line: 1-20
💬 Comment:
Consider adding a unit test for `formatWagerProgress()` with negative, zero, fractional, and non-finite inputs to lock the helper's contract.

---

### Final recommendation

| Question | Answer |
|----------|--------|
| **Approve now?** | Yes, after minor fixes |
| **Top 3 things to verify before merge** | 1. Remove the leftover `console.log`. 2. Replace the `any` cast with a typed response. 3. Add a fractional-progress assertion to the spec. |
