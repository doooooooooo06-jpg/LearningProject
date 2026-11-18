import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getProductDetailById } from "../../lib/database";
import ProductDetail from "./product-detail";

type ProductPageProps = { searchParams: Promise<{ productId?: string | string[] }> };

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: ProductPageProps): Promise<Metadata> {
  const { productId } = await searchParams;
  if (productId === undefined) return { title: "Product | Farmart" };
  if (typeof productId !== "string" || !productId) return { title: "Product not found | Farmart" };
  const product = getProductDetailById(productId);
  return { title: product ? `${product.name} | Farmart` : "Product not found | Farmart" };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { productId } = await searchParams;
  if (productId === undefined) redirect("/product?productId=soup-tomato-organic");
  if (typeof productId !== "string" || !productId) notFound();

  const product = getProductDetailById(productId);
  if (!product) notFound();

  return <ProductDetail key={product.id} product={product} />;
}
