"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
 const router = useRouter();
 const [submitting, setSubmitting] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [form, setForm] = useState({
 fullName: "",
 email: "",
 password: "",
 phone: "",
 taxId: "",
 });

 function update(field: keyof typeof form, value: string) {
 setForm((prev) => ({ ...prev, [field]: value }));
 }

 async function handleSubmit(event: React.FormEvent) {
 event.preventDefault();
 setSubmitting(true);
 setError(null);
 try {
 const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
 const res = await fetch(endpoint, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(
 mode === "login"
 ? { email: form.email, password: form.password }
 : form,
 ),
 });
 const data = (await res.json()) as { error?: string };
 if (!res.ok) throw new Error(data.error ?? "Não foi possível continuar.");
 router.push("/conta");
 router.refresh();
 } catch (err) {
 setError(err instanceof Error ? err.message : "Erro inesperado.");
 } finally {
 setSubmitting(false);
 }
 }

 return (
 <form onSubmit={handleSubmit} className="space-y-4" noValidate>
 {mode === "register" && (
 <div>
 <label className="label" htmlFor="fullName">Nome completo</label>
 <input id="fullName" className="field" value={form.fullName}
 onChange={(e) => update("fullName", e.target.value)}
 autoComplete="name" required />
 </div>
 )}

 <div>
 <label className="label" htmlFor="email">E-mail</label>
 <input id="email" type="email" className="field" value={form.email}
 onChange={(e) => update("email", e.target.value)}
 autoComplete="email" required />
 </div>

 <div>
 <label className="label" htmlFor="password">Senha</label>
 <input id="password" type="password" className="field" value={form.password}
 onChange={(e) => update("password", e.target.value)}
 autoComplete={mode === "login" ? "current-password" : "new-password"}
 minLength={mode === "register" ?8 : undefined} required />
 {mode === "register" && (
 <p className="mt-1.5 text-xs text-ink-500">Mínimo de8 caracteres.</p>
 )}
 </div>

 {mode === "register" && (
 <div className="grid gap-4 sm:grid-cols-2">
 <div>
 <label className="label" htmlFor="phone">Telefone</label>
 <input id="phone" className="field" value={form.phone}
 onChange={(e) => update("phone", e.target.value)}
 autoComplete="tel" placeholder="(11)90000-0000" />
 </div>
 <div>
 <label className="label" htmlFor="taxId">CPF</label>
 <input id="taxId" className="field" value={form.taxId}
 onChange={(e) => update("taxId", e.target.value)} placeholder="000.000.000-00" />
 </div>
 </div>
 )}

 {error && (
 <p className="rounded-lg bg-brand/10 px-3 py-2.5 text-sm text-brand-light" role="alert">
 {error}
 </p>
 )}

 <button type="submit" className="btn-primary w-full py-3" disabled={submitting}>
 {submitting ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
 </button>
 </form>
 );
}
