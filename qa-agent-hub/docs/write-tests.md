# Write Tests

**Copilot prompt:** `#write-tests` | **Claude Code command:** `/write-tests`
**Copilot agent file:** `.github/agents/qa-write-tests.agent.md`
**Copilot prompt file:** `.github/prompts/write-tests.prompt.md`
**Claude Code command file:** `.claude/commands/write-tests.md`

---

## Purpose

Writes or updates automated tests directly in the codebase when the relevant product code and framework context are available. Unlike other agents, this one produces real test files instead of Markdown artifacts.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#write-tests` followed by the feature or bug to automate.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/write-tests` followed by the feature or bug to automate.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- The feature, bug, or regression risk to automate
- The target repository, files, or existing test example
- The test framework and language, if known
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Feature/bug | Yes | What to automate |
| Target repo/files | Recommended | Where to write the tests or existing test examples |
| Framework/language | Optional | Test framework and language (inferred from workspace if available) |

## Output Behavior

This agent has two modes:

### Mode 1 — Codebase Available

When the workspace contains the relevant product code and test framework:

- Creates or edits real test files directly
- Reuses existing fixtures, patterns, and assertion style
- Covers the requested behavior with deterministic tests and clear assertions
- Returns a summary of what was added, updated, and any remaining gaps
- **No Markdown response artifact is created**

### Mode 2 — Codebase Not Available

When the workspace does not contain the relevant code:

- Asks for the missing technical context needed to write reliable tests
- Produces a planning artifact if the user explicitly requests a plan

## Saved File (Planning-Only)

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/write-tests/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only when user requests a plan or codebase context is missing |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, risk-based prioritization |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | ISTQB techniques, positive/negative coverage |
| Automation Guidance | `.github/instructions/automation.instructions.md` | `## Automation Guidance` in `.claude/CLAUDE.md` | Maintainability, fixtures, selectors, deterministic tests, scope boundaries |
