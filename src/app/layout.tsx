import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
 title: {
 default: "VOLTARE — Ferramentas profissionais e EPI",
 template: "%s | VOLTARE",
 },
 description:
 "Ferramentas elétricas, ferramentas manuais e equipamentos de segurança com entrega para todo o Brasil.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
 <html lang="pt-BR" className={inter.variable}>
 <body className="flex min-h-screen flex-col font-sans">
 <CartProvider>
 <SiteHeader />
 <main className="flex-1">{children}</main>
 <SiteFooter />
 </CartProvider>
 </body>
 </html>
 );
}
