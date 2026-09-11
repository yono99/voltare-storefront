import Link from "next/link";

export default function NotFound() {
 return (
 <div className="container-page py-24">
 <div className="card mx-auto max-w-lg p-10 text-center">
 <p className="text-5xl font-black text-brand">404</p>
 <h1 className="mt-4 text-xl font-bold text-white">Página não encontrada</h1>
 <p className="mt-2 text-sm text-ink-400">
 O endereço que você tentou abrir não existe ou foi movido.
 </p>
 <Link href="/" className="btn-primary mt-6">
 Voltar ao início
 </Link>
 </div>
 </div>
 );
}
