# Slack Review Request

**Copilot prompt:** `#slack-review-request` | **Claude Code command:** `/slack-review-request`
**Copilot agent file:** `.github/agents/qa-slack-review-request.agent.md`
**Copilot prompt file:** `.github/prompts/slack-review-request.prompt.md`
**Claude Code command file:** `.claude/commands/slack-review-request.md`

---

## Purpose

Drafts a short Slack message asking teammates to review a Pull Request. It tells a reviewer what the PR does, why it is needed, and how it was done and tested. The agent only drafts the message: it never sends anything to Slack, requests reviewers, or changes the repository.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code, on the branch and in the session where you made the changes.
2. Type `#slack-review-request`. Optionally add the PR link.

### Claude Code
1. Open Claude Code on the branch and in the session where you made the changes.
2. Type `/slack-review-request`. Optionally add the PR link (e.g. `/slack-review-request https://github.com/org/repo/pull/12`).

Run it in the same chat session where you made and tested the changes. That session is where the agent finds the reasoning for **Why** and the real test results for **How**.

## What the Agent Collects

Input is optional. The agent uses only the local branch and the current chat conversation. It runs no network commands.

| Source | How | Used for |
|---|---|---|
| Local branch | Commits ahead of the base, committed diff, staged, unstaged, and untracked changes | What, How, title, ticket ID |
| Chat conversation | Request, ticket, root cause findings, decisions, commands actually run and their results | Why, How, how it was tested |
| User input (optional) | PR link, ticket ID, test results | Overrides anything inferred |

Git cannot tell the agent the PR link. Without one, the message has a `<PR link>` placeholder for you to replace.

## Output

The agent completes a full Analysis Process first. The limits below apply to the printed message, not to that analysis.

A paste-ready message of about 60 words, in Slack formatting. See the [example](../examples/slack-review-request.md). The exact template is in the command file.

| Line | Content | Limit |
|---|---|---|
| **Review request** | PR title with the ticket ID, then the plain URL | 2 lines |
| **What** | What this PR does | 1 sentence |
| **Why** | The problem or need behind it | 1 sentence |
| **How** | The approach, then how it was tested and the real result, or `Tested: ⚠️ Not provided` | 1–2 sentences |

Anything you must fix first (missing link, unpushed commits, uncommitted files, failing tests, missing test evidence) appears in chat under **Before you post** and is not saved to the file.

The message uses a plain URL because Slack does not treat pasted `<url|text>` links as links. After pasting, check that the bold text rendered.

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/slack-review-request/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when there are changes to request a review for |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | Concrete tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Filename conventions, report design rules |
