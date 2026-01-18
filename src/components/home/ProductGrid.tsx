"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useMemo, type MouseEvent } from "react";
import { PRODUCTS, type Product } from "@/lib/products";

type ProductGridProps = {
  category?: string;
  query?: string;
};

export const ProductGrid = ({ category, query }: ProductGridProps) => {
  const { isInWishlist, addItem, removeItem } = useWishlistStore();

  const filteredProducts = useMemo(() => {
    const normalizedQuery = (query || "").trim().toLowerCase();
    const normalizedCategory = (category || "").trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        !normalizedCategory || product.category.toLowerCase() === normalizedCategory;

      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [category, query]);

  const toggleWishlist = (e: MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-alabaster">
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <div className="font-sans text-lg text-charcoal">No products found</div>
          <div className="mt-2 font-mono text-xs tracking-widest text-charcoal/50">
            TRY A DIFFERENT SEARCH
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16">
          {filteredProducts.map((product) => {
          const isWishlisted = isInWishlist(product.id);
          
          return (
            <Link href={`/product/${product.id}`} key={product.id} className="group block cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-4/5 overflow-hidden bg-[#e5e5e5] mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Wishlist Heart */}
                <button 
                  onClick={(e) => toggleWishlist(e, product)}
                  className={`absolute top-4 right-4 text-alabaster mix-blend-difference transition-all duration-300 z-10 cursor-pointer
                    ${isWishlisted ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'}
                  `}
                  aria-label="Add to wishlist"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill={isWishlisted ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-sans text-sm tracking-wide text-charcoal">{product.name}</h3>
                  <span className="font-mono text-xs text-charcoal/80">${product.price}</span>
                </div>
                <p className="font-mono text-[10px] text-charcoal/40 uppercase tracking-wider">{product.category}</p>
              </div>
            </Link>
          );
          })}
        </div>
      )}
    </section>
  );
};
