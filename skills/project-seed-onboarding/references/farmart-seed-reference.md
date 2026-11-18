# Farmart SQLite Seed Reference

Use this file as a concise snapshot for development onboarding. Confirm changes against `lib/database.ts`; update this reference whenever the schema or initial records change.

## Database and Initialization

- Engine: SQLite through Node.js `node:sqlite` (`DatabaseSync`), Node.js 22.13 or newer.
- Default file: `data/farmart.sqlite` (ignored by Git).
- Override: set `FARMART_DB_PATH` to choose another file. Tests use a temporary database file.
- Initialization: the first database-backed request creates tables, indexes, and seed rows. There is no separate seed command today.
- Safety: foreign keys are enabled and journal mode is WAL. The data file is local development state; do not use it as a production seed target.

## Tables and Relationships

| Table | Important columns | Purpose |
|---|---|---|
| `categories` | `id` PK, `name`, `icon`, `sort_order` | Product navigation categories. |
| `products` | `id` PK, `category_id` FK, `name`, `brand`, `subtitle`, `description`, `price_cents`, nullable `compare_at_cents`, `rating`, `review_count`, `availability`, `icon`, `surface`, `created_at` | Searchable catalog and product display data. Prices are integer cents. |
| `collections` | `id` PK, `title`, `sort_order` | Homepage product groups. |
| `collection_products` | composite PK (`collection_id`, `product_id`); both are FKs; `position` | Ordered many-to-many membership between collections and products. |
| `storefront_hero` | `id` PK constrained to `1`, `eyebrow`, `title`, `image_url`, `href`, `cta_label` | Singleton homepage hero content. |

Relationships: one category has zero or more products; each product belongs to one category. Collections and products are many-to-many through `collection_products`. The hero row is independent.

Indexes: `products_name_idx` and `products_brand_idx` use case-insensitive collation.

## Initial Catalog Snapshot

The current seed source defines eight categories in display order:

1. `fruits-vegetables` — Fruits & Vegetables
2. `bakery` — Breads & Sweets
3. `seafood` — Frozen Seafood
4. `deli` — Fine Foods
5. `drinks` — Wine & Drinks
6. `coffee-tea` — Coffee & Tea
7. `dairy` — Milk & Dairy
8. `pet-food` — Pet Foods

Six products provide the current homepage and search examples:

| Product ID | Category | Name | Brand | Price | Compare at | Rating / Reviews |
|---|---|---|---|---:|---:|---:|
| `peas-green-organic` | fruits-vegetables | Organic Green Peas | Farm Fresh | $2.49 | $3.20 | 4.7 / 18 |
| `beans-kidney-red` | deli | Fresh Red Kidney Beans | Forest | $3.60 | $4.10 | 4.6 / 12 |
| `cheese-organic-natural` | dairy | Natural Organic Cheese | Worthwhy | $4.20 | $5.00 | 4.8 / 21 |
| `soup-tomato-organic` | deli | Organic Tomato Soup | Farmart Kitchen | $3.49 | $4.20 | 4.8 / 24 |
| `juice-orange-fresh` | drinks | Fresh Orange Juice | Farm Fresh | $3.10 | $3.90 | 4.5 / 15 |
| `cereal-whole-grain` | deli | Whole Grain Cereal | Forest | $5.20 | $6.00 | 4.4 / 9 |

All six are available in stock. The soup is the example product linked from the home page. Search matches product name, brand, and subtitle.

### Existing Local Database Note

The checked-in `data/farmart.sqlite` was initialized by an earlier seed revision and currently has a legacy ninth category, `pantry` (`Soups & Pantry`). Its beans, soup, and cereal records still reference `pantry`. The current `lib/database.ts` seed source assigns those products to `deli` and no longer defines `pantry`, but its `INSERT OR IGNORE` statements do not reconcile existing rows. New disposable databases follow the eight-category seed source; existing local databases retain the legacy category until an explicit migration or reset is chosen.

## Homepage Collections

- `top-saver` — Top Saver Today: peas, beans, cheese, soup, juice, cereal.
- `best-seller` — Best Seller: soup, cheese, peas, juice, beans, cereal.
- `just-landing` — Just Landing: juice, cereal, beans, soup, peas, cheese.

Each collection uses `position` to preserve its homepage order.

## Homepage Hero

One row (`id = 1`) is seeded with:

- Eyebrow: `FRESH FROM THE FARM`
- Title: `Active Summer With Juicy Milk 300ml`
- Image path: `/images/summer-milk.webp`
- Link: `/collections/summer`
- CTA: `Shop Now`
