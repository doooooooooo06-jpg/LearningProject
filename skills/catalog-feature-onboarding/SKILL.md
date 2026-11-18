---
name: catalog-feature-onboarding
description: Implement end-to-end Farmart catalog changes such as adding a product or category, updating search or homepage collections, and keeping SQLite, API, UI, OpenAPI docs, and tests in sync. Use for catalog work; not for unrelated account, checkout, or marketing features.
metadata:
  short-description: Ship catalog changes end to end
---

# Catalog Feature Onboarding

Use this skill when a catalog change crosses more than one layer of the Farmart app. For a seed-only task, follow [project-seed-onboarding](../project-seed-onboarding/SKILL.md) instead.

## Workflow

1. Read `AGENTS.md`, `DESIGN.md`, `public/openapi.json`, `lib/database.ts`, and the affected route, page, and tests. Confirm whether the target operation is implemented or only proposed in the OpenAPI contract.
2. Plan the smallest coherent change across data, API, UI, docs, and tests. Preserve the existing SQLite schema conventions: stable text IDs, integer cent prices, foreign-key order, collection positions, and allowlisted sort values.
3. Keep SQL parameterized. Validate path/query/body inputs at the route boundary, map database rows to the documented response shape, and keep empty and invalid-result behavior explicit.
4. Connect the affected storefront/search/product view to the route. Reuse shared components and follow `DESIGN.md`; avoid duplicating catalog-specific UI patterns.
5. Update `public/openapi.json` and `/docs` status when endpoint behavior changes. Keep unimplemented operations clearly marked as proposed; do not imply a documented route is live until a handler exists.
6. Add unit coverage for database query behavior and integration coverage for changed route handlers. Use the temporary `FARMART_DB_PATH` fixture, never the persistent local database.

## Verification

Run `npm.cmd test` and `npm.cmd run build`. Run focused lint on changed TypeScript files; the whole-project lint may report existing page-level anchor issues. For seed changes, account for `INSERT OR IGNORE`: it does not update rows in an already-initialized database. Use an explicit migration or disposable database reset only when appropriate; see the seed onboarding reference.

