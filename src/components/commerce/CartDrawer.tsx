"use client";

import { useUIStore } from "@/store/useUIStore";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CartDrawer = () => {
  const { isCartOpen, toggleCart, openAuth } = useUIStore();
  const { items, removeItem, updateQuantity, getItemCount, getSubtotal } = useCartStore();
  const { user, isGuest } = useAuthStore();
  const router = useRouter();
  
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const FREE_SHIPPING_THRESHOLD = 500;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-50 transition-opacity duration-500
          ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-125 bg-alabaster z-50 shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col relative">
          
          {/* Header */}
          <div className="p-8 flex items-center justify-between border-b border-charcoal/10">
            <h2 className="font-mono text-xs tracking-widest">CART ({itemCount})</h2>
            <button onClick={toggleCart} className="font-mono text-xs hover:opacity-50 cursor-pointer">
              [CLOSE]
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-8 py-4 bg-white/50">
            <div className="flex justify-between font-mono text-[10px] mb-2 text-charcoal/60">
              <span>Free Shipping</span>
              <span>{amountToFreeShipping > 0 ? `$${amountToFreeShipping.toFixed(2)} away` : "Unlocked!"}</span>
            </div>
            <div className="h-0.5 w-full bg-charcoal/10 overflow-hidden">
              <div className="h-full bg-charcoal transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="font-mono text-xs text-charcoal/40 mb-4">YOUR BAG IS EMPTY</p>
                <Link 
                  href="/shop/all" 
                  onClick={toggleCart}
                  className="font-mono text-xs underline hover:opacity-60 cursor-pointer"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-6">
                  <div className="relative w-24 h-32 bg-gray-200 shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-sans text-lg leading-none">{item.name}</h3>
                        <span className="font-mono text-xs">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="font-mono text-[10px] text-charcoal/60">SIZE: {item.size}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 font-mono text-xs border border-charcoal/10 px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="hover:opacity-50 cursor-pointer"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="hover:opacity-50 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.size)}
                        className="font-mono text-[10px] underline decoration-charcoal/30 hover:decoration-charcoal cursor-pointer"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-charcoal/10 bg-white/30">
            <div className="flex justify-between font-mono text-xs mb-6">
              <span>SUBTOTAL</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                toggleCart();
                if (!user && !isGuest) {
                  openAuth({ intent: "checkout", returnTo: "/checkout" });
                  return;
                }
                router.push("/checkout");
              }}
              className="w-full bg-charcoal text-alabaster py-4 font-mono text-xs tracking-[0.2em] hover:bg-black transition-colors cursor-pointer text-center"
            >
              CHECKOUT
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

