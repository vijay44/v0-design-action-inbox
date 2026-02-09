"use client";

import React from "react"

import { cn } from "@/lib/utils";
import type { Category, ActionItem } from "@/lib/mock-data";
import {
  AlertTriangle,
  Bug,
  CircleHelp,
  ClipboardList,
  Info,
  ShieldAlert,
  Inbox,
} from "lucide-react";

interface CategoryCount {
  category: Category | "all";
  count: number;
  icon: React.ReactNode;
  colorClasses: {
    bg: string;
    bgActive: string;
    text: string;
    border: string;
    borderActive: string;
    badge: string;
    badgeText: string;
  };
}

const categoryConfig: Record<
  Category,
  {
    icon: React.ReactNode;
    colorClasses: CategoryCount["colorClasses"];
  }
> = {
  Blocker: {
    icon: <ShieldAlert className="h-4 w-4" />,
    colorClasses: {
      bg: "bg-card",
      bgActive: "bg-ads-red-subtle",
      text: "text-ads-red-bold",
      border: "border-border",
      borderActive: "border-ads-red-bold",
      badge: "bg-ads-red-bold",
      badgeText: "text-card",
    },
  },
  Bug: {
    icon: <Bug className="h-4 w-4" />,
    colorClasses: {
      bg: "bg-card",
      bgActive: "bg-ads-yellow-subtle",
      text: "text-ads-yellow-bold",
      border: "border-border",
      borderActive: "border-ads-yellow-bold",
      badge: "bg-ads-yellow-bold",
      badgeText: "text-card",
    },
  },
  Question: {
    icon: <CircleHelp className="h-4 w-4" />,
    colorClasses: {
      bg: "bg-card",
      bgActive: "bg-ads-teal-subtle",
      text: "text-ads-teal-bold",
      border: "border-border",
      borderActive: "border-ads-teal-bold",
      badge: "bg-ads-teal-bold",
      badgeText: "text-card",
    },
  },
  Task: {
    icon: <ClipboardList className="h-4 w-4" />,
    colorClasses: {
      bg: "bg-card",
      bgActive: "bg-ads-blue-subtle",
      text: "text-ads-blue-bold",
      border: "border-border",
      borderActive: "border-ads-blue-bold",
      badge: "bg-ads-blue-bold",
      badgeText: "text-card",
    },
  },
  Info: {
    icon: <Info className="h-4 w-4" />,
    colorClasses: {
      bg: "bg-card",
      bgActive: "bg-ads-neutral-subtle",
      text: "text-ads-neutral-bold",
      border: "border-border",
      borderActive: "border-ads-neutral-bold",
      badge: "bg-ads-neutral-bold",
      badgeText: "text-card",
    },
  },
};

interface CategorySummaryBarProps {
  items: ActionItem[];
  selectedCategories: Set<Category>;
  onToggleCategory: (category: Category) => void;
  onClearAll: () => void;
}

export function CategorySummaryBar({
  items,
  selectedCategories,
  onToggleCategory,
  onClearAll,
}: CategorySummaryBarProps) {
  const unresolvedItems = items.filter((item) => !item.isResolved);
  const categoryCounts = (Object.keys(categoryConfig) as Category[]).map(
    (cat) => ({
      category: cat,
      count: unresolvedItems.filter((item) => item.category === cat).length,
      ...categoryConfig[cat],
    })
  );

  const totalUnresolved = unresolvedItems.length;
  const hasActiveFilters = selectedCategories.size > 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Unresolved by category
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            type="button"
            className="text-xs font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Total count chip */}
        <button
          onClick={onClearAll}
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-sm border px-3 py-1.5 text-sm font-medium transition-colors",
            !hasActiveFilters
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:bg-secondary"
          )}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>All</span>
          <span
            className={cn(
              "ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
              !hasActiveFilters
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {totalUnresolved}
          </span>
        </button>

        <div className="h-5 w-px bg-border" />

        {categoryCounts.map(({ category, count, icon, colorClasses }) => {
          const isActive = selectedCategories.has(category);
          return (
            <button
              key={category}
              onClick={() => onToggleCategory(category)}
              type="button"
              className={cn(
                "flex items-center gap-2 rounded-sm border px-3 py-1.5 text-sm font-medium transition-all",
                isActive
                  ? cn(
                      colorClasses.bgActive,
                      colorClasses.borderActive,
                      colorClasses.text
                    )
                  : cn(
                      colorClasses.bg,
                      colorClasses.border,
                      "text-muted-foreground hover:bg-secondary"
                    )
              )}
              disabled={count === 0}
            >
              {icon}
              <span>{category}</span>
              <span
                className={cn(
                  "ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                  isActive
                    ? cn(colorClasses.badge, colorClasses.badgeText)
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
