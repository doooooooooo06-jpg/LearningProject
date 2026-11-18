# Repository Instructions

## Project Map

Next.js routes are under `app/`; shared components are in `app/components/`, API handlers in `app/api/v1/`, and SQLite logic in `lib/database.ts`. Tests live in `tests/`. Static API and schema documents are in `public/`. `DESIGN.md` defines UI tokens and component rules.

## Commands

- `npm.cmd run dev` — start local development.
- `npm.cmd test` — run unit and API integration tests.
- `npm.cmd run build` — production build and type-check.
- `npm.cmd run lint` — ESLint.

Use Node.js 22.13 or newer. In PowerShell, use `npm.cmd` rather than `npm`.

## Essential Conventions

- Use TypeScript, two-space indentation, double quotes, and semicolons. Keep SQL parameterized and validate API inputs at route boundaries.
- Read `DESIGN.md` before changing shared visual styles. Update `public/openapi.json` when implemented API behavior changes.
- SQLite lives at `data/farmart.sqlite` and initializes on first database access. `FARMART_DB_PATH` can isolate tests/local experiments. Seeds use `INSERT OR IGNORE`, so existing rows are not refreshed automatically; never use development seed operations against production.
- Use the matching repo skill for multi-layer catalog changes (`skills/catalog-feature-onboarding/`), design-system UI (`skills/design-system-ui/`), or seed setup (`skills/project-seed-onboarding/`). Database tests must use the temporary fixture.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. When the answer is under a Markdown heading, `graphify section "<heading>"` prints that section's text, so the .md need not be opened. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
