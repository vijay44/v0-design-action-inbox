export type Category = "Bug" | "Task" | "Question" | "Blocker" | "Info";
export type Urgency = "Critical" | "High" | "Medium" | "Low";
export type Priority = "P0" | "P1" | "P2" | "P3" | "P4";
export type Sentiment = "Urgent" | "Negative" | "Neutral" | "Positive";
export type Source = "jira" | "confluence";

export interface ActionItem {
  id: string;
  issueKey: string;
  issueTitle: string;
  source: Source;
  category: Category;
  urgency: Urgency;
  priority: Priority;
  sentiment: Sentiment;
  author: {
    name: string;
    avatarUrl: string;
  };
  commentText: string;
  timestamp: string;
  relativeTime: string;
  isResolved: boolean;
  hasAttachment: boolean;
  attachmentName?: string;
}

export const mockActionItems: ActionItem[] = [
  {
    id: "ai-001",
    issueKey: "SCRUM-1",
    issueTitle: "User Authentication Module",
    source: "jira",
    category: "Bug",
    urgency: "Critical",
    priority: "P0",
    sentiment: "Urgent",
    author: { name: "Vijendran Selvarajah", avatarUrl: "" },
    commentText:
      "URGENT: The login system is completely broken! Users cannot access their accounts. This is a critical bug that needs immediate attention.",
    timestamp: "Feb 5, 2026, 7:17 PM",
    relativeTime: "4d ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-002",
    issueKey: "SCRUM-1",
    issueTitle: "User Authentication Module",
    source: "jira",
    category: "Task",
    urgency: "Critical",
    priority: "P2",
    sentiment: "Neutral",
    author: { name: "Vijendran Selvarajah", avatarUrl: "" },
    commentText: "NOT URGENT: Test classification logging",
    timestamp: "Feb 5, 2026, 7:12 PM",
    relativeTime: "4d ago",
    isResolved: false,
    hasAttachment: true,
    attachmentName: "IMAGE-20260205-081119.PNG",
  },
  {
    id: "ai-003",
    issueKey: "SCRUM-24",
    issueTitle: "API Rate Limiting",
    source: "jira",
    category: "Question",
    urgency: "High",
    priority: "P1",
    sentiment: "Negative",
    author: { name: "Sarah Chen", avatarUrl: "" },
    commentText:
      "@you What rate limit strategy are we using for the external API calls? The current implementation seems to be hitting 429s in production. Can you check the retry logic?",
    timestamp: "Feb 7, 2026, 2:30 PM",
    relativeTime: "2d ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-004",
    issueKey: "SCRUM-18",
    issueTitle: "Dashboard Performance",
    source: "jira",
    category: "Bug",
    urgency: "High",
    priority: "P1",
    sentiment: "Negative",
    author: { name: "Marcus Johnson", avatarUrl: "" },
    commentText:
      "The dashboard is taking 12+ seconds to load for users with more than 500 items. We need to implement virtual scrolling or pagination ASAP.",
    timestamp: "Feb 6, 2026, 11:45 AM",
    relativeTime: "3d ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-005",
    issueKey: "PROJ-42",
    issueTitle: "Q1 Planning Document",
    source: "confluence",
    category: "Question",
    urgency: "Medium",
    priority: "P2",
    sentiment: "Neutral",
    author: { name: "Emily Rodriguez", avatarUrl: "" },
    commentText:
      "@you Can you review the resource allocation table in section 3? I think we might be over-committing on the infrastructure migration timeline.",
    timestamp: "Feb 8, 2026, 9:00 AM",
    relativeTime: "1d ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-006",
    issueKey: "SCRUM-31",
    issueTitle: "Email Notification Service",
    source: "jira",
    category: "Blocker",
    urgency: "Critical",
    priority: "P0",
    sentiment: "Urgent",
    author: { name: "David Kim", avatarUrl: "" },
    commentText:
      "BLOCKER: Email service is down in staging. No emails are being sent. This blocks the entire release pipeline. Need your input on the SMTP config changes.",
    timestamp: "Feb 8, 2026, 3:15 PM",
    relativeTime: "1d ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-007",
    issueKey: "SCRUM-9",
    issueTitle: "Search Indexing Pipeline",
    source: "jira",
    category: "Task",
    urgency: "Medium",
    priority: "P2",
    sentiment: "Neutral",
    author: { name: "Anika Patel", avatarUrl: "" },
    commentText:
      "I've updated the Elasticsearch mapping as discussed. Can you verify the new index schema works with the existing query builders before I merge?",
    timestamp: "Feb 7, 2026, 5:20 PM",
    relativeTime: "2d ago",
    isResolved: false,
    hasAttachment: true,
    attachmentName: "es-mapping-v2.json",
  },
  {
    id: "ai-008",
    issueKey: "PROJ-15",
    issueTitle: "Security Audit Report",
    source: "confluence",
    category: "Info",
    urgency: "Low",
    priority: "P3",
    sentiment: "Positive",
    author: { name: "James Wilson", avatarUrl: "" },
    commentText:
      "FYI - The penetration test results are in. No critical vulnerabilities found. Full report attached for your review.",
    timestamp: "Feb 6, 2026, 4:00 PM",
    relativeTime: "3d ago",
    isResolved: false,
    hasAttachment: true,
    attachmentName: "pentest-report-q1.pdf",
  },
  {
    id: "ai-009",
    issueKey: "SCRUM-55",
    issueTitle: "CI/CD Pipeline Optimization",
    source: "jira",
    category: "Task",
    urgency: "Medium",
    priority: "P2",
    sentiment: "Neutral",
    author: { name: "Lisa Park", avatarUrl: "" },
    commentText:
      "The build times have improved by 40% after the caching changes. However, the deploy step still takes 8 minutes. Can we parallelize the asset upload?",
    timestamp: "Feb 8, 2026, 10:30 AM",
    relativeTime: "1d ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-010",
    issueKey: "SCRUM-63",
    issueTitle: "Data Migration Script",
    source: "jira",
    category: "Blocker",
    urgency: "High",
    priority: "P1",
    sentiment: "Negative",
    author: { name: "Tom Zhang", avatarUrl: "" },
    commentText:
      "The migration script failed for 230 records due to schema mismatch. I've identified the issue but need your sign-off on the fix before re-running on production data.",
    timestamp: "Feb 9, 2026, 8:00 AM",
    relativeTime: "2h ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-011",
    issueKey: "SCRUM-70",
    issueTitle: "Mobile App Crash Report",
    source: "jira",
    category: "Bug",
    urgency: "High",
    priority: "P1",
    sentiment: "Negative",
    author: { name: "Rachel Adams", avatarUrl: "" },
    commentText:
      "Crash rate spiked to 2.3% after the last release. Stack traces point to the new image caching module. Rollback or hotfix needed.",
    timestamp: "Feb 9, 2026, 7:30 AM",
    relativeTime: "3h ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-012",
    issueKey: "PROJ-8",
    issueTitle: "API Documentation",
    source: "confluence",
    category: "Question",
    urgency: "Low",
    priority: "P3",
    sentiment: "Neutral",
    author: { name: "Kevin O'Brien", avatarUrl: "" },
    commentText:
      "The REST API docs seem outdated for the /users endpoint. Are we still supporting query params for filtering, or did we switch to POST body only?",
    timestamp: "Feb 7, 2026, 1:00 PM",
    relativeTime: "2d ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-013",
    issueKey: "SCRUM-44",
    issueTitle: "Feature Flag System",
    source: "jira",
    category: "Info",
    urgency: "Low",
    priority: "P4",
    sentiment: "Positive",
    author: { name: "Natalie Green", avatarUrl: "" },
    commentText:
      "Deployed the new feature flag SDK to all services. Zero issues so far. Monitoring dashboards are set up. Just keeping you in the loop.",
    timestamp: "Feb 5, 2026, 3:30 PM",
    relativeTime: "4d ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-014",
    issueKey: "SCRUM-77",
    issueTitle: "Database Connection Pooling",
    source: "jira",
    category: "Bug",
    urgency: "Critical",
    priority: "P0",
    sentiment: "Urgent",
    author: { name: "Chris Butler", avatarUrl: "" },
    commentText:
      "Connection pool is exhausting under load. Getting 'too many connections' errors in production. We need to tune the pool size or implement connection recycling immediately.",
    timestamp: "Feb 9, 2026, 6:00 AM",
    relativeTime: "5h ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-015",
    issueKey: "SCRUM-12",
    issueTitle: "Permissions Refactor",
    source: "jira",
    category: "Task",
    urgency: "Medium",
    priority: "P3",
    sentiment: "Neutral",
    author: { name: "Diana Foster", avatarUrl: "" },
    commentText:
      "I've drafted the new RBAC permission model. Shared the design doc in Confluence. Would appreciate your review before the team sync on Thursday.",
    timestamp: "Feb 8, 2026, 4:45 PM",
    relativeTime: "18h ago",
    isResolved: false,
    hasAttachment: false,
  },
  {
    id: "ai-016",
    issueKey: "SCRUM-88",
    issueTitle: "Webhook Reliability",
    source: "jira",
    category: "Question",
    urgency: "Medium",
    priority: "P2",
    sentiment: "Neutral",
    author: { name: "Alex Moreno", avatarUrl: "" },
    commentText:
      "@you Are we implementing dead letter queues for failed webhook deliveries? The current implementation just drops them after 3 retries. What's the expected behavior?",
    timestamp: "Feb 8, 2026, 11:00 AM",
    relativeTime: "22h ago",
    isResolved: false,
    hasAttachment: false,
  },
];
