# Implementation Tasks: Action Inbox UI Modernization

## Prerequisites

- [ ] **Upgrade @forge/react to v10+**: Run `npm install @forge/react@latest` to get latest UI Kit 2 components (Tag, TagGroup, Lozenge, DynamicTable, EmptyState, etc.)
- [ ] **Verify Forge manifest**: Ensure `jira:globalPage` or `jira:issuePanel` module is configured with correct permissions

---

## Task 1: Create Type Definitions

- [ ] Create `src/types/action-item.ts` with TypeScript interfaces for `ActionItem`, `Category`, `Urgency`, `Priority`, `Sentiment`, `Source`, `ActionInboxState`
- [ ] Export all types for use across components
- [ ] Add JSDoc comments for each field

**Expected outcome**: Strongly-typed data model shared across all UI components.

---

## Task 2: Build StatsBar Component

- [ ] Create `src/ui/components/StatsBar.tsx`
- [ ] Use `Inline` for horizontal layout of 4 stat cards
- [ ] Each stat card uses `Box` with `xcss` for styling (background token, border, padding)
- [ ] Use `Badge` component for numeric values
- [ ] Use `Text` for labels: "Unresolved", "Critical", "New today", "Resolved"
- [ ] Apply ADS semantic colors: blue-subtle for unresolved, red-subtle for critical, yellow-subtle for new, green-subtle for resolved
- [ ] Accept `items: ActionItem[]` as prop and compute counts internally

**Expected outcome**: Four colored stat cards showing real-time summary metrics.

---

## Task 3: Build CategorySummaryBar Component

- [ ] Create `src/ui/components/CategorySummaryBar.tsx`
- [ ] Use `Inline` with `wrap` for the chip row
- [ ] Create "All" chip using `Tag` with `Badge` showing total count
- [ ] Create individual category chips: Blocker, Bug, Task, Question, Info — each using `Tag` with onClick handler and `Badge` for count
- [ ] Implement multi-select toggle logic: clicking a chip adds/removes it from `selectedCategories: Set<Category>`
- [ ] Apply active state styling using `xcss` with category semantic colors (red for Blocker, yellow for Bug, blue for Task, teal for Question, gray for Info)
- [ ] Show "Clear filters" `Link` when any filter is active
- [ ] Disable chips with count 0 (use `Tag` disabled state or muted appearance)
- [ ] Call `onToggleCategory(category)` and `onClearAll()` callbacks

**Expected outcome**: Clickable category chips with counts that filter the action items list. Multiple categories selectable simultaneously.

---

## Task 4: Build SortControls Component

- [ ] Create `src/ui/components/SortControls.tsx`
- [ ] Use `ButtonGroup` with 5 sort buttons: Time, Urgency, Priority, Category, Sentiment
- [ ] Active sort button gets `appearance="primary"`, inactive get `appearance="subtle"`
- [ ] Show directional arrow icon on active sort button (up/down depending on `sortDirection`)
- [ ] On click: if same field, toggle direction; if different field, set desc as default
- [ ] Accept `sortField`, `sortDirection`, `onSort(field)` as props

**Expected outcome**: Sort button group that controls list ordering with clear visual feedback.

---

## Task 5: Build ActionItemCard Component

- [ ] Create `src/ui/components/ActionItemCard.tsx`
- [ ] Use `Box` as card container with `xcss` for border, borderRadius, padding
- [ ] Apply colored left border based on urgency using `xcss` (`color.border.danger` for Critical, `color.border.warning` for High, `color.border.information` for Medium, `color.border` for Low)
- [ ] **Card header row** (`Inline`): Source icon (Jira/Confluence SVG via `Icon`), issue key as `Link`, issue title as `Text` with subtle color
- [ ] **Lozenge row** (`Inline`): 4x `Lozenge` components with appropriate `appearance` prop: urgency (removed/moved/inprogress/default), priority, category, sentiment
- [ ] **Comment body**: `Text` component with the comment text
- [ ] **Attachment row** (conditional): `Inline` with paperclip `Icon` + filename `Text`
- [ ] **Footer row** (`Inline`, `spread="space-between"`):
  - Left: `User` component (avatar + name), `Text` (relative time)
  - Right: `ButtonGroup` with "Generate Reply" (`appearance="primary"`) and "Resolve" (`appearance="subtle"`)
- [ ] Accept `item: ActionItem`, `onResolve(id)`, `onGenerateReply(id)` as props

**Expected outcome**: Structured, visually rich cards matching Atlassian design patterns.

---

## Task 6: Build Pagination Component

- [ ] Create `src/ui/components/Pagination.tsx`
- [ ] Use `Inline` with `spread="space-between"` for layout
- [ ] Left side: `Text` showing "Showing X - Y of Z items"
- [ ] Right side: `ButtonGroup` with page number buttons and prev/next buttons
- [ ] Active page button: `appearance="primary"`, others: `appearance="subtle"`
- [ ] Disable prev on page 1, next on last page
- [ ] Handle ellipsis for large page counts (show max 7 page indicators)
- [ ] Accept `currentPage`, `totalPages`, `totalItems`, `itemsPerPage`, `onPageChange` as props
- [ ] Return `null` if `totalPages <= 1`

**Expected outcome**: Clean pagination bar that appears only when needed.

---

## Task 7: Build ActionInbox Main Container

- [ ] Create `src/ui/components/ActionInbox.tsx`
- [ ] Define state: `items`, `selectedCategories`, `sortField`, `sortDirection`, `currentPage`, `searchQuery`
- [ ] Use `invoke('getActionItems')` in `useEffect` to fetch data from Forge resolver
- [ ] Wire up `StatsBar` with full items array
- [ ] Wire up `CategorySummaryBar` with items, selectedCategories, toggle/clear handlers
- [ ] Wire up `SortControls` with sort state and handler
- [ ] Add `TextField` for search with `elemBeforeInput` search icon
- [ ] Implement filtering logic: category filter (OR), search filter (text match on commentText, issueKey, issueTitle, author)
- [ ] Implement sorting logic for all 5 fields with direction support
- [ ] Compute paginated slice of filtered/sorted items
- [ ] Render `ActionItemCard` for each paginated item in a `Stack`
- [ ] Render `EmptyState` when no items match
- [ ] Wire up `Pagination` at bottom
- [ ] Handle `onResolve`: call `invoke('resolveActionItem', { id })`, then update local state
- [ ] Handle `onGenerateReply`: call `invoke('generateReply', { id })`, open response in modal
- [ ] Show `Spinner` during initial data load

**Expected outcome**: Fully functional Action Inbox page with all sub-components integrated.

---

## Task 8: Create Forge Resolvers

- [ ] Create resolver function `getActionItems`: query Forge Storage for user's unresolved items
- [ ] Create resolver function `resolveActionItem`: update item status in Forge Storage
- [ ] Create resolver function `generateReply`: invoke AI Reply Assistant and return draft
- [ ] Register resolvers in `src/resolvers/index.ts`
- [ ] Update `manifest.yml` with resolver function references

**Expected outcome**: Backend resolvers connected to Forge Storage that serve the UI components.

---

## Task 9: Register ActionInbox as Forge Module

- [ ] Update `manifest.yml` to register ActionInbox as a `jira:globalPage` module (or `jira:issuePanel` depending on product decision)
- [ ] Set appropriate title: "Action Inbox"
- [ ] Configure required permissions in manifest
- [ ] Create entry point in `src/ui/index.tsx` that renders `<ActionInbox />`
- [ ] Test with `forge tunnel` to verify rendering in Jira

**Expected outcome**: The Action Inbox is accessible as a Forge app page within Jira.

---

## Task 10: Write Unit Tests

- [ ] Test `CategorySummaryBar`: verify chip counts, toggle selection, clear filters
- [ ] Test `SortControls`: verify field switching, direction toggle
- [ ] Test `Pagination`: verify page numbers, disabled states, boundary conditions
- [ ] Test `ActionItemCard`: verify lozenge rendering, urgency border colors
- [ ] Test `ActionInbox` filtering: verify category filter OR logic, search matching
- [ ] Test `ActionInbox` sorting: verify all 5 sort fields with both directions
- [ ] Test empty state rendering
- [ ] Achieve 90%+ code coverage on UI components

**Expected outcome**: Comprehensive test suite ensuring UI correctness and regression safety.

---

## Task 11: Accessibility Audit

- [ ] Verify all interactive elements are keyboard navigable
- [ ] Add `aria-label` to icon-only buttons (refresh, settings)
- [ ] Add `role` and `aria-` attributes to filter chips for screen readers
- [ ] Verify color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Add `aria-live="polite"` to results count for dynamic updates

**Expected outcome**: Fully accessible UI meeting WCAG AA standards.
