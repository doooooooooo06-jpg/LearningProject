---
name: project-seed-onboarding
description: Prepare or update deterministic development seed data so a project can be started with realistic, relational sample records. Use when bootstrapping or replenishing local development data; keep production data loads out of scope.
metadata:
  short-description: Bootstrap development seed data
---

# Project Seed Onboarding

Use this skill when a project needs useful sample records before frontend or API development can begin. First inspect its database setup, schema, startup scripts, and any existing seed data. Reuse the current data model and workflow instead of adding a second source of truth.

If the requested catalog change also needs API or storefront integration, use [catalog-feature-onboarding](../catalog-feature-onboarding/SKILL.md) for the end-to-end workflow and this skill for seed-data details.

## Workflow

1. Identify the database engine, schema/migrations, seed entry point, and documented local start command. Read existing records or seed definitions to understand what the UI needs.
2. Select the smallest representative dataset that exercises the primary development flows. Preserve foreign-key order and include the records needed by existing pages, APIs, and empty/error states where appropriate.
3. Make seed operations deterministic and repeatable. Use stable IDs, valid references, and idempotent inserts or explicit seed migrations. Do not reset a developer database or touch production data without a separate, explicit request.
4. Document the seed trigger or command, database location, and how to isolate test data. For SQLite projects, prefer a temporary `FARMART_DB_PATH` in tests when the project supports it.
5. Verify the seed path with the project's tests and build/start workflow. Confirm at least one API or query returns the expected records and that running the seed twice does not duplicate them.

## Farmart Reference

For this repository, use [references/farmart-seed-reference.md](references/farmart-seed-reference.md) as the current data snapshot. `lib/database.ts` remains the source of truth for schema and seed values. SQLite is created at `data/farmart.sqlite` and initialized on first database access. Tests should use an isolated temporary `FARMART_DB_PATH` and must not reuse the local database file.

The current seed uses `INSERT OR IGNORE`: it is safe to run repeatedly, but edits to existing seed rows do not overwrite those rows in an already-seeded database. If seed values or relationships change, add an intentional migration/update path or reset only an explicitly chosen disposable development database.
