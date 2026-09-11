import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, productsByCategory } from "@/lib/data";
import { CatalogView } from "@/components/catalog-view";

export function generateStaticParams() {
 return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string }>;
}): Promise<Metadata> {
 const { slug } = await params;
 const category = getCategory(slug);
 if (!category) return { title: "Categoria" };
 return { title: category.name, description: category.description };
}

export default async function CategoryPage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 const category = getCategory(slug);
 if (!category) notFound();

 const list = productsByCategory(slug);

 return (
 <div className="container-page py-10">
 <header className="mb-8">
 <p className="text-xs font-semibold uppercase tracking-wider text-brand">
 {category.tagline}
 </p>
 <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
 {category.name}
 </h1>
 <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-400">
 {category.description}
 </p>
 </header>
 <CatalogView initialProducts={list} lockedCategory={slug} />
 </div>
 );
}
