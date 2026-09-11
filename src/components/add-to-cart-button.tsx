"use client";

import { Check, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function AddToCartButton({
 productId,
 quantity =1,
 compact = false,
}: {
 productId: string;
 quantity?: number;
 compact?: boolean;
}) {
 const { addItem } = useCart();
 const [added, setAdded] = useState(false);

 function handleAdd() {
 addItem(productId, quantity);
 setAdded(true);
 window.setTimeout(() => setAdded(false),1400);
 }

 return (
 <button
 type="button"
 onClick={handleAdd}
 className={compact ? "btn-ghost w-full" : "btn-primary w-full sm:w-auto"}
 aria-label="Adicionar ao carrinho"
 >
 {added ? (
 <>
 <Check size={16} /> Adicionado
 </>
 ) : (
 <>
 {compact ? <Plus size={16} /> : <ShoppingCart size={16} />}
 {compact ? "Adicionar" : "Adicionar ao carrinho"}
 </>
 )}
 </button>
 );
}
