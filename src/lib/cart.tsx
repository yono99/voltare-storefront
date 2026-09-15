"use client";

import {
 createContext,
 useCallback,
 useContext,
 useEffect,
 useMemo,
 useState,
} from "react";
import type { CartLine, Product } from "./types";
import { products } from "./data";
import { shippingRules } from "./cart-rules";

const STORAGE_KEY = "voltare.cart.v1";

export type CartItem = {
 product: Product;
 quantity: number;
 lineTotalCents: number;
};

type CartContextValue = {
 lines: CartLine[];
 items: CartItem[];
 itemCount: number;
 subtotalCents: number;
 shippingCents: number;
 totalCents: number;
 addItem: (productId: string, quantity?: number) => void;
 removeItem: (productId: string) => void;
 setQuantity: (productId: string, quantity: number) => void;
 clear: () => void;
 isHydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
 const [lines, setLines] = useState<CartLine[]>([]);
 const [isHydrated, setIsHydrated] = useState(false);

 useEffect(() => {
 try {
 const raw = window.localStorage.getItem(STORAGE_KEY);
 if (raw) {
 const parsed = JSON.parse(raw) as CartLine[];
 if (Array.isArray(parsed)) setLines(parsed);
 }
 } catch {
 // Corrupted storage should not break the storefront.
 }
 setIsHydrated(true);
 }, []);

 useEffect(() => {
 if (!isHydrated) return;
 try {
 window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
 } catch {
 // Storage may be unavailable (private mode); cart stays in memory.
 }
 }, [lines, isHydrated]);

 const addItem = useCallback((productId: string, quantity =1) => {
 setLines((prev) => {
 const existing = prev.find((l) => l.productId === productId);
 if (existing) {
 return prev.map((l) =>
 l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l,
 );
 }
 return [...prev, { productId, quantity }];
 });
 }, []);

 const removeItem = useCallback((productId: string) => {
 setLines((prev) => prev.filter((l) => l.productId !== productId));
 }, []);

 const setQuantity = useCallback((productId: string, quantity: number) => {
 if (quantity <=0) {
 setLines((prev) => prev.filter((l) => l.productId !== productId));
 return;
 }
 setLines((prev) =>
 prev.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
 );
 }, []);

 const clear = useCallback(() => setLines([]), []);

 const items = useMemo<CartItem[]>(() => {
 return lines
 .map((line) => {
 const product = products.find((p) => p.id === line.productId);
 if (!product) return null;
 return {
 product,
 quantity: line.quantity,
 lineTotalCents: product.priceCents * line.quantity,
 };
 })
 .filter((x): x is CartItem => x !== null);
 }, [lines]);

 const subtotalCents = useMemo(
 () => items.reduce((sum, item) => sum + item.lineTotalCents,0),
 [items],
 );

 const itemCount = useMemo(
 () => items.reduce((sum, item) => sum + item.quantity,0),
 [items],
 );

 const shippingCents = useMemo(() => {
 if (subtotalCents ===0) return 0;
 return subtotalCents >= shippingRules.FREE_SHIPPING_THRESHOLD ? 0 : shippingRules.FLAT_SHIPPING;
 }, [subtotalCents]);

 const value: CartContextValue = {
 lines,
 items,
 itemCount,
 subtotalCents,
 shippingCents,
 totalCents: subtotalCents + shippingCents,
 addItem,
 removeItem,
 setQuantity,
 clear,
 isHydrated,
 };

 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
 const ctx = useContext(CartContext);
 if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
 return ctx;
}

export { shippingRules };
