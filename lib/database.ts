import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

type Row = Record<string, string | number | null>;

const globalDatabase = globalThis as typeof globalThis & { farmartDatabase?: DatabaseSync };
const latestSchemaVersion = 1;

export type ProductVariant = { id: string; label: string; priceCents: number };
export type NutritionDetails = { servingSize: string; facts: { label: string; value: string }[] };

function migrateDatabase(database: DatabaseSync) {
  const { user_version: version } = database.prepare("PRAGMA user_version").get() as { user_version: number };
  if (version > latestSchemaVersion) throw new Error(`Database schema version ${version} is newer than this application supports.`);
  if (version === latestSchemaVersion) return;

  database.exec("BEGIN IMMEDIATE;");
  try {
    database.exec(`
      CREATE TABLE IF NOT EXISTS product_details (
        product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
        image_urls_json TEXT,
        ingredients TEXT,
        nutrition_facts_json TEXT,
        variants_json TEXT
      );
      PRAGMA user_version = ${latestSchemaVersion};
      COMMIT;
    `);
  } catch (error) {
    database.exec("ROLLBACK;");
    throw error;
  }
}

function openDatabase() {
  if (globalDatabase.farmartDatabase) return globalDatabase.farmartDatabase;

  const configuredPath = process.env.FARMART_DB_PATH;
  const databasePath = configuredPath ?? join(process.cwd(), "data", "farmart.sqlite");
  const dataDirectory = dirname(databasePath);
  mkdirSync(dataDirectory, { recursive: true });
  const database = new DatabaseSync(databasePath);
  database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;");
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL REFERENCES categories(id),
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      description TEXT NOT NULL,
      price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
      compare_at_cents INTEGER CHECK (compare_at_cents IS NULL OR compare_at_cents >= price_cents),
      rating REAL NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
      review_count INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
      availability TEXT NOT NULL DEFAULT 'in_stock' CHECK (availability IN ('in_stock', 'low_stock', 'out_of_stock')),
      icon TEXT NOT NULL,
      surface TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS collections (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS collection_products (
      collection_id TEXT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (collection_id, product_id)
    );
    CREATE TABLE IF NOT EXISTS storefront_hero (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      eyebrow TEXT NOT NULL,
      title TEXT NOT NULL,
      image_url TEXT NOT NULL,
      href TEXT NOT NULL,
      cta_label TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS products_name_idx ON products(name COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS products_brand_idx ON products(brand COLLATE NOCASE);
  `);

  migrateDatabase(database);
  seedDatabase(database);
  globalDatabase.farmartDatabase = database;
  return database;
}

function seedDatabase(database: DatabaseSync) {
  const insertCategory = database.prepare("INSERT OR IGNORE INTO categories (id, name, icon, sort_order) VALUES (?, ?, ?, ?)");
  const categories = [
    ["fruits-vegetables", "Fruits & Vegetables", "🍋", 1],
    ["bakery", "Breads & Sweets", "🥖", 2],
    ["seafood", "Frozen Seafood", "🦀", 3],
    ["deli", "Fine Foods", "🥪", 4],
    ["drinks", "Wine & Drinks", "🍾", 5],
    ["coffee-tea", "Coffee & Tea", "🫘", 6],
    ["dairy", "Milk & Dairy", "🥛", 7],
    ["pet-food", "Pet Foods", "🧺", 8],
  ] as const;
  for (const category of categories) insertCategory.run(...category);

  const insertProduct = database.prepare(`
    INSERT OR IGNORE INTO products
      (id, category_id, name, brand, subtitle, description, price_cents, compare_at_cents, rating, review_count, availability, icon, surface)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const products = [
    ["peas-green-organic", "fruits-vegetables", "Organic Green Peas", "Farm Fresh", "Sweet, tender organic garden peas.", "Picked at peak freshness and quickly packed to keep their naturally sweet flavor.", 249, 320, 4.7, 18, "in_stock", "🫛", "mint"],
    ["beans-kidney-red", "deli", "Fresh Red Kidney Beans", "Forest", "Hearty beans, ready for your favorite recipes.", "A pantry staple with a rich texture, ideal for soups, salads, and slow-cooked meals.", 360, 410, 4.6, 12, "in_stock", "🫘", "rose"],
    ["cheese-organic-natural", "dairy", "Natural Organic Cheese", "Worthwhy", "Creamy cheese made with organic milk.", "A mild, smooth organic cheese for sandwiches, snacks, and sharing boards.", 420, 500, 4.8, 21, "in_stock", "🧀", "cream"],
    ["soup-tomato-organic", "deli", "Organic Tomato Soup", "Farmart Kitchen", "Sun-ripened tomatoes, slow simmered with garden herbs.", "Made in small batches with organic tomatoes picked at peak ripeness, extra virgin olive oil, sweet onion, and fresh basil.", 349, 420, 4.8, 24, "in_stock", "🥣", "red"],
    ["juice-orange-fresh", "drinks", "Fresh Orange Juice", "Farm Fresh", "Freshly squeezed and full of sunshine.", "Bright, refreshing orange juice made from ripe fruit and never from concentrate.", 310, 390, 4.5, 15, "in_stock", "🍊", "orange"],
    ["cereal-whole-grain", "deli", "Whole Grain Cereal", "Forest", "A crunchy start with whole grain goodness.", "A simple, satisfying whole grain cereal for a quick breakfast or snack.", 520, 600, 4.4, 9, "in_stock", "🥣", "blue"],
  ] as const;
  for (const product of products) insertProduct.run(...product);

  const insertCollection = database.prepare("INSERT OR IGNORE INTO collections (id, title, sort_order) VALUES (?, ?, ?)");
  for (const collection of [["top-saver", "Top Saver Today", 1], ["best-seller", "Best Seller", 2], ["just-landing", "Just Landing", 3]] as const) insertCollection.run(...collection);

  const insertCollectionProduct = database.prepare("INSERT OR IGNORE INTO collection_products (collection_id, product_id, position) VALUES (?, ?, ?)");
  const collectionProducts = [
    ["top-saver", "peas-green-organic", 1], ["top-saver", "beans-kidney-red", 2], ["top-saver", "cheese-organic-natural", 3], ["top-saver", "soup-tomato-organic", 4], ["top-saver", "juice-orange-fresh", 5], ["top-saver", "cereal-whole-grain", 6],
    ["best-seller", "soup-tomato-organic", 1], ["best-seller", "cheese-organic-natural", 2], ["best-seller", "peas-green-organic", 3], ["best-seller", "juice-orange-fresh", 4], ["best-seller", "beans-kidney-red", 5], ["best-seller", "cereal-whole-grain", 6],
    ["just-landing", "juice-orange-fresh", 1], ["just-landing", "cereal-whole-grain", 2], ["just-landing", "beans-kidney-red", 3], ["just-landing", "soup-tomato-organic", 4], ["just-landing", "peas-green-organic", 5], ["just-landing", "cheese-organic-natural", 6],
  ] as const;
  for (const item of collectionProducts) insertCollectionProduct.run(...item);

  database.prepare(`
    INSERT OR IGNORE INTO storefront_hero (id, eyebrow, title, image_url, href, cta_label)
    VALUES (1, 'FRESH FROM THE FARM', 'Active Summer With Juicy Milk 300ml', '/images/summer-milk.webp', '/collections/summer', 'Shop Now')
  `).run();

  database.prepare(`
    INSERT OR IGNORE INTO product_details (product_id, ingredients, nutrition_facts_json, variants_json)
    VALUES (?, ?, ?, ?)
  `).run(
    "soup-tomato-organic",
    "Organic tomatoes (72%), filtered water, organic onion, organic extra virgin olive oil, organic basil, sea salt, organic garlic, black pepper.",
    JSON.stringify({
      servingSize: "1 cup (240 ml) · About 1.5 servings per jar",
      facts: [
        { label: "Calories", value: "110" },
        { label: "Total fat", value: "4g" },
        { label: "Sodium", value: "380mg" },
        { label: "Total sugars", value: "11g" },
        { label: "Protein", value: "3g" },
      ],
    }),
    JSON.stringify([
      { id: "400-ml", label: "400 ml", priceCents: 349 },
      { id: "6-pack", label: "6 pack", priceCents: 1899 },
    ]),
  );
}

export type ProductRecord = {
  id: string;
  category_id: string;
  name: string;
  brand: string;
  subtitle: string;
  description: string;
  price_cents: number;
  compare_at_cents: number | null;
  rating: number;
  review_count: number;
  availability: string;
  icon: string;
  surface: string;
};

export type ProductDetailRecord = ProductRecord & {
  category_name: string;
  image_urls_json: string | null;
  ingredients: string | null;
  nutrition_facts_json: string | null;
  variants_json: string | null;
};

export type ProductDetail = Omit<ProductRecord, "category_id"> & {
  categoryId: string;
  categoryName: string;
  images: string[];
  ingredients: string | null;
  nutrition: NutritionDetails | null;
  variants: ProductVariant[] | null;
};

function parseImages(value: string | null): string[] {
  if (!value) return [];
  try {
    const images: unknown = JSON.parse(value);
    if (!Array.isArray(images)) return [];
    return images.filter((image): image is string =>
      typeof image === "string" && image.startsWith("/") && !image.startsWith("//") && !image.includes(".."),
    );
  } catch {
    return [];
  }
}

function parseVariants(value: string | null): ProductVariant[] | null {
  if (!value) return null;
  try {
    const variants: unknown = JSON.parse(value);
    if (!Array.isArray(variants)) return null;
    const validVariants = variants.filter((variant): variant is ProductVariant =>
      typeof variant === "object" && variant !== null &&
      typeof (variant as ProductVariant).id === "string" &&
      typeof (variant as ProductVariant).label === "string" &&
      Number.isSafeInteger((variant as ProductVariant).priceCents) && (variant as ProductVariant).priceCents >= 0,
    );
    return validVariants.length === variants.length && validVariants.length > 0 ? validVariants : null;
  } catch {
    return null;
  }
}

function parseNutrition(value: string | null): NutritionDetails | null {
  if (!value) return null;
  try {
    const nutrition: unknown = JSON.parse(value);
    if (typeof nutrition !== "object" || nutrition === null) return null;
    const details = nutrition as NutritionDetails;
    if (typeof details.servingSize !== "string" || !Array.isArray(details.facts) ||
      !details.facts.every((fact) => typeof fact.label === "string" && typeof fact.value === "string")) return null;
    return details;
  } catch {
    return null;
  }
}

export function toProduct(row: ProductRecord) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    subtitle: row.subtitle,
    price: { amount: (row.price_cents / 100).toFixed(2), currency: "USD" },
    compareAtPrice: row.compare_at_cents === null ? undefined : { amount: (row.compare_at_cents / 100).toFixed(2), currency: "USD" },
    rating: row.rating,
    reviewCount: row.review_count,
    availability: row.availability,
    images: [],
    badges: row.id === "soup-tomato-organic" ? ["Organic", "Best Seller"] : [],
    icon: row.icon,
    surface: row.surface,
  };
}

export function getDatabase() {
  return openDatabase();
}

export function closeDatabase() {
  const database = globalDatabase.farmartDatabase;
  if (!database) return;
  database.close();
  delete globalDatabase.farmartDatabase;
}

export function getProductById(id: string) {
  return openDatabase().prepare("SELECT * FROM products WHERE id = ?").get(id) as ProductRecord | undefined;
}

export function getProductDetailById(id: string): ProductDetail | undefined {
  const row = openDatabase().prepare(`
    SELECT p.*, c.name AS category_name, d.image_urls_json, d.ingredients, d.nutrition_facts_json, d.variants_json
    FROM products p
    JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_details d ON d.product_id = p.id
    WHERE p.id = ?
  `).get(id) as ProductDetailRecord | undefined;
  if (!row) return undefined;

  return {
    id: row.id,
    categoryId: row.category_id,
    categoryName: row.category_name,
    name: row.name,
    brand: row.brand,
    subtitle: row.subtitle,
    description: row.description,
    price_cents: row.price_cents,
    compare_at_cents: row.compare_at_cents,
    rating: row.rating,
    review_count: row.review_count,
    availability: row.availability,
    icon: row.icon,
    surface: row.surface,
    images: parseImages(row.image_urls_json),
    ingredients: row.ingredients?.trim() || null,
    nutrition: parseNutrition(row.nutrition_facts_json),
    variants: parseVariants(row.variants_json),
  };
}

export function getCategories() {
  const rows = openDatabase().prepare(`
    SELECT c.id, c.name, c.icon, COUNT(p.id) AS productCount
    FROM categories c LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id ORDER BY c.sort_order
  `).all() as unknown as Row[];
  return rows.map((row) => ({ id: row.id, name: row.name, icon: row.icon, productCount: row.productCount }));
}

export function getStorefront() {
  const database = openDatabase();
  const hero = database.prepare("SELECT eyebrow, title, image_url, href, cta_label FROM storefront_hero WHERE id = 1").get() as Row;
  const sections = database.prepare("SELECT id, title FROM collections ORDER BY sort_order").all() as unknown as Row[];
  const productIds = database.prepare("SELECT product_id FROM collection_products WHERE collection_id = ? ORDER BY position");
  return {
    hero: { eyebrow: hero.eyebrow, title: hero.title, imageUrl: hero.image_url, href: hero.href, ctaLabel: hero.cta_label },
    categories: getCategories(),
    sections: sections.map((section) => ({
      id: section.id,
      title: section.title,
      productIds: (productIds.all(section.id) as unknown as Row[]).map((item) => item.product_id),
    })),
  };
}

export type ProductSearch = {
  q?: string;
  categoryId?: string;
  collection?: string;
  onSale?: boolean;
  sort: "relevance" | "price-asc" | "price-desc" | "rating" | "newest" | "discount-desc";
  page: number;
  limit: number;
};

export function searchProducts(options: ProductSearch) {
  const database = openDatabase();
  const conditions: string[] = [];
  const values: (string | number)[] = [];
  if (options.q) {
    conditions.push("(instr(lower(p.name), lower(?)) > 0 OR instr(lower(p.brand), lower(?)) > 0 OR instr(lower(p.subtitle), lower(?)) > 0 OR instr(lower(p.description), lower(?)) > 0)");
    const term = options.q;
    values.push(term, term, term, term);
  }
  if (options.categoryId) {
    conditions.push("p.category_id = ?");
    values.push(options.categoryId);
  }
  if (options.collection) {
    conditions.push("EXISTS (SELECT 1 FROM collection_products cp WHERE cp.product_id = p.id AND cp.collection_id = ?)");
    values.push(options.collection);
  }
  if (options.onSale) conditions.push("p.compare_at_cents > p.price_cents");

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sort = {
    relevance: "p.rating DESC, p.review_count DESC, p.name COLLATE NOCASE ASC",
    "price-asc": "p.price_cents ASC",
    "price-desc": "p.price_cents DESC",
    rating: "p.rating DESC, p.review_count DESC",
    newest: "p.created_at DESC, p.name COLLATE NOCASE ASC",
    "discount-desc": "CASE WHEN p.compare_at_cents > p.price_cents THEN 1.0 * (p.compare_at_cents - p.price_cents) / p.compare_at_cents ELSE 0 END DESC, p.price_cents ASC",
  }[options.sort];
  const totalRow = database.prepare(`SELECT COUNT(*) AS total FROM products p ${where}`).get(...values) as { total: number };
  const rows = database.prepare(`SELECT p.* FROM products p ${where} ORDER BY ${sort} LIMIT ? OFFSET ?`).all(...values, options.limit, (options.page - 1) * options.limit) as unknown as ProductRecord[];
  return {
    items: rows.map(toProduct),
    page: options.page,
    limit: options.limit,
    total: totalRow.total,
    totalPages: Math.ceil(totalRow.total / options.limit),
  };
}

