# Coverage Analysis

**Copilot prompt:** `#coverage-analysis` | **Claude Code command:** `/coverage-analysis`
**Copilot agent file:** `.github/agents/qa-coverage-analysis.agent.md`
**Copilot prompt file:** `.github/prompts/coverage-analysis.prompt.md`
**Claude Code command file:** `.claude/commands/coverage-analysis.md`

---

## Purpose

Analyzes test coverage against requirements. Maps test cases to requirement categories, estimates coverage percentages, and identifies the biggest gaps and the tests to add first.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#coverage-analysis` followed by requirements and test cases.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/coverage-analysis` followed by requirements and test cases.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

1. Requirements (list of use cases, user stories, or requirements)
2. Test Cases (list of existing test cases)

Format: CSV, table, or plain text list
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Requirements | Yes | Use cases, user stories, or requirements list |
| Test Cases | Yes | Existing test cases (CSV, table, or plain text) |

## Output

The agent completes a full Analysis Process first. The limits below apply to the printed report, not to that analysis.

A one-screen coverage report of about 300 words. See the [example](../examples/coverage-analysis.md). The exact template is in the command file.

| Part | Content | Limit |
|---|---|---|
| **Meta line** | Overall coverage and rating · Requirements · Test cases · Date | 1 line |
| **Summary** | What is safe, the biggest gap, what to add first | 2 sentences |
| **Coverage by Category** | Requirements, tests, coverage, and gap, lowest coverage first | 8 rows |
| **Tests to Add First** | Missing tests, tagged High, Medium, or Low | 4 items |

### Coverage Rating Scale

| Range | Rating |
|---|---|
| 90–100% | Comprehensive coverage |
| 70–89% | Good, some missing scenarios |
| 50–69% | Moderate, notable gaps |
| 30–49% | Poor, significant gaps |
| 0–29% | Very poor or no coverage |

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/coverage-analysis/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | ISTQB techniques, traceability, coverage standards |
