import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { randomUUID, scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import type { Customer } from "./types";

const SESSION_COOKIE = "voltare_session";
const SESSION_MAX_AGE =60 *60 *24 *30; //30 days

const secret = new TextEncoder().encode(
 process.env.AUTH_SECRET ?? "voltare-dev-secret-change-me-in-production",
);

type StoredCustomer = Customer & { passwordHash: string };

// In-memory store. Swap for the shared Postgres `customers` table (see
// database/migrations/001_init.sql) once a DATABASE_URL is provisioned.
declare global {
 // eslint-disable-next-line no-var
 var __voltareCustomers: Map<string, StoredCustomer> | undefined;
}

const store: Map<string, StoredCustomer> =
 globalThis.__voltareCustomers ?? new Map<string, StoredCustomer>();
if (!globalThis.__voltareCustomers) globalThis.__voltareCustomers = store;

function hashPassword(password: string): string {
 const salt = randomBytes(16).toString("hex");
 const derived = scryptSync(password, salt,64).toString("hex");
 return `${salt}:${derived}`;
}

function verifyPassword(password: string, stored: string): boolean {
 const [salt, key] = stored.split(":");
 if (!salt || !key) return false;
 const derived = scryptSync(password, salt,64);
 const keyBuffer = Buffer.from(key, "hex");
 if (keyBuffer.length !== derived.length) return false;
 return timingSafeEqual(derived, keyBuffer);
}

export async function createSessionToken(customerId: string): Promise<string> {
 return new SignJWT({ sub: customerId })
 .setProtectedHeader({ alg: "HS256" })
 .setIssuedAt()
 .setExpirationTime(`${SESSION_MAX_AGE}s`)
 .sign(secret);
}

export async function setSessionCookie(customerId: string): Promise<void> {
 const token = await createSessionToken(customerId);
 const jar = await cookies();
 jar.set(SESSION_COOKIE, token, {
 httpOnly: true,
 sameSite: "lax",
 secure: process.env.NODE_ENV === "production",
 path: "/",
 maxAge: SESSION_MAX_AGE,
 });
}

export async function clearSessionCookie(): Promise<void> {
 const jar = await cookies();
 jar.delete(SESSION_COOKIE);
}

export async function getCurrentCustomer(): Promise<Customer | null> {
 const jar = await cookies();
 const token = jar.get(SESSION_COOKIE)?.value;
 if (!token) return null;
 try {
 const { payload } = await jwtVerify(token, secret);
 const id = payload.sub;
 if (!id) return null;
 const found = store.get(id);
 if (!found) return null;
 const { passwordHash: _ignored, ...customer } = found;
 return customer;
 } catch {
 return null;
 }
}

export type AuthResult =
 | { ok: true; customer: Customer }
 | { ok: false; error: string };

export function registerCustomer(input: {
 email: string;
 password: string;
 fullName: string;
 phone?: string;
 taxId?: string;
}): AuthResult {
 const email = input.email.trim().toLowerCase();
 if (store.has(email)) {
 return { ok: false, error: "Este e-mail já está cadastrado." };
 }
 const customer: StoredCustomer = {
 id: randomUUID(),
 email,
 fullName: input.fullName.trim(),
 phone: input.phone?.trim() || undefined,
 taxId: input.taxId?.trim() || undefined,
 passwordHash: hashPassword(input.password),
 };
 store.set(email, customer);
 const { passwordHash: _ignored, ...safe } = customer;
 return { ok: true, customer: safe };
}

export function authenticateCustomer(email: string, password: string): AuthResult {
 const normalized = email.trim().toLowerCase();
 const found = store.get(normalized);
 if (!found || !verifyPassword(password, found.passwordHash)) {
 return { ok: false, error: "E-mail ou senha inválidos." };
 }
 const { passwordHash: _ignored, ...safe } = found;
 return { ok: true, customer: safe };
}

export function updateCustomer(
 id: string,
 patch: Partial<Pick<Customer, "fullName" | "phone" | "taxId">>,
): Customer | null {
 for (const [email, customer] of store.entries()) {
 if (customer.id === id) {
 const updated: StoredCustomer = { ...customer, ...patch };
 store.set(email, updated);
 const { passwordHash: _ignored, ...safe } = updated;
 return safe;
 }
 }
 return null;
}
