import { NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/data";
import { computeTotals } from "@/lib/cart-rules";

const orderSchema = z.object({
 paymentMethod: z.enum(["pix", "credito", "boleto"]),
 customer: z.object({
 fullName: z.string().min(2),
 email: z.string().email(),
 phone: z.string().optional().default(""),
 }),
 shippingAddress: z.object({
 postalCode: z.string().min(8),
 street: z.string().min(1),
 number: z.string().min(1),
 complement: z.string().optional().default(""),
 district: z.string().min(1),
 city: z.string().min(1),
 state: z.string().min(2),
 }),
 items: z
 .array(
 z.object({
 productId: z.string(),
 quantity: z.number().int().positive().max(99),
 }),
 )
 .min(1),
});

function generateOrderNumber(): string {
 const stamp = Date.now().toString(36).toUpperCase().slice(-6);
 const rand = Math.random().toString(36).toUpperCase().slice(2,6);
 return `VLT-${stamp}${rand}`;
}

export async function POST(request: Request) {
 let payload: unknown;
 try {
 payload = await request.json();
 } catch {
 return NextResponse.json({ error: "JSON inválido." }, { status:400 });
 }

 const parsed = orderSchema.safeParse(payload);
 if (!parsed.success) {
 return NextResponse.json(
 { error: "Dados do pedido incompletos ou inválidos." },
 { status:422 },
 );
 }

 const { items, paymentMethod } = parsed.data;

 const quantityByProductId = new Map<string, number>();
 for (const line of items) {
 quantityByProductId.set(
 line.productId,
 (quantityByProductId.get(line.productId) ?? 0) + line.quantity,
 );
 }

 let subtotalCents = 0;
 const resolvedItems = [];

 // Stok diuji terhadap total per produk, bukan per baris: klien bisa mengirim
 // productId yang sama dua kali dan melewati pemeriksaan bila baris tidak digabung.
 for (const [productId, quantity] of quantityByProductId) {
 const product = products.find((p) => p.id === productId);
 if (!product) {
 return NextResponse.json(
 { error: `Produto não encontrado: ${productId}` },
 { status: 404 },
 );
 }
 if (product.stock < quantity) {
 return NextResponse.json(
 { error: `Estoque insuficiente para ${product.name}.` },
 { status: 409 },
 );
 }
 subtotalCents += product.priceCents * quantity;
 resolvedItems.push({
 productId: product.id,
 sku: product.sku,
 name: product.name,
 unitPriceCents: product.priceCents,
 quantity,
 });
 }

 const { shippingCents, discountCents, totalCents } = computeTotals({
 subtotalCents,
 paymentMethod,
 });

 const orderNumber = generateOrderNumber();

 // Persist to the shared Postgres `orders` / `order_items` tables once a
 // DATABASE_URL is configured. Until then the order is acknowledged in-process.
 return NextResponse.json({
 orderNumber,
 status: "pending",
 paymentMethod,
 subtotalCents,
 discountCents,
 shippingCents,
 totalCents,
 items: resolvedItems,
 });
}
