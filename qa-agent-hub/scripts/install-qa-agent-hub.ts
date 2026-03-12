import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GENERATED_OUTPUT_IGNORE = "qa-agent-hub/response/**/*.md";
const GITIGNORE_MARKER_START = "# QA Agent Hub generated outputs";

type Options = {
  targetRepo: string;
  force: boolean;
  dryRun: boolean;
  skipGitignore: boolean;
};

function parseArgs(argv: string[]): Options {
  let targetRepo = "";
  let force = false;
  let dryRun = false;
  let skipGitignore = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--target" || arg === "-t") {
      targetRepo = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (arg.startsWith("--target=")) {
      targetRepo = arg.slice("--target=".length);
      continue;
    }

    if (arg === "--force") {
      force = true;
      continue;
    }

    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg === "--skip-gitignore") {
      skipGitignore = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  if (!targetRepo) {
    printHelp();
    throw new Error("Missing required --target argument.");
  }

  return {
    targetRepo,
    force,
    dryRun,
    skipGitignore,
  };
}

function printHelp(): void {
  console.log(`Usage:\n  npm run hub:install -- --target <path-to-target-repo> [--force] [--dry-run] [--skip-gitignore]\n\nOptions:\n  --target, -t       Path to the target local repository\n  --force            Overwrite existing hub-managed files in the target repo\n  --dry-run          Show what would change without writing files\n  --skip-gitignore   Do not add the QA Agent Hub ignore rule to the target repo\n  --help, -h         Show this help message`);
}

function ensureDirectory(dirPath: string, dryRun: boolean): void {
  if (existsSync(dirPath)) {
    return;
  }

  if (dryRun) {
    console.log(`[dry-run] mkdir ${dirPath}`);
    return;
  }

  mkdirSync(dirPath, { recursive: true });
}

function listFilesRecursive(rootPath: string): string[] {
  const entries = readdirSync(rootPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(rootPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(absolutePath));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

function filesDiffer(leftPath: string, rightPath: string): boolean {
  if (!existsSync(rightPath)) {
    return false;
  }

  return readFileSync(leftPath, "utf8") !== readFileSync(rightPath, "utf8");
}

function appendGitignoreRule(targetRepo: string, dryRun: boolean): void {
  const gitignorePath = path.join(targetRepo, ".gitignore");
  const existingContent = existsSync(gitignorePath) ? readFileSync(gitignorePath, "utf8") : "";

  if (existingContent.includes(GENERATED_OUTPUT_IGNORE)) {
    console.log(`gitignore already contains ${GENERATED_OUTPUT_IGNORE}`);
    return;
  }

  const normalizedContent = existingContent && !existingContent.endsWith("\n") ? `${existingContent}\n` : existingContent;
  const block = `${normalizedContent ? "\n" : ""}${GITIGNORE_MARKER_START}\n${GENERATED_OUTPUT_IGNORE}\n`;

  if (dryRun) {
    console.log(`[dry-run] append ${GENERATED_OUTPUT_IGNORE} to ${gitignorePath}`);
    return;
  }

  writeFileSync(gitignorePath, `${normalizedContent}${block}`, "utf8");
}

function assertTargetRepo(targetRepo: string): void {
  if (!existsSync(targetRepo)) {
    throw new Error(`Target repo does not exist: ${targetRepo}`);
  }

  const gitDir = path.join(targetRepo, ".git");
  if (!existsSync(gitDir)) {
    throw new Error(`Target path is not a git repository: ${targetRepo}`);
  }
}

function main(): void {
  const options = parseArgs(process.argv.slice(2));
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const hubRoot = path.resolve(path.join(scriptDir, "..", ".."));
  const targetRepo = path.resolve(options.targetRepo);

  assertTargetRepo(targetRepo);

  const sourcePaths = [
    ".github/agents",
    ".github/prompts",
    ".github/instructions",
    ".github/copilot-instructions.md",
  ];

  const directoryPathsToCreate = [
    "qa-agent-hub",
    "qa-agent-hub/examples",
    "qa-agent-hub/docs",
    "qa-agent-hub/response",
  ];

  const conflicts: string[] = [];

  for (const relativeSourcePath of sourcePaths) {
    const absoluteSourcePath = path.join(hubRoot, relativeSourcePath);
    const absoluteTargetPath = path.join(targetRepo, relativeSourcePath);

    if (statSync(absoluteSourcePath).isDirectory()) {
      const files = listFilesRecursive(absoluteSourcePath);
      for (const filePath of files) {
        const relativeFilePath = path.relative(absoluteSourcePath, filePath);
        const targetFilePath = path.join(absoluteTargetPath, relativeFilePath);
        if (filesDiffer(filePath, targetFilePath)) {
          conflicts.push(path.relative(targetRepo, targetFilePath));
        }
      }
      continue;
    }

    if (filesDiffer(absoluteSourcePath, absoluteTargetPath)) {
      conflicts.push(path.relative(targetRepo, absoluteTargetPath));
    }
  }

  if (conflicts.length > 0 && !options.force) {
    console.error("Install aborted because existing files would be overwritten:");
    for (const conflict of conflicts) {
      console.error(`- ${conflict}`);
    }
    console.error("Re-run with --force to overwrite hub-managed files.");
    process.exit(1);
  }

  for (const relativeDirPath of directoryPathsToCreate) {
    ensureDirectory(path.join(targetRepo, relativeDirPath), options.dryRun);
  }

  for (const relativeSourcePath of sourcePaths) {
    const absoluteSourcePath = path.join(hubRoot, relativeSourcePath);
    const absoluteTargetPath = path.join(targetRepo, relativeSourcePath);

    if (options.dryRun) {
      console.log(`[dry-run] copy ${absoluteSourcePath} -> ${absoluteTargetPath}`);
      continue;
    }

    cpSync(absoluteSourcePath, absoluteTargetPath, {
      recursive: true,
      force: true,
    });
  }

  if (!options.skipGitignore) {
    appendGitignoreRule(targetRepo, options.dryRun);
  }

  console.log(options.dryRun ? "Dry run complete." : "QA Agent Hub installed successfully.");
}

main();