# Design: Action Inbox UI Modernization (Forge UI Kit 2)

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    Action Inbox Page                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Header (Heading + Icon + Settings/Refresh buttons)      │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ StatsBar (4x stat cards in Inline/grid)                 │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ CategorySummaryBar (TagGroup with counts)               │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ Toolbar: SearchField + SortControls                     │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ ResultsHeader ("X action items in Y")                   │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ ActionItemCard (repeated, paginated)                    │ │
│  │  ├─ CardHeader: SourceIcon + IssueKey + Title           │ │
│  │  ├─ LozengeRow: Urgency + Priority + Category + Sent.   │ │
│  │  ├─ CommentBody: Text                                   │ │
│  │  ├─ Attachment: (optional) Paperclip + filename         │ │
│  │  └─ CardFooter: Avatar + Author + Time + Actions        │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ Pagination Controls                                     │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## Component Hierarchy (Forge UI Kit 2)

```
ActionInboxPage (Forge module: jira:issuePanel or jira:globalPage)
├── Box (padding, background)
│   ├── Inline (header row)
│   │   ├── Inline (left: icon + heading)
│   │   │   ├── Icon (InboxIcon)
│   │   │   └── Heading (size="medium", "Action Inbox")
│   │   └── ButtonGroup (right: refresh, settings)
│   │       ├── Button (IconButton, RefreshIcon)
│   │       └── Button (IconButton, SettingsIcon)
│   │
│   ├── Inline (stats row, spread="space-between")
│   │   ├── StatCard (Box + Badge + Text)  x4
│   │
│   ├── Box (category summary, border, padding)
│   │   ├── Inline (label + clear link)
│   │   │   ├── Text ("Unresolved by category")
│   │   │   └── Link ("Clear filters")  -- conditional
│   │   └── Inline (category chips, wrap)
│   │       ├── Tag (appearance="rounded", "All", Badge)
│   │       ├── Tag ("Blocker", Badge, onClick) -- toggleable
│   │       ├── Tag ("Bug", Badge, onClick)
│   │       ├── Tag ("Task", Badge, onClick)
│   │       ├── Tag ("Question", Badge, onClick)
│   │       └── Tag ("Info", Badge, onClick)
│   │
│   ├── Inline (toolbar: search + sort)
│   │   ├── TextField (placeholder, elemBeforeInput=SearchIcon)
│   │   └── ButtonGroup (sort buttons, appearance="subtle")
│   │
│   ├── Text (results header: "X action items")
│   │
│   ├── Stack (action items list, space="space.150")
│   │   └── ActionItemCard (repeated)
│   │       ├── Box (border, borderLeft colored by urgency)
│   │       │   ├── Inline (card header)
│   │       │   │   ├── Icon (JiraIcon / ConfluenceIcon)
│   │       │   │   ├── Link (issueKey)
│   │       │   │   └── Text (issueTitle, color="subtlest")
│   │       │   ├── Inline (lozenge row)
│   │       │   │   ├── Lozenge (urgency, appearance=urgencyColor)
│   │       │   │   ├── Lozenge (priority)
│   │       │   │   ├── Lozenge (category)
│   │       │   │   └── Lozenge (sentiment)
│   │       │   ├── Text (comment body)
│   │       │   ├── Inline (attachment, conditional)
│   │       │   │   ├── Icon (PaperclipIcon)
│   │       │   │   └── Text (filename)
│   │       │   └── Inline (footer: avatar + meta + actions)
│   │       │       ├── User (author)
│   │       │       ├── Text (relative time)
│   │       │       └── ButtonGroup
│   │       │           ├── Button (appearance="primary", "Generate Reply")
│   │       │           └── Button (appearance="subtle", "Resolve")
│   │
│   ├── Pagination (custom component)
│   │   ├── Text ("Showing X-Y of Z")
│   │   └── ButtonGroup (page numbers + prev/next)
│   │
│   └── EmptyState (conditional, when no items)
│       ├── Icon (CheckCircleIcon)
│       ├── Heading ("All clear")
│       └── Text (description)
```

## Data Model

```typescript
// Types aligned with Forge Storage API schema
interface ActionItem {
  id: string;                    // Unique identifier
  issueKey: string;              // e.g., "SCRUM-1"
  issueTitle: string;            // e.g., "User Authentication Module"
  source: "jira" | "confluence"; // Comment origin
  category: "Blocker" | "Bug" | "Task" | "Question" | "Info";
  urgency: "Critical" | "High" | "Medium" | "Low";
  priority: "P0" | "P1" | "P2" | "P3" | "P4";
  sentiment: "Urgent" | "Negative" | "Neutral" | "Positive";
  author: {
    accountId: string;           // Atlassian account ID
    displayName: string;
    avatarUrl: string;
  };
  commentText: string;           // Raw comment text
  commentAdf?: object;           // ADF format for rich rendering
  timestamp: string;             // ISO 8601
  relativeTime: string;          // Computed client-side
  isResolved: boolean;
  hasAttachment: boolean;
  attachmentName?: string;
  classificationConfidence: number;
  classifiedBy: "rule" | "ai";
}

// UI State
interface ActionInboxState {
  selectedCategories: Set<Category>;  // Multi-select filter
  sortField: "time" | "urgency" | "priority" | "category" | "sentiment";
  sortDirection: "asc" | "desc";
  currentPage: number;
  searchQuery: string;
  itemsPerPage: number;               // Default: 5
}
```

## Forge UI Kit 2 Implementation Notes

### Key Constraints
- **No custom CSS**: UI Kit 2 uses XCSS with design tokens only
- **No DOM access**: Cannot use document.querySelector or similar
- **Limited hooks**: Use `useState`, `useEffect` from `@forge/react`
- **No external libraries**: Cannot import Tailwind, styled-components, etc.
- **Async data**: Use `invoke` bridge API to call Forge resolvers

### Styling with XCSS

```typescript
import { xcss } from '@forge/react';

const cardStyles = xcss({
  backgroundColor: 'elevation.surface',
  borderColor: 'color.border',
  borderStyle: 'solid',
  borderWidth: 'border.width',
  borderRadius: 'border.radius',
  padding: 'space.200',
});

const urgencyCriticalBorder = xcss({
  borderLeftColor: 'color.border.danger',
  borderLeftWidth: 'border.width.indicator',
  borderLeftStyle: 'solid',
});

const urgencyHighBorder = xcss({
  borderLeftColor: 'color.border.warning',
  borderLeftWidth: 'border.width.indicator',
  borderLeftStyle: 'solid',
});
```

### Data Fetching Pattern

```typescript
import { invoke } from '@forge/bridge';

// In component:
const [items, setItems] = useState<ActionItem[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  invoke('getActionItems', { userId: currentUser.accountId })
    .then((data) => {
      setItems(data as ActionItem[]);
      setLoading(false);
    });
}, []);
```

### Lozenge Color Mapping

```typescript
const urgencyAppearance = {
  Critical: 'removed',    // Red
  High: 'moved',          // Yellow
  Medium: 'inprogress',   // Blue
  Low: 'default',         // Gray
};

const categoryAppearance = {
  Blocker: 'removed',
  Bug: 'moved',
  Task: 'inprogress',
  Question: 'new',         // Teal/purple
  Info: 'default',
};
```

## Sequence Diagrams

### Load Action Inbox

```
User            ActionInbox       ForgeResolver      ForgeStorage
 │                  │                  │                  │
 │  Open Inbox      │                  │                  │
 ├─────────────────►│                  │                  │
 │                  │  invoke()        │                  │
 │                  ├─────────────────►│                  │
 │                  │                  │  query(userId)   │
 │                  │                  ├─────────────────►│
 │                  │                  │  actionItems[]   │
 │                  │                  │◄─────────────────┤
 │                  │  items[]         │                  │
 │                  │◄─────────────────┤                  │
 │  Render UI       │                  │                  │
 │◄─────────────────┤                  │                  │
```

### Filter by Category

```
User              ActionInbox (client-side only)
 │                      │
 │  Click "Bug" chip    │
 ├─────────────────────►│
 │                      │ Toggle "Bug" in selectedCategories
 │                      │ Filter items client-side
 │                      │ Reset page to 1
 │  Re-render list      │
 │◄─────────────────────┤
```

### Resolve Action Item

```
User            ActionInbox       ForgeResolver      ForgeStorage
 │                  │                  │                  │
 │  Click Resolve   │                  │                  │
 ├─────────────────►│                  │                  │
 │                  │  invoke()        │                  │
 │                  ├─────────────────►│                  │
 │                  │                  │  update(id)      │
 │                  │                  ├─────────────────►│
 │                  │                  │  success         │
 │                  │                  │◄─────────────────┤
 │                  │  success         │                  │
 │                  │◄─────────────────┤                  │
 │                  │ Remove from list │                  │
 │  Updated UI      │                  │                  │
 │◄─────────────────┤                  │                  │
```

## Color Token Reference (Atlassian Design System)

| Usage                  | ADS Token                          | Hex       |
|------------------------|------------------------------------|-----------|
| Primary action         | color.background.brand.bold        | #0C66E4   |
| Danger/Critical        | color.background.danger            | #CA3521   |
| Warning/High           | color.background.warning           | #946F00   |
| Success/Resolved       | color.background.success           | #216E4E   |
| Discovery/Teal         | color.background.discovery         | #206B74   |
| Neutral text           | color.text                         | #172B4D   |
| Subtle text            | color.text.subtlest                | #626F86   |
| Surface background     | elevation.surface                  | #FFFFFF   |
| Page background        | elevation.surface.sunken           | #F7F8F9   |
| Border                 | color.border                       | #DFE1E6   |
