export function formatBRL(cents: number): string {
 return new Intl.NumberFormat("pt-BR", {
 style: "currency",
 currency: "BRL",
 }).format(cents /100);
}

export function discountPercent(priceCents: number, compareAtCents?: number): number | null {
 if (!compareAtCents || compareAtCents <= priceCents) return null;
 return Math.round(((compareAtCents - priceCents) / compareAtCents) *100);
}

export function installmentLabel(priceCents: number, installments =12): string {
 const value = priceCents / installments;
 return `ou ${installments}x de ${formatBRL(value)} sem juros`;
}
