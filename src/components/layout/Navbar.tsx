"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { PRODUCTS, Product } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// Cart Preview Component connected to real store
const CartPreview = () => {
  const { items, getItemCount, getSubtotal } = useCartStore();
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  
  return (
    <div className="absolute top-10 right-0 w-64 bg-alabaster border border-charcoal/10 p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
      <div className="border-b border-charcoal/10 pb-2 mb-2 font-mono text-[10px] tracking-widest text-charcoal/60">
        YOUR BAG ({itemCount})
      </div>
      {items.length === 0 ? (
        <p className="text-center font-mono text-[10px] text-charcoal/40 py-4">Your bag is empty</p>
      ) : (
        <>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {items.slice(0, 3).map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-3">
                <div className="w-10 h-12 bg-gray-200 relative shrink-0">
                  <Image src={item.image} fill className="object-cover" alt={item.name} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-sans text-[10px] line-clamp-1">{item.name}</span>
                  <span className="font-mono text-[10px] opacity-60">${item.price.toFixed(2)} × {item.quantity}</span>
                </div>
              </div>
            ))}
            {items.length > 3 && (
              <p className="font-mono text-[10px] text-charcoal/40">+{items.length - 3} more items</p>
            )}
          </div>
          <div className="pt-3 mt-3 border-t border-charcoal/10 flex justify-between font-mono text-[10px]">
            <span>TOTAL</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

// Search Overlay Component
const SearchOverlay = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle search
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered.slice(0, 6));
  }, []);

  const handleClose = useCallback(() => {
    closeSearch();
    setQuery("");
    setResults([]);
  }, [closeSearch]);

  // Focus input when overlay opens
  useEffect(() => {
    if (!isSearchOpen) return;
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen, handleClose]);

  // Navigate to product
  const handleProductClick = (productId: number) => {
    closeSearch();
    router.push(`/product/${productId}`);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-500 ${
          isSearchOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Search Panel */}
      <div
        className={`absolute top-0 left-0 right-0 bg-alabaster transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 py-8 md:py-12">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 md:right-12 w-10 h-10 flex items-center justify-center group cursor-pointer"
            aria-label="Close search"
          >
            <span className="absolute w-6 h-[1.5px] bg-charcoal rotate-45 transition-transform duration-300 group-hover:rotate-135" />
            <span className="absolute w-6 h-[1.5px] bg-charcoal -rotate-45 transition-transform duration-300 group-hover:rotate-45" />
          </button>

          {/* Search Input */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-charcoal/40"
                >
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-4 bg-transparent border-b-2 border-charcoal/20 focus:border-charcoal font-sans text-xl md:text-2xl tracking-wide placeholder:text-charcoal/30 outline-none transition-colors duration-300"
              />
              {query && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-charcoal/40 hover:text-charcoal transition-colors cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>

            {/* Quick Links */}
            {!query && (
              <div className="mt-8 animate-fade-in-slow">
                <p className="font-mono text-[10px] tracking-widest text-charcoal/50 mb-4">POPULAR SEARCHES</p>
                <div className="flex flex-wrap gap-3">
                  {["HOODIES", "TEES", "SHORTS", "ACCESSORIES"].map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-4 py-2 border border-charcoal/20 font-mono text-xs tracking-wider hover:bg-charcoal hover:text-alabaster transition-all duration-300 cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && results.length > 0 && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in-slow">
                {results.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="group text-left cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="aspect-3/4 relative overflow-hidden bg-charcoal/5 mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="font-mono text-[10px] tracking-widest text-charcoal/50 mb-1">
                      {product.category}
                    </p>
                    <h4 className="font-sans text-sm tracking-wide group-hover:opacity-60 transition-opacity">
                      {product.name}
                    </h4>
                    <p className="font-mono text-xs mt-1">${product.price}</p>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && results.length === 0 && (
              <div className="mt-12 text-center animate-fade-in-slow">
                <p className="font-mono text-sm tracking-wider text-charcoal/50">
                  No products found for &quot;{query}&quot;
                </p>
                <p className="font-mono text-xs tracking-wider text-charcoal/30 mt-2">
                  Try searching for hoodies, tees, or accessories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleMenu, toggleCart, toggleSearch, openAuth, isMenuOpen } = useUIStore();
  const { user } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const isHome = pathname === "/";
  const navDelay = isHome ? 2.0 : 0.2;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SearchOverlay />
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "bg-glass-panel backdrop-blur-md py-4" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Hamburger + Search */}
          <motion.div
            className="flex items-center gap-4"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -36 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: navDelay }
            }
          >
            <button 
              onClick={toggleMenu}
              className="group flex flex-col gap-1.5 w-8 h-8 justify-center items-start cursor-pointer"
              aria-label="Menu"
            >
              <span className={`h-[1.5px] bg-charcoal transition-all duration-300 ${isMenuOpen ? "w-0" : "w-full"}`} />
              <span className={`h-[1.5px] bg-charcoal w-2/3 group-hover:w-full transition-all duration-300`} />
              <span className={`h-[1.5px] bg-charcoal w-1/3 group-hover:w-full transition-all duration-300`} />
            </button>

            {/* Search Button */}
            <button
              onClick={toggleSearch}
              className="group w-8 h-8 flex items-center justify-center cursor-pointer"
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-all duration-300 group-hover:scale-110"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-all duration-300 origin-center group-hover:r-8"
                />
                <path
                  d="M20 20L16.5 16.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </svg>
            </button>
          </motion.div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 cursor-pointer">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -22 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: navDelay + 0.1 }
              }
            >
              <Image
                src="/logo.png"
                alt="VEPHYR"
                width={300}
                height={72}
                className="h-12 sm:h-14 md:h-20 w-auto max-w-45 sm:max-w-55 md:max-w-none"
                priority
              />
            </motion.div>
          </Link>

          {/* Right: Actions */}
          <motion.div
            className="flex items-center gap-6 md:gap-8 font-mono text-xs tracking-wider text-charcoal"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 36 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: navDelay + 0.2 }
            }
          >
            
            <button
              onClick={() => {
                if (user) {
                  router.push("/account");
                  return;
                }
                openAuth({ intent: "account", returnTo: pathname });
              }}
              className="hidden md:block hover:opacity-60 transition-opacity cursor-pointer"
            >
              ACCOUNT
            </button>
            
            <div className="relative group h-10 flex items-center">
              <button onClick={toggleCart} className="hover:opacity-60 transition-opacity flex items-center gap-2 cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Hover Preview */}
              <CartPreview />
            </div>

          </motion.div>
        </div>
      </header>
    </>
  );
};
