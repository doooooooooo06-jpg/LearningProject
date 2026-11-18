"use client";

import { useState } from "react";
import { Button } from "../components/button";
import { Dialog } from "../components/dialog";
import { ProductCard } from "../components/product-card";
import { ProductGallery } from "../components/product-gallery";
import { QuantitySelector } from "../components/quantity-selector";

const relatedProducts = [
  { name: "Organic Green Peas", brand: "Farm Fresh", price: "$2.49", icon: "🫛", color: "mint" },
  { name: "Roasted Red Peppers", brand: "Casa Verde", price: "$3.20", icon: "🫑", color: "rose" },
  { name: "Fresh Basil Pesto", brand: "Green Table", price: "$4.10", icon: "🌿", color: "cream" },
  { name: "Country Lentil Soup", brand: "Farmart Kitchen", price: "$3.80", icon: "🥣", color: "orange" },
];

const tabs = ["Description", "Ingredients", "Nutrition", "Reviews (24)"];

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return <main className="detail-page">
    <header className="detail-header"><div className="detail-header-inner"><a className="detail-logo" href="/"><span>🛒</span><b>Farmart<small>ORGANIC MARKET</small></b></a><div className="detail-search"><span>All Categories　⌄</span><span>Search for products...</span><b>⌕</b></div><a className="detail-contact" href="/">☎　8 800 332 65-66</a><div className="detail-account">♙　♡　<span>🛒 <i>2</i></span></div></div></header>
    <nav className="detail-nav"><div className="detail-nav-inner"><a className="detail-shop-link" href="/">☰　 SHOP BY CATEGORY</a><a href="/">Deals Today</a><a href="/">Fresh Foods　⌄</a><a href="/">Pantry　⌄</a><a href="/">Drinks　⌄</a><a href="/">Home　⌄</a><a href="/">Recently Viewed</a></div></nav>
    <div className="detail-container">
      <div className="detail-breadcrumb"><a href="/">Home</a><span>›</span><a href="/">Pantry</a><span>›</span><a href="/">Soups & Broths</a><span>›</span><b>Organic Tomato Soup</b></div>
      <div className="product-detail-layout">
        <ProductGallery />
        <section className="product-info">
          <div className="detail-brand-row"><span>FARMART KITCHEN</span><span className="organic-label">✳ ORGANIC</span></div>
          <h1>Organic Tomato Soup</h1>
          <div className="detail-rating"><span>★★★★★</span><b>4.8</b><a href="#reviews">24 customer reviews</a><i>SKU: FM-20481</i></div>
          <p className="product-subtitle">Sun-ripened tomatoes, slow simmered with garden herbs for a rich, comforting bowl.</p>
          <div className="detail-price-row"><strong>$3.49</strong><del>$4.20</del><span className="detail-save">Save 17%</span><small>($0.44 / 100 ml)</small></div>
          <div className="detail-stock"><span className="stock-dot"/> In stock <i>·</i> Ready to ship</div>
          <div className="product-divider" />
          <div className="product-variant"><b>Size</b><button className="variant-active">400 ml <span>· $3.49</span></button><button>6 pack <span>· $18.99</span></button></div>
          <div className="product-order-row"><div><small>QUANTITY</small><QuantitySelector value={quantity} onChange={setQuantity} /></div><Button className="detail-add-button" onClick={() => setDialogOpen(true)}>Add to Cart　＋</Button><button type="button" className={`detail-wishlist ${saved ? "saved" : ""}`} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} onClick={() => setSaved(!saved)}>{saved ? "♥" : "♡"}</button></div>
          <div className="delivery-card"><span>🚚</span><div><b>Free delivery on orders over $50</b><small>Order within 4 hrs 18 mins for delivery by <strong>Thursday, Nov 19</strong></small></div><a href="/">Details</a></div>
          <div className="detail-perks"><span>♧　100% organic ingredients</span><span>↺　Easy 30-day returns</span><span>♻　Recyclable packaging</span></div>
        </section>
      </div>

      <section className="product-information">
        <div className="detail-tabs" role="tablist" aria-label="Product details">{tabs.map((tab) => <button key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div>
        {activeTab === "Description" && <div className="tab-content"><div><h2>A little sunshine in every spoonful.</h2><p>Made in small batches with organic tomatoes picked at peak ripeness, this silky soup brings the taste of a summer garden to your table. A slow simmer with extra virgin olive oil, sweet onion and fresh basil lets simple ingredients shine.</p><p>Enjoy it as a quick lunch, a cozy starter, or your favorite weeknight tomato pasta base.</p></div><div className="detail-facts"><div><span>Origin</span><b>Sonoma County, CA</b></div><div><span>Storage</span><b>Store in a cool, dry place</b></div><div><span>After opening</span><b>Refrigerate & use within 3 days</b></div><div><span>Net weight</span><b>400 ml (13.5 fl oz)</b></div></div></div>}
        {activeTab === "Ingredients" && <div className="tab-content simple-tab"><h2>Simple ingredients, naturally.</h2><p>Organic tomatoes (72%), filtered water, organic onion, organic extra virgin olive oil, organic basil, sea salt, organic garlic, black pepper.</p><span className="ingredient-chips"><b>Organic</b><b>Plant based</b><b>Gluten free</b></span></div>}
        {activeTab === "Nutrition" && <div className="tab-content simple-tab"><h2>Nutrition facts</h2><p>Serving size 1 cup (240 ml) · About 1.5 servings per jar</p><div className="nutrition-row"><span>Calories <b>110</b></span><span>Total fat <b>4g</b></span><span>Sodium <b>380mg</b></span><span>Total sugars <b>11g</b></span><span>Protein <b>3g</b></span></div></div>}
        {activeTab.startsWith("Reviews") && <div className="tab-content simple-tab" id="reviews"><h2>Customers love a good bowl.</h2><div className="review-summary"><strong>4.8</strong><span>★★★★★<small>Based on 24 verified reviews</small></span><Button variant="outline">Write a review</Button></div></div>}
      </section>

      <section className="related-section"><div className="related-heading"><div><span className="detail-eyebrow">GOOD WITH YOUR FAVORITES</span><h2>You might also like</h2></div><div className="related-arrows">‹　›</div></div><div className="related-grid">{relatedProducts.map((product) => <ProductCard key={product.name} product={product} />)}</div></section>
    </div>
    <footer className="detail-footer"><div><a className="detail-logo" href="/"><span>🛒</span><b>Farmart<small>ORGANIC MARKET</small></b></a><p>Good food, thoughtfully picked.</p></div><span>Fresh groceries, delivered with care.</span><a href="/design">Explore our design system ↗</a></footer>
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} eyebrow="ADDED TO YOUR BASKET" title="A fresh choice." description={`${quantity} × Organic Tomato Soup is in your cart. Keep exploring and we'll save it for checkout.`} actions={<><Button onClick={() => setDialogOpen(false)}>Continue shopping</Button><a className="dialog-cart-link" href="/">View basket　→</a></>} />
  </main>;
}
