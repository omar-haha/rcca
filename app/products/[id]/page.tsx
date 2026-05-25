import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { ProductDetail } from "@/components/sections/ProductDetail";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = products.find((p) => p.id === id);
  if (!p) return {};
  return {
    title: `${p.name} — RCCA`,
    description: `${p.name} ${p.unit} · ${p.purity} purity · $${p.price.toFixed(2)}`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
