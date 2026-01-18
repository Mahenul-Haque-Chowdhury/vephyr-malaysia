"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  details: string[];
  image: string;
  category: string;
}

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useCartStore();
  const { toggleCart } = useUIStore();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });

    toggleCart();
  };

  return (
    <main className="min-h-screen bg-alabaster pt-24 md:pt-0">
      <div className="flex flex-col md:flex-row h-full min-h-screen">
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen bg-[#e5e5e5] relative overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-24 py-12 md:py-0">
          <div className="max-w-md animate-slide-up">
            <span className="font-mono text-xs tracking-widest text-charcoal/60 mb-4 block">COLLECTION 001</span>
            <h1 className="font-sans text-4xl md:text-5xl text-charcoal mb-4 leading-none">{product.name}</h1>
            <p className="font-mono text-xl text-charcoal mb-8">${product.price}</p>

            <div className="space-y-6 mb-12 border-t border-charcoal/10 pt-8">
              <p className="font-mono text-sm leading-relaxed text-charcoal/80">{product.description}</p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="font-mono text-xs text-charcoal/60 flex items-center gap-2">
                    <span className="w-1 h-1 bg-charcoal/40 rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mb-8">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border font-mono text-xs transition-colors ${
                    selectedSize === size ? "bg-charcoal text-alabaster border-charcoal" : "border-charcoal/20 hover:bg-charcoal hover:text-alabaster"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button onClick={handleAddToCart} className="w-full bg-charcoal text-alabaster py-4 font-mono text-xs tracking-[0.2em] hover:opacity-90 transition-opacity">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
