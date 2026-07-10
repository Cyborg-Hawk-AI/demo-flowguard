export type FailureCategory =
  | "api_timeout"
  | "missing_field"
  | "rate_limit"
  | "auth_error"
  | "validation";

export type FailureStatus =
  | "open"
  | "retrying"
  | "resolved"
  | "frozen"
  | "escalated";

export interface Workflow {
  id: string;
  name: string;
  platform: "Make" | "n8n" | "Zapier";
  company: string;
  status: "healthy" | "degraded" | "frozen" | "failing";
  lastRun: string;
  errorCount24h: number;
  freezeMode: boolean;
}

export interface Failure {
  id: string;
  workflowId: string;
  workflowName: string;
  company: string;
  category: FailureCategory;
  status: FailureStatus;
  message: string;
  plainEnglish: string;
  suggestedFix: string;
  timestamp: string;
  retries: number;
  maxRetries: number;
}

export interface ActivityItem {
  id: string;
  type: "retry" | "alert" | "freeze" | "resolve" | "webhook";
  message: string;
  workflow: string;
  timestamp: string;
}

export interface AlertPreview {
  id: string;
  channel: "slack" | "email";
  recipient: string;
  subject: string;
  body: string;
  sentAt: string;
  workflow: string;
}

export const CATEGORY_LABELS: Record<FailureCategory, string> = {
  api_timeout: "API Timeout",
  missing_field: "Missing Field",
  rate_limit: "Rate Limit",
  auth_error: "Auth Error",
  validation: "Validation Error",
};

export const CATEGORY_COLORS: Record<FailureCategory, string> = {
  api_timeout: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  missing_field: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  rate_limit: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  auth_error: "text-red-400 bg-red-400/10 border-red-400/20",
  validation: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

export const workflows: Workflow[] = [
  {
    id: "wf-001",
    name: "Client Onboarding Pipeline",
    platform: "Make",
    company: "BrightPath Consulting",
    status: "degraded",
    lastRun: "2026-07-10T20:14:00Z",
    errorCount24h: 7,
    freezeMode: false,
  },
  {
    id: "wf-002",
    name: "Invoice Sync → QuickBooks",
    platform: "n8n",
    company: "Meridian Legal Group",
    status: "healthy",
    lastRun: "2026-07-10T20:45:00Z",
    errorCount24h: 0,
    freezeMode: false,
  },
  {
    id: "wf-003",
    name: "Lead Capture → HubSpot CRM",
    platform: "Zapier",
    company: "Summit Realty Partners",
    status: "failing",
    lastRun: "2026-07-10T19:32:00Z",
    errorCount24h: 12,
    freezeMode: false,
  },
  {
    id: "wf-004",
    name: "Support Ticket Router",
    platform: "Make",
    company: "CloudNine SaaS",
    status: "frozen",
    lastRun: "2026-07-10T18:05:00Z",
    errorCount24h: 3,
    freezeMode: true,
  },
  {
    id: "wf-005",
    name: "Inventory Reorder Alerts",
    platform: "n8n",
    company: "FreshBite Meal Prep",
    status: "healthy",
    lastRun: "2026-07-10T20:51:00Z",
    errorCount24h: 1,
    freezeMode: false,
  },
  {
    id: "wf-006",
    name: "Employee Offboarding",
    platform: "Zapier",
    company: "TechForward HR",
    status: "healthy",
    lastRun: "2026-07-10T17:20:00Z",
    errorCount24h: 0,
    freezeMode: false,
  },
  {
    id: "wf-007",
    name: "Stripe → Airtable Revenue Log",
    platform: "Make",
    company: "PixelCraft Studio",
    status: "degraded",
    lastRun: "2026-07-10T20:38:00Z",
    errorCount24h: 4,
    freezeMode: false,
  },
  {
    id: "wf-008",
    name: "Slack Standup Aggregator",
    platform: "n8n",
    company: "RemoteFirst Agency",
    status: "healthy",
    lastRun: "2026-07-10T09:00:00Z",
    errorCount24h: 0,
    freezeMode: false,
  },
];

export const failures: Failure[] = [
  {
    id: "err-001",
    workflowId: "wf-001",
    workflowName: "Client Onboarding Pipeline",
    company: "BrightPath Consulting",
    category: "missing_field",
    status: "retrying",
    message: "Required field 'client_email' is undefined at step 4",
    plainEnglish:
      "The onboarding workflow tried to send a welcome email but couldn't find the client's email address. This usually means the form submission was incomplete.",
    suggestedFix:
      "Add a validation step before the email module to check that client_email exists. In Make, use a Router with a filter: client_email is not empty.",
    timestamp: "2026-07-10T20:14:00Z",
    retries: 2,
    maxRetries: 5,
  },
  {
    id: "err-002",
    workflowId: "wf-003",
    workflowName: "Lead Capture → HubSpot CRM",
    company: "Summit Realty Partners",
    category: "rate_limit",
    status: "open",
    message: "HubSpot API returned 429: rate limit exceeded (100/100 per 10s)",
    plainEnglish:
      "HubSpot is temporarily blocking new contacts because too many were created in a short time. New leads from your website form are being queued but not yet added to CRM.",
    suggestedFix:
      "Enable FlowGuard's auto-backoff retry (already configured). Consider adding a 2-second delay between HubSpot API calls in your Zapier zap.",
    timestamp: "2026-07-10T19:32:00Z",
    retries: 0,
    maxRetries: 5,
  },
  {
    id: "err-003",
    workflowId: "wf-003",
    workflowName: "Lead Capture → HubSpot CRM",
    company: "Summit Realty Partners",
    category: "api_timeout",
    status: "open",
    message: "Request to api.hubapi.com timed out after 30000ms",
    plainEnglish:
      "The connection to HubSpot took too long and timed out. This is often a temporary network issue or HubSpot experiencing slowness.",
    suggestedFix:
      "FlowGuard will auto-retry with exponential backoff. If this persists, check HubSpot status page or increase timeout in Zapier settings.",
    timestamp: "2026-07-10T19:28:00Z",
    retries: 1,
    maxRetries: 5,
  },
  {
    id: "err-004",
    workflowId: "wf-004",
    workflowName: "Support Ticket Router",
    company: "CloudNine SaaS",
    category: "auth_error",
    status: "frozen",
    message: "Zendesk API returned 401: Invalid API token",
    plainEnglish:
      "The workflow can't access Zendesk because the login credentials expired. Support tickets aren't being routed to the right team.",
    suggestedFix:
      "Update the Zendesk API token in your Make scenario. FlowGuard has frozen this workflow and notified the owner.",
    timestamp: "2026-07-10T18:05:00Z",
    retries: 3,
    maxRetries: 3,
  },
  {
    id: "err-005",
    workflowId: "wf-007",
    workflowName: "Stripe → Airtable Revenue Log",
    company: "PixelCraft Studio",
    category: "api_timeout",
    status: "resolved",
    message: "Airtable API request timed out after 15000ms",
    plainEnglish:
      "A payment record couldn't be saved to Airtable because the request timed out. FlowGuard retried and succeeded on the 3rd attempt.",
    suggestedFix:
      "No action needed — auto-resolved. Consider upgrading Airtable plan if timeouts become frequent.",
    timestamp: "2026-07-10T20:38:00Z",
    retries: 3,
    maxRetries: 5,
  },
  {
    id: "err-006",
    workflowId: "wf-001",
    workflowName: "Client Onboarding Pipeline",
    company: "BrightPath Consulting",
    category: "validation",
    status: "open",
    message: "Phone number format invalid: '+1-555-ABC'",
    plainEnglish:
      "A new client's phone number was in an unexpected format, so the SMS verification step was skipped.",
    suggestedFix:
      "Add a phone number formatter module before the SMS step, or use a regex filter to validate E.164 format.",
    timestamp: "2026-07-10T19:55:00Z",
    retries: 0,
    maxRetries: 3,
  },
  {
    id: "err-007",
    workflowId: "wf-005",
    workflowName: "Inventory Reorder Alerts",
    company: "FreshBite Meal Prep",
    category: "missing_field",
    status: "resolved",
    message: "Supplier email missing from inventory record SKU-FB-2847",
    plainEnglish:
      "An inventory item triggered a reorder alert but had no supplier email on file. FlowGuard flagged it and the owner was notified.",
    suggestedFix:
      "Update the inventory record in your ERP with the supplier contact email for SKU-FB-2847.",
    timestamp: "2026-07-10T14:22:00Z",
    retries: 0,
    maxRetries: 3,
  },
  {
    id: "err-008",
    workflowId: "wf-007",
    workflowName: "Stripe → Airtable Revenue Log",
    company: "PixelCraft Studio",
    category: "rate_limit",
    status: "retrying",
    message: "Stripe API rate limit: 25 requests/sec exceeded",
    plainEnglish:
      "Too many Stripe payment events arrived at once (likely end-of-month billing). Records are being processed with a slight delay.",
    suggestedFix:
      "FlowGuard's queue is handling this automatically. Consider batching Stripe webhook events if this happens monthly.",
    timestamp: "2026-07-10T20:12:00Z",
    retries: 1,
    maxRetries: 5,
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "act-001",
    type: "retry",
    message: "Auto-retry #3 succeeded for Stripe → Airtable Revenue Log",
    workflow: "Stripe → Airtable Revenue Log",
    timestamp: "2026-07-10T20:39:00Z",
  },
  {
    id: "act-002",
    type: "alert",
    message: "Slack alert sent to #ops-alerts for Lead Capture failure",
    workflow: "Lead Capture → HubSpot CRM",
    timestamp: "2026-07-10T19:33:00Z",
  },
  {
    id: "act-003",
    type: "freeze",
    message: "Workflow frozen — Zendesk auth token expired",
    workflow: "Support Ticket Router",
    timestamp: "2026-07-10T18:05:00Z",
  },
  {
    id: "act-004",
    type: "webhook",
    message: "Error webhook received from Make scenario #48291",
    workflow: "Client Onboarding Pipeline",
    timestamp: "2026-07-10T20:14:00Z",
  },
  {
    id: "act-005",
    type: "resolve",
    message: "Missing field error auto-resolved after data fix",
    workflow: "Inventory Reorder Alerts",
    timestamp: "2026-07-10T15:10:00Z",
  },
  {
    id: "act-006",
    type: "alert",
    message: "Email digest sent to sarah@brightpath.io",
    workflow: "Client Onboarding Pipeline",
    timestamp: "2026-07-10T08:00:00Z",
  },
  {
    id: "act-007",
    type: "retry",
    message: "Auto-retry #2 scheduled in 30s for HubSpot rate limit",
    workflow: "Lead Capture → HubSpot CRM",
    timestamp: "2026-07-10T19:32:30Z",
  },
  {
    id: "act-008",
    type: "webhook",
    message: "Error webhook received from n8n workflow 'inventory-check'",
    workflow: "Inventory Reorder Alerts",
    timestamp: "2026-07-10T14:22:00Z",
  },
];

export const alertPreviews: AlertPreview[] = [
  {
    id: "alert-001",
    channel: "slack",
    recipient: "#ops-alerts",
    subject: "",
    body: `🚨 *Workflow Alert — Summit Realty Partners*

*What happened:* Your "Lead Capture → HubSpot CRM" workflow hit a rate limit. HubSpot is temporarily blocking new contacts because too many were created in a short time.

*Impact:* New leads from your website form are queued but not yet in HubSpot CRM.

*What FlowGuard did:* Paused new attempts and scheduled an automatic retry in 60 seconds.

*Suggested fix:* No action needed right now — we're handling it. If this happens often, add a 2-second delay between HubSpot calls.

<https://app.flowguard.io/demo|View in dashboard>`,
    sentAt: "2026-07-10T19:33:00Z",
    workflow: "Lead Capture → HubSpot CRM",
  },
  {
    id: "alert-002",
    channel: "email",
    recipient: "james@cloudnine.io",
    subject: "⏸️ Workflow Frozen: Support Ticket Router needs your attention",
    body: `Hi James,

Your "Support Ticket Router" workflow has been automatically paused because we detected an authentication problem.

What happened: The workflow can't connect to Zendesk — the API token appears to have expired.

What this means: New support tickets aren't being routed to the right team members.

What to do: Log into Make, open the Support Ticket Router scenario, and update your Zendesk API credentials. Once fixed, click "Resume Workflow" in your FlowGuard dashboard.

FlowGuard prevented this from failing silently for 3 days like your last incident.

— FlowGuard`,
    sentAt: "2026-07-10T18:05:00Z",
    workflow: "Support Ticket Router",
  },
  {
    id: "alert-003",
    channel: "slack",
    recipient: "#automation-health",
    subject: "",
    body: `✅ *Auto-Resolved — PixelCraft Studio*

"Stripe → Airtable Revenue Log" had a timeout talking to Airtable. FlowGuard retried 3 times and succeeded on the last attempt.

No action needed. Payment records are up to date.`,
    sentAt: "2026-07-10T20:39:00Z",
    workflow: "Stripe → Airtable Revenue Log",
  },
];

export const weeklyDigest = {
  period: "Jul 3 – Jul 10, 2026",
  totalErrors: 47,
  autoResolved: 31,
  frozen: 2,
  escalated: 3,
  topCategories: [
    { category: "api_timeout" as FailureCategory, count: 18 },
    { category: "rate_limit" as FailureCategory, count: 12 },
    { category: "missing_field" as FailureCategory, count: 9 },
    { category: "auth_error" as FailureCategory, count: 5 },
    { category: "validation" as FailureCategory, count: 3 },
  ],
};

export const statsOverview = {
  monitoredWorkflows: 8,
  errorsToday: 27,
  autoResolvedRate: 73,
  avgResolutionMinutes: 4.2,
  frozenWorkflows: 1,
};

export const WEBHOOK_URL =
  "https://hooks.flowguard.io/v1/catch/a8f3c2e1-9b4d-7e6f-5a0c-1d2e3f4a5b6c";

export const webhookPayloadExample = `{
  "workflow_id": "wf-001",
  "platform": "make",
  "scenario_name": "Client Onboarding Pipeline",
  "error": {
    "code": "MISSING_FIELD",
    "message": "Required field 'client_email' is undefined",
    "step": 4,
    "module": "Send Welcome Email"
  },
  "timestamp": "2026-07-10T20:14:00Z",
  "metadata": {
    "company": "BrightPath Consulting",
    "run_id": "run_8f3a2c1b"
  }
}`;

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2026-07-10T21:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
