import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatBRL, discountPercent } from "@/lib/format";
import { AddToCartButton } from "./add-to-cart-button";

const badgeLabels: Record<NonNullable<Product["badge"]>, string> = {
 novo: "Novo",
 oferta: "Oferta",
 "mais-vendido": "Mais vendido",
};

export function ProductCard({ product }: { product: Product }) {
 const off = discountPercent(product.priceCents, product.compareAtCents);

 return (
 <article className="card group flex flex-col overflow-hidden transition hover:border-brand/60">
 <Link href={`/produtos/${product.slug}`} className="relative block">
 <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900">
 <div className="absolute inset-0 grid place-items-center">
 <span className="text-5xl font-black text-ink-700 transition group-hover:scale-110 group-hover:text-brand/40">
 {product.brand.charAt(0)}
 </span>
 </div>
 <div className="absolute left-3 top-3 flex gap-2">
 {product.badge && (
 <span className="rounded-md bg-brand px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
 {badgeLabels[product.badge]}
 </span>
 )}
 {off && (
 <span className="rounded-md bg-ink-950/80 px-2 py-1 text-[11px] font-bold text-white">
 -{off}%
 </span>
 )}
 </div>
 </div>
 </Link>

 <div className="flex flex-1 flex-col p-4">
 <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
 {product.brand}
 </p>
 <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white">
 <Link href={`/produtos/${product.slug}`} className="hover:text-brand-light">
 {product.name}
 </Link>
 </h3>

 <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-400">
 <Star size={13} className="fill-brand text-brand" />
 <span className="font-medium text-ink-200">{product.rating.toFixed(1)}</span>
 <span>({product.reviewCount})</span>
 </div>

 <div className="mt-3">
 {product.compareAtCents && (
 <p className="text-xs text-ink-500 line-through">
 {formatBRL(product.compareAtCents)}
 </p>
 )}
 <p className="text-lg font-bold text-white">{formatBRL(product.priceCents)}</p>
 <p className="text-xs text-ink-400">
 em até12x sem juros
 </p>
 </div>

 <div className="mt-4 pt-1">
 <AddToCartButton productId={product.id} compact />
 </div>
 </div>
 </article>
 );
}
