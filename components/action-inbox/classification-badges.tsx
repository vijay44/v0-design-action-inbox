import { cn } from "@/lib/utils";
import type { ActionItem } from "@/lib/mock-data";
import {
  CheckCircle2,
  Eye,
  MessageSquare,
  Search,
  HandMetal,
  GitBranch,
  AlertTriangle,
  Clock,
  ArrowUp,
  Minus,
  Users,
  UserCheck,
  DollarSign,
  Server,
  Shield,
  Truck,
  Lightbulb,
} from "lucide-react";

/* ─── Action Badge ────────────────────────────────────────────────────
   The primary CTA — tells the user *what to do*. Filled, high-contrast,
   left-most so the eye hits it first.
   Color: Blue (Atlassian primary action color)
────────────────────────────────────────────────────────────────────── */

const actionConfig: Record<
  string,
  { icon: React.ElementType; label: string }
> = {
  Approve: { icon: CheckCircle2, label: "Approve" },
  Review: { icon: Eye, label: "Review" },
  Respond: { icon: MessageSquare, label: "Respond" },
  Investigate: { icon: Search, label: "Investigate" },
  Acknowledge: { icon: HandMetal, label: "Acknowledge" },
  Decide: { icon: GitBranch, label: "Decide" },
};

/* ─── Criticality Badge ───────────────────────────────────────────────
   Urgency signal — tells the user *how fast*. Uses escalating color from
   neutral → yellow → red with a pulsing dot for Critical.
   Colors:
     Critical = Red (#DE350B)    — immediate, ring of fire
     High     = Yellow (#FF991F) — soon, hot
     Medium   = Blue (#0065FF)   — planned, cool
     Low      = Neutral (#6B778C)— whenever, muted
────────────────────────────────────────────────────────────────────── */

const urgencyConfig: Record<
  string,
  { icon: React.ElementType; color: string; dotColor: string; pulse: boolean }
> = {
  Critical: {
    icon: AlertTriangle,
    color: "bg-ads-red-subtle text-ads-red-bold",
    dotColor: "bg-ads-red-bold",
    pulse: true,
  },
  High: {
    icon: ArrowUp,
    color: "bg-ads-yellow-subtle text-ads-yellow-bold",
    dotColor: "bg-ads-yellow-bold",
    pulse: false,
  },
  Medium: {
    icon: Clock,
    color: "bg-ads-blue-subtle text-ads-blue-bold",
    dotColor: "bg-ads-blue-bold",
    pulse: false,
  },
  Low: {
    icon: Minus,
    color: "bg-ads-neutral-subtle text-ads-neutral-bold",
    dotColor: "bg-ads-neutral-bold",
    pulse: false,
  },
};

/* ─── Impact Badge ────────────────────────────────────────────────────
   Blast radius — tells the user *who is affected*. Outlined style to
   sit at a secondary visual weight below action and urgency.
   Color: Teal (neutral-warm, signals scope without alarm)
────────────────────────────────────────────────────────────────────── */

const impactConfig: Record<string, { icon: React.ElementType; label: string }> =
  {
    Customer: { icon: UserCheck, label: "Customer" },
    Team: { icon: Users, label: "Team" },
    Revenue: { icon: DollarSign, label: "Revenue" },
    Infrastructure: { icon: Server, label: "Infra" },
    Security: { icon: Shield, label: "Security" },
    Delivery: { icon: Truck, label: "Delivery" },
  };

/* ─── Component ───────────────────────────────────────────────────── */

interface ClassificationBadgesProps {
  item: ActionItem;
}

export function ClassificationBadges({ item }: ClassificationBadgesProps) {
  const action = actionConfig[item.actionType] ?? actionConfig.Acknowledge;
  const urgency = urgencyConfig[item.urgency] ?? urgencyConfig.Low;
  const impact = impactConfig[item.impactScope] ?? impactConfig.Team;
  const ActionIcon = action.icon;
  const UrgencyIcon = urgency.icon;
  const ImpactIcon = impact.icon;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* ── 1. Action: filled primary badge (highest visual weight) ── */}
      <span
        className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-wide text-primary-foreground"
        title={`Action: ${action.label}`}
      >
        <ActionIcon className="h-3 w-3" aria-hidden="true" />
        {action.label}
      </span>

      {/* ── 2. Criticality: colored chip with status dot ───────────── */}
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-wide",
          urgency.color
        )}
        title={`Urgency: ${item.urgency}`}
      >
        <span className="relative flex h-2 w-2">
          {urgency.pulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                urgency.dotColor
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              urgency.dotColor
            )}
          />
        </span>
        <UrgencyIcon className="h-3 w-3" aria-hidden="true" />
        {item.urgency}
      </span>

      {/* ── 3. Impact: outlined teal chip (secondary weight) ───────── */}
      <span
        className="inline-flex items-center gap-1.5 rounded-sm border border-ads-teal-bold/30 bg-ads-teal-subtle px-2 py-1 text-[11px] font-medium uppercase leading-none tracking-wide text-ads-teal-bold"
        title={`Impact: ${impact.label}`}
      >
        <ImpactIcon className="h-3 w-3" aria-hidden="true" />
        {impact.label}
      </span>

      {/* ── Separator dot ─────────────────────────────────────────── */}
      <span
        className="hidden h-0.5 w-0.5 rounded-full bg-muted-foreground/40 sm:inline-block"
        aria-hidden="true"
      />

      {/* ── 4. Hint: subdued italic line (lowest visual weight) ───── */}
      <span
        className="inline-flex items-center gap-1 text-[11px] leading-none text-ads-purple-bold"
        title={`Hint: ${item.hint}`}
      >
        <Lightbulb className="h-3 w-3 flex-shrink-0 text-ads-purple-bold" aria-hidden="true" />
        <span className="italic">{item.hint}</span>
      </span>
    </div>
  );
}
