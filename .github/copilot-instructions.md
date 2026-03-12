# QA Agent Hub - Workspace Instructions

This repository is a reusable QA Copilot customization hub.

## Purpose

- Keep Copilot customization files under `.github/`
- Keep QA-hub assets such as examples and generated outputs under `qa-agent-hub/`
- Prefer shared guidance from `.github/instructions/` over duplicating the same rules in every agent

## Working model

- Use `.github/copilot-instructions.md` only for workspace-wide defaults
- Put cross-cutting QA guidance in `.github/instructions/*.instructions.md`
- Keep `.github/agents/*.agent.md` focused on task-specific behavior
- Keep `.github/prompts/*.prompt.md` as thin entry points to agents

## QA standards

- Be specific and actionable
- Prioritize by risk and business impact
- Use concise Markdown outputs with strong structure
- Infer reasonable QA assumptions when safe, but ask for more input if a missing detail would change the outcome materially

## Repository structure note

- Generated outputs should be written under `qa-agent-hub/response/`
- Project-content areas should be designed under `qa-agent-hub/`
