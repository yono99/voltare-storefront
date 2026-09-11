import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateCustomer, setSessionCookie } from "@/lib/auth";

const schema = z.object({
 email: z.string().email(),
 password: z.string().min(1),
});

export async function POST(request: Request) {
 const body = await request.json().catch(() => null);
 const parsed = schema.safeParse(body);
 if (!parsed.success) {
 return NextResponse.json({ error: "Informe e-mail e senha." }, { status:422 });
 }

 const result = authenticateCustomer(parsed.data.email, parsed.data.password);
 if (!result.ok) {
 return NextResponse.json({ error: result.error }, { status:401 });
 }

 await setSessionCookie(result.customer.id);
 return NextResponse.json({ customer: result.customer });
}
