import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Star, Truck } from "lucide-react";
import { getCategory, getProductBySlug, products } from "@/lib/data";
import { formatBRL, discountPercent, installmentLabel } from "@/lib/format";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
 return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string }>;
}): Promise<Metadata> {
 const { slug } = await params;
 const product = getProductBySlug(slug);
 if (!product) return { title: "Produto" };
 return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 const product = getProductBySlug(slug);
 if (!product) notFound();

 const category = getCategory(product.categorySlug);
 const off = discountPercent(product.priceCents, product.compareAtCents);
 const related = products
 .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
 .slice(0,3);

 return (
 <div className="container-page py-8">
 <nav aria-label="Trilha de navegação" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
 <Link href="/" className="hover:text-white">Início</Link>
 <ChevronRight size={13} />
 {category && (
 <>
 <Link href={`/categoria/${category.slug}`} className="hover:text-white">
 {category.name}
 </Link>
 <ChevronRight size={13} />
 </>
 )}
 <span className="text-ink-300">{product.name}</span>
 </nav>

 <div className="mt-6 grid gap-10 lg:grid-cols-2">
 <div className="card relative overflow-hidden">
 <div className="aspect-square bg-gradient-to-br from-ink-800 to-ink-900">
 <div className="grid h-full place-items-center">
 <span className="text-[120px] font-black text-ink-700">{product.brand.charAt(0)}</span>
 </div>
 </div>
 {off && (
 <span className="absolute left-4 top-4 rounded-md bg-brand px-2.5 py-1 text-xs font-bold text-white">
 -{off}% OFF
 </span>
 )}
 </div>

 <div>
 <p className="text-xs font-semibold uppercase tracking-wider text-brand">{product.brand}</p>
 <h1 className="mt-2 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
 {product.name}
 </h1>

 <div className="mt-3 flex items-center gap-2 text-sm text-ink-400">
 <span className="flex items-center gap-1">
 <Star size={15} className="fill-brand text-brand" />
 <span className="font-semibold text-ink-100">{product.rating.toFixed(1)}</span>
 </span>
 <span>·</span>
 <span>{product.reviewCount} avaliações</span>
 <span>·</span>
 <span className={product.stock >0 ? "text-emerald-400" : "text-brand"}>
 {product.stock >0 ? `${product.stock} em estoque` : "Indisponível"}
 </span>
 </div>

 <p className="mt-6 text-sm leading-relaxed text-ink-300">{product.description}</p>

 <div className="card mt-6 p-5">
 {product.compareAtCents && (
 <p className="text-sm text-ink-500 line-through">
 {formatBRL(product.compareAtCents)}
 </p>
 )}
 <p className="text-3xl font-black text-white">{formatBRL(product.priceCents)}</p>
 <p className="mt-1 text-sm text-ink-400">{installmentLabel(product.priceCents)}</p>
 <p className="mt-1 text-sm font-semibold text-emerald-400">
 {formatBRL(Math.round(product.priceCents *0.9))} no PIX (10% off)
 </p>

 <div className="mt-5 flex flex-col gap-3 sm:flex-row">
 <AddToCartButton productId={product.id} />
 <Link href="/carrinho" className="btn-ghost w-full sm:w-auto">
 Ir para o carrinho
 </Link>
 </div>

 <ul className="mt-5 space-y-2.5 border-t border-ink-800 pt-5 text-sm text-ink-300">
 <li className="flex items-center gap-2">
 <Truck size={16} className="text-brand" /> Frete grátis acima de R$299
 </li>
 <li className="flex items-center gap-2">
 <ShieldCheck size={16} className="text-brand" /> Garantia de12 meses
 </li>
 </ul>
 </div>

 <div className="mt-6">
 <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
 Especificações
 </h2>
 <dl className="mt-3 divide-y divide-ink-800 border-y border-ink-800">
 {product.specs.map((spec) => (
 <div key={spec.label} className="flex justify-between gap-4 py-3 text-sm">
 <dt className="text-ink-400">{spec.label}</dt>
 <dd className="font-medium text-white">{spec.value}</dd>
 </div>
 ))}
 <div className="flex justify-between gap-4 py-3 text-sm">
 <dt className="text-ink-400">SKU</dt>
 <dd className="font-medium text-white">{product.sku}</dd>
 </div>
 </dl>
 </div>
 </div>
 </div>

 {related.length >0 && (
 <section className="mt-16">
 <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
 Quem viu, também comprou
 </h2>
 <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
 {related.map((p) => (
 <ProductCard key={p.id} product={p} />
 ))}
 </div>
 </section>
 )}
 </div>
 );
}
