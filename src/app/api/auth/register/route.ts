import { NextResponse } from "next/server";
import { z } from "zod";
import { registerCustomer, setSessionCookie } from "@/lib/auth";

const schema = z.object({
 fullName: z.string().min(2, "Informe seu nome completo."),
 email: z.string().email("E-mail inválido."),
 password: z.string().min(8, "A senha precisa ter ao menos8 caracteres."),
 phone: z.string().optional(),
 taxId: z.string().optional(),
});

export async function POST(request: Request) {
 const body = await request.json().catch(() => null);
 const parsed = schema.safeParse(body);
 if (!parsed.success) {
 return NextResponse.json(
 { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
 { status:422 },
 );
 }

 const result = registerCustomer(parsed.data);
 if (!result.ok) {
 return NextResponse.json({ error: result.error }, { status:409 });
 }

 await setSessionCookie(result.customer.id);
 return NextResponse.json({ customer: result.customer }, { status:201 });
}
