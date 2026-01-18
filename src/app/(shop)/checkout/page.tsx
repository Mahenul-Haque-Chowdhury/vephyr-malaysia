"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function CheckoutPage() {
  const { openAuth } = useUIStore();
  const { user, isGuest, setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const lastUpsertedEmail = useRef<string | null>(null);

  useEffect(() => {
    if (user || isGuest) return;
    openAuth({ intent: "checkout", returnTo: "/checkout" });
  }, [openAuth, user, isGuest]);

  if (!user && !isGuest) {
    return (
      <main className="min-h-screen pt-32 px-6 md:px-12 bg-alabaster">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-sans text-3xl tracking-wide">CHECKOUT</h1>
          <p className="mt-6 font-mono text-xs tracking-widest text-charcoal/50">
            PLEASE SIGN IN OR CONTINUE AS GUEST
          </p>
        </div>
      </main>
    );
  }

  const upsertGuestFromCheckoutEmail = async (rawEmail: string) => {
    const normalizedEmail = rawEmail.trim().toLowerCase();
    if (!normalizedEmail) return;
    if (!normalizedEmail.includes("@")) return;
    if (lastUpsertedEmail.current === normalizedEmail) return;

    lastUpsertedEmail.current = normalizedEmail;
    try {
      const res = await fetch("/api/auth/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, kind: "guest" }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { user: import("@/types/auth").AuthUser };
      setUser(data.user);
    } catch {
      // ignore in UI for now
    }
  };

  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 bg-alabaster">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        
        {/* Left: Form */}
        <div className="space-y-12 animate-fade-in-slow">
          <h1 className="font-sans text-3xl tracking-wide">CHECKOUT</h1>
          
          {/* Shipping */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs tracking-widest text-charcoal/40 border-b border-charcoal/10 pb-2">
              01. SHIPPING
            </h2>

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => upsertGuestFromCheckoutEmail(email)}
              className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <input placeholder="First Name" className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"/>
               <input placeholder="Last Name" className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"/>
            </div>
            <input placeholder="Address" className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <input placeholder="City" className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"/>
               <input placeholder="Postcode" className="bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal placeholder:text-charcoal/30"/>
            </div>
          </section>

          {/* Payment */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs tracking-widest text-charcoal/40 border-b border-charcoal/10 pb-2">
              02. PAYMENT
            </h2>
            <div className="p-4 border border-charcoal/10 font-mono text-xs text-charcoal/60 text-center">
              [ SECURE STRIPE FORM PLACEHOLDER ]
            </div>
          </section>

          <button className="w-full bg-charcoal text-alabaster py-4 font-mono text-xs tracking-[0.2em] hover:bg-black transition-colors">
            PAY $450.00
          </button>
        </div>

        {/* Right: Summary */}
        <div className="block bg-white/40 p-6 sm:p-8 md:p-12 h-fit md:sticky md:top-32">
          <h3 className="font-mono text-xs tracking-widest mb-8">ORDER SUMMARY</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between font-mono text-sm">
              <span className="text-charcoal/60">Structural Hoodie (x1)</span>
              <span>$450.00</span>
            </div>
          </div>

          <div className="border-t border-charcoal/10 pt-4 space-y-2">
            <div className="flex justify-between font-mono text-xs text-charcoal/60">
              <span>Subtotal</span>
              <span>$450.00</span>
            </div>
            <div className="flex justify-between font-mono text-xs text-charcoal/60">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
             <div className="flex justify-between font-mono text-sm pt-4 border-t border-charcoal/10 mt-4">
              <span>Total</span>
              <span>$450.00</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
