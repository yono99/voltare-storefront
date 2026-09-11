"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, CreditCard, Landmark, QrCode } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import { clsx } from "clsx";

type Step = "entrega" | "pagamento" | "revisao";

const steps: { key: Step; label: string }[] = [
 { key: "entrega", label: "Entrega" },
 { key: "pagamento", label: "Pagamento" },
 { key: "revisao", label: "Revisão" },
];

export default function CheckoutPage() {
 const router = useRouter();
 const { items, subtotalCents, shippingCents, totalCents, clear, isHydrated } = useCart();
 const [step, setStep] = useState<Step>("entrega");
 const [payment, setPayment] = useState("pix");
 const [submitting, setSubmitting] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [orderNumber, setOrderNumber] = useState<string | null>(null);

 const [form, setForm] = useState({
 fullName: "",
 email: "",
 phone: "",
 postalCode: "",
 street: "",
 number: "",
 complement: "",
 district: "",
 city: "",
 state: "",
 });

 function update(field: keyof typeof form, value: string) {
 setForm((prev) => ({ ...prev, [field]: value }));
 }

 if (!isHydrated) {
 return <div className="container-page py-16 text-sm text-ink-400">Carregando…</div>;
 }

 if (orderNumber) {
 return (
 <div className="container-page py-20">
 <div className="card mx-auto max-w-lg p-10 text-center">
 <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
 <Check size={28} />
 </span>
 <h1 className="mt-5 text-2xl font-black text-white">Pedido confirmado</h1>
 <p className="mt-2 text-sm text-ink-400">
 Seu pedido <span className="font-semibold text-white">{orderNumber}</span> foi registrado.
 Enviamos os detalhes para o seu e-mail.
 </p>
 <Link href="/produtos" className="btn-primary mt-6">
 Continuar comprando
 </Link>
 </div>
 </div>
 );
 }

 if (items.length ===0) {
 return (
 <div className="container-page py-20">
 <div className="card mx-auto max-w-lg p-10 text-center">
 <h1 className="text-xl font-bold text-white">Nada para finalizar</h1>
 <p className="mt-2 text-sm text-ink-400">Adicione produtos ao carrinho primeiro.</p>
 <Link href="/produtos" className="btn-primary mt-6">
 Ver produtos
 </Link>
 </div>
 </div>
 );
 }

 const entregaValid =
 form.fullName.trim() &&
 form.email.includes("@") &&
 form.postalCode.trim() &&
 form.street.trim() &&
 form.number.trim() &&
 form.district.trim() &&
 form.city.trim() &&
 form.state.trim();

 async function placeOrder() {
 setSubmitting(true);
 setError(null);
 try {
 const res = await fetch("/api/orders", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 paymentMethod: payment,
 customer: {
 fullName: form.fullName,
 email: form.email,
 phone: form.phone,
 },
 shippingAddress: {
 postalCode: form.postalCode,
 street: form.street,
 number: form.number,
 complement: form.complement,
 district: form.district,
 city: form.city,
 state: form.state,
 },
 items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
 }),
 });
 const data = (await res.json()) as { orderNumber?: string; error?: string };
 if (!res.ok || !data.orderNumber) {
 throw new Error(data.error ?? "Não foi possível concluir o pedido.");
 }
 clear();
 setOrderNumber(data.orderNumber);
 } catch (err) {
 setError(err instanceof Error ? err.message : "Erro inesperado.");
 } finally {
 setSubmitting(false);
 }
 }

 return (
 <div className="container-page py-10">
 <h1 className="text-3xl font-black tracking-tight text-white">Finalizar compra</h1>

 <ol className="mt-6 flex flex-wrap items-center gap-3">
 {steps.map((s, index) => {
 const active = s.key === step;
 const done = steps.findIndex((x) => x.key === step) > index;
 return (
 <li key={s.key} className="flex items-center gap-3">
 <button
 type="button"
 onClick={() => setStep(s.key)}
 className={clsx(
 "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
 active
 ? "border-brand bg-brand/10 text-white"
 : done
 ? "border-emerald-600/50 text-emerald-400"
 : "border-ink-700 text-ink-400 hover:text-white",
 )}
 >
 <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-800 text-[11px] font-bold">
 {done ? <Check size={12} /> : index +1}
 </span>
 {s.label}
 </button>
 {index < steps.length -1 && <span className="text-ink-700">—</span>}
 </li>
 );
 })}
 </ol>

 <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
 <div className="card p-6">
 {step === "entrega" && (
 <div className="space-y-4">
 <h2 className="text-lg font-bold text-white">Dados de entrega</h2>
 <div className="grid gap-4 sm:grid-cols-2">
 <div className="sm:col-span-2">
 <label className="label" htmlFor="fullName">Nome completo</label>
 <input id="fullName" className="field" value={form.fullName}
 onChange={(e) => update("fullName", e.target.value)} autoComplete="name" />
 </div>
 <div>
 <label className="label" htmlFor="email">E-mail</label>
 <input id="email" type="email" className="field" value={form.email}
 onChange={(e) => update("email", e.target.value)} autoComplete="email" />
 </div>
 <div>
 <label className="label" htmlFor="phone">Telefone</label>
 <input id="phone" className="field" value={form.phone}
 onChange={(e) => update("phone", e.target.value)} autoComplete="tel"
 placeholder="(11)90000-0000" />
 </div>
 <div>
 <label className="label" htmlFor="postalCode">CEP</label>
 <input id="postalCode" className="field" value={form.postalCode}
 onChange={(e) => update("postalCode", e.target.value)} autoComplete="postal-code"
 placeholder="00000-000" />
 </div>
 <div>
 <label className="label" htmlFor="street">Rua</label>
 <input id="street" className="field" value={form.street}
 onChange={(e) => update("street", e.target.value)} autoComplete="address-line1" />
 </div>
 <div>
 <label className="label" htmlFor="number">Número</label>
 <input id="number" className="field" value={form.number}
 onChange={(e) => update("number", e.target.value)} />
 </div>
 <div>
 <label className="label" htmlFor="complement">Complemento</label>
 <input id="complement" className="field" value={form.complement}
 onChange={(e) => update("complement", e.target.value)} />
 </div>
 <div>
 <label className="label" htmlFor="district">Bairro</label>
 <input id="district" className="field" value={form.district}
 onChange={(e) => update("district", e.target.value)} />
 </div>
 <div>
 <label className="label" htmlFor="city">Cidade</label>
 <input id="city" className="field" value={form.city}
 onChange={(e) => update("city", e.target.value)} autoComplete="address-level2" />
 </div>
 <div>
 <label className="label" htmlFor="state">UF</label>
 <input id="state" maxLength={2} className="field uppercase" value={form.state}
 onChange={(e) => update("state", e.target.value.toUpperCase())}
 autoComplete="address-level1" placeholder="SP" />
 </div>
 </div>
 <button
 type="button"
 className="btn-primary"
 disabled={!entregaValid}
 onClick={() => setStep("pagamento")}
 >
 Continuar para pagamento
 </button>
 </div>
 )}

 {step === "pagamento" && (
 <div className="space-y-4">
 <h2 className="text-lg font-bold text-white">Forma de pagamento</h2>
 <div className="space-y-3">
 {[
 { id: "pix", icon: QrCode, title: "PIX", note: "10% de desconto · aprovação imediata" },
 { id: "credito", icon: CreditCard, title: "Cartão de crédito", note: "Até12x sem juros" },
 { id: "boleto", icon: Landmark, title: "Boleto bancário", note: "Vence em3 dias úteis" },
 ].map(({ id, icon: Icon, title, note }) => (
 <label
 key={id}
 className={clsx(
 "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition",
 payment === id
 ? "border-brand bg-brand/5"
 : "border-ink-700 hover:border-ink-600",
 )}
 >
 <input
 type="radio"
 name="payment"
 value={id}
 checked={payment === id}
 onChange={() => setPayment(id)}
 className="h-4 w-4 accent-brand"
 />
 <Icon size={22} className={payment === id ? "text-brand" : "text-ink-400"} />
 <span>
 <span className="block text-sm font-semibold text-white">{title}</span>
 <span className="block text-xs text-ink-400">{note}</span>
 </span>
 </label>
 ))}
 </div>
 <div className="flex gap-3">
 <button type="button" className="btn-ghost" onClick={() => setStep("entrega")}>
 Voltar
 </button>
 <button type="button" className="btn-primary" onClick={() => setStep("revisao")}>
 Revisar pedido
 </button>
 </div>
 </div>
 )}

 {step === "revisao" && (
 <div className="space-y-5">
 <h2 className="text-lg font-bold text-white">Revise seu pedido</h2>

 <div className="rounded-lg border border-ink-800 p-4">
 <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Entrega</p>
 <p className="mt-2 text-sm text-ink-200">
 {form.fullName} · {form.email}
 </p>
 <p className="text-sm text-ink-400">
 {form.street}, {form.number} {form.complement && `— ${form.complement}`}
 <br />
 {form.district}, {form.city} — {form.state}, CEP {form.postalCode}
 </p>
 </div>

 <div className="rounded-lg border border-ink-800 p-4">
 <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Pagamento</p>
 <p className="mt-2 text-sm capitalize text-ink-200">
 {payment === "credito" ? "Cartão de crédito" : payment === "pix" ? "PIX" : "Boleto"}
 </p>
 </div>

 <div className="rounded-lg border border-ink-800 p-4">
 <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Itens</p>
 <ul className="mt-3 space-y-2">
 {items.map((i) => (
 <li key={i.product.id} className="flex justify-between gap-4 text-sm">
 <span className="text-ink-300">
 {i.quantity}× {i.product.name}
 </span>
 <span className="font-medium text-white">{formatBRL(i.lineTotalCents)}</span>
 </li>
 ))}
 </ul>
 </div>

 {error && (
 <p className="rounded-lg bg-brand/10 px-3 py-2.5 text-sm text-brand-light">{error}</p>
 )}

 <div className="flex gap-3">
 <button type="button" className="btn-ghost" onClick={() => setStep("pagamento")}>
 Voltar
 </button>
 <button type="button" className="btn-primary" onClick={placeOrder} disabled={submitting}>
 {submitting ? "Processando…" : "Confirmar pedido"}
 </button>
 </div>
 </div>
 )}
 </div>

 <aside className="card sticky top-24 h-fit p-6">
 <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500">Resumo</h2>
 <dl className="mt-4 space-y-3 text-sm">
 <div className="flex justify-between">
 <dt className="text-ink-400">Subtotal</dt>
 <dd className="font-medium text-white">{formatBRL(subtotalCents)}</dd>
 </div>
 <div className="flex justify-between">
 <dt className="text-ink-400">Frete</dt>
 <dd className={shippingCents ===0 ? "font-medium text-emerald-400" : "font-medium text-white"}>
 {shippingCents ===0 ? "Grátis" : formatBRL(shippingCents)}
 </dd>
 </div>
 <div className="flex justify-between border-t border-ink-800 pt-3">
 <dt className="font-semibold text-white">Total</dt>
 <dd className="text-xl font-black text-white">{formatBRL(totalCents)}</dd>
 </div>
 </dl>
 </aside>
 </div>
 </div>
 );
}
