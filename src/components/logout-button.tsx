"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
 const router = useRouter();
 const [submitting, setSubmitting] = useState(false);

 async function handleLogout() {
 setSubmitting(true);
 try {
 await fetch("/api/auth/logout", { method: "POST" });
 router.push("/");
 router.refresh();
 } finally {
 setSubmitting(false);
 }
 }

 return (
 <button type="button" onClick={handleLogout} className="btn-ghost" disabled={submitting}>
 <LogOut size={16} />
 {submitting ? "Saindo…" : "Sair"}
 </button>
 );
}
