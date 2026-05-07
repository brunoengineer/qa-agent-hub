# QA Test Plan - My Offers Wagering Progress Display

## 1. Objective
Validate that the wagering multiplier and fractional progress on the My Offers expanded card and stepper display correctly across all supported campaign states, locales, and devices. Goals include functional correctness, locale-aware formatting, reliability under repeated state transitions, and consistency between the API payload and the rendered values.

## 2. Scope
**In Scope:**
- Expanded offer card progress display (integer, fractional, zero, complete)
- Stepper synchronization with the expanded card
- Wagering multiplier rendering (e.g., 35x)
- `/offers/:id` API contract verification
- Locale-aware decimal-separator formatting (default + 2 non-default locales)
- Cross-browser (Chrome, Safari, Firefox) and cross-device (desktop, iOS, Android) coverage

**Out of Scope:**
- Wager service backend logic and rounding rules
- Deposit and payment flows
- Push notifications and email triggers
- Load and stress testing

## 3. Test Approach
- **Functional Testing:** Validate progress values, multiplier display, and stepper transitions.
- **Usability Testing:** Confirm progress label readability at narrow viewports and in long-text locales.
- **Integration Testing:** Verify API-to-UI mapping using Postman alongside Playwright UI checks.
- **Performance Testing:** Spot-check expanded card render time after offer state refresh (no formal load test).
- **Security Testing:** Confirm no sensitive user identifiers leak through the new helper or logs.
- **Methodology:** Agile sprint-aligned, mix of manual exploratory and Playwright E2E automation.

## 4. Test Cases and Priority
| Test Area | Description | Priority (WRPN) | Factors (L, I, D, E) |
|-----------|-------------|-----------------|----------------------|
| Fractional progress display | Verify 12.5/100 type values render correctly | 60 | L=4, I=5, D=3, E=1 |
| Multiplier display | Verify 35x multiplier appears on expanded card | 48 | L=3, I=4, D=4, E=1 |
| Locale decimal separator | Verify comma vs dot in non-default locales | 36 | L=3, I=3, D=4, E=1 |
| Stepper sync after wager | Stepper reflects updated progress | 32 | L=2, I=4, D=4, E=1 |
| API contract mapping | `/offers/:id` fields map to UI | 24 | L=2, I=4, D=3, E=1 |
| Boundary at 100/100 | Complete state renders correctly | 24 | L=2, I=3, D=4, E=1 |

*WRPN = Likelihood × Impact × Detectability × Effort*

## 5. Test Environment
- **Platforms/Devices:** Desktop (Win, macOS), iOS (Safari), Android (Chrome)
- **Browsers:** Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
- **Network Conditions:** Stable broadband and Slow 3G via DevTools throttling
- **Test Data:** Seeded users in each campaign state; fixture set covering integer, fractional, zero, complete progress
- **Environment Type:** Staging mirroring production with `my-offers-v2` flag enabled

## 6. Test Case Design
- **Positive Test Cases:** Integer, fractional, zero, complete progress with valid multiplier
- **Negative Test Cases:** Missing `wagerProgress` field, non-finite values, malformed multiplier
- **Boundary Test Cases:** 99.99/100, 100/100, 100.01/100
- **Preconditions:** Authenticated user with active campaign in Wager state
- **Traceability:** Each test case linked to MYOFF-482 acceptance criteria AC1–AC5

## 7. Bug Management
- **Tool:** Jira
- **Logging:** Title, environment, expected vs actual, reproduction steps, screenshots, console/network evidence
- **Classification:** Critical (blocks opt-in or shows wrong value), Major (locale or fractional issue), Minor (cosmetic)
- **Resolution Process:** Dev fix → QA verify on staging → regression sweep → close
- **Reporting:** Daily defect status during the test window; release-readiness summary at exit

## 8. Entry and Exit Criteria
**Entry Criteria:**
- [ ] Staging environment stable with `my-offers-v2` flag enabled
- [ ] MYOFF-482 acceptance criteria approved
- [ ] Test cases prepared and reviewed
- [ ] Seeded users available across required campaign states

**Exit Criteria:**
- [ ] All High and Medium priority test cases executed
- [ ] No open Critical or High defects on wagering progress display
- [ ] Automation case for fractional progress added to the suite
- [ ] Test summary report shared with stakeholders

## 9. Test Schedule
| Task | Duration | Responsible | Start | End |
|------|----------|-------------|-------|-----|
| Test case preparation | 1 day | QA | 2026-05-08 | 2026-05-08 |
| Manual execution | 2 days | QA | 2026-05-09 | 2026-05-10 |
| Automation update | 1 day | QA | 2026-05-11 | 2026-05-11 |
| Defect verification | 1 day | QA + Dev | 2026-05-12 | 2026-05-12 |
| Release-readiness review | 0.5 day | QA + PO | 2026-05-13 | 2026-05-13 |

## 10. Risks and Mitigation
| Risk ID | Risk | Severity | Likelihood | RPN | Mitigation |
|---------|------|----------|------------|-----|------------|
| R1 | Locale-specific decimal separators rendered incorrectly | High | Medium | 24 | Add locale-aware test cases and a Playwright matrix |
| R2 | Seed data drift causes false negatives | Medium | High | 18 | Pin fixture users and validate seed before runs |
| R3 | Stepper and card desynchronize after refresh | Medium | Medium | 12 | Add explicit sync assertion after state transition |

*RPN = Severity × Likelihood × Detectability*

## 11. Deliverables
- Test Plan (this document)
- Test Cases (manual + automated)
- Execution Report
- Bug Report
- Test Summary Report

## 12. Communication Plan
| Meeting | Purpose | Participants | Frequency |
|---------|---------|--------------|-----------|
| Daily QA standup | Status, blockers | QA, Dev lead | Daily |
| Defect triage | Prioritize open defects | QA, Dev lead, PO | Daily during test window |
| Release-readiness review | Go / Go with risks / No-go | QA, PO, Eng manager | Once at exit |
