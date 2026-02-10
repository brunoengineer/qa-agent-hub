---
agent: agent
description: Generate a comprehensive QA Test Plan document for a feature or module
---

# Generate QA Test Plan

Create a comprehensive Test Plan document following industry standards and best practices.

## Input Required

Provide the **feature, module, or application** to create a test plan for.

## Output Format

Generate a complete Test Plan with these sections:

---

## 1. Objective
Define the purpose of testing and specific goals (functionality, usability, reliability, performance).

## 2. Scope
**In Scope:** List features, testing types, and functionalities covered.
**Out of Scope:** List explicitly excluded items (e.g., backend tests, localization, performance extremes).

## 3. Test Approach
Describe the testing strategy:
- **Functional Testing:** What functional areas will be validated
- **Usability Testing:** UI/UX considerations
- **Integration Testing:** System integrations to verify
- **Performance Testing:** Load/response expectations
- **Security Testing:** Vulnerability areas to check
- **Methodology:** Agile/Waterfall alignment, manual vs automated

## 4. Test Cases and Priority
List key test areas with priority using WRPN (Weighted Risk Priority Number):
| Test Area | Description | Priority (WRPN) | Factors (L, I, D, E) |
|-----------|-------------|-----------------|----------------------|

*WRPN = Likelihood × Impact × Detectability × Effort*

## 5. Test Environment
- **Platforms/Devices:** Desktop, mobile, tablet
- **Browsers:** Chrome, Firefox, Safari, Edge
- **Network Conditions:** Stable, slow, intermittent
- **Test Data:** Description of realistic test data
- **Environment Type:** Staging, Production-like

## 6. Test Case Design
- **Positive Test Cases:** Expected behavior scenarios
- **Negative Test Cases:** Error conditions
- **Boundary Test Cases:** Edge cases and limits
- **Preconditions:** System state requirements
- **Traceability:** How test cases link to requirements

## 7. Bug Management
- **Tool:** Bug tracking tool (e.g., Jira)
- **Logging:** Required fields (severity, steps to reproduce, screenshots)
- **Classification:** Severity levels (Critical, Major, Minor)
- **Resolution Process:** Dev fix → QA verify → Regression test
- **Reporting:** Frequency and stakeholders

## 8. Entry and Exit Criteria
**Entry Criteria:**
- [ ] Test environment stable
- [ ] Requirements approved
- [ ] Test cases prepared
- [ ] Tools and permissions ready

**Exit Criteria:**
- [ ] All test cases executed
- [ ] Critical bugs resolved (or deferred with approval)
- [ ] Test summary report completed
- [ ] Stakeholder sign-off received

## 9. Test Schedule
| Task | Duration | Responsible | Start | End |
|------|----------|-------------|-------|-----|

## 10. Risks and Mitigation
| Risk ID | Risk | Severity | Likelihood | RPN | Mitigation |
|---------|------|----------|------------|-----|------------|

*RPN = Severity × Likelihood × Detectability*

## 11. Deliverables
- Test Plan (this document)
- Test Cases
- Execution Report
- Bug Report
- Test Summary Report

## 12. Communication Plan
| Meeting | Purpose | Participants | Frequency |
|---------|---------|--------------|-----------|

---

## Requirements

- Be specific to the feature provided
- Use realistic examples and data
- Include measurable criteria where possible
- Align with Agile methodology when applicable
- Keep language professional and actionable
