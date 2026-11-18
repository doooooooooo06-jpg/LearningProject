"use client";

import { useEffect, useState } from "react";
import { DealCard, type DealCardData } from "../components/deal-card";

type ApiProduct = {
  id: string;
  name: string;
  brand: string;
  price: { amount: string };
  compareAtPrice?: { amount: string };
  rating: number;
  reviewCount: number;
  icon: string;
  surface: string;
};

type ProductPage = {
  items: ApiProduct[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const pageSize = 24;

function toDealCard(product: ApiProduct): DealCardData | null {
  if (!product.compareAtPrice) return null;
  const priceCents = Math.round(Number(product.price.amount) * 100);
  const compareAtCents = Math.round(Number(product.compareAtPrice.amount) * 100);
  if (!Number.isSafeInteger(priceCents) || !Number.isSafeInteger(compareAtCents) || compareAtCents <= priceCents) return null;

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: `$${product.price.amount}`,
    compareAtPrice: `$${product.compareAtPrice.amount}`,
    discountPercent: Math.round(((compareAtCents - priceCents) / compareAtCents) * 1000) / 10,
    icon: product.icon,
    color: product.surface,
    rating: product.rating,
    reviewCount: product.reviewCount,
  };
}

export function DealsCatalog() {
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState<ProductPage | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "empty" | "ready">("loading");

  useEffect(() => {
    const controller = new AbortController();

    const loadDeals = async () => {
      try {
        const response = await fetch(`/api/v1/products?onSale=true&sort=discount-desc&page=${page}&limit=${pageSize}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Could not load deals.");
        const data = await response.json() as ProductPage;

        if (data.totalPages === 0 && page !== 1) {
          setPage(1);
          return;
        }
        if (data.totalPages > 0 && page > data.totalPages) {
          setPage(data.totalPages);
          return;
        }

        setResult(data);
        setStatus(data.total === 0 ? "empty" : "ready");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    };

    void loadDeals();
    return () => controller.abort();
  }, [page, retryCount]);

  if (status === "loading") return <p className="deals-message" role="status">Loading deals…</p>;
  if (status === "error") return <div className="deals-message" role="alert"><p>Deals could not be loaded.</p><button className="farm-button farm-button-outline" type="button" onClick={() => { setStatus("loading"); setRetryCount((count) => count + 1); }}>Try again</button></div>;
  if (status === "empty" || !result) return <p className="deals-message" role="status">No deals today.</p>;

  const dealCards = result.items.map(toDealCard).filter((product): product is DealCardData => product !== null);

  return <>
    <p className="deals-count" aria-live="polite">{result.total} {result.total === 1 ? "deal" : "deals"}</p>
    <div className="related-grid deals-grid">{dealCards.map((product) => <DealCard key={product.id} product={product} />)}</div>
    {result.totalPages > 1 && <nav className="deals-pagination" aria-label="Deals pages">
      <button className="farm-button farm-button-outline" type="button" disabled={page <= 1} onClick={() => { setStatus("loading"); setPage((current) => current - 1); }}>Previous</button>
      <span aria-current="page">Page {page} of {result.totalPages}</span>
      <button className="farm-button farm-button-outline" type="button" disabled={page >= result.totalPages} onClick={() => { setStatus("loading"); setPage((current) => current + 1); }}>Next</button>
    </nav>}
  </>;
}
