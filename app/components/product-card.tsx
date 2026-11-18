import { Button } from "./button";

export type ProductCardData = {
  name: string;
  brand: string;
  price: string;
  icon: string;
  color: string;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return <article className="detail-product-card">
    <div className={`detail-product-art ${product.color}`}><span>{product.icon}</span><button type="button" aria-label={`Add ${product.name} to wishlist`}>♡</button></div>
    <small>{product.brand}</small>
    <h3>{product.name}</h3>
    <div className="detail-card-stars">★★★★★ <span>(18)</span></div>
    <div className="detail-card-price">{product.price}</div>
    <Button className="detail-card-button">Add to Cart　＋</Button>
  </article>;
}
