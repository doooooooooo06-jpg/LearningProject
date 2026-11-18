import Link from "next/link";
import type { Metadata } from "next";
import { DealsCatalog } from "./deals-catalog";

export const metadata: Metadata = {
  title: "Deals Today | Farmart",
  description: "Shop current Farmart price reductions, sorted by percentage saved.",
};

export default function DealsPage() {
  return <main className="detail-page deals-page">
    <header className="detail-header"><div className="detail-header-inner"><Link className="detail-logo" href="/"><span aria-hidden="true">🛒</span><b>Farmart<small>ORGANIC MARKET</small></b></Link><Link className="deals-back-link" href="/">Back to shop</Link></div></header>
    <div className="shell deals-content">
      <p className="detail-eyebrow">FRESH OFFERS</p>
      <h1>Deals Today</h1>
      <p className="deals-intro">Current price reductions, with the biggest percentage savings first.</p>
      <DealsCatalog />
    </div>
  </main>;
}
