"use client";

import { useUIStore } from "@/store/useUIStore";
import Link from "next/link";
import { useEffect } from "react";

const MENU_ITEMS = [
  { 
    catergory: "SHOP", 
    items: ["SHOP ALL", "HOODIES", "TEES", "SHORTS", "ACCESSORIES"] 
  },
  { 
    catergory: "DISCOVER", 
    items: ["CAMPAIGNS", "VEPHTR'S VISION", "CONTACT US."] 
  }
];

function getMenuHref(category: string, item: string): string {
  if (category === "SHOP") {
    return `/shop/${item === "SHOP ALL" ? "all" : item.toLowerCase().replaceAll(" ", "-")}`;
  }

  if (category === "DISCOVER") {
    if (item === "CAMPAIGNS") return "/";
    if (item === "VEPHYR'S VISION") return "/about";
    if (item === "CONTACT US") return "/contact";
  }

  return "/";
}

export const SidebarMenu = () => {
  const { isMenuOpen, closeAll } = useUIStore();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-charcoal/10 backdrop-blur-sm z-40 transition-opacity duration-700
          ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={closeAll}
      />

      {/* Sidebar */}
      <nav 
        className={`fixed top-0 left-0 h-full w-full md:w-125 bg-alabaster z-50 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col p-8 md:p-12 relative">
          
          {/* Close Button */}
          <button 
            onClick={closeAll}
              className="absolute top-8 right-8 font-mono text-xs hover:opacity-50 transition-opacity cursor-pointer"
          >
            [CLOSE]
          </button>

          <div className="mt-24 space-y-16">
            {MENU_ITEMS.map((section, idx) => (
              <div key={idx} className="opacity-0 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <h3 className="font-mono text-xs text-charcoal/40 mb-6 tracking-widest">{section.catergory}</h3>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item}>
                        <Link 
                          href={getMenuHref(section.catergory, item)} 
                          className="font-sans text-3xl md:text-4xl hover:ml-4 transition-all duration-300 block cursor-pointer"
                          onClick={closeAll}
                        >
                          {item}
                        </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-auto opacity-0 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <p className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest">
              © 2026 Vephyr. All Rights Reserved.
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};
