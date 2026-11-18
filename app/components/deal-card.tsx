export type DealCardData = {
  id: string;
  name: string;
  brand: string;
  price: string;
  compareAtPrice: string;
  discountPercent: number;
  icon: string;
  color: string;
  rating: number;
  reviewCount: number;
};

export function DealCard({ product }: { product: DealCardData }) {
  return <article className="detail-product-card">
    <a className="deal-card-link" href={`/product?productId=${encodeURIComponent(product.id)}`}>
      <div className={`detail-product-art ${product.color}`}><span aria-hidden="true">{product.icon}</span><b className="deal-discount-badge">-{product.discountPercent}%</b></div>
      <small>{product.brand}</small>
      <h3>{product.name}</h3>
      <div className="detail-card-stars" aria-label={`${product.rating.toFixed(1)} out of 5, ${product.reviewCount} reviews`}>★ {product.rating.toFixed(1)} <span>({product.reviewCount})</span></div>
      <div className="detail-card-price"><strong>{product.price}</strong> <del>{product.compareAtPrice}</del></div>
      <span className="deal-card-action">Shop deal →</span>
    </a>
  </article>;
}
