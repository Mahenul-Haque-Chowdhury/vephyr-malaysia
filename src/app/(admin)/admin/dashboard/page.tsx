"use client";

// Placeholder for the main dashboard
import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, Package, ShoppingBag, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
           <span className="px-3 py-1 bg-white border border-charcoal/10 rounded-full text-xs font-mono text-charcoal/60">
             Live Updates: ON
           </span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value="$124,592.00" 
          change="+12.5%" 
          trend="up"
          icon={DollarSign}
        />
        <StatCard 
          title="Active Orders" 
          value="45" 
          change="+2" 
          trend="up"
          icon={ShoppingBag}
        />
         <StatCard 
          title="Low Stock" 
          value="3 Items" 
          change="-1" 
          trend="down" // Good thing
          icon={Package}
        />
         <StatCard 
          title="Conversion" 
          value="3.2%" 
          change="+0.4%" 
          trend="up"
          icon={Activity}
        />
      </div>

      {/* Chart Placeholder */}
      <div className="h-100 w-full bg-white border border-charcoal/5 rounded-xl p-6 flex items-center justify-center text-charcoal/20 font-mono text-sm">
        [SPARKLINE CHART COMPONENT GOES HERE]
      </div>
    </div>
  );
}
