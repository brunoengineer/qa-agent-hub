# Test Stability Check

**Copilot prompt:** `#test-stability-check` | **Claude Code command:** `/test-stability-check`
**Copilot agent file:** `.github/agents/qa-test-stability-check.agent.md`
**Copilot prompt file:** `.github/prompts/test-stability-check.prompt.md`
**Claude Code command file:** `.claude/commands/test-stability-check.md`

---

## Purpose

Measures the stability and flakiness of a targeted set of automated tests. The agent reads the repository to understand the framework, run commands, and environment, proposes a concrete run plan, waits for the user to approve it, executes the tests in the terminal across multiple runs, classifies failures, and produces a stability report with a numeric grade and prioritized recommendations.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code in the repository whose tests you want to evaluate.
2. Type `#test-stability-check` followed by the path or test name pattern you want to verify.
3. Review the run plan when the agent presents it. Reply `approve` to start, or ask for changes.
4. Wait for execution to finish. The agent will save the report under `qa-agent-hub/response/test-stability-check/`.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/test-stability-check` followed by the path or test name pattern.
3. Approve the run plan when prompted, or request changes.
4. Wait for execution to finish; the report is saved in the same location.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- The path to the test(s) to verify (folder, file, or test name pattern)
- Optional: target environment, run count, framework hints, or known constraints
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Test path or pattern | Yes | Folder, file, or test name pattern to evaluate |
| Environment | No | Local, staging, or CI-like target |
| Run count | No | Number of repetitions; default 3 |
| Framework hints | No | Useful when auto-detection is ambiguous |
| Constraints | No | Things to avoid running, time limits, prerequisites |

## Workflow

1. **Repository analysis** — read-only inspection of test framework, run commands, environments, prerequisites, reporters, and repetition tooling.
2. **Run plan + approval gate** — the agent presents the exact command(s), scope, repetitions, environment, prerequisites, and waits for explicit approval.
3. **Execution** — runs the approved command in the terminal and captures exit codes, output, and reporter artifacts.
4. **Result analysis** — classifies each failure into a category (Product Bug, Flaky / Timing, Selector / Locator, Test Data, Environment, Test Logic, Unknown).
5. **Report** — produces the structured Markdown report and saves it to disk.

> The agent never executes any command before the user approves the run plan.

## Output

A structured stability report containing:

- **Stability Grade** — numeric percentage and rating
- **Run summary** — total tests, runs per test, pass/fail counts, environment, framework, command executed
- **Repository analysis summary**
- **Approved run plan recap**
- **Per-test results table**
- **Top failure reasons table** (ordered by occurrences)
- **Flakiness indicators**
- **Senior QA conclusion**
- **Prioritized recommendations** (immediate / short-term / structural)
- **Suggested follow-up tickets**
- **Artifacts** captured during the run

### Stability Grade Scale

| Range | Rating | Meaning |
|---|---|---|
| 95–100% | High | Trustworthy as a release gate |
| 85–94% | Medium | Useful but needs flakiness work before gating |
| 70–84% | Low | Investigate before relying on it |
| 0–69% | Unstable | Do not trust until stabilized |

### Failure Categories

| Category | Meaning |
|---|---|
| Product Bug | Failure points to a real product behavior change |
| Flaky / Timing | Intermittent, timing, race condition, or retry-only-passes |
| Selector / Locator | Brittle or stale selector, DOM change |
| Test Data | Seed drift, missing fixture, account state |
| Environment | Service down, config, network, browser, infra |
| Test Logic | Incorrect assertion, bad setup/teardown, test bug |
| Unknown | Insufficient evidence |

## Saved File Location

`qa-agent-hub/response/test-stability-check/YYYY-MM-DD-<slug>.md`

## Information Sources

| Source | Copilot path | Claude Code location |
|---|---|---|
| QA Core | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` |
| Automation | `.github/instructions/automation.instructions.md` | `## Automation Guidance` in `.claude/CLAUDE.md` |
| Test Design | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` |
