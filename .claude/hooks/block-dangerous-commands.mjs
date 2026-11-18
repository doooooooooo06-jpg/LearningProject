import { readFileSync } from "node:fs";

let input;

try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const command = input?.tool_input?.command;

if (typeof command !== "string") {
  process.exit(0);
}

const dangerousPatterns = [
  {
    pattern: /(?:^|[;&|()]\s*)rm\s+(?:(?:-[a-z]*r[a-z]*f[a-z]*|-[a-z]*f[a-z]*r[a-z]*)\b|--(?:recursive|force)(?:\s|=|$))/i,
    reason: "Blocked: rm -rf is not allowed by the project PreToolUse hook.",
  },
  {
    pattern: /(?:^|[;&|()]\s*)git\s+push\b(?:(?![;&|]).)*(?:\s--force(?:-with-lease|-if-includes)?\b|\s-[a-z]*f[a-z]*\b)/i,
    reason: "Blocked: force git push is not allowed by the project PreToolUse hook.",
  },
];

const match = dangerousPatterns.find(({ pattern }) => pattern.test(command));

if (match) {
  process.stdout.write(
    `${JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: match.reason,
      },
    })}\n`,
  );
}
