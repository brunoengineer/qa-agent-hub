# Test Plan

**Prompt:** `#test-plan`
**Agent file:** `.github/agents/qa-test-plan.agent.md`
**Prompt file:** `.github/prompts/test-plan.prompt.md`

---

## Purpose

Generates a comprehensive, industry-standard QA Test Plan document for a feature or module. Includes 12 structured sections covering everything from objectives through test schedule and communication plan.

## How to Use

1. Open Copilot Chat in VS Code.
2. Type `#test-plan` followed by the feature or module description.
3. If you send `#test-plan` with no input, the agent will ask:

```
Please provide:

- Feature/module name
- Brief description of what it does
- Any specific requirements or constraints (optional)
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Feature/module name | Yes | Name of the feature or module |
| Description | Yes | Brief description of what it does |
| Requirements/constraints | Optional | Specific requirements or limitations |

## Output

A full Test Plan document with 12 sections:

| # | Section | Content |
|---|---|---|
| 1 | Objective | Purpose and specific goals |
| 2 | Scope | In scope / out of scope |
| 3 | Test Approach | Functional, usability, integration, performance, security, methodology |
| 4 | Test Cases and Priority | WRPN (Weighted Risk Priority Number) table |
| 5 | Test Environment | Platforms, browsers, network, test data, environment type |
| 6 | Test Case Design | Positive, negative, boundary, preconditions, traceability |
| 7 | Bug Management | Tool, logging, classification, resolution, reporting |
| 8 | Entry and Exit Criteria | Checklist format |
| 9 | Test Schedule | Task, duration, responsible, start/end table |
| 10 | Risks and Mitigation | RPN (Risk Priority Number) table |
| 11 | Deliverables | List of QA artifacts |
| 12 | Communication Plan | Meeting, purpose, participants, frequency |

### Key Tables in Output

**WRPN Table (Section 4):**

| Test Area | Description | Priority (WRPN) | Factors (L, I, D, E) |
|---|---|---|---|

*WRPN = Likelihood × Impact × Detectability × Effort*

**RPN Table (Section 10):**

| Risk ID | Risk | Severity | Likelihood | RPN | Mitigation |
|---|---|---|---|---|---|

*RPN = Severity × Likelihood × Detectability*

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/test-plan/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| File starts with | `# QA Test Plan - <Feature/Module>` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Path | Role |
|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | ISTQB techniques, risk-based design, traceability |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | Used when input includes Jira workflow or bug-management expectations |
