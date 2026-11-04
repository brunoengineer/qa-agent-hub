# Test Suggestions

**Copilot prompt:** `#test-suggestions` | **Claude Code command:** `/test-suggestions`
**Copilot agent file:** `.github/agents/qa-test-suggestions.agent.md`
**Copilot prompt file:** `.github/prompts/test-suggestions.prompt.md`
**Claude Code command file:** `.claude/commands/test-suggestions.md`

---

## Purpose

Generates 6–12 manual test cases, ranked by risk, for a feature, aligned with ISTQB test design techniques. The output is a self-contained Markdown table ready for manual execution.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#test-suggestions` followed by the feature or requirement.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/test-suggestions` followed by the feature or requirement.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

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

The agent completes a full Analysis Process first. The limits below apply to the printed report, not to that analysis.

A self-contained test case table, ranked so that running the first few rows still covers what matters most. See the [example](../examples/test-suggestions.md). The exact format is in the command file.

| Part | Content | Limit |
|---|---|---|
| **Generic precondition** | Setup shared by all cases | 1 line |
| **Table** | Priority, Objective, Preconditions, Steps, Expected Result, Technique | 6–12 rows, 4 steps per case |
| **Left out** | Cut cases that could matter | 1 line, only when needed |

| Priority | Meaning |
|---|---|
| **P1** | A failure blocks the flow or shows wrong data |
| **P2** | Important, but has a workaround |
| **P3** | Minor |

In chat, the output is wrapped in a code block so it can be copied. The saved file has no code block, so the table renders.

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/test-suggestions/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| File starts with | `# Manual Test Cases - <Feature/Requirement>` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | ISTQB techniques, positive/negative coverage, traceability |
