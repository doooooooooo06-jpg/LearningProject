"use client";

import Link from "next/link";

import { useState } from "react";
import type { ProductDetail as ProductDetailData } from "../../lib/database";
import { Button } from "../components/button";
import { Dialog } from "../components/dialog";
import { ProductImageGallery } from "../components/product-image-gallery";
import { QuantitySelector } from "../components/quantity-selector";

const tabs = ["Description", "Ingredients", "Nutrition", "Reviews"] as const;

function formatPrice(priceCents: number) {
  return `$${(priceCents / 100).toFixed(2)}`;
}

function getAvailabilityLabel(availability: string) {
  switch (availability) {
    case "in_stock": return "In stock";
    case "low_stock": return "Low stock";
    case "out_of_stock": return "Out of stock";
    default: return "Availability not available";
  }
}

export default function ProductDetail({ product }: { product: ProductDetailData }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Description");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(product.variants?.[0]?.id ?? null);
  const selectedVariant = product.variants?.find((variant) => variant.id === selectedVariantId);
  const priceCents = selectedVariant?.priceCents ?? product.price_cents;
  const compareAtPrice = product.compare_at_cents;
  const availability = getAvailabilityLabel(product.availability);

  return <main className="detail-page">
    <header className="detail-header"><div className="detail-header-inner"><Link className="detail-logo" href="/"><span aria-hidden="true">🛒</span><b>Farmart<small>ORGANIC MARKET</small></b></Link><div className="detail-search"><span>All Categories⌄</span><span>Search for products...</span><b>⌕</b></div><Link className="detail-contact" href="/">☎　8 800 332 65-66</Link><div className="detail-account">♡　♡　<span>🛒</span></div></div></header>
    <nav className="detail-nav"><div className="detail-nav-inner"><Link className="detail-shop-link" href="/">☰　 SHOP BY CATEGORY</Link><Link href="/">Deals Today</Link><Link href="/">Fresh Foods⌄</Link><Link href="/">Pantry⌄</Link><Link href="/">Drinks⌄</Link><Link href="/">Home⌄</Link><Link href="/">Recently Viewed</Link></div></nav>
    <div className="detail-container">
      <div className="detail-breadcrumb"><Link href="/">Home</Link><span>›</span><span>{product.categoryName}</span><span>›</span><b>{product.name}</b></div>
      <div className="product-detail-layout">
        <ProductImageGallery images={product.images} productName={product.name} placeholder={product.icon} />
        <section className="product-info">
          <div className="detail-brand-row"><span>{product.brand}</span><span className="organic-label">{product.categoryName}</span></div>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span aria-label={`${product.rating} out of 5 stars`}>★★★★★</span><b>{product.rating.toFixed(1)}</b><a href="#reviews">{product.review_count} customer reviews</a><i>Product ID: {product.id}</i></div>
          <p className="product-subtitle">{product.subtitle}</p>
          <div className="detail-price-row"><strong>{formatPrice(priceCents)}</strong>{compareAtPrice !== null && <del>{formatPrice(compareAtPrice)}</del>}{compareAtPrice !== null && compareAtPrice > priceCents && <span className="detail-save">Save {Math.round((1 - priceCents / compareAtPrice) * 100)}%</span>}</div>
          <div className={`detail-stock ${product.availability === "out_of_stock" ? "unavailable" : ""}`}><span className="stock-dot" />{availability}</div>
          <div className="product-divider" />
          <section className="product-variant" aria-label="Product options"><b>Size and options</b>{product.variants?.length ? product.variants.map((variant) => <button key={variant.id} type="button" className={selectedVariantId === variant.id ? "variant-active" : ""} aria-pressed={selectedVariantId === variant.id} onClick={() => setSelectedVariantId(variant.id)}>{variant.label} <span>· {formatPrice(variant.priceCents)}</span></button>) : <span className="detail-unavailable">Not available yet</span>}</section>
          <div className="product-order-row"><div><small>QUANTITY</small><QuantitySelector value={quantity} onChange={setQuantity} /></div><Button className="detail-add-button" disabled={product.availability === "out_of_stock"} onClick={() => setDialogOpen(true)}>Add to Cart　＋</Button><button type="button" className={`detail-wishlist ${saved ? "saved" : ""}`} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? "♥" : "♡"}</button></div>
          <div className="delivery-card"><span aria-hidden="true">🚚</span><div><b>Delivery details</b><small>Delivery estimate not available yet.</small></div><Link href="/">Details</Link></div>
          <div className="detail-perks"><span>↻　Easy 30-day returns</span><span>♻　Recyclable packaging</span></div>
        </section>
      </div>

      <section className="product-information">
        <div className="detail-tabs" role="tablist" aria-label="Product details">{tabs.map((tab) => <button key={tab} id={`tab-${tab.toLowerCase()}`} type="button" role="tab" aria-selected={activeTab === tab} aria-controls="product-tab-panel" className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab === "Reviews" ? `Reviews (${product.review_count})` : tab}</button>)}</div>
        <div className="tab-content simple-tab" id="product-tab-panel" role="tabpanel" aria-labelledby={`tab-${activeTab.toLowerCase()}`}>
          {activeTab === "Description" && <><h2>About this product</h2><p>{product.description || "Information not available yet."}</p></>}
          {activeTab === "Ingredients" && <><h2>Ingredients</h2><p>{product.ingredients ?? "Information not available yet."}</p></>}
          {activeTab === "Nutrition" && <><h2>Nutrition facts</h2>{product.nutrition ? <><p>{product.nutrition.servingSize}</p><div className="nutrition-row">{product.nutrition.facts.map((fact) => <span key={fact.label}>{fact.label} <b>{fact.value}</b></span>)}</div></> : <p>Information not available yet.</p>}</>}
          {activeTab === "Reviews" && <><h2>Customer reviews</h2><p>Review details are not available yet.</p></>}
        </div>
      </section>
    </div>
    <footer className="detail-footer"><div><Link className="detail-logo" href="/"><span aria-hidden="true">🛒</span><b>Farmart<small>ORGANIC MARKET</small></b></Link><p>Good food, thoughtfully picked.</p></div><span>Fresh groceries, delivered with care.</span><Link href="/design">Explore our design system →</Link></footer>
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} eyebrow="BASKET PREVIEW" title="Basket isn't connected yet" description={`${quantity} × ${product.name}${selectedVariant ? ` (${selectedVariant.label})` : ""} — adding products to a saved basket is not available yet.`} actions={<Button onClick={() => setDialogOpen(false)}>Continue shopping</Button>} />
  </main>;
}
