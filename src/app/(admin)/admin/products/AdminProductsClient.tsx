"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/admin/DataTable";
import type { AdminProduct } from "@/lib/adminProducts";

function StockCell({
  initialValue,
  productId,
  onSaved,
}: {
  initialValue: number;
  productId: string;
  onSaved: (nextStock: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = async () => {
    const res = await fetch(`/api/admin/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: value }),
    });

    if (res.ok) onSaved(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={handleSave}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        className="w-16 px-2 py-1 border border-charcoal/20 rounded text-xs font-mono focus:outline-none focus:ring-1 focus:ring-charcoal"
        autoFocus
      />
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className={`font-mono text-xs px-2 py-1 rounded hover:bg-charcoal/5 transition-colors ${
        value === 0 ? "text-rose-600" : value < 10 ? "text-amber-600" : ""
      }`}
    >
      {value}
    </button>
  );
}

export default function AdminProductsClient({
  initialProducts,
}: {
  initialProducts: AdminProduct[];
}) {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const columns = useMemo<ColumnDef<AdminProduct>[]>(() => {
    return [
      {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => (
          <div className="relative w-12 h-16 bg-gray-100 rounded overflow-hidden">
            <Image src={row.original.image} alt={row.original.name} fill className="object-cover" />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-sm">{row.original.name}</p>
            <p className="font-mono text-[10px] text-charcoal/50">{row.original.category}</p>
          </div>
        ),
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => (
          <span className="font-mono text-xs text-charcoal/70">{row.original.sku}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="font-mono text-xs">${row.original.price.toFixed(2)}</span>
        ),
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
          <StockCell
            initialValue={row.original.stock}
            productId={row.original.id}
            onSaved={(nextStock) => {
              setProducts((prev) =>
                prev.map((p) => (p.id === row.original.id ? { ...p, stock: nextStock } : p))
              );
            }}
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          return (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                s === "active" ? "bg-emerald-100 text-emerald-700" : "bg-charcoal/10 text-charcoal/60"
              }`}
            >
              {s}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Link
              href={`/admin/products/${row.original.id}`}
              className="p-2 hover:bg-charcoal/5 rounded transition-colors"
              title="View"
            >
              <Eye className="h-4 w-4 text-charcoal/50" />
            </Link>
            <Link
              href={`/admin/products/${row.original.id}/edit`}
              className="p-2 hover:bg-charcoal/5 rounded transition-colors"
              title="Edit"
            >
              <Pencil className="h-4 w-4 text-charcoal/50" />
            </Link>
            <button
              className="p-2 hover:bg-rose-50 rounded transition-colors"
              title="Delete"
              onClick={async () => {
                const res = await fetch(`/api/admin/products/${row.original.id}`, { method: "DELETE" });
                if (!res.ok) return;
                setProducts((prev) => prev.filter((p) => p.id !== row.original.id));
              }}
            >
              <Trash2 className="h-4 w-4 text-rose-500/70" />
            </button>
          </div>
        ),
      },
    ];
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (status && p.status !== status) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [products, search, category, status]);

  const total = products.length;
  const lowStock = products.filter((p) => p.stock < 10).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight">Products</h1>
          <p className="font-mono text-xs text-charcoal/50 mt-1">
            {total} total products • {lowStock} low stock
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-black transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-charcoal/10 rounded-md text-sm w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-charcoal"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-charcoal/10 rounded-md text-sm focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border border-charcoal/10 rounded-md text-sm focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-charcoal/5 rounded-xl p-12 text-center">
          <div className="font-sans text-lg text-charcoal">No products match your filters</div>
          <div className="mt-2 font-mono text-xs text-charcoal/50">Try clearing search, category, or status.</div>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredProducts} />
      )}
    </div>
  );
}
