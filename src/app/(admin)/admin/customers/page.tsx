"use client";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-semibold tracking-tight">Customers</h1>
        <p className="font-mono text-xs text-charcoal/50 mt-1">Customer list and profiles</p>
      </div>

      <div className="bg-white border border-charcoal/5 rounded-xl p-12 text-center">
        <div className="font-sans text-lg text-charcoal">No customers to show</div>
        <div className="mt-2 font-mono text-xs text-charcoal/50">Connect your backend to display customers.</div>
      </div>
    </div>
  );
}
