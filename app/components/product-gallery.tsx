"use client";

import { useState } from "react";

const views = [
  { icon: "🥫", label: "Front" },
  { icon: "🍅", label: "Ingredients" },
  { icon: "🥣", label: "Serving idea" },
  { icon: "🌿", label: "Farm fresh" },
];

export function ProductGallery() {
  const [selected, setSelected] = useState(0);
  return <div className="product-gallery">
    <div className="gallery-main">
      <span className="gallery-badge">BEST SELLER</span>
      <span className="gallery-heart" aria-label="Add to wishlist">♡</span>
      <span className={`gallery-product-art gallery-art-${selected}`} aria-label={views[selected].label} role="img">{views[selected].icon}</span>
      <span className="gallery-zoom">⌕　Hover to zoom</span>
    </div>
    <div className="gallery-thumbnails" aria-label="Product images">{views.map((view, index) => <button key={view.label} type="button" className={selected === index ? "selected" : ""} aria-label={`Show ${view.label.toLowerCase()} image`} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{view.icon}</span></button>)}</div>
  </div>;
}
