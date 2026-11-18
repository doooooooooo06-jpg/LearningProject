import { expect, test } from "@playwright/test";

test("searching from the storefront opens the matching product and basket preview", async ({ page }) => {
  await page.goto("/");

  const search = page.getByRole("textbox", { name: "Search products" });
  await search.pressSequentially("Organic Tomato Soup");
  await expect(search).toHaveValue("Organic Tomato Soup");
  await expect(page.locator("#product-search-results")).toBeVisible();
  const result = page.getByRole("option", { name: /Organic Tomato Soup/ });
  await expect(result).toBeVisible();
  await result.click();

  await expect(page).toHaveURL(/\/product\?productId=soup-tomato-organic$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Organic Tomato Soup");

  await page.getByRole("button", { name: /Add to Cart/ }).click();
  await expect(page.getByRole("dialog")).toContainText("Basket isn't connected yet");
});

test("deals list discounted products and links to their product details", async ({ page }) => {
  await page.goto("/deals");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Deals Today");
  const cards = page.locator(".detail-product-card");
  await expect(cards.first()).toBeVisible();
  await expect(cards.first().locator("del")).toBeVisible();

  await cards.first().getByRole("link").click();
  await expect(page).toHaveURL(/\/product\?productId=/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("product route without an id redirects to the default seeded product", async ({ page }) => {
  await page.goto("/product");

  await expect(page).toHaveURL(/\/product\?productId=soup-tomato-organic$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Organic Tomato Soup");

  await page.getByRole("tab", { name: /Reviews/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Customer reviews");
});
