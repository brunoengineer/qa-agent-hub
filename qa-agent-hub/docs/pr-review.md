# PR Review

**Copilot prompt:** `#pr-review` | **Claude Code command:** `/pr-review`
**Copilot agent file:** `.github/agents/qa-pr-review.agent.md`
**Copilot prompt file:** `.github/prompts/pr-review.prompt.md`
**Claude Code command file:** `.claude/commands/pr-review.md`

---

## Purpose

Reviews a GitHub Pull Request as a senior code reviewer and returns a concise approval-risk report with actionable inline review comments. Determines whether the PR is safe to approve, covering user impact, regressions, UI behavior, event handling, accessibility, contract changes, maintainability, code quality, and test correctness.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#pr-review` followed by the PR URL and diff content.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/pr-review` followed by the PR URL and diff content.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- The GitHub Pull Request URL
- The .diff content (paste the raw diff)
```

## Required Input

| Field | Required | Description |
|---|---|---|
| PR URL | Yes | The GitHub Pull Request URL |
| Diff content | Yes | The raw `.diff` content of the PR |
| Existing review comments | Optional | Any existing review comments on the PR |

## Review Dimensions

The agent inspects the diff across multiple dimensions:

| Dimension | Description |
|---|---|
| Code quality & good practices | Debugging artifacts, function correctness, error handling, naming, dead code, security, performance |
| Frontend-specific | Functional correctness, regression risk, component contracts, events, rendering stability, accessibility, styling |
| Test & automation | Missing coverage, test correctness, Playwright/E2E specifics, unit/integration tests, naming & structure |
| Existing comments | Whether previous review comments are still valid in the latest diff |

## Output

A structured approval-risk report containing:

- **Trust level to approve** — 0%–100% score
- **Executive summary** — key points at a glance
- **Overall verdict** — Safe to approve / Approve with minor fixes / Needs changes / Do not approve
- **Confirmed issues** — table with severity, file & line, evidence, recommendation
- **Potential risks** — items to verify before merge
- **Code-quality checks** — flags from 7 good-practices categories
- **Frontend-specific checks** — 8 UI/component review categories (when applicable)
- **Test & automation checks** — 5 test quality categories (when applicable)
- **Existing review comments** — status of prior feedback
- **Proposed inline review comments** — ready-to-post GitHub comments with file, line, and message
- **Final recommendation** — approve decision and top 3 verification items

### Severity Scale

| Level | Meaning |
|---|---|
| **Critical** | Security issue, broken core production flow, or severe user-facing regression |
| **High** | Likely bug/regression with significant user or business impact |
| **Medium** | Real issue with moderate impact or unclear behavior — fix before merge |
| **Low** | Minor bug, maintainability concern, naming issue, or non-blocking cleanup |

### Trust Scoring

- Starts at **100 %** and subtracts based on findings
- Critical → heavy deduction
- High → clear deduction
- Medium → moderate deduction
- Low → light deduction
- Does not invent issues to balance the review

## Saved File Location

`qa-agent-hub/response/pr-review/YYYY-MM-DD-<slug>.md`

## Information Sources

| Source | Copilot path | Claude Code location |
|---|---|---|
| QA Core | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` |
| Automation | `.github/instructions/automation.instructions.md` | `## Automation Guidance` in `.claude/CLAUDE.md` |
| Test Design | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` |
