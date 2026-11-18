import { NextRequest, NextResponse } from "next/server.js";
import { searchProducts, type ProductSearch } from "../../../../lib/database.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedSorts = new Set<ProductSearch["sort"]>(["relevance", "price-asc", "price-desc", "rating", "newest", "discount-desc"]);

function error(message: string, field?: string) {
  return NextResponse.json({ code: "BAD_REQUEST", message, details: field ? [{ field, issue: message }] : [] }, { status: 400 });
}

function positiveInteger(value: string | null, fallback: number, max: number) {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return parsed >= 1 && parsed <= max ? parsed : null;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const q = params.get("q")?.trim() || undefined;
  const categoryId = params.get("categoryId")?.trim() || undefined;
  const collection = params.get("collection")?.trim() || undefined;
  const onSaleParam = params.get("onSale");
  const onSale = onSaleParam === "true";
  const sort = params.get("sort") || "relevance";
  const page = positiveInteger(params.get("page"), 1, 10_000);
  const limit = positiveInteger(params.get("limit"), 24, 100);

  if (q && q.length > 120) return error("Search query must be 120 characters or fewer.", "q");
  if (page === null) return error("Page must be an integer between 1 and 10000.", "page");
  if (limit === null) return error("Limit must be an integer between 1 and 100.", "limit");
  if (onSaleParam !== null && onSaleParam !== "true" && onSaleParam !== "false") return error("onSale must be true or false.", "onSale");
  if (!allowedSorts.has(sort as ProductSearch["sort"])) return error("Sort must be relevance, price-asc, price-desc, rating, newest, or discount-desc.", "sort");
  if (collection && !["top-saver", "best-seller", "just-landing"].includes(collection)) return error("Unknown collection.", "collection");

  const results = searchProducts({ q, categoryId, collection, onSale, sort: sort as ProductSearch["sort"], page, limit });
  return NextResponse.json(results, { headers: { "Cache-Control": "no-store" } });
}
