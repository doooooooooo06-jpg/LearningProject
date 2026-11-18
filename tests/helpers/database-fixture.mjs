import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after } from "node:test";

const databaseDirectory = mkdtempSync(join(tmpdir(), "farmart-tests-"));
process.env.FARMART_DB_PATH = join(databaseDirectory, "farmart-test.sqlite");

export const database = await import("../../lib/database.ts");

after(() => {
  database.closeDatabase();
  rmSync(databaseDirectory, { recursive: true, force: true });
});
