"use client";

import { cn } from "@/lib/utils";
import type { ActionItem } from "@/lib/mock-data";
import {
  ExternalLink,
  Paperclip,
  Sparkles,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react";

function LozengeChip({
  label,
  variant,
}: {
  label: string;
  variant:
    | "red"
    | "yellow"
    | "blue"
    | "teal"
    | "green"
    | "neutral";
}) {
  const colorMap = {
    red: "bg-ads-red-subtle text-ads-red-bold",
    yellow: "bg-ads-yellow-subtle text-ads-yellow-bold",
    blue: "bg-ads-blue-subtle text-ads-blue-bold",
    teal: "bg-ads-teal-subtle text-ads-teal-bold",
    green: "bg-ads-green-subtle text-ads-green-bold",
    neutral: "bg-ads-neutral-subtle text-ads-neutral-bold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 text-[11px] font-bold uppercase leading-tight tracking-wide",
        colorMap[variant]
      )}
    >
      {label}
    </span>
  );
}

function getUrgencyVariant(urgency: string) {
  switch (urgency) {
    case "Critical":
      return "red";
    case "High":
      return "yellow";
    case "Medium":
      return "blue";
    case "Low":
      return "neutral";
    default:
      return "neutral" as const;
  }
}

function getCategoryVariant(category: string) {
  switch (category) {
    case "Blocker":
      return "red";
    case "Bug":
      return "yellow";
    case "Question":
      return "teal";
    case "Task":
      return "blue";
    case "Info":
      return "neutral";
    default:
      return "neutral" as const;
  }
}

function getSentimentVariant(sentiment: string) {
  switch (sentiment) {
    case "Urgent":
      return "red";
    case "Negative":
      return "yellow";
    case "Neutral":
      return "neutral";
    case "Positive":
      return "green";
    default:
      return "neutral" as const;
  }
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "P0":
      return "red";
    case "P1":
      return "yellow";
    case "P2":
      return "blue";
    case "P3":
      return "neutral";
    case "P4":
      return "neutral";
    default:
      return "neutral" as const;
  }
}

const sourceIcon = {
  jira: (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11.53 2c0 5.18 3.85 9.4 8.63 10.05C19.51 7.4 15.4 3.5 10.14 3.5H9.47v-.09c0-.78.63-1.41 1.41-1.41h.65ZM4.84 12c5.18 0 9.4 3.85 10.05 8.63C10.24 20.03 6.34 15.92 6.34 10.66v-.67h-.09c-.78 0-1.41.63-1.41 1.41v.6Z"
        fill="#2684FF"
      />
    </svg>
  ),
  confluence: (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.24 16.56c-.2.33-.43.71-.43.71a.52.52 0 0 0 .18.71l3.12 1.96a.53.53 0 0 0 .72-.17s.2-.35.44-.73c1.38-2.27 2.76-2 5.52-.61l3.14 1.57a.53.53 0 0 0 .7-.23l1.52-3.36a.52.52 0 0 0-.24-.7c-.84-.42-2.8-1.4-4.54-2.27-4.46-2.23-7.67-2.16-10.13 3.12Z"
        fill="#2684FF"
      />
      <path
        d="M20.76 7.44c.2-.33.43-.71.43-.71a.52.52 0 0 0-.18-.71L17.89 4.06a.53.53 0 0 0-.72.17s-.2.35-.44.73c-1.38 2.27-2.76 2-5.52.61L8.07 4a.53.53 0 0 0-.7.23L5.85 7.59a.52.52 0 0 0 .24.7c.84.42 2.8 1.4 4.54 2.27 4.46 2.23 7.67 2.16 10.13-3.12Z"
        fill="#2684FF"
      />
    </svg>
  ),
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = [
  "bg-ads-blue-bold",
  "bg-ads-teal-bold",
  "bg-ads-green-bold",
  "bg-ads-yellow-bold",
  "bg-ads-red-bold",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

interface ActionItemCardProps {
  item: ActionItem;
  onResolve: (id: string) => void;
  onGenerateReply: (id: string) => void;
}

export function ActionItemCard({
  item,
  onResolve,
  onGenerateReply,
}: ActionItemCardProps) {
  const urgencyBorderColor = {
    Critical: "border-l-ads-red-bold",
    High: "border-l-ads-yellow-bold",
    Medium: "border-l-ads-blue-bold",
    Low: "border-l-ads-neutral-bold",
  };

  return (
    <div
      className={cn(
        "group relative rounded-sm border border-border bg-card transition-shadow hover:shadow-md",
        "border-l-[3px]",
        urgencyBorderColor[item.urgency]
      )}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span className="flex items-center gap-1.5">
          {sourceIcon[item.source]}
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            {item.issueKey}
          </a>
        </span>
        <span className="text-sm text-muted-foreground">
          {item.issueTitle}
        </span>
        <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Card body */}
      <div className="px-4 py-3">
        {/* Lozenge row */}
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <LozengeChip
            label={item.urgency}
            variant={getUrgencyVariant(item.urgency)}
          />
          <LozengeChip
            label={item.priority}
            variant={getPriorityVariant(item.priority)}
          />
          <LozengeChip
            label={item.category}
            variant={getCategoryVariant(item.category)}
          />
          <LozengeChip
            label={item.sentiment}
            variant={getSentimentVariant(item.sentiment)}
          />
        </div>

        {/* Comment body */}
        <p className="mb-3 text-sm leading-relaxed text-foreground">
          {item.commentText}
        </p>

        {/* Attachment */}
        {item.hasAttachment && item.attachmentName && (
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-sm bg-secondary px-2 py-1 text-xs text-muted-foreground">
            <Paperclip className="h-3 w-3" />
            <span>{item.attachmentName}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-card",
                getAvatarColor(item.author.name)
              )}
            >
              {getInitials(item.author.name)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span className="font-medium text-foreground">
                {item.author.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{item.relativeTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onGenerateReply(item.id)}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Sparkles className="h-3 w-3" />
              Generate Reply
            </button>
            <button
              onClick={() => onResolve(item.id)}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <CheckCircle2 className="h-3 w-3" />
              Resolve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
