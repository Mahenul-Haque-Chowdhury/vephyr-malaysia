"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Copy, Plus, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
// Assuming Shadcn components will be installed by user
// Using standard HTML fallbacks where Shadcn would be, annotated with comments

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  sku: z.string().min(3, "SKU is required"),
  description: z.string().optional(),
  price: z.number().min(0),
  stock: z.number().min(0),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["draft", "active"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const router = useRouter();
  // Placeholder state for future media/variant features
  const images: string[] = [];
  const variants: { size: string; color: string; stock: number }[] = [];

  const getBaseUrl = () => {
    if (typeof window !== "undefined") return window.location.origin;
    const port = process.env.PORT ?? 3000;
    return process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:${port}`;
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: 0,
      stock: 0,
      status: "draft",
    },
  });

  const handleFormSubmit = async (data: ProductFormValues) => {
    const image =
      images[0] ??
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200";
    const category = data.category
      ? data.category.charAt(0).toUpperCase() + data.category.slice(1)
      : "Uncategorized";

    const res = await fetch(new URL("/api/admin/products", getBaseUrl()), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        sku: data.sku,
        price: Number(data.price),
        stock: Number(data.stock),
        category,
        status: data.status,
        image,
      }),
    });

    if (!res.ok) return;
    const json = (await res.json()) as { product: { id: string } };
    router.push(`/admin/products/${json.product.id}`);
    router.refresh();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-2xl font-bold tracking-tight">Create Product</h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 text-sm font-medium border border-charcoal/10 rounded-md hover:bg-black/5"
            onClick={() => {
              form.setValue("status", "draft");
              void form.handleSubmit(handleFormSubmit)();
            }}
          >
            Save Draft
          </button>
          <button 
             onClick={() => {
               form.setValue("status", "active");
               void form.handleSubmit(handleFormSubmit)();
             }}
             className="px-4 py-2 text-sm font-medium bg-charcoal text-white rounded-md hover:bg-black/90"
          >
            Publish Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Details */}
          <div className="p-6 bg-white border border-charcoal/5 rounded-xl space-y-4">
            <h3 className="font-medium">Product Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-charcoal/70">Name</label>
                <input 
                  {...form.register("name")}
                  className="w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal"
                  placeholder="e.g. Oversized Heavyweight Tee"
                />
                {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-charcoal/70">SKU</label>
                <input 
                  {...form.register("sku")}
                  className="w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal font-mono text-sm"
                  placeholder="VP-SS26-001"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-charcoal/70">Category</label>
                <select 
                  {...form.register("category")}
                  className="w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal"
                >
                  <option value="">Select category</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-charcoal/70">Description (Markdown)</label>
                <textarea 
                  {...form.register("description")}
                  className="w-full h-32 px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal font-mono text-sm"
                  placeholder="# Product Description..."
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="p-6 bg-white border border-charcoal/5 rounded-xl space-y-4">
            <h3 className="font-medium">Pricing & Inventory</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-sm font-medium text-charcoal/70">Base Price</label>
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/50">$</span>
                   <input 
                    type="number"
                    {...form.register("price")}
                    className="w-full pl-7 pr-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal font-mono"
                   />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-sm font-medium text-charcoal/70">Stock (Global)</label>
                 <input 
                    type="number"
                    {...form.register("stock")}
                    className="w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-charcoal font-mono"
                 />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="p-6 bg-white border border-charcoal/5 rounded-xl space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="font-medium">Variants</h3>
                <button type="button" className="text-xs flex items-center gap-1 hover:underline">
                  <Plus className="h-3 w-3" /> Add Variant
                </button>
             </div>
             
             {/* Simple Variant placeholder visualization */}
             <div className="border border-dashed border-charcoal/20 rounded-lg p-8 flex flex-col items-center justify-center text-charcoal/40 bg-zinc-50/50">
               <Copy className="h-8 w-8 mb-2 opacity-50" />
               <p className="text-sm">No variants added yet.</p>
               <p className="text-xs mt-1">Add Product Options like Size or Color.</p>
             </div>
          </div>

        </div>

        {/* Right Column: Media */}
        <div className="space-y-8">
           <div className="p-6 bg-white border border-charcoal/5 rounded-xl space-y-4">
             <h3 className="font-medium">Media</h3>
             
             {/* Dropzone */}
             <div className="border-2 border-dashed border-charcoal/10 rounded-lg h-48 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 transition-colors">
               <UploadCloud className="h-8 w-8 text-charcoal/30 mb-2" />
               <p className="text-sm font-medium text-charcoal/70">Click to upload image</p>
               <p className="text-xs text-charcoal/40 mt-1">or drag and drop</p>
             </div>
           </div>

           <div className="p-6 bg-white border border-charcoal/5 rounded-xl space-y-4">
             <h3 className="font-medium">Organization</h3>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-sm font-medium text-charcoal/70">Status</label>
                   <select 
                     {...form.register("status")}
                     className="w-full px-3 py-2 border border-charcoal/10 rounded-md focus:outline-none"
                   >
                     <option value="draft">Draft</option>
                     <option value="active">Active</option>
                   </select>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
