import { ProductGrid } from "@/components/home/ProductGrid";

export default async function ShopCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ q?: string }>;
}) {
  const { category } = await params;
  const { q } = searchParams ? await searchParams : { q: undefined };
  const categorySlug = String(category || "").toLowerCase();
  const categoryFilter = categorySlug === "all" ? undefined : categorySlug.toUpperCase();
  const categoryLabel = categorySlug === "all" ? "SHOP" : categorySlug;
  
  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 bg-alabaster">
      <div className="flex flex-col items-center justify-center mb-24 animate-fade-in-slow">
        <h1 className="font-sans text-4xl md:text-8xl text-charcoal mb-4 uppercase tracking-widest">
          {categoryLabel}
        </h1>
        <p className="font-mono text-xs tracking-[0.2em] text-charcoal/60">
          COLLECTION 2026
        </p>
      </div>
      <ProductGrid category={categoryFilter} query={q} />
    </main>
  );
}
