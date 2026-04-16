# QA Agent Hub - Agent Documentation Index

> Individual documentation for each agent is available below.
> Each doc covers purpose, how to invoke the agent, required input, output format, saved file location, and the technical information sources that power the agent's behavior.

---

## Agent Docs

| Agent | Copilot prompt | Claude Code command | Documentation |
|---|---|---|---|
| Jira Bug | `#jira-bug` | `/jira-bug` | [jira-bug.md](jira-bug.md) |
| Bulk Jira Bugs | `#bulk-jira-bugs` | `/bulk-jira-bugs` | [bulk-jira-bugs.md](bulk-jira-bugs.md) |
| Jira Task | `#jira-task` | `/jira-task` | [jira-task.md](jira-task.md) |
| Test Suggestions | `#test-suggestions` | `/test-suggestions` | [test-suggestions.md](test-suggestions.md) |
| Test Approach | `#test-approach` | `/test-approach` | [test-approach.md](test-approach.md) |
| Test Plan | `#test-plan` | `/test-plan` | [test-plan.md](test-plan.md) |
| Coverage Analysis | `#coverage-analysis` | `/coverage-analysis` | [coverage-analysis.md](coverage-analysis.md) |
| Exploratory Test Charter | `#exploratory-test-charter` | `/exploratory-test-charter` | [exploratory-test-charter.md](exploratory-test-charter.md) |
| Automation Gap Analysis | `#automation-gap-analysis` | `/automation-gap-analysis` | [automation-gap-analysis.md](automation-gap-analysis.md) |
| Root Cause Triage | `#root-cause-triage` | `/root-cause-triage` | [root-cause-triage.md](root-cause-triage.md) |
| Release Readiness | `#release-readiness` | `/release-readiness` | [release-readiness.md](release-readiness.md) |
| Write Tests | `#write-tests` | `/write-tests` | [write-tests.md](write-tests.md) |
| PR Review | `#pr-review` | `/pr-review` | [pr-review.md](pr-review.md) |

---

## Shared Information Sources

All agents inherit cross-cutting guidance from shared instruction files. For Copilot these are separate `.instructions.md` files; for Claude Code they are sections in `.claude/CLAUDE.md`.

| Guidance | Copilot path | Claude Code location | Description |
|---|---|---|---|
| QA Core | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | Concrete and action-oriented QA tone. Prioritize by customer impact, business risk, and execution risk. Infer reasonable assumptions; ask only when a missing detail would change scope or recommendation. |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Concise Markdown with predictable section names. `YYYY-MM-DD-<slug>.md` filenames. Single H1 title. Tables only when they improve scanning. No filler sections. |
| Test Design | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | Risk-based thinking first. ISTQB techniques (equivalence partitioning, boundary value analysis, decision tables, state transitions, error guessing). Traceable coverage. Clear exclusions. |
| Jira QA | `.github/instructions/jira.instructions.md` | `## Jira QA Guidance` in `.claude/CLAUDE.md` | Clear titles, impact vs urgency for priority, expected/actual/steps for bugs, specific testable acceptance criteria, clean labels. |
| Automation | `.github/instructions/automation.instructions.md` | `## Automation Guidance` in `.claude/CLAUDE.md` | Maintainable over broad. Reuse existing patterns. Deterministic, isolated, environment-aware tests. Separate product defects from automation issues. |

## Which Agents Use Which Guidance

| Agent | QA Core | Doc Output | Test Design | Jira | Automation |
|---|---|---|---|---|---|
| Jira Bug | ✅ | ✅ | | ✅ | |
| Bulk Jira Bugs | ✅ | ✅ | | ✅ | |
| Jira Task | ✅ | ✅ | | ✅ | ✅* |
| Test Suggestions | ✅ | ✅ | ✅ | | |
| Test Approach | ✅ | ✅ | ✅ | ✅* | |
| Test Plan | ✅ | ✅ | ✅ | ✅* | |
| Coverage Analysis | ✅ | ✅ | ✅ | | |
| Exploratory Test Charter | ✅ | ✅ | ✅ | | |
| Automation Gap Analysis | ✅ | ✅ | ✅ | | ✅ |
| Root Cause Triage | ✅ | ✅ | | ✅ | ✅ |
| Release Readiness | ✅ | ✅ | ✅ | ✅ | |
| Write Tests | ✅ | | ✅ | | ✅ |
| PR Review | ✅ | ✅ | ✅* | | ✅* |

*✅\* = conditional — used only when context requires it (e.g., automation-related task, Jira ticket input).*
