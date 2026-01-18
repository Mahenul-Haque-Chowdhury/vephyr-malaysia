"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative md:fixed left-0 top-0 w-full md:w-64 md:h-screen bg-charcoal text-alabaster flex flex-col border-r border-charcoal/10 font-mono text-sm z-50">
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="font-sans tracking-widest font-bold text-lg cursor-pointer">
          VEPHYR <span className="text-[10px] opacity-50 ml-1">OS</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 md:py-6 px-3 space-y-1 overflow-x-auto md:overflow-x-visible">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 hidden md:block">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-colors">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-xs font-bold">AD</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-xs font-medium">Admin User</p>
            <p className="truncate text-[10px] opacity-50">lead@vephyr.com</p>
          </div>
          <LogOut className="h-4 w-4" />
        </div>
      </div>
    </aside>
  );
}
