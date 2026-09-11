import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Wrench, CreditCard } from "lucide-react";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function HomePage() {
 const featured = products.filter((p) => p.badge === "mais-vendido" || p.badge === "oferta").slice(0,4);
 const newest = products.filter((p) => p.badge === "novo");

 return (
 <>
 <section className="relative overflow-hidden border-b border-ink-800">
 <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
 <div>
 <span className="chip border-brand/50 bg-brand/10 text-brand-light">
 Linha profissional2026
 </span>
 <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
 Potência que
 <br />
 <span className="text-brand">não pede licença.</span>
 </h1>
 <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-300">
 Ferramentas elétricas, manuais e EPI certificado para obra, oficina e indústria.
 Estoque real, nota fiscal e entrega rápida em todo o Brasil.
 </p>
 <div className="mt-8 flex flex-wrap gap-3">
 <Link href="/produtos" className="btn-primary px-6 py-3 text-base">
 Ver catálogo <ArrowRight size={18} />
 </Link>
 <Link href="/categoria/epi-seguranca" className="btn-ghost px-6 py-3 text-base">
 Equipamentos de segurança
 </Link>
 </div>

 <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink-800 pt-8">
 {[
 ["+12 mil", "itens entregues"],
 ["24h", "expedição"],
 ["4.8/5", "avaliação média"],
 ].map(([value, label]) => (
 <div key={label}>
 <dt className="text-2xl font-black text-white">{value}</dt>
 <dd className="mt-1 text-xs uppercase tracking-wide text-ink-500">{label}</dd>
 </div>
 ))}
 </dl>
 </div>

 <div className="relative hidden lg:block">
 <div className="card relative overflow-hidden p-10">
 <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
 <Wrench size={160} className="relative mx-auto text-brand/80" strokeWidth={1} />
 <p className="relative mt-8 text-center text-sm text-ink-400">
 Linha VOLTARE Pro —3 anos de garantia
 </p>
 </div>
 </div>
 </div>
 </section>

 <section className="border-b border-ink-800 bg-ink-900/40">
 <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
 {[
 { icon: Truck, title: "Frete grátis", text: "Compras acima de R$299" },
 { icon: ShieldCheck, title: "EPI certificado", text: "Todos com CA válido" },
 { icon: CreditCard, title: "12x sem juros", text: "Ou10% no PIX" },
 { icon: Wrench, title: "Garantia real", text: "Até3 anos na linha Pro" },
 ].map(({ icon: Icon, title, text }) => (
 <div key={title} className="flex items-start gap-3">
 <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
 <Icon size={20} />
 </span>
 <div>
 <p className="text-sm font-semibold text-white">{title}</p>
 <p className="text-xs text-ink-400">{text}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 <section className="container-page py-16">
 <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
 Navegue por categoria
 </h2>
 <div className="mt-8 grid gap-5 md:grid-cols-3">
 {categories.map((c) => {
 const count = products.filter((p) => p.categorySlug === c.slug).length;
 return (
 <Link
 key={c.slug}
 href={`/categoria/${c.slug}`}
 className="card group relative overflow-hidden p-6 transition hover:border-brand"
 >
 <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl transition group-hover:bg-brand/25" />
 <p className="relative text-xs font-semibold uppercase tracking-wider text-brand">
 {c.tagline}
 </p>
 <h3 className="relative mt-2 text-lg font-bold text-white">{c.name}</h3>
 <p className="relative mt-2 text-sm leading-relaxed text-ink-400">
 {c.description}
 </p>
 <p className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
 {count} produtos <ArrowRight size={15} className="text-brand" />
 </p>
 </Link>
 );
 })}
 </div>
 </section>

 <section className="container-page pb-16">
 <div className="flex items-end justify-between gap-4">
 <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
 Destaques da semana
 </h2>
 <Link href="/produtos" className="text-sm font-semibold text-brand hover:text-brand-light">
 Ver tudo
 </Link>
 </div>
 <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
 {featured.map((p) => (
 <ProductCard key={p.id} product={p} />
 ))}
 </div>
 </section>

 {newest.length >0 && (
 <section className="container-page pb-20">
 <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Chegou agora</h2>
 <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
 {newest.map((p) => (
 <ProductCard key={p.id} product={p} />
 ))}
 </div>
 </section>
 )}
 </>
 );
}
