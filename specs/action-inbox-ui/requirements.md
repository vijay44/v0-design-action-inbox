# Requirements: Action Inbox UI Modernization (Forge UI Kit 2)

## Overview

Modernize the Action Inbox UI for the Actionable Comments Forge app to align with
Atlassian Design System (ADS) principles using Forge UI Kit 2 (`@forge/react` v10+).
Replace traditional filter rows with a category-based summary bar, add pagination,
and deliver an enterprise-grade, native-feeling Atlassian experience.

---

## User Stories & Acceptance Criteria (EARS Format)

### US-1: Category Summary Bar (Replaces Traditional Filters)

**As a** Jira/Confluence user,
**I want** to see a visual summary of unresolved comment categories with counts at the top of my Action Inbox,
**so that** I can instantly understand the composition of my pending obligations.

#### Acceptance Criteria

1. WHEN the Action Inbox loads, THE SYSTEM SHALL display a horizontal row of category chips (Blocker, Bug, Task, Question, Info) showing the count of unresolved items per category.

2. WHEN a category has zero unresolved items, THE SYSTEM SHALL render that category chip in a disabled/muted state with count "0".

3. WHEN a user clicks a category chip, THE SYSTEM SHALL toggle that category as an active filter, visually highlighting the chip with the category's semantic color.

4. WHEN multiple category chips are selected, THE SYSTEM SHALL display only action items matching ANY of the selected categories (OR logic).

5. WHEN no category chips are selected, THE SYSTEM SHALL display all unresolved action items.

6. WHEN category filters are active, THE SYSTEM SHALL display a "Clear filters" link that resets all category selections when clicked.

7. WHEN the "All" chip is clicked, THE SYSTEM SHALL clear all category filters and show all unresolved items.

---

### US-2: Pagination

**As a** user with many unresolved comments,
**I want** paginated results,
**so that** the interface remains fast and manageable.

#### Acceptance Criteria

1. WHEN there are more items than the page size (default: 5), THE SYSTEM SHALL display pagination controls below the action items list.

2. WHEN the user clicks a page number, THE SYSTEM SHALL display the corresponding page of results.

3. WHEN displaying pagination, THE SYSTEM SHALL show "Showing X - Y of Z items" text alongside page controls.

4. WHEN the user is on the first page, THE SYSTEM SHALL disable the "Previous" button.

5. WHEN the user is on the last page, THE SYSTEM SHALL disable the "Next" button.

6. WHEN filters change, THE SYSTEM SHALL reset pagination to page 1.

---

### US-3: Statistics Overview

**As a** user,
**I want** to see key metrics (total unresolved, critical count, new today, resolved) at a glance,
**so that** I can quickly assess the urgency of my inbox.

#### Acceptance Criteria

1. WHEN the Action Inbox loads, THE SYSTEM SHALL display four stat cards: Unresolved, Critical, New Today, Resolved.

2. WHEN an action item is resolved, THE SYSTEM SHALL update the statistics in real-time.

3. EACH stat card SHALL display an icon, numeric value, and descriptive label using Atlassian semantic colors.

---

### US-4: Action Item Cards

**As a** user,
**I want** each comment displayed as a structured card with clear visual hierarchy,
**so that** I can scan and triage quickly.

#### Acceptance Criteria

1. EACH action item card SHALL display: issue key (with source icon), issue title, urgency/priority/category/sentiment lozenges, comment text, author avatar + name, timestamp, and action buttons.

2. WHEN an item has urgency "Critical", THE SYSTEM SHALL render the card with a red left border accent.

3. WHEN an item has urgency "High", THE SYSTEM SHALL render the card with a yellow left border accent.

4. WHEN an item has an attachment, THE SYSTEM SHALL display the attachment name with a paperclip icon.

5. WHEN the user clicks "Generate Reply", THE SYSTEM SHALL invoke the AI Reply Assistant (Requirement 9 of PRD).

6. WHEN the user clicks "Resolve", THE SYSTEM SHALL mark the item as resolved and remove it from the unresolved list.

7. WHEN hovering over a card, THE SYSTEM SHALL display a subtle external link icon for navigating to the original comment.

---

### US-5: Sort Controls

**As a** user,
**I want** to sort my action items by different fields,
**so that** I can prioritize my workflow.

#### Acceptance Criteria

1. THE SYSTEM SHALL provide sort options for: Time, Urgency, Priority, Category, Sentiment.

2. WHEN a user clicks an active sort field, THE SYSTEM SHALL toggle the sort direction (asc/desc).

3. WHEN a user clicks a different sort field, THE SYSTEM SHALL sort by that field in descending order by default.

4. THE active sort field SHALL be visually highlighted with a direction indicator arrow.

---

### US-6: Search

**As a** user,
**I want** to search across comments, issue keys, and author names,
**so that** I can quickly find specific items.

#### Acceptance Criteria

1. THE SYSTEM SHALL provide a search input field above the action items list.

2. WHEN the user types in the search field, THE SYSTEM SHALL filter results by matching against comment text, issue key, issue title, and author name.

3. WHEN search is active, THE SYSTEM SHALL reset pagination to page 1.

---

### US-7: Empty State

**As a** user,
**I want** to see a clear empty state when I have no items,
**so that** I know the system is working and I'm caught up.

#### Acceptance Criteria

1. WHEN there are no unresolved action items, THE SYSTEM SHALL display an empty state with a success icon and "All clear" message.

2. WHEN active filters produce zero results, THE SYSTEM SHALL display an empty state indicating no items match the filters.

---

### US-8: Atlassian Design System Compliance

**As a** product owner,
**I want** the UI to look and feel like a native Atlassian product,
**so that** it meets Marketplace listing requirements and user expectations.

#### Acceptance Criteria

1. THE SYSTEM SHALL use Atlassian Design System color tokens: Blue (#0C66E4), Red (#CA3521), Yellow (#946F00), Green (#216E4E), Teal (#206B74), Neutral (#626F86).

2. THE SYSTEM SHALL use the Atlassian system font stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, "Droid Sans", "Helvetica Neue", sans-serif.

3. THE SYSTEM SHALL use 3px border-radius (Atlassian standard) for all interactive elements.

4. ALL interactive elements SHALL use Lozenge-style chips for status indicators (matching Forge UI Kit `Lozenge` component patterns).

5. THE SYSTEM SHALL follow ADS spacing scale (8px grid system).

---

## UI Kit 2 Component Mapping

| Design Element         | Forge UI Kit 2 Component       |
|------------------------|-------------------------------|
| Category chips         | `Tag` + `TagGroup`            |
| Stat badges            | `Badge` + `Box`               |
| Status lozenges        | `Lozenge`                     |
| Action item list       | `DynamicTable` or `Stack`     |
| Buttons                | `Button` + `ButtonGroup`      |
| Search input           | `TextField`                   |
| Sort tabs              | `Tabs` or `ButtonGroup`       |
| Pagination             | Custom with `Button`          |
| Empty state            | `EmptyState`                  |
| User avatars           | `User` component              |
| Headings               | `Heading`                     |
| Body text              | `Text`                        |
| Layout containers      | `Box`, `Stack`, `Inline`      |
| Icons                  | `Icon`                        |
| Tooltips               | `Tooltip`                     |
| Loading                | `Spinner`                     |
