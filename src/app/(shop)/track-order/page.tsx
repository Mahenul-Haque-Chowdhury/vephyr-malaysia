"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // TODO: Implement order tracking API call
    setTimeout(() => setIsSearching(false), 1500);
  };

  return (
    <main className="min-h-screen bg-alabaster pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto max-w-xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-sans text-4xl md:text-5xl tracking-tight mb-4">
            Track Your Order
          </h1>
          <p className="font-mono text-xs text-charcoal/60 tracking-wide">
            ENTER YOUR ORDER DETAILS BELOW
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="block font-mono text-[10px] tracking-widest text-charcoal/50 uppercase">
              Order Number
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. VP-2026-XXXXX"
              className="w-full px-4 py-4 bg-white border border-charcoal/10 font-mono text-sm focus:outline-none focus:border-charcoal/30 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-[10px] tracking-widest text-charcoal/50 uppercase">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-4 bg-white border border-charcoal/10 font-mono text-sm focus:outline-none focus:border-charcoal/30 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-charcoal text-alabaster py-4 font-mono text-xs tracking-widest hover:bg-black transition-colors disabled:opacity-50"
          >
            {isSearching ? "SEARCHING..." : "TRACK ORDER"}
          </button>
        </form>

        {/* Help Links */}
        <div className="mt-16 pt-8 border-t border-charcoal/10 text-center space-y-4">
          <p className="font-mono text-[10px] text-charcoal/40">
            CAN&apos;T FIND YOUR ORDER?
          </p>
          <div className="flex justify-center gap-8">
            <Link href="/contact" className="font-mono text-xs underline hover:opacity-60">
              Contact Support
            </Link>
            <Link href="/faq" className="font-mono text-xs underline hover:opacity-60">
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
