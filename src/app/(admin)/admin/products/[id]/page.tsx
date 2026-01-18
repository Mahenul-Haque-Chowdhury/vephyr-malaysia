import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminProductById } from "@/lib/adminProductsDb";

export const dynamic = "force-dynamic";

export default async function AdminProductViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight">{product.name}</h1>
          <p className="font-mono text-xs text-charcoal/50 mt-1">SKU: {product.sku}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-charcoal/10 rounded-md text-sm hover:bg-black/5 transition-colors"
          >
            Back
          </Link>
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-black transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="bg-white border border-charcoal/5 rounded-xl p-6">
        <div className="flex gap-6">
          <div className="relative w-28 h-36 bg-zinc-100 rounded overflow-hidden shrink-0">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-charcoal/50">CATEGORY</div>
              <div className="text-sm text-charcoal mt-1">{product.category}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-charcoal/50">STATUS</div>
              <div className="text-sm text-charcoal mt-1">{product.status.toUpperCase()}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-charcoal/50">PRICE</div>
              <div className="text-sm text-charcoal mt-1">${product.price.toFixed(2)}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-charcoal/50">STOCK</div>
              <div className="text-sm text-charcoal mt-1">{product.stock}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
