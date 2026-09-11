import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatBRL } from "@/lib/format";
import { AddToCartButton } from "@/components/add-to-cart-button";
import type { Product } from "@/lib/types";

type ProductCardData = Product & {
 compareAtCents?: number | null;
 compareAtPriceCents?: number | null;
 imageUrl?: string | null;
};

export function ProductCard({ product }: { product: Product }) {
 const p = product as ProductCardData;
 const compareAt = p.compareAtCents ?? p.compareAtPriceCents ?? null;
 const hasDiscount = compareAt != null && compareAt > p.priceCents;
 const discountPct = hasDiscount
 ? Math.round(((compareAt - p.priceCents) / compareAt) *100)
 :0;

 return (
 <article className="card group flex h-full flex-col overflow-hidden">
 <Link
 href={`/produtos/${p.slug}`}
 className="relative block aspect-[4/3] overflow-hidden bg-ink-900"
 >
 {p.imageUrl ? (
 <Image
 src={p.imageUrl}
 alt={p.name}
 fill
 sizes="(max-width:640px)100vw, (max-width:1280px)50vw,33vw"
 className="object-cover transition duration-300 group-hover:scale-105"
 />
 ) : (
 <span className="grid h-full w-full place-items-center text-ink-600">
 sem imagem
 </span>
 )}
 {hasDiscount && (
 <span className="absolute left-3 top-3 rounded-md bg-brand px-2 py-1 text-[11px] font-bold text-white">
 -{discountPct}%
 </span>
 )}
 </Link>

 <div className="flex flex-1 flex-col p-4">
 <p className="text-xs font-semibold uppercase tracking-wide text-brand">
 {p.brand}
 </p>
 <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-white">
 <Link href={`/produtos/${p.slug}`} className="hover:text-brand">
 {p.name}
 </Link>
 </h3>

 {p.rating != null && (
 <p className="mt-2 flex items-center gap-1 text-xs text-ink-400">
 <Star size={13} className="fill-brand text-brand" />
 {p.rating.toLocaleString("pt-BR")}
 {p.reviewCount != null && <span>({p.reviewCount})</span>}
 </p>
 )}

 <div className="mt-auto pt-3">
 <div className="flex items-baseline gap-2">
 <span className="text-lg font-bold text-white">
 {formatBRL(p.priceCents)}
 </span>
 {hasDiscount && (
 <span className="text-xs text-ink-500 line-through">
 {formatBRL(compareAt)}
 </span>
 )}
 </div>
 <p className="mt-0.5 text-xs text-ink-400">
 em até12x de {formatBRL(Math.round(p.priceCents /12))}
 </p>

 <div className="mt-3">
 <AddToCartButton productId={p.id} />
 </div>
 </div>
 </div>
 </article>
 );
}
