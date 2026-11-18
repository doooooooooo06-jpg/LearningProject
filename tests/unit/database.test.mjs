import assert from "node:assert/strict";
import test from "node:test";
import { database } from "../helpers/database-fixture.mjs";

const search = (overrides = {}) => database.searchProducts({ sort: "relevance", page: 1, limit: 24, ...overrides });

test("seeds the eight storefront categories and their product counts", () => {
  const categories = database.getCategories();
  assert.equal(categories.length, 8);
  assert.equal(categories.find((category) => category.id === "deli").productCount, 3);
  assert.equal(categories.find((category) => category.id === "dairy").productCount, 1);
});

test("searches product names, brands, and subtitles case-insensitively", () => {
  assert.deepEqual(search({ q: "TOMATO" }).items.map((item) => item.id), ["soup-tomato-organic"]);
  assert.ok(search({ q: "farm fresh" }).items.some((item) => item.id === "peas-green-organic"));
  assert.ok(search({ q: "garden herbs" }).items.some((item) => item.id === "soup-tomato-organic"));
});

test("combines category and collection filters", () => {
  const result = search({ categoryId: "deli", collection: "best-seller" });
  assert.equal(result.total, 3);
  assert.ok(result.items.every((item) => ["beans-kidney-red", "soup-tomato-organic", "cereal-whole-grain"].includes(item.id)));
});

test("sorts by price and paginates consistently", () => {
  const firstPage = search({ sort: "price-asc", page: 1, limit: 2 });
  const secondPage = search({ sort: "price-asc", page: 2, limit: 2 });
  assert.deepEqual(firstPage.items.map((item) => item.id), ["peas-green-organic", "juice-orange-fresh"]);
  assert.equal(firstPage.total, 6);
  assert.equal(firstPage.totalPages, 3);
  assert.equal(secondPage.items.length, 2);
  assert.ok(firstPage.items[1].price.amount < secondPage.items[0].price.amount);
});

test("returns an empty page for a search with no matches", () => {
  const result = search({ q: "not-a-real-grocery-item" });
  assert.deepEqual(result.items, []);
  assert.equal(result.total, 0);
  assert.equal(result.totalPages, 0);
});

