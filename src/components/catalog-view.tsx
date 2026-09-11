"use client";

import { LupaIcon } from "@/components/lupa-icon";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { categories } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { ProductCard } from "./product-card";
import { clsx } from "clsx";

type SortKey = "relevancia" | "preco-asc" | "preco-desc" | "avaliacao";

export function CatalogView({
 initialProducts,
 lockedCategory,
}: {
 initialProducts: Product[];
 lockedCategory?: string;
}) {
 const [query, setQuery] = useState("");
 const [selectedCategories, setSelectedCategories] = useState<string[]>(
 lockedCategory ? [lockedCategory] : [],
 );
 const [maxPrice, setMaxPrice] = useState<number>(80000);
 const [minRating, setMinRating] = useState<number>(0);
 const [onlyOffers, setOnlyOffers] = useState(false);
 const [sort, setSort] = useState<SortKey>("relevancia");
 const [filtersOpen, setFiltersOpen] = useState(false);

 const results = useMemo(() => {
 const q = query.trim().toLowerCase();
 let list = initialProducts.filter((p) => {
 if (q) {
 const haystack = `${p.name} ${p.brand} ${p.shortDescription} ${p.sku}`.toLowerCase();
 if (!haystack.includes(q)) return false;
 }
 if (selectedCategories.length >0 && !selectedCategories.includes(p.categorySlug)) {
 return false;
 }
 if (p.priceCents > maxPrice) return false;
 if (p.rating < minRating) return false;
 if (onlyOffers && !p.compareAtCents) return false;
 return true;
 });

 list = [...list].sort((a, b) => {
 switch (sort) {
 case "preco-asc":
 return a.priceCents - b.priceCents;
 case "preco-desc":
 return b.priceCents - a.priceCents;
 case "avaliacao":
 return b.rating - a.rating;
 default:
 return b.reviewCount - a.reviewCount;
 }
 });

 return list;
 }, [initialProducts, query, selectedCategories, maxPrice, minRating, onlyOffers, sort]);

 function toggleCategory(slug: string) {
 if (lockedCategory) return;
 setSelectedCategories((prev) =>
 prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
 );
 }

 const activeFilters =
 selectedCategories.length +
 (maxPrice <80000 ?1 :0) +
 (minRating >0 ?1 :0) +
 (onlyOffers ?1 :0);

 const filterPanel = (
 <div className="space-y-6">
 <div>
 <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">Categoria</h3>
 <div className="mt-3 space-y-2">
 {categories.map((c) => (
 <label key={c.slug} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-200">
 <input
 type="checkbox"
 checked={selectedCategories.includes(c.slug)}
 disabled={Boolean(lockedCategory)}
 onChange={() => toggleCategory(c.slug)}
 className="h-4 w-4 rounded border-ink-600 bg-ink-800 text-brand accent-brand focus:ring-brand disabled:opacity-50"
 />
 <span className={clsx(lockedCategory && "opacity-60")}>{c.name}</span>
 </label>
 ))}
 </div>
 </div>

 <div>
 <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
 Preço máximo
 </h3>
 <p className="mt-2 text-sm font-semibold text-white">{formatBRL(maxPrice)}</p>
 <input
 type="range"
 min={3000}
 max={80000}
 step={1000}
 value={maxPrice}
 onChange={(e) => setMaxPrice(Number(e.target.value))}
 className="mt-3 w-full accent-brand"
 aria-label="Preço máximo"
 />
 </div>

 <div>
 <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
 Avaliação mínima
 </h3>
 <div className="mt-3 flex flex-wrap gap-2">
 {[0,4,4.5,4.8].map((r) => (
 <button
 key={r}
 type="button"
 onClick={() => setMinRating(r)}
 className={clsx("chip", minRating === r && "chip-active")}
 >
 {r ===0 ? "Todas" : `${r}+`}
 </button>
 ))}
 </div>
 </div>

 <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-200">
 <input
 type="checkbox"
 checked={onlyOffers}
 onChange={(e) => setOnlyOffers(e.target.checked)}
 className="h-4 w-4 rounded border-ink-600 bg-ink-800 accent-brand focus:ring-brand"
 />
 Somente em oferta
 </label>

 {activeFilters >0 && (
 <button
 type="button"
 className="btn-subtle w-full"
 onClick={() => {
 if (!lockedCategory) setSelectedCategories([]);
 setMaxPrice(80000);
 setMinRating(0);
 setOnlyOffers(false);
 }}
 >
 <X size={15} /> Limpar filtros ({activeFilters})
 </button>
 )}
 </div>
 );

 return (
 <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
 <aside className="hidden lg:block">
 <div className="card sticky top-24 p-5">{filterPanel}</div>
 </aside>

 <div>
 <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
 <div className="relative flex-1">
 <LupaIcon
 size={17}
 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
 />
 <input
 type=""
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 placeholder="Buscar por nome, marca ou SKU…"
 className="field pl-10"
 aria-label="Buscar produtos"
 />
 </div>

 <select
 value={sort}
 onChange={(e) => setSort(e.target.value as SortKey)}
 className="field sm:w-52"
 aria-label="Ordenar por"
 >
 <option value="relevancia">Mais relevantes</option>
 <option value="preco-asc">Menor preço</option>
 <option value="preco-desc">Maior preço</option>
 <option value="avaliacao">Melhor avaliados</option>
 </select>

 <button
 type="button"
 className="btn-ghost lg:hidden"
 onClick={() => setFiltersOpen((v) => !v)}
 aria-expanded={filtersOpen}
 >
 <SlidersHorizontal size={16} /> Filtros
 {activeFilters >0 && (
 <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
 {activeFilters}
 </span>
 )}
 </button>
 </div>

 {filtersOpen && (
 <div className="card mt-4 p-5 lg:hidden">{filterPanel}</div>
 )}

 <p className="mt-4 text-sm text-ink-400">
 {results.length} {results.length ===1 ? "produto" : "produtos"}
 </p>

 {results.length ===0 ? (
 <div className="card mt-6 p-12 text-center">
 <p className="text-lg font-semibold text-white">Nenhum produto encontrado</p>
 <p className="mt-2 text-sm text-ink-400">
 Ajuste a busca ou remova alguns filtros para ver mais resultados.
 </p>
 </div>
 ) : (
 <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
 {results.map((p) => (
 <ProductCard key={p.id} product={p} />
 ))}
 </div>
 )}
 </div>
 </div>
 );
}
