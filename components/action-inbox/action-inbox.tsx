"use client";

import { useState, useMemo, useCallback } from "react";
import type { Category, ActionItem } from "@/lib/mock-data";
import { mockActionItems } from "@/lib/mock-data";
import { StatsBar } from "./stats-bar";
import { CategorySummaryBar } from "./category-summary-bar";
import {
  SortControls,
  type SortField,
  type SortDirection,
} from "./sort-controls";
import { ActionItemCard } from "./action-item-card";
import { Pagination } from "./pagination";
import { RefreshCw, Settings, Search, Inbox } from "lucide-react";

const ITEMS_PER_PAGE = 5;

const urgencyOrder: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};
const priorityOrder: Record<string, number> = {
  P0: 0,
  P1: 1,
  P2: 2,
  P3: 3,
  P4: 4,
};
const sentimentOrder: Record<string, number> = {
  Urgent: 0,
  Negative: 1,
  Neutral: 2,
  Positive: 3,
};

export function ActionInbox() {
  const [items, setItems] = useState<ActionItem[]>(mockActionItems);
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set()
  );
  const [sortField, setSortField] = useState<SortField>("time");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleToggleCategory = useCallback((category: Category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategories(new Set());
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDirection("desc");
      }
      setCurrentPage(1);
    },
    [sortField]
  );

  const handleResolve = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isResolved: true } : item
      )
    );
  }, []);

  const handleGenerateReply = useCallback((_id: string) => {
    // In real app, this would open a modal with AI-generated reply
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let result = items.filter((item) => !item.isResolved);

    // Category filter
    if (selectedCategories.size > 0) {
      result = result.filter((item) => selectedCategories.has(item.category));
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.commentText.toLowerCase().includes(q) ||
          item.issueKey.toLowerCase().includes(q) ||
          item.issueTitle.toLowerCase().includes(q) ||
          item.author.name.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "time":
          comparison =
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case "urgency":
          comparison =
            (urgencyOrder[a.urgency] ?? 99) - (urgencyOrder[b.urgency] ?? 99);
          break;
        case "priority":
          comparison =
            (priorityOrder[a.priority] ?? 99) -
            (priorityOrder[b.priority] ?? 99);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "sentiment":
          comparison =
            (sentimentOrder[a.sentiment] ?? 99) -
            (sentimentOrder[b.sentiment] ?? 99);
          break;
      }
      return sortDirection === "desc" ? -comparison : comparison;
    });

    return result;
  }, [items, selectedCategories, searchQuery, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <header className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
              <Inbox className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Action Inbox
            </h1>
          </div>
          <p className="mt-1 pl-10 text-sm text-muted-foreground">
            Your personal accountability layer for Jira and Confluence comments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Refresh"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="mb-6" aria-label="Summary statistics">
        <StatsBar items={items} />
      </section>

      {/* Category summary chips */}
      <section
        className="mb-5 rounded-sm border border-border bg-card p-4"
        aria-label="Filter by category"
      >
        <CategorySummaryBar
          items={items}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onClearAll={handleClearFilters}
        />
      </section>

      {/* Toolbar: Search + Sort */}
      <section className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search comments, issues, authors..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 w-full rounded-sm border border-border bg-card pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-72"
          />
        </div>
        <SortControls
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </section>

      {/* Results header */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {filteredAndSortedItems.length}
          </span>
          {" action item"}
          {filteredAndSortedItems.length !== 1 ? "s" : ""}
          {selectedCategories.size > 0 && (
            <span>
              {" in "}
              {Array.from(selectedCategories).join(", ")}
            </span>
          )}
        </p>
      </div>

      {/* Action items list */}
      <section className="flex flex-col gap-3" aria-label="Action items">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <ActionItemCard
              key={item.id}
              item={item}
              onResolve={handleResolve}
              onGenerateReply={handleGenerateReply}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-card py-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ads-green-subtle">
              <Inbox className="h-6 w-6 text-ads-green-bold" />
            </div>
            <h3 className="mt-4 text-sm font-medium text-foreground">
              All clear
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedCategories.size > 0
                ? "No items match the selected filters."
                : "No unresolved action items. You're all caught up!"}
            </p>
          </div>
        )}
      </section>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAndSortedItems.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
