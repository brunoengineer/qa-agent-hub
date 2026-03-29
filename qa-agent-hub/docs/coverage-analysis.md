# Coverage Analysis

**Copilot prompt:** `#coverage-analysis` | **Claude Code command:** `/coverage-analysis`
**Copilot agent file:** `.github/agents/qa-coverage-analysis.agent.md`
**Copilot prompt file:** `.github/prompts/coverage-analysis.prompt.md`
**Claude Code command file:** `.claude/commands/coverage-analysis.md`

---

## Purpose

Analyzes test coverage against requirements. Maps test cases to requirement categories, estimates coverage percentages, and identifies strengths, critical gaps, and recommended improvements.

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

A structured coverage analysis report containing:

- **Requirements Categories Identified** — numbered list
- **Test Case Coverage Breakdown** — table with category, requirements count, test cases covering, coverage %, and notes
- **Overall Coverage Estimate** — percentage range with rating
- **Strengths** — well-covered areas with percentages
- **Critical Gaps** — poorly covered areas with missing references
- **Recommendations** — high, medium, and low priority actions

### Coverage Rating Scale

| Range | Rating |
|---|---|
| 90–100% | Comprehensive coverage |
| 70–89% | Good, some missing scenarios |
| 50–69% | Moderate, notable gaps |
| 30–49% | Poor, significant gaps |
| 0–29% | Very poor or no coverage |

### Output Template

```markdown
# Test Coverage Analysis - [Feature Name]

## Coverage Analysis

### Requirements Categories Identified
1. [Category]
2. [Category]

### Test Case Coverage Breakdown

| Requirement Category | Requirements Count | Test Cases Covering | Coverage % | Notes |
|---|---|---|---|---|

## Overall Coverage Estimate: **XX-XX%**

### Strengths
✅ **Well Covered Areas:**
- [Area] - ~XX% coverage

### Critical Gaps
❌ **Poorly Covered Areas:**
- [Area] - ~XX% coverage

## Recommendations

### High Priority
1. [Critical missing test case]

### Medium Priority
1. [Important but not urgent]

### Low Priority
1. [Nice-to-have addition]

---

**Analysis Date:** YYYY-MM-DD
```

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
