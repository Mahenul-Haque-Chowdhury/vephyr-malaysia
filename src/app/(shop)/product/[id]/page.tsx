import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import { PRODUCTS } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Find product by id (match string or number)
  const product = PRODUCTS.find((p) => String(p.id) === String(id) || p.id === Number(id));

  if (!product) {
    return (
      <main className="min-h-screen bg-alabaster pt-24 flex items-center justify-center">
        <div className="text-charcoal">Product not found.</div>
      </main>
    );
  }

  // Render client component for interactive parts
  return <ProductDetailsClient product={product} />;
}
