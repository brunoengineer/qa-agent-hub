# Test Suggestions

**Prompt:** `#test-suggestions`
**Agent file:** `.github/agents/qa-test-suggestions.agent.md`
**Prompt file:** `.github/prompts/test-suggestions.prompt.md`

---

## Purpose

Generates 5–20 manual test cases for a feature, aligned with ISTQB test design techniques. The output is a self-contained Markdown table ready for manual execution.

## How to Use

1. Open Copilot Chat in VS Code.
2. Type `#test-suggestions` followed by the feature or requirement.
3. If you send `#test-suggestions` with no input, the agent will ask:

```
Please provide:

- Feature or requirement to test
- Any specific user flows or scenarios
- Constraints (browser, device, user roles)
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Feature/requirement | Yes | What needs to be tested |
| User flows | Optional | Specific scenarios to focus on |
| Constraints | Optional | Browser, device, role, or environment limits |

## Output

A compact deliverable with:

1. **Generic precondition** line at the top
2. **Markdown table** with columns:

| Objective | Preconditions | Steps | Expected Result | Technique |

- Steps are numbered and executable
- Expected results are measurable and testable
- No test case IDs — kept minimal
- Returned inside a Markdown code block
- No extra commentary unless explicitly requested

### Output Template

```markdown
# Manual Test Cases - <Feature/Requirement>

**Precondition:** [Generic precondition for all test cases]

| Objective | Preconditions | Steps | Expected Result | Technique |
|---|---|---|---|---|
| [What is being validated] | [Specific setup] | 1. [Step] 2. [Step] | [Measurable result] | [ISTQB technique] |
```

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/test-suggestions/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| File starts with | `# Manual Test Cases - <Feature/Requirement>` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Path | Role |
|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | ISTQB techniques, positive/negative coverage, traceability |
