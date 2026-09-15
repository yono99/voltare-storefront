export const shippingRules = {
  FREE_SHIPPING_THRESHOLD: 29900,
  FLAT_SHIPPING: 2490,
  PIX_DISCOUNT_RATE: 0.1,
};

export type PaymentMethod = "pix" | "credito" | "boleto";

// Sumber tunggal perhitungan harga. Klien (ringkasan checkout) dan server
// (respons order) harus memakai fungsi ini supaya angkanya tidak mungkin beda.
export function computeTotals(input: {
  subtotalCents: number;
  paymentMethod: PaymentMethod;
}): { shippingCents: number; discountCents: number; totalCents: number } {
  const shippingCents =
    input.subtotalCents === 0 || input.subtotalCents >= shippingRules.FREE_SHIPPING_THRESHOLD
      ? 0
      : shippingRules.FLAT_SHIPPING;

  const discountCents =
    input.paymentMethod === "pix"
      ? Math.round(input.subtotalCents * shippingRules.PIX_DISCOUNT_RATE)
      : 0;

  return {
    shippingCents,
    discountCents,
    totalCents: input.subtotalCents - discountCents + shippingCents,
  };
}
