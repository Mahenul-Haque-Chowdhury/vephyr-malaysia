"use client";

import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ElementType;
}

export function StatCard({ title, value, change, trend = "neutral", icon: Icon }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white border border-charcoal/5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">
          {title}
        </h3>
        {Icon && <Icon className="h-4 w-4 text-charcoal/40" />}
      </div>
      
      <div className="space-y-1">
        <p className="font-mono text-2xl md:text-3xl font-medium tracking-tight">
          {value}
        </p>
        
        {change && (
          <div className="flex items-center gap-1 text-xs font-mono">
            {trend === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-600" />}
            {trend === "down" && <ArrowDownRight className="h-3 w-3 text-rose-600" />}
            <span className={trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-600" : "text-charcoal/50"}>
              {change}
            </span>
            <span className="text-charcoal/40">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
