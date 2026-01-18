import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/home/ProductGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-alabaster selection:bg-charcoal selection:text-alabaster">
      <Hero />
      <ProductGrid />
    </main>
  );
}
