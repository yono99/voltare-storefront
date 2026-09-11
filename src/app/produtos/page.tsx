import type { Metadata } from "next";
import { products } from "@/lib/data";
import { CatalogView } from "@/components/catalog-view";

export const metadata: Metadata = {
 title: "Todos os produtos",
 description: "Catálogo completo de ferramentas elétricas, manuais e EPI.",
};

export default function ProductsPage() {
 return (
 <div className="container-page py-10">
 <header className="mb-8">
 <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
 Todos os produtos
 </h1>
 <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-400">
 Busque, filtre e compare. Estoque atualizado e envio em até24h.
 </p>
 </header>
 <CatalogView initialProducts={products} />
 </div>
 );
}
