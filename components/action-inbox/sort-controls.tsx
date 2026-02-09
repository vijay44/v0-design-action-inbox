"use client";

import { cn } from "@/lib/utils";
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";

export type SortField =
  | "time"
  | "urgency"
  | "priority"
  | "category"
  | "sentiment";
export type SortDirection = "asc" | "desc";

interface SortControlsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const sortOptions: { field: SortField; label: string }[] = [
  { field: "time", label: "Time" },
  { field: "urgency", label: "Urgency" },
  { field: "priority", label: "Priority" },
  { field: "category", label: "Category" },
  { field: "sentiment", label: "Sentiment" },
];

export function SortControls({
  sortField,
  sortDirection,
  onSort,
}: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ArrowUpDown className="h-3.5 w-3.5" />
        Sort:
      </span>
      <div className="flex items-center gap-1">
        {sortOptions.map(({ field, label }) => {
          const isActive = sortField === field;
          return (
            <button
              key={field}
              onClick={() => onSort(field)}
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {label}
              {isActive &&
                (sortDirection === "desc" ? (
                  <ArrowDown className="h-3 w-3" />
                ) : (
                  <ArrowUp className="h-3 w-3" />
                ))}
            </button>
          );
        })}
      </div>
    </div>
  );
}
