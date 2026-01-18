"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { AdminProduct, AdminProductStatus } from "@/lib/adminProducts";

export default function AdminProductEditForm({ product }: { product: AdminProduct }) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [status, setStatus] = useState<AdminProductStatus>(product.status);
  const [price, setPrice] = useState<number>(product.price);
  const [stock, setStock] = useState<number>(product.stock);

  const canSave = useMemo(() => name.trim().length > 0 && category.trim().length > 0, [name, category]);

  const handleSave = async () => {
    if (!canSave) return;

    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        category: category.trim(),
        status,
        price,
        stock,
      }),
    });

    if (!res.ok) return;

    router.push(`/admin/products/${product.id}`);
    router.refresh();
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "DELETE",
    });

    if (!res.ok) return;

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight">Edit Product</h1>
          <p className="font-mono text-xs text-charcoal/50 mt-1">{product.sku}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/products/${product.id}`)}
            className="px-4 py-2 border border-charcoal/10 rounded-md text-sm hover:bg-black/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>

      <div className="bg-white border border-charcoal/5 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <div>
            <label className="block text-sm font-medium text-charcoal/70">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value === "active" ? "active" : "draft")}
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/70">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal font-mono"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-rose-500/20 text-rose-600 rounded-md text-sm hover:bg-rose-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
