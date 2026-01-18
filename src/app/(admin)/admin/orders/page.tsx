"use client";

import Link from "next/link";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="font-mono text-xs text-charcoal/50 mt-1">Manage and review customer orders</p>
        </div>
        <Link
          href="/admin/products"
          className="px-4 py-2 border border-charcoal/10 rounded-md text-sm hover:bg-black/5 transition-colors"
        >
          View Products
        </Link>
      </div>

      <div className="bg-white border border-charcoal/5 rounded-xl p-12 text-center">
        <div className="font-sans text-lg text-charcoal">No orders to show</div>
        <div className="mt-2 font-mono text-xs text-charcoal/50">Connect your backend to display live orders.</div>
      </div>
    </div>
  );
}
