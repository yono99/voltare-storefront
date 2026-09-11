export type Category = {
 slug: string;
 name: string;
 tagline: string;
 description: string;
};

export type Spec = { label: string; value: string };

export type Product = {
 id: string;
 sku: string;
 slug: string;
 name: string;
 brand: string;
 categorySlug: string;
 shortDescription: string;
 description: string;
 priceCents: number;
 compareAtCents?: number;
 stock: number;
 rating: number;
 reviewCount: number;
 badge?: "novo" | "oferta" | "mais-vendido";
 specs: Spec[];
};

export type CartLine = {
 productId: string;
 quantity: number;
};

export type Customer = {
 id: string;
 email: string;
 fullName: string;
 phone?: string;
 taxId?: string;
};
