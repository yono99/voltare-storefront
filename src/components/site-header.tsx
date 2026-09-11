"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { clsx } from "clsx";

export function SiteHeader() {
 const pathname = usePathname();
 const { itemCount, isHydrated } = useCart();
 const [mobileOpen, setMobileOpen] = useState(false);

 const nav = [
 { href: "/produtos", label: "Todos os produtos" },
 ...categories.map((c) => ({ href: `/categoria/${c.slug}`, label: c.name })),
 ];

 return (
 <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/85 backdrop-blur-lg">
 <div className="container-page flex h-16 items-center gap-3">
 <button
 type="button"
 className="btn-subtle -ml-1 px-2.5 py-2 lg:hidden"
 aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
 aria-expanded={mobileOpen}
 onClick={() => setMobileOpen((v) => !v)}
 >
 {mobileOpen ? <X size={18} /> : <Menu size={18} />}
 </button>

 <Link href="/" className="flex items-center gap-2.5" aria-label="VOLTARE — página inicial">
 <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-sm font-black text-white shadow-glow">
 V
 </span>
 <span className="text-lg font-black tracking-tight text-white">
 VOLTARE<span className="text-brand">.</span>
 </span>
 </Link>

 <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Categorias">
 {nav.map((item) => {
 const active = pathname === item.href;
 return (
 <Link
 key={item.href}
 href={item.href}
 className={clsx(
 "rounded-md px-3 py-2 text-sm font-medium transition",
 active
 ? "bg-ink-800 text-white"
 : "text-ink-300 hover:bg-ink-800 hover:text-white",
 )}
 >
 {item.label}
 </Link>
 );
 })}
 </nav>

 <div className="ml-auto flex items-center gap-2">
 <Link href="/produtos" className="btn-subtle px-2.5 py-2" aria-label="Buscar produtos">
 < size={18} />
 </Link>
 <Link href="/conta" className="btn-subtle px-2.5 py-2" aria-label="Minha conta">
 <User size={18} />
 </Link>
 <Link href="/carrinho" className="btn-primary relative px-3 py-2" aria-label="Carrinho">
 <ShoppingCart size={18} />
 {isHydrated && itemCount >0 && (
 <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-bold text-brand">
 {itemCount}
 </span>
 )}
 </Link>
 </div>
 </div>

 {mobileOpen && (
 <nav className="border-t border-ink-800 bg-ink-950 lg:hidden" aria-label="Categorias (mobile)">
 <div className="container-page flex flex-col py-2">
 {nav.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 onClick={() => setMobileOpen(false)}
 className="rounded-md px-3 py-3 text-sm font-medium text-ink-200 hover:bg-ink-800 hover:text-white"
 >
 {item.label}
 </Link>
 ))}
 </div>
 </nav>
 )}
 </header>
 );
}
