# QA Agent Hub

Reusable QA agents, prompts, and shared instructions for common QA work: bug tickets, QA tasks, test plans, test approaches, manual test cases, and coverage analysis.

Works with **GitHub Copilot** (VS Code) and **Claude Code** (CLI/IDE extension).

## Architecture

The repo separates QA customization files from QA project assets.

- `.github/` contains Copilot-recognized customization files.
- `.claude/` contains Claude Code slash commands and workspace instructions.
- `qa-agent-hub/` is the dedicated project area for examples, generated artifacts, and documentation.

## Repository structure

```text
.github/
├── agents/                        # Task-specific agent behavior (GitHub Copilot)
├── prompts/                       # Flat prompt files for VS Code prompt discovery
├── instructions/                  # Reusable guidance shared across agents
└── copilot-instructions.md        # Minimal workspace-wide defaults

.claude/
├── commands/                      # Claude Code slash commands (one per agent)
└── CLAUDE.md                      # Claude Code workspace instructions + shared guidance

qa-agent-hub/
├── scripts/                       # Local installer and maintenance scripts
├── examples/                      # Canonical sample outputs by capability
├── response/                      # Generated outputs and local work log
└── docs/                          # QA hub documentation and rollout notes
```

## How it works

### GitHub Copilot

Each QA flow is built from three layers:

- **Instructions** in `.github/instructions/` provide cross-cutting guidance such as QA writing style, file naming rules, Jira conventions, and test design standards.
- **Agents** in `.github/agents/` stay focused on task-specific reasoning and output shape.
- **Prompts** in `.github/prompts/` are thin triggers that route the chat session into the right agent.

When you invoke a prompt, Copilot Chat switches to the corresponding agent mode automatically.

### Claude Code

Each QA flow is a single slash command file under `.claude/commands/`. Shared guidance lives in `.claude/CLAUDE.md`, which Claude Code always loads into context. Commands use `$ARGUMENTS` to receive user input.

Type `/jira-bug` with no input to see the required format. Type `/jira-bug <your description>` to generate the ticket.

## Quick start

### GitHub Copilot

```bash
git clone https://github.com/brunoengineer/qa-agent-hub.git
cd qa-agent-hub
code .
```

In VS Code:

1. Open Copilot Chat.
2. Type `#` and pick a prompt such as `#jira-bug`.
3. Paste the requested input.

Tip: send only the prompt name with no additional input to see the exact format required.

### Claude Code

```bash
git clone https://github.com/brunoengineer/qa-agent-hub.git
cd qa-agent-hub
claude
```

Type `/` to see all available commands. Examples:

- `/jira-bug <description>` — bug ticket
- `/test-plan <feature>` — full test plan
- `/test-suggestions <feature>` — manual test cases

Tip: run any command with no arguments to see the required input format.

## Current coverage

| Agent | Copilot prompt | Claude Code command | Use it for | Minimum input | Output |
|---|---|---|---|---|---|
| Jira Bug | `#jira-bug` | `/jira-bug` | Bug ticket for a defect | What happened / expected result / steps | Jira-ready bug report |
| Bulk Jira Bugs | `#bulk-jira-bugs` | `/bulk-jira-bugs` | Multiple bug tickets from issue lists or reports | Issue list, report, or triage notes | Batch bug document with separate tickets |
| Jira Task | `#jira-task` | `/jira-task` | QA task for automation, execution, or maintenance | What needs doing / component / priority | Jira-ready QA task |
| Root Cause Triage | `#root-cause-triage` | `/root-cause-triage` | Classify likely cause of a failure or issue | Failure summary plus logs or signals | Triage report with likely cause and next steps |
| Test Approach | `#test-approach` | `/test-approach` | Short ISTQB-aligned test approach | Jira ticket or feature description | Scope, levels, techniques, environment, risks, exit criteria |
| Coverage Analysis | `#coverage-analysis` | `/coverage-analysis` | Coverage mapping against requirements | Requirements list plus existing test cases | Coverage breakdown, gaps, recommendations |
| Release Readiness | `#release-readiness` | `/release-readiness` | Go, go with risks, or no-go recommendation | Release scope, test status, open risks | Readiness report and follow-up actions |
| Automation Gap Analysis | `#automation-gap-analysis` | `/automation-gap-analysis` | Identify highest-value automation opportunities | Existing manual and automated coverage | Gap analysis and recommended order |
| Test Plan | `#test-plan` | `/test-plan` | Full QA test plan | Feature or module plus brief description | Structured test plan |
| Test Suggestions | `#test-suggestions` | `/test-suggestions` | Manual test cases in table form | Feature, flows, constraints | Precondition plus Markdown table of tests |
| Exploratory Test Charter | `#exploratory-test-charter` | `/exploratory-test-charter` | Create a focused exploratory mission | Feature or risk area plus constraints | Time-boxed charter with risks and heuristics |
| Write Tests | `#write-tests` | `/write-tests` | Write or update automated tests when repo context exists | Feature or bug plus test framework context | Real test changes or a planning artifact |
| Test Stability Check | `#test-stability-check` | `/test-stability-check` | Measure suite stability and flakiness with an approved run plan | Test path or pattern plus optional env / run count | Stability grade, per-test results, failure breakdown, recommendations |

## Generated outputs and examples

- `qa-agent-hub/examples/` is intended for curated, high-quality sample outputs.
- `qa-agent-hub/response/` is intended for generated local artifacts.

## Install Into Another Repository

This repository is the source of truth. To use the QA hub inside another local repository, clone this hub repo locally and run the installer against the target repo.

### What gets installed into the target repo

| Path | `--tool copilot` | `--tool claude` | `--tool both` (default) |
|---|---|---|---|
| `.github/agents/` | ✅ | | ✅ |
| `.github/prompts/` | ✅ | | ✅ |
| `.github/instructions/` | ✅ | | ✅ |
| `.github/copilot-instructions.md` | ✅ (optional) | | ✅ (optional) |
| `.claude/commands/` | | ✅ | ✅ |
| `.claude/CLAUDE.md` | | ✅ (optional) | ✅ (optional) |
| `qa-agent-hub/response/` | ✅ | ✅ | ✅ |
| `qa-agent-hub/examples/` | ✅ | ✅ | ✅ |
| `qa-agent-hub/docs/` | ✅ | ✅ | ✅ |

Optional files are skipped when the target repo already has its own version. Use `--force` to overwrite.

The local installer script itself stays in this source repo under `qa-agent-hub/scripts/` and is not copied into the target repo.

### What the installer adds to the target repo `.gitignore`

```gitignore
# QA Agent Hub generated outputs
qa-agent-hub/response/**/*.md
```

### Prerequisites

- Node.js 18 or later
- npm
- A local clone of the target repository

### Windows PowerShell

```powershell
git clone https://github.com/brunoengineer/qa-agent-hub.git
cd qa-agent-hub
npm install

# Install for both tools (default)
npm run hub:install -- --target "C:\path\to\target-repo"

# Install for Claude Code only
npm run hub:install -- --target "C:\path\to\target-repo" --tool claude

# Install for GitHub Copilot only
npm run hub:install -- --target "C:\path\to\target-repo" --tool copilot

# Dry run first
npm run hub:install -- --target "C:\path\to\target-repo" --dry-run
```

### macOS and Linux

```bash
git clone https://github.com/brunoengineer/qa-agent-hub.git
cd qa-agent-hub
npm install

# Install for both tools (default)
npm run hub:install -- --target /path/to/target-repo

# Install for Claude Code only
npm run hub:install -- --target /path/to/target-repo --tool claude

# Dry run first
npm run hub:install -- --target /path/to/target-repo --dry-run
```

### Installer behavior

- The installer stops if hub-managed files already exist with different content.
- If the target repo already has `.github/copilot-instructions.md` or `.claude/CLAUDE.md`, those files are skipped by default.
- Use `--force` to overwrite those files intentionally.
- Use `--skip-gitignore` if you do not want the installer to modify the target repo `.gitignore`.
- Use `--dry-run` to preview changes without writing files.

## Add a new capability

1. Create or reuse a shared instruction in `.github/instructions/` and add the corresponding guidance block to `.claude/CLAUDE.md`.
2. Create `.github/agents/qa-<name>.agent.md` for the Copilot agent.
3. Create `.github/prompts/<name>.prompt.md` as the Copilot prompt trigger.
4. Create `.claude/commands/<name>.md` as the Claude Code slash command.
5. Add matching example and response folders under `qa-agent-hub/` when that capability is ready for sample or generated outputs.

## Current expansion areas

- Defect management
- Test design and planning
- Analysis and triage
- Automation and maintenance
