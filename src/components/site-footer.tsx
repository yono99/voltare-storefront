import Link from "next/link";
import { categories } from "@/lib/data";

export function SiteFooter() {
 return (
 <footer className="mt-20 border-t border-ink-800 bg-ink-950">
 <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
 <div>
 <div className="flex items-center gap-2.5">
 <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-sm font-black text-white">
 V
 </span>
 <span className="text-lg font-black tracking-tight text-white">
 VOLTARE<span className="text-brand">.</span>
 </span>
 </div>
 <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
 Ferramentas elétricas, manuais e EPI para quem trabalha com pressa e não pode
 errar. Entrega para todo o Brasil.
 </p>
 </div>

 <div>
 <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">Categorias</h3>
 <ul className="mt-4 space-y-2.5">
 {categories.map((c) => (
 <li key={c.slug}>
 <Link href={`/categoria/${c.slug}`} className="text-sm text-ink-300 hover:text-white">
 {c.name}
 </Link>
 </li>
 ))}
 </ul>
 </div>

 <div>
 <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">Minha conta</h3>
 <ul className="mt-4 space-y-2.5">
 <li><Link href="/entrar" className="text-sm text-ink-300 hover:text-white">Entrar</Link></li>
 <li><Link href="/cadastro" className="text-sm text-ink-300 hover:text-white">Criar conta</Link></li>
 <li><Link href="/conta" className="text-sm text-ink-300 hover:text-white">Meus pedidos</Link></li>
 <li><Link href="/carrinho" className="text-sm text-ink-300 hover:text-white">Carrinho</Link></li>
 </ul>
 </div>

 <div>
 <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-500">Atendimento</h3>
 <ul className="mt-4 space-y-2.5 text-sm text-ink-300">
 <li>seg–sex,8h às18h</li>
 <li>vendas@voltare.com.br</li>
 <li>08000000000</li>
 </ul>
 </div>
 </div>

 <div className="border-t border-ink-800">
 <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
 <p>© {new Date().getFullYear()} VOLTARE Ferramentas. Todos os direitos reservados.</p>
 <p>Preços em Reais (BRL). Frete grátis acima de R$299.</p>
 </div>
 </div>
 </footer>
 );
}
