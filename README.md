# QA Agent Hub

Reusable GitHub Copilot agents, prompts, and shared instructions for common QA work: bug tickets, QA tasks, test plans, test approaches, manual test cases, and coverage analysis.

This repo is meant to be opened in VS Code and used through Copilot Chat's agent and prompt picker. It is also being structured so the Copilot customization layer can be copied into another repository without dragging generated QA artifacts into that repo's root.

## Architecture

The repo now separates QA customization files from QA project assets.

- `.github/` contains only Copilot-recognized customization files.
- `qa-agent-hub/` is the dedicated project area for examples, generated artifacts, and future QA-hub documentation.

## Repository structure

```text
.github/
├── agents/                        # Task-specific agent behavior
├── prompts/
│   ├── defect-management/         # Bug, task, and defect-oriented prompts
│   ├── test-design-planning/      # Test planning, approach, and manual design prompts
│   ├── analysis-triage/           # Analysis, triage, and release prompts
│   └── automation-maintenance/    # Automation planning and test-writing prompts
├── instructions/                  # Reusable guidance shared across agents
└── copilot-instructions.md        # Minimal workspace-wide defaults

qa-agent-hub/
├── examples/                      # Canonical sample outputs by capability
├── response/                      # Generated outputs and local work log
└── docs/                          # QA hub documentation and rollout notes
```

## How it works

Each QA flow is built from three layers:

- **Instructions** in `.github/instructions/` provide cross-cutting guidance such as QA writing style, file naming rules, Jira conventions, and test design standards.
- **Agents** in `.github/agents/` stay focused on task-specific reasoning and output shape.
- **Prompts** in `.github/prompts/` are thin triggers that route the chat session into the right agent.

When you invoke a prompt, Copilot Chat switches to the corresponding agent mode automatically.

## Quick start

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

## Current prompt coverage

| Prompt | Agent | Use it for | Minimum input | Output |
|---|---|---|---|---|
| `#jira-bug` | Jira Bug | Bug ticket for a defect | What happened / expected result / steps | Jira-ready bug report |
| `#bulk-jira-bugs` | Bulk Jira Bugs | Multiple bug tickets from issue lists or reports | Issue list, report, or triage notes | Batch bug document with separate tickets |
| `#jira-task` | Jira Task | QA task for automation, execution, or maintenance | What needs doing / component / priority | Jira-ready QA task |
| `#root-cause-triage` | Root Cause Triage | Classify likely cause of a failure or issue | Failure summary plus logs or signals | Triage report with likely cause and next steps |
| `#test-approach` | Test Approach | Short ISTQB-aligned test approach | Jira ticket or feature description | Scope, levels, techniques, environment, risks, exit criteria |
| `#coverage-analysis` | Coverage Analysis | Coverage mapping against requirements | Requirements list plus existing test cases | Coverage breakdown, gaps, recommendations |
| `#release-readiness` | Release Readiness | Go, go with risks, or no-go recommendation | Release scope, test status, open risks | Readiness report and follow-up actions |
| `#automation-gap-analysis` | Automation Gap Analysis | Identify highest-value automation opportunities | Existing manual and automated coverage | Gap analysis and recommended order |
| `#test-plan` | Test Plan | Full QA test plan | Feature or module plus brief description | Structured test plan |
| `#test-suggestions` | Test Suggestions | Manual test cases in table form | Feature, flows, constraints | Precondition plus Markdown table of tests |
| `#exploratory-test-charter` | Exploratory Test Charter | Create a focused exploratory mission | Feature or risk area plus constraints | Time-boxed charter with risks and heuristics |
| `#write-tests` | Write Tests | Write or update automated tests when repo context exists | Feature or bug plus test framework context | Real test changes or a planning artifact |

## Prompt capability folders

- `.github/prompts/defect-management/` contains prompts for bug and QA task creation.
- `.github/prompts/test-design-planning/` contains prompts for test approach, test plan, manual test case design, and exploratory charters.
- `.github/prompts/analysis-triage/` contains prompts for coverage, release decisions, and analysis workflows.
- `.github/prompts/automation-maintenance/` contains prompts for automation planning and test-writing workflows.

## Generated outputs and examples

- `qa-agent-hub/examples/` is intended for curated, high-quality sample outputs.
- `qa-agent-hub/response/` is intended for generated local artifacts.

## Add a new capability

1. Create or reuse a shared instruction in `.github/instructions/` if the rule applies across multiple agents.
2. Create `.github/agents/<name>.agent.md` for the task-specific behavior.
3. Create `.github/prompts/<domain>/<name>.prompt.md` as the prompt trigger.
4. Add matching example and response folders under `qa-agent-hub/` when that capability is ready for sample or generated outputs.

## Current expansion areas

- Defect management
- Test design and planning
- Analysis and triage
- Automation and maintenance
