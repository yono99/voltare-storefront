import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Package, User } from "lucide-react";
import { getCurrentCustomer } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";

export const metadata: Metadata = { title: "Minha conta" };

export default async function AccountPage() {
 const customer = await getCurrentCustomer();

 if (!customer) {
 return (
 <div className="container-page py-20">
 <div className="card mx-auto max-w-lg p-10 text-center">
 <User size={40} className="mx-auto text-ink-600" />
 <h1 className="mt-4 text-xl font-bold text-white">Você não está conectado</h1>
 <p className="mt-2 text-sm text-ink-400">
 Entre na sua conta para ver pedidos, endereços e dados pessoais.
 </p>
 <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
 <Link href="/entrar" className="btn-primary">
 Entrar
 </Link>
 <Link href="/cadastro" className="btn-ghost">
 Criar conta
 </Link>
 </div>
 </div>
 </div>
 );
 }

 return (
 <div className="container-page py-10">
 <div className="flex flex-wrap items-center justify-between gap-4">
 <div>
 <h1 className="text-3xl font-black tracking-tight text-white">Minha conta</h1>
 <p className="mt-1 text-sm text-ink-400">{customer.email}</p>
 </div>
 <LogoutButton />
 </div>

 <div className="mt-8 grid gap-6 lg:grid-cols-3">
 <section className="card p-6 lg:col-span-2">
 <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-500">
 <Package size={16} /> Meus pedidos
 </h2>
 <div className="mt-6 rounded-lg border border-dashed border-ink-700 p-10 text-center">
 <p className="text-sm text-ink-400">
 Você ainda não tem pedidos. Quando finalizar uma compra, ela aparece aqui.
 </p>
 <Link href="/produtos" className="btn-primary mt-5">
 Começar a comprar
 </Link>
 </div>
 </section>

 <section className="card h-fit p-6">
 <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-500">
 <User size={16} /> Dados pessoais
 </h2>
 <dl className="mt-4 space-y-3 text-sm">
 <div>
 <dt className="text-ink-500">Nome</dt>
 <dd className="font-medium text-white">{customer.fullName}</dd>
 </div>
 <div>
 <dt className="text-ink-500">E-mail</dt>
 <dd className="font-medium text-white">{customer.email}</dd>
 </div>
 {customer.phone && (
 <div>
 <dt className="text-ink-500">Telefone</dt>
 <dd className="font-medium text-white">{customer.phone}</dd>
 </div>
 )}
 </dl>
 </section>

 <section className="card p-6 lg:col-span-3">
 <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-500">
 <MapPin size={16} /> Endereços
 </h2>
 <p className="mt-4 text-sm text-ink-400">
 Nenhum endereço salvo ainda. Você pode informar o endereço de entrega no checkout.
 </p>
 </section>
 </div>
 </div>
 );
}
