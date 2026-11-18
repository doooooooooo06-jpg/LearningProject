import Link from "next/link";
import DialogDemo from "./dialog-demo";

const colors = [
  { name: "Primary", token: "primary", hex: "#F8BC28", use: "Shopping actions" },
  { name: "Primary Strong", token: "primary-strong", hex: "#EAB438", use: "Warm emphasis" },
  { name: "Ink", token: "ink", hex: "#252525", use: "Headings & key text" },
  { name: "Body", token: "body", hex: "#444444", use: "Navigation & copy" },
  { name: "Muted", token: "muted", hex: "#858585", use: "Metadata & helper text" },
  { name: "Canvas", token: "canvas", hex: "#FFFFFF", use: "Page & card surfaces" },
  { name: "Soft Surface", token: "surface-soft", hex: "#F8F8F8", use: "Category tiles" },
  { name: "Warm Surface", token: "surface-warm", hex: "#FFF9EF", use: "Offer panel" },
  { name: "Hairline", token: "hairline", hex: "#EDEDED", use: "Borders & dividers" },
  { name: "Success", token: "success", hex: "#73A34B", use: "Price & stock" },
  { name: "Rating", token: "rating", hex: "#F3AE19", use: "Product stars" },
  { name: "Sale", token: "sale", hex: "#E67D51", use: "Discount badges" },
];

const typeStyles = [
  { role: "Display", token: "display", size: "29px", weight: "700", sample: "Fresh finds, every day." },
  { role: "Section heading", token: "heading-lg", size: "18px", weight: "700", sample: "Browse by Category" },
  { role: "Body", token: "body", size: "13px", weight: "400", sample: "Good food, thoughtfully picked and ready for your table." },
  { role: "Label", token: "label", size: "10px", weight: "500", sample: "ORGANIC • FARM FRESH" },
  { role: "Button", token: "button", size: "10px", weight: "700", sample: "Add to Cart" },
];

const spacing = [{ n: "4", w: 12 }, { n: "8", w: 24 }, { n: "12", w: 36 }, { n: "16", w: 48 }, { n: "24", w: 72 }, { n: "32", w: 96 }, { n: "34", w: 102 }];

export default function DesignSystemPage() {
  return <main className="ds-page">
    <aside className="ds-sidebar">
      <Link className="ds-brand" href="/"><span className="ds-brand-icon">🛒</span><span><b>Farmart</b><small>DESIGN SYSTEM</small></span></Link>
      <p className="ds-nav-label">FOUNDATIONS</p>
      <a href="#overview">Overview</a><a href="#colors">Color palette</a><a href="#type">Typography</a><a href="#spacing">Spacing & shape</a>
      <p className="ds-nav-label">LIBRARY</p>
      <a href="#components">Components</a><a href="#patterns">Market patterns</a><a href="#responsive">Responsive</a>
      <div className="ds-sidebar-note"><span>✳</span><b>Fresh by design</b><p>A practical visual language for a friendly neighborhood market.</p></div>
      <Link className="ds-back" href="/">← Back to storefront</Link>
    </aside>

    <div className="ds-content">
      <header className="ds-topbar"><span>Farmart / <b>Design system</b></span><Link href="/">View storefront ↗</Link></header>
      <section className="ds-hero" id="overview">
        <div><span className="ds-kicker"><i /> DESIGN LANGUAGE · 2026</span><h1>Good things<br/>grow <em>together.</em></h1><p>A visual toolkit for a well-organized market. Warm, clear, and built to make every fresh find easy to shop.</p><div className="ds-hero-actions"><a href="#components" className="ds-btn ds-btn-primary">Explore components <span>↓</span></a><Link href="/" className="ds-text-link">Visit the shop　↗</Link></div></div>
        <div className="ds-hero-art"><div className="ds-orbit orbit-one"/><div className="ds-orbit orbit-two"/><span className="ds-fruit fruit-1">🍋</span><span className="ds-fruit fruit-2">🍐</span><span className="ds-fruit fruit-3">🍊</span><span className="ds-fruit fruit-4">🥬</span><span className="ds-sticker">FRESH<br/>DAILY</span></div>
        <div className="ds-hero-foot"><span>01 / BRAND PRINCIPLE</span><span>Friendly · Fresh · Straightforward</span></div>
      </section>

      <section className="ds-section" id="colors"><div className="ds-section-head"><div><span className="ds-index">01 — FOUNDATIONS</span><h2>Color palette</h2><p>Market warmth meets a clean, easy-to-scan canvas.</p></div><span className="ds-count">12 TOKENS</span></div><div className="ds-color-grid">{colors.map((c) => <article className="ds-color" key={c.token}><div className="ds-swatch" style={{ background: c.hex, borderColor: c.hex === "#FFFFFF" ? "#EDEDED" : c.hex }}><span>{c.hex}</span></div><div className="ds-color-meta"><b>{c.name}</b><code>colors.{c.token}</code><small>{c.use}</small></div></article>)}</div></section>

      <section className="ds-section ds-type-section" id="type"><div className="ds-section-head"><div><span className="ds-index">02 — FOUNDATIONS</span><h2>Type that feels familiar</h2><p>Arial keeps the experience direct; scale and weight do the organizing.</p></div><span className="ds-count">5 STYLES</span></div><div className="ds-type-list">{typeStyles.map((t) => <div className="ds-type-row" key={t.token}><div className="ds-type-info"><b>{t.role}</b><code>typography.{t.token}</code></div><div className={`ds-type-sample ds-type-${t.token}`}>{t.sample}</div><div className="ds-type-spec">{t.size}<br/><span>{t.weight} / Arial</span></div></div>)}</div></section>

      <section className="ds-section" id="spacing"><div className="ds-section-head"><div><span className="ds-index">03 — FOUNDATIONS</span><h2>Space to scan</h2><p>A compact spacing scale leaves room for products without crowding the page.</p></div><span className="ds-count">4–34 PX</span></div><div className="ds-spacing-card"><div className="ds-spacing-bars">{spacing.map((s) => <div className="ds-space-item" key={s.n}><div className="ds-space-bar" style={{ width: s.w }} /><span>{s.n}px</span></div>)}</div><div className="ds-radius-demo"><div><span className="radius-sm"/><code>sm · 2px</code></div><div><span className="radius-md"/><code>md · 3px</code></div><div><span className="radius-lg"/><code>lg · 4px</code></div><div><span className="radius-pill"/><code>pill</code></div></div></div></section>

      <section className="ds-section" id="components"><div className="ds-section-head"><div><span className="ds-index">04 — COMPONENTS</span><h2>Market essentials</h2><p>Small, useful building blocks that move shoppers from browsing to basket.</p></div><span className="ds-count">CORE LIBRARY</span></div>
        <div className="ds-component-grid">
          <article className="ds-component-card ds-button-showcase"><div className="ds-component-title"><b>Buttons</b><code>button-primary · button-light</code></div><div className="ds-button-row"><button className="ds-btn ds-btn-primary">Add to Cart　＋</button><button className="ds-btn ds-btn-light">Shop Now　→</button><button className="ds-icon-button">♡</button></div><div className="ds-component-caption">Clear actions. Warm yellow for the next step.</div></article>
          <article className="ds-component-card"><div className="ds-component-title"><b>Search</b><code>search-field</code></div><div className="ds-search-demo"><span>All Categories　⌄</span><span>Search fresh groceries...</span><b>⌕</b></div><div className="ds-component-caption">One field, one obvious way to find it.</div></article>
          <article className="ds-component-card ds-category-showcase"><div className="ds-component-title"><b>Category tile</b><code>category-tile</code></div><div className="ds-category-demo"><span>🍋</span><b>Fruits &<br/>Vegetables</b></div><div className="ds-component-caption">A friendly illustration makes browsing feel effortless.</div></article>
          <article className="ds-component-card ds-product-showcase"><div className="ds-component-title"><b>Product card</b><code>product-card</code></div><div className="ds-product-demo"><div className="ds-product-img">🥫<span>-20%</span></div><div className="ds-prod-details"><small>FARM FRESH</small><b>Organic tomato soup</b><span className="ds-stars">★★★★★ <i>(12)</i></span><strong>$3.49 <del>$4.20</del></strong><div className="ds-stock"><i/></div><button className="ds-btn ds-btn-primary">Add to Cart</button></div></div></article>
          <article className="ds-component-card ds-newsletter-showcase"><div className="ds-component-title"><b>Offer panel</b><code>newsletter-panel</code></div><div className="ds-newsletter-demo"><small>MEMBER PERK</small><h3>15% OFF</h3><p>On your first basket.</p><div>✉　Your email address</div><button className="ds-btn ds-btn-primary">Join & save</button></div></article>
          <article className="ds-component-card ds-dialog-showcase"><div className="ds-component-title"><b>Dialog</b><code>dialog</code></div><div className="ds-dialog-mini"><span>✦</span><b>A focused moment</b><small>For a quick offer or important choice.</small><div><i/><i/></div></div><DialogDemo /></article>
        </div>
      </section>

      <section className="ds-section ds-market-section" id="patterns"><div className="ds-section-head"><div><span className="ds-index">05 — IN CONTEXT</span><h2>Built for the market</h2><p>Tokens come together in the familiar rhythm of the Farmart storefront.</p></div><Link href="/" className="ds-text-link">Open storefront ↗</Link></div><div className="ds-market-preview"><div className="ds-market-nav"><b>🛒 Farmart</b><span>Deals Today　　Fresh Foods　　Pantry　　More</span><span>♙　♡　🛒</span></div><div className="ds-market-banner"><div><small>FRESH FROM THE FARM</small><h3>Active Summer<br/>With Juicy Milk</h3><button className="ds-btn ds-btn-light">Shop Now　→</button></div><span>🥛</span></div><div className="ds-market-categories">{["🍋", "🥖", "🦀", "🥪", "🍾", "🫘", "🥛", "🧺"].map((e, i) => <div key={i}><span>{e}</span><small>{["Fruits", "Bakery", "Seafood", "Deli", "Drinks", "Coffee", "Dairy", "Pet food"][i]}</small></div>)}</div><div className="ds-market-products">{["🫛", "🫘", "🧀", "🍅", "🍊", "🥣"].map((e, i) => <div key={i}><span>{e}</span><small>Farm fresh</small><b>{["Green peas", "Kidney beans", "Natural cheese", "Tomato ketchup", "Orange juice", "Grain cereal"][i]}</b><strong>$2.{49 + i * 11}</strong></div>)}</div></div></section>

      <section className="ds-section ds-responsive" id="responsive"><div className="ds-section-head"><div><span className="ds-index">06 — ADAPTIVE DESIGN</span><h2>Room to grow</h2><p>The layout shifts from a six-column desktop market to a focused mobile shop.</p></div></div><div className="ds-breakpoints"><div><span>01</span><b>Mobile</b><small>≤ 760px</small><p>Stacked hero, 4-up categories, 3-up product cards.</p></div><div><span>02</span><b>Compact</b><small>≤ 380px</small><p>Tighter gutters; keep key shopping actions visible.</p></div><div><span>03</span><b>Desktop</b><small>&gt; 1050px</small><p>Split hero, 8 categories, 6 products per row.</p></div></div></section>
      <footer className="ds-footer"><b>🛒 Farmart</b><span>Fresh by design. Made for everyday shopping.</span><Link href="/">Back to the shop ↑</Link></footer>
    </div>
  </main>;
}
