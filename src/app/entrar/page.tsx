import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
 return (
 <div className="container-page flex justify-center py-16">
 <div className="card w-full max-w-md p-8">
 <h1 className="text-2xl font-black tracking-tight text-white">Entrar na sua conta</h1>
 <p className="mt-2 text-sm text-ink-400">
 Acompanhe pedidos, salve endereços e finalize compras mais rápido.
 </p>
 <div className="mt-6">
 <AuthForm mode="login" />
 </div>
 <p className="mt-6 text-center text-sm text-ink-400">
 Não tem conta?{" "}
 <Link href="/cadastro" className="font-semibold text-brand hover:text-brand-light">
 Criar conta
 </Link>
 </p>
 </div>
 </div>
 );
}
