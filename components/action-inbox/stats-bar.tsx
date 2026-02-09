"use client";

import type { ActionItem } from "@/lib/mock-data";
import { Clock, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

interface StatsBarProps {
  items: ActionItem[];
}

export function StatsBar({ items }: StatsBarProps) {
  const totalUnresolved = items.filter((i) => !i.isResolved).length;
  const criticalCount = items.filter(
    (i) => !i.isResolved && i.urgency === "Critical"
  ).length;
  const recentCount = items.filter((i) => {
    const time = i.relativeTime;
    return (
      !i.isResolved &&
      (time.includes("h ago") || time.includes("m ago") || time === "just now")
    );
  }).length;
  const resolvedCount = items.filter((i) => i.isResolved).length;

  const stats = [
    {
      label: "Unresolved",
      value: totalUnresolved,
      icon: <Clock className="h-4 w-4" />,
      color: "text-ads-blue-bold",
      bgColor: "bg-ads-blue-subtle",
    },
    {
      label: "Critical",
      value: criticalCount,
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "text-ads-red-bold",
      bgColor: "bg-ads-red-subtle",
    },
    {
      label: "New today",
      value: recentCount,
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-ads-yellow-bold",
      bgColor: "bg-ads-yellow-subtle",
    },
    {
      label: "Resolved",
      value: resolvedCount,
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: "text-ads-green-bold",
      bgColor: "bg-ads-green-subtle",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3"
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-sm ${stat.bgColor} ${stat.color}`}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-xl font-semibold text-foreground leading-tight">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
