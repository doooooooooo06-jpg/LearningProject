"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

const categories = [
  ["🍋", "Fruits &", "Vegetables"], ["🥖", "Breads &", "Sweets"], ["🦀", "Frozen", "Seafoods"],
  ["🥪", "Fine foods", ""], ["🍾", "Wine &", "Alcohol Drinks"], ["🫘", "Coffee and", "Tea"],
  ["🥛", "Milk and", "Dairies"], ["🧺", "Pet Foods", ""],
];

const products = [
  { id: "peas-green-organic", name: "Brand Name", title: "Organic Green Peas", emoji: "🫛", price: "$2.49", old: "$3.20", color: "mint" },
  { id: "beans-kidney-red", name: "Forest", title: "Fresh Red Kidney Beans", emoji: "🫘", price: "$3.60", old: "$4.10", color: "rose" },
  { id: "cheese-organic-natural", name: "Worthwhy", title: "Natural Organic Cheese", emoji: "🧀", price: "$4.20", old: "$5.00", color: "cream" },
  { id: "soup-tomato-organic", name: "Farmart Kitchen", title: "Organic Tomato Soup", emoji: "🥣", price: "$3.49", old: "$4.20", color: "red" },
  { id: "juice-orange-fresh", name: "Brand Name", title: "Fresh Orange Juice", emoji: "🍊", price: "$3.10", old: "$3.90", color: "orange" },
  { id: "cereal-whole-grain", name: "Forest", title: "Whole Grain Cereal", emoji: "🥣", price: "$5.20", old: "$6.00", color: "blue" },
];

type StoreCardProduct = (typeof products)[number];
type ApiProduct = { id: string; name: string; brand: string; price: { amount: string }; compareAtPrice?: { amount: string }; icon: string; surface: string; rating: number; reviewCount: number };
type StorefrontResponse = { hero: { eyebrow: string; title: string; imageUrl: string; href: string; ctaLabel: string }; categories: { id: string; name: string; icon: string }[] };

function toStoreCard(product: ApiProduct): StoreCardProduct {
  return { id: product.id, name: product.brand, title: product.name, emoji: product.icon, price: `$${product.price.amount}`, old: product.compareAtPrice ? `$${product.compareAtPrice.amount}` : "", color: product.surface };
}

function ProductCard({ product }: { product: StoreCardProduct }) {
  const price = Number(product.price.replace("$", ""));
  const compareAtPrice = Number(product.old.replace("$", ""));
  const discountPercent = Number.isFinite(price) && Number.isFinite(compareAtPrice) && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 1000) / 10
    : null;
  return <article className="product-card">
    <div className={`product-art ${product.color}`}>{discountPercent !== null && <span className="sale-tag">-{discountPercent}%</span>}<span className="food">{product.emoji}</span><span className="pack-label">{product.name}</span></div>
    <p className="brand">{product.name}</p><h3><a href={`/product?productId=${encodeURIComponent(product.id)}`}>{product.title}</a></h3><div className="stars">★★★★★ <span>(12)</span></div>
    <div className="price"><strong>{product.price}</strong><del>{product.old}</del></div>
    <div className="stock"><span /></div><div className="card-bottom"><span>−　1　+</span><button>Add to Cart</button></div>
  </article>;
}

function ProductSection({ title, tabs = "All　　Fruits & Vegetables　　Fresh Foods　　New Arrivals", items = products }: { title: string; tabs?: string; items?: StoreCardProduct[] }) {
  return <section className="product-section"><div className="section-heading"><div><h2>{title}</h2><span className="tabs">{tabs}</span></div><div className="arrows">‹　›</div></div><div className="product-grid">{items.map((product) => <ProductCard key={`${title}-${product.id}`} product={product} />)}</div></section>;
}

export default function Home() {
  const [categoryItems, setCategoryItems] = useState(categories.map(([icon, a, b]) => ({ icon, name: `${a} ${b}`.trim() })));
  const [hero, setHero] = useState({ eyebrow: "FRESH FROM THE FARM", title: "Active Summer With Juicy Milk 300ml", href: "/collections/summer", ctaLabel: "Shop Now" });
  const [dealProducts, setDealProducts] = useState<StoreCardProduct[] | null>(null);
  const [bestProducts, setBestProducts] = useState<StoreCardProduct[]>(products);
  const [landingProducts, setLandingProducts] = useState<StoreCardProduct[]>(products);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<StoreCardProduct[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const loadStorefront = async () => {
      try {
        const response = await fetch("/api/v1/storefront", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json() as StorefrontResponse;
        if (active) {
          setCategoryItems(data.categories.map((category) => ({ icon: category.icon, name: category.name })));
          setHero(data.hero);
        }
      } catch { /* Keep the storefront fallback when the API is temporarily unavailable. */ }
    };
    const loadCollection = async (collection: string, setItems: (items: StoreCardProduct[]) => void) => {
      try {
        const response = await fetch(`/api/v1/products?collection=${collection}&limit=6`, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json() as { items: ApiProduct[] };
        if (active && data.items.length) setItems(data.items.map(toStoreCard));
      } catch { /* Keep the seeded visual fallback while the data API starts up. */ }
    };
    void loadStorefront();
    void loadCollection("best-seller", setBestProducts);
    void loadCollection("just-landing", setLandingProducts);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const loadDeals = async () => {
      try {
        const response = await fetch("/api/v1/products?onSale=true&sort=discount-desc&limit=6", { cache: "no-store" });
        if (!response.ok) throw new Error("Could not load deals.");
        const data = await response.json() as { items: ApiProduct[] };
        if (active) setDealProducts(data.items.map(toStoreCard));
      } catch {
        if (active) setDealProducts([]);
      }
    };
    void loadDeals();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const query = search.trim();
    if (!query) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/v1/products?q=${encodeURIComponent(query)}&limit=5`, { signal: controller.signal, cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json() as { items: ApiProduct[] };
        setSearchResults(data.items.map(toStoreCard));
      } catch { /* An aborted or unavailable search should not interrupt browsing. */ }
    }, 220);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [search]);

  return <main>
    <div className="topline"><div className="shell top-inner"><Link className="logo" href="/"><span>🛒</span><b>Farmart</b><small>ORGANIC MARKET</small></Link><div className="search"><span>All Categories　⌄</span><input placeholder="Search for products..." value={search} onChange={(event) => { setSearch(event.target.value); setSearchResults([]); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} onKeyDown={(event) => { if (event.key === "Escape") setSearchOpen(false); if (event.key === "Enter" && searchResults[0]) window.location.href = `/product?productId=${encodeURIComponent(searchResults[0].id)}`; }} aria-label="Search products" aria-expanded={searchOpen && Boolean(search)} aria-controls="product-search-results"/><b>⌕</b>{searchOpen && search.trim() && <div className="search-results" id="product-search-results" role="listbox"><div className="search-results-heading">SEARCH RESULTS <span>{searchResults.length}</span></div>{searchResults.length ? searchResults.map((item) => <a href={`/product?productId=${encodeURIComponent(item.id)}`} className="search-result" key={item.id} role="option"><span className={`search-result-art ${item.color}`}>{item.emoji}</span><span><b>{item.title}</b><small>{item.name}</small></span><strong>{item.price}</strong></a>) : <p className="search-no-results">No matching products found.</p>}<a href={`/api/v1/products?q=${encodeURIComponent(search.trim())}`} className="search-view-all">View API results ↗</a></div>}</div><strong className="phone">☎　8 800 332 65-66</strong><div className="top-icons">♙　♡　🛒</div></div></div>
    <nav className="nav"><div className="shell nav-inner"><button className="category-button">☰　 SHOP BY CATEGORY</button><div className="nav-links"><Link href="/deals">Deals Today</Link><a>Special Price</a><a>Food　⌄</a><a>Beauty　⌄</a><a>Home　⌄</a><a>Shop　⌄</a><a>Blog　⌄</a><a>Pages　⌄</a><a>More　⌄</a></div><span className="recent">◷　 Recently Viewed</span></div></nav>
    <div className="hero-wrap"><div className="shell hero"><div className="hero-main"><div className="hero-copy"><span className="eyebrow">{hero.eyebrow}</span><h1>{hero.title}</h1><p>Fresh, delicious and naturally good.<br/>Your everyday essentials, delivered.</p><button>{hero.ctaLabel}　→</button></div><div className="hero-produce">🥛</div><span className="hero-leaf">🍃</span></div><div className="hero-sale"><span>LIMITED TIME OFFER</span><h2>20% SALE OFF</h2><p>Synthetic sweets<br/>Net 2.8 OZ</p><div className="sale-food">🥫</div><button>Shop Now　→</button></div></div></div>
    <div className="shell"><section className="category-section"><div className="section-heading"><h2>Browse by Category <small>All Categories　→</small></h2><div className="arrows">‹　›</div></div><div className="category-grid">{categoryItems.map((category) => <a className="category-tile" key={category.name}><span>{category.icon}</span><b>{category.name}</b></a>)}</div></section>
      <section className="brand-section"><div className="section-heading"><h2>Featured Brands <small>All Brands　→</small></h2><div className="arrows">‹　›</div></div><div className="brand-grid"><div className="brand-card purple"><span>🥔</span><b>ORGANIC SNACKS</b></div><div className="brand-card green"><span>🍵</span><b>PURE TEA</b></div><div className="brand-card sky"><span>🥤</span><b>GOOD DRINKS</b></div><div className="brand-card blush"><span>🥓</span><b>FARM FRESH</b></div></div></section>
      <div className={dealProducts?.length ? "deal-layout" : "deal-layout deal-layout-empty"}><div>{dealProducts && dealProducts.length > 0 ? <><ProductSection title="Deals Today" tabs="On sale now" items={dealProducts} /><Link className="deals-view-all" href="/deals">View all deals →</Link></> : null}</div><aside className="newsletter"><span className="newsletter-icon">✦</span><h2>15% OFF</h2><p>For new member sign up<br/>the first time!</p><input placeholder="✉  yourname@email.com"/><input placeholder="♙  Create password"/><button>Register Now</button><small>By joining, you agree to our terms.</small></aside></div>
    </div><div className="soft-band"><div className="shell"><ProductSection title="Best Seller" tabs="All　　Fruits & Vegetables　　Frozen Seafood　　New Meals　　Coffee & Tea　　Pet Foods" items={bestProducts} /></div></div>
    <div className="shell"><ProductSection title="Just Landing" tabs="All　　Fruits & Vegetables　　Frozen Seafood　　New Meals　　Coffee & Tea　　Pet Foods" items={landingProducts} /></div>
    <footer><div className="shell">🛒 <b>Farmart</b><span>Fresh groceries, delivered with care.</span></div></footer>
  </main>;
}
