import Link from "next/link";

import AdminProductEditForm from "@/components/admin/AdminProductEditForm";
import { getAdminProductById } from "@/lib/adminProductsDb";

export const dynamic = "force-dynamic";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product) {
    return (
      <div className="bg-white border border-charcoal/5 rounded-xl p-12 text-center">
        <div className="font-sans text-lg text-charcoal">Product not found</div>
        <div className="mt-4">
          <Link
            href="/admin/products"
            className="inline-flex px-4 py-2 border border-charcoal/10 rounded-md text-sm hover:bg-black/5 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <AdminProductEditForm product={product} />;
}
