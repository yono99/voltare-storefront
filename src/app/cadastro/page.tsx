import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Criar conta" };

export default function RegisterPage() {
 return (
 <div className="container-page flex justify-center py-16">
 <div className="card w-full max-w-md p-8">
 <h1 className="text-2xl font-black tracking-tight text-white">Criar sua conta</h1>
 <p className="mt-2 text-sm text-ink-400">
 Leva menos de um minuto. Seus dados ficam protegidos.
 </p>
 <div className="mt-6">
 <AuthForm mode="register" />
 </div>
 <p className="mt-6 text-center text-sm text-ink-400">
 Já tem conta?{" "}
 <Link href="/entrar" className="font-semibold text-brand hover:text-brand-light">
 Entrar
 </Link>
 </p>
 </div>
 </div>
 );
}
