import Link from "next/link";
import type { Metadata } from "next";
import SwaggerUiClient from "./swagger-ui-client";

export const metadata: Metadata = {
  title: "Farmart API Docs",
  description: "Swagger documentation for the proposed Farmart Storefront API.",
};

export default function ApiDocsPage() {
  return <main className="api-docs-page">
    <header className="api-docs-header">
      <Link href="/" className="api-docs-brand"><span>🛒</span><b>Farmart</b><i>API</i></Link>
      <nav><Link href="/">Storefront</Link><Link href="/product">Product</Link><Link href="/design">Design system</Link></nav>
      <a className="api-spec-link" href="/openapi.json" download>Download OpenAPI JSON ↓</a>
    </header>
    <section className="api-docs-intro">
      <span className="api-docs-eyebrow">DEVELOPER REFERENCE · OPENAPI 3.1.2</span>
      <h1>Farmart Storefront API</h1>
      <p>Proposed API contract for catalog discovery, product detail, basket, wishlist, delivery, and newsletter flows.</p>
      <div className="api-docs-note"><span>i</span><p><b>Backend status.</b> Storefront, categories, and product search read from SQLite. Basket, wishlist, reviews, delivery quotes, and newsletter routes are documented as contracts but are not implemented yet. Interactive requests stay disabled until those routes are available.</p></div>
      <div className="api-docs-links"><a href="/openapi.json">/openapi.json</a><span>Base path: <code>/api/v1</code></span></div>
    </section>
    <section className="api-docs-content" aria-label="Swagger API reference"><SwaggerUiClient /></section>
    <footer className="api-docs-footer"><span>Farmart · API contract v1.0.0</span><a href="/openapi.json">View raw spec ↗</a></footer>
  </main>;
}
