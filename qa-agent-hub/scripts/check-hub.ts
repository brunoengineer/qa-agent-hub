import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

// Guards the hub's core idea: a simple report that comes from a full analysis.
// Fails when a template loses its analysis parameters, when a command and its agent
// drift apart, or when an example breaks the report limits.
// Usage: npm run hub:check [-- --root <path>]

const COMMANDS_DIR = ".claude/commands";
const AGENTS_DIR = ".github/agents";
const EXAMPLES_DIR = "qa-agent-hub/examples";
const DOCS_DIR = "qa-agent-hub/docs";

// Parameters that must stay in the analysis logic of each template.
// To remove one on purpose, remove it here too, so the decision is visible in the diff.
const REQUIRED_PARAMETERS: Record<string, string[]> = {
  "automation-gap-analysis": ["Current state", "Coverage matrix", "Candidates", "Dependencies and blockers", "manual-only"],
  "automation-health-check": ["Inventory", "maintainability, reliability, and coverage confidence", "exactly 3 tasks"],
  "bulk-jira-bugs": ["reason to separate", "Reproduction factors", "timing or sequence dependencies"],
  "coverage-analysis": ["Mapping", "happy-path and edge-case", "Strengths", "Critical gaps", "High, Medium, or Low"],
  "exploratory-test-charter": ["Tours and heuristics", "Exit conditions", "dead ends", "useful result"],
  "jira-bug": ["Reproduction factors", "account state", "timing or sequence dependencies", "console errors", "impact from urgency"],
  "jira-task": ["Technical approach", "Test types", "coverage expectations", "impact from urgency", "Task Types to Recognize"],
  "pr-description": ["Separate reported cause from real cause", "Never invent results", "Not covered", "Mermaid rules"],
  "pr-review": [
    "Leftover debugging artifacts",
    "Function & method correctness",
    "Error handling",
    "Naming & readability",
    "Dead or duplicated code",
    "Security basics",
    "Performance",
    "Functional correctness",
    "Regression risk",
    "Component contract compatibility",
    "Event handling & side effects",
    "Rendering stability",
    "Accessibility",
    "Styling / layout risk",
    "Type safety / maintainability",
    "Missing test coverage",
    "Test correctness",
    "Flaky selectors",
    "Hard-coded waits",
    "Missing assertions",
    "Test isolation",
    "Proper use of Playwright APIs",
    "Page object / helper reuse",
    "Unit / integration tests",
    "Test naming & structure",
    "Existing review comments",
    "Severity Scale",
    "Trust Scoring Rules",
  ],
  "release-readiness": ["Coverage confidence", "Blocking considerations", "mitigation or monitoring", "operational risk", "Rationale"],
  "root-cause-triage": ["Alternative hypotheses", "Verification", "escalation or ownership", "Test Automation Issue", "Requirement Gap"],
  "test-approach": [
    "Unit Testing",
    "Component Testing",
    "Integration Testing",
    "System Testing",
    "Usability Testing",
    "Performance Testing",
    "Regression Testing",
    "Equivalence Partitioning",
    "Boundary Value Analysis",
    "Positive/Negative Testing",
    "Exploratory Testing",
    "State Transition Testing",
    "Test data",
    "Risk-based testing",
    "Postman",
    "Bender",
    "Kibana",
    "BackOffice",
  ],
  "test-plan": [
    "Functional Testing",
    "Usability Testing",
    "Integration Testing",
    "Performance Testing",
    "Security Testing",
    "Methodology",
    "Positive Test Cases",
    "Negative Test Cases",
    "Boundary Test Cases",
    "Traceability",
    "WRPN = Likelihood × Impact × Detectability × Effort",
    "RPN = Severity × Likelihood × Detectability",
    "Network",
    "Bug management",
    "Deliverables",
    "Communication",
  ],
  "test-stability-check": [
    "Tests passing only on retry",
    "Hard-coded waits or sleeps",
    "Selector strategies that risk drift",
    "Shared mutable state or order dependence",
    "Environment- or data-dependent assertions",
    "should gate releases",
    "Follow-up tickets",
    "explicit approval",
    "Stability Grade Scale",
  ],
  "test-suggestions": ["up to 20 candidate", "boundary value analysis", "decision tables", "state transitions", "error guessing"],
  "write-tests": ["Existing patterns", "Determinism", "cleanup requirements", "boundary cases"],
};

// These templates describe their analysis in numbered steps or stages instead.
const ANALYSIS_MARKERS: Record<string, string> = {
  "pr-description": "### Step 1",
  "test-stability-check": "### Stage 4",
};
const NO_LIMITS_BLOCK = new Set(["pr-description", "test-suggestions"]);

// Report limits, with the exceptions each template documents.
const LIST_LIMIT = 4;
const STEPS_LIMIT = 6;
const TABLE_LIMIT = 8;
const TABLE_LIMIT_BY_EXAMPLE: Record<string, number> = {
  "bulk-jira-bugs": Number.POSITIVE_INFINITY, // One row per bug.
  "test-stability-check": Number.POSITIVE_INFINITY, // Every failing test is listed.
  "test-suggestions": 12,
};
const BULLET_WORD_LIMIT = 26;
const BULLET_COMMA_LIMIT = 2;
const INLINE_EVIDENCE_EXAMPLES = new Set(["pr-description"]); // Bullets carry inline evidence by design.
const DECORATIVE_EMOJI = /[🐛🧪📋🔧📁🏷💡📸🔄⛔🎯🔍🖥📝📍💬]/u;

function parseRoot(argv: string[]): string {
  const index = argv.indexOf("--root");
  return path.resolve(index >= 0 ? (argv[index + 1] ?? ".") : ".");
}

function normalizeTemplateWording(text: string): string {
  return text
    .replaceAll("Do NOT explain the command.", "Do NOT explain the prompt.")
    .replaceAll("When (and only when) `$ARGUMENTS` is provided", "When (and only when) input is provided")
    .replaceAll("When `$ARGUMENTS` is provided", "When input is provided")
    .replaceAll("`$ARGUMENTS`", "the user input")
    .replace(/Do not create any file when .*/g, "Do not create any file when no input was provided.");
}

function main(): void {
  const root = parseRoot(process.argv.slice(2));
  const failures: string[] = [];
  const read = (relativePath: string): string => readFileSync(path.join(root, relativePath), "utf8").replace(/\r\n/g, "\n");
  const names = readdirSync(path.join(root, COMMANDS_DIR)).map((file) => file.replace(/\.md$/, ""));

  for (const name of names) {
    const command = read(`${COMMANDS_DIR}/${name}.md`);
    const agent = read(`${AGENTS_DIR}/qa-${name}.agent.md`);

    // A command and its agent must say the same thing after the known wording differences.
    const commandLines = normalizeTemplateWording(command.slice(command.search(/^## Your Task/m))).split("\n");
    const agentLines = normalizeTemplateWording(agent.slice(agent.search(/^## Your Task/m))).split("\n");
    const firstDifference = commandLines.findIndex((line, index) => line !== agentLines[index]);
    if (firstDifference >= 0 || commandLines.length !== agentLines.length) {
      const line = commandLines[firstDifference] ?? "(length differs)";
      failures.push(`${name}: command and agent differ at "${line.slice(0, 70)}"`);
    }

    const marker = ANALYSIS_MARKERS[name] ?? "## Analysis Process";
    if (!command.includes(marker)) {
      failures.push(`${name}: analysis section is missing (${marker})`);
    }
    if (!NO_LIMITS_BLOCK.has(name) && !command.includes("### Limits")) {
      failures.push(`${name}: "### Limits" block is missing`);
    }

    const required = REQUIRED_PARAMETERS[name];
    if (!required) {
      failures.push(`${name}: add its analysis parameters to REQUIRED_PARAMETERS`);
      continue;
    }
    for (const parameter of required) {
      if (!command.toLowerCase().includes(parameter.toLowerCase())) {
        failures.push(`${name}: analysis parameter removed: "${parameter}"`);
      }
    }
  }

  for (const file of readdirSync(path.join(root, EXAMPLES_DIR))) {
    const name = file.replace(/\.md$/, "");
    const text = read(`${EXAMPLES_DIR}/${file}`);
    const withoutCode = text.replace(/```[\s\S]*?```/g, "");

    if (!text.startsWith("# ") || (withoutCode.match(/^# /gm) ?? []).length !== 1) {
      failures.push(`${file}: must have exactly one H1, on the first line`);
    }
    if (DECORATIVE_EMOJI.test(text)) {
      failures.push(`${file}: decorative emoji found`);
    }

    let heading = "";
    let listLength = 0;
    let tableLines = 0;
    for (const line of withoutCode.split("\n")) {
      if (/^(#|\*\*[^*]+\*\*\s*$)/.test(line)) {
        heading = line;
      }
      if (/^(\s*[-*] |\d+\. )/.test(line)) {
        listLength += 1;
        const limit = /Steps to Reproduce/i.test(heading) ? STEPS_LIMIT : LIST_LIMIT;
        if (listLength === limit + 1) {
          failures.push(`${file}: list over ${limit} items under "${heading}"`);
        }
        if (!INLINE_EVIDENCE_EXAMPLES.has(name)) {
          const words = line.split(/\s+/).filter((word) => /[\w`]/.test(word)).length;
          const commas = (line.match(/,/g) ?? []).length;
          if (words > BULLET_WORD_LIMIT) {
            failures.push(`${file}: ${words}-word bullet: "${line.slice(0, 60)}"`);
          }
          if (commas > BULLET_COMMA_LIMIT) {
            failures.push(`${file}: too many things in one bullet: "${line.slice(0, 60)}"`);
          }
        }
      } else if (line.trim() !== "") {
        listLength = 0;
      }
      if (line.startsWith("|")) {
        tableLines += 1;
        const limit = TABLE_LIMIT_BY_EXAMPLE[name] ?? TABLE_LIMIT;
        if (tableLines - 2 === limit + 1) {
          failures.push(`${file}: table over ${limit} rows under "${heading}"`);
        }
      } else {
        tableLines = 0;
      }
    }
  }

  for (const file of readdirSync(path.join(root, DOCS_DIR))) {
    for (const match of read(`${DOCS_DIR}/${file}`).matchAll(/\]\((\.\.\/examples\/[^)]+)\)/g)) {
      if (!existsSync(path.join(root, DOCS_DIR, match[1]))) {
        failures.push(`${file}: broken link ${match[1]}`);
      }
    }
  }

  if (failures.length > 0) {
    console.error(`Hub check failed with ${failures.length} problem(s):`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }
  console.log(`Hub check passed: ${names.length} templates and their examples.`);
}

main();
