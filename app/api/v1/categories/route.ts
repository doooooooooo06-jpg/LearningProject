import { NextResponse } from "next/server.js";
import { getCategories } from "../../../../lib/database.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getCategories());
}
