import assert from "node:assert/strict";
import test from "node:test";
import "../helpers/database-fixture.mjs";

const { NextRequest } = await import("next/server.js");
const [{ GET: getStorefront }, { GET: getCategories }, { GET: getProducts }] = await Promise.all([
  import("../../app/api/v1/storefront/route.ts"),
  import("../../app/api/v1/categories/route.ts"),
  import("../../app/api/v1/products/route.ts"),
]);

test("storefront route returns hero, category, and collection data from SQLite", async () => {
  const response = await getStorefront();
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.hero.ctaLabel, "Shop Now");
  assert.equal(body.categories.length, 8);
  assert.deepEqual(body.sections.map((section) => section.id), ["top-saver", "best-seller", "just-landing"]);
  assert.ok(body.sections.every((section) => section.productIds.length > 0));
});

test("categories route returns the seeded database categories", async () => {
  const response = await getCategories();
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.find((category) => category.id === "fruits-vegetables").productCount, 1);
});

test("products route returns paginated search results matching the API contract", async () => {
  const request = new NextRequest("http://localhost/api/v1/products?q=tomato&sort=price-asc&limit=2");
  const response = await getProducts(request);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.total, 1);
  assert.equal(body.page, 1);
  assert.equal(body.items[0].id, "soup-tomato-organic");
  assert.deepEqual(body.items[0].price, { amount: "3.49", currency: "USD" });
});

test("products route rejects invalid pagination and unsupported collections", async () => {
  const tooMany = await getProducts(new NextRequest("http://localhost/api/v1/products?limit=101"));
  assert.equal(tooMany.status, 400);
  assert.equal((await tooMany.json()).details[0].field, "limit");

  const badCollection = await getProducts(new NextRequest("http://localhost/api/v1/products?collection=unknown"));
  assert.equal(badCollection.status, 400);
});

test("products route caps the query length before querying SQLite", async () => {
  const query = "x".repeat(121);
  const response = await getProducts(new NextRequest(`http://localhost/api/v1/products?q=${query}`));
  assert.equal(response.status, 400);
  assert.equal((await response.json()).details[0].field, "q");
});

