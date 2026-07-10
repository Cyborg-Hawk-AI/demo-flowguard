"use client";

import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Snowflake,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  statsOverview,
  activityFeed,
  weeklyDigest,
  CATEGORY_LABELS,
  formatRelativeTime,
} from "@/lib/mock-data";
import { DevNote } from "@/components/ui/DevNote";
import type { DemoView } from "../DemoApp";

interface OverviewPanelProps {
  onNavigate: (view: DemoView) => void;
}

const activityIcons = {
  retry: RefreshCwIcon,
  alert: BellIcon,
  freeze: Snowflake,
  resolve: CheckCircle,
  webhook: Activity,
};

function RefreshCwIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

export function OverviewPanel({ onNavigate }: OverviewPanelProps) {
  const stats = [
    {
      label: "Monitored Workflows",
      value: statsOverview.monitoredWorkflows,
      icon: Activity,
      color: "text-brand-400",
    },
    {
      label: "Errors Today",
      value: statsOverview.errorsToday,
      icon: AlertTriangle,
      color: "text-amber-400",
    },
    {
      label: "Auto-Resolved",
      value: `${statsOverview.autoResolvedRate}%`,
      icon: CheckCircle,
      color: "text-emerald-400",
    },
    {
      label: "Frozen Workflows",
      value: statsOverview.frozenWorkflows,
      icon: Snowflake,
      color: "text-blue-400",
    },
  ];

  const maxCategoryCount = Math.max(
    ...weeklyDigest.topCategories.map((c) => c.count)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Good evening, Sarah</h2>
          <p className="text-sm text-gray-400">
            Here&apos;s what&apos;s happening across your monitored workflows.
          </p>
        </div>
        <DevNote title="Dashboard Overview">
          Production: Real-time stats from Supabase, updated via webhook
          events. Charts powered by aggregated error logs.
        </DevNote>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={() => {
              if (stat.label.includes("Frozen")) onNavigate("freeze");
              else if (stat.label.includes("Errors")) onNavigate("failures");
              else if (stat.label.includes("Auto")) onNavigate("retry");
              else onNavigate("webhook");
            }}
            className="glass-card p-5 text-left transition hover:border-brand-500/30"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Error categories chart */}
        <div className="glass-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Errors by Category — {weeklyDigest.period}
            </h3>
            <DevNote title="Category Breakdown">
              Production: OpenAI classifies each webhook payload into categories.
              Chart aggregates from error_logs table.
            </DevNote>
          </div>
          <div className="space-y-3">
            {weeklyDigest.topCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => onNavigate("failures")}
                className="group w-full text-left"
              >
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-300 group-hover:text-white">
                    {CATEGORY_LABELS[cat.category]}
                  </span>
                  <span className="text-gray-500">{cat.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-600">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all group-hover:bg-brand-400"
                    style={{
                      width: `${(cat.count / maxCategoryCount) * 100}%`,
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-sm">
            <span className="text-gray-400">
              {weeklyDigest.totalErrors} total errors
            </span>
            <span className="text-emerald-400">
              {weeklyDigest.autoResolved} auto-resolved
            </span>
          </div>
        </div>

        {/* Activity feed */}
        <div className="glass-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Recent Activity</h3>
            <button
              onClick={() => onNavigate("alerts")}
              className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
            >
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-4">
            {activityFeed.slice(0, 6).map((item) => {
              const Icon = activityIcons[item.type];
              return (
                <div key={item.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-600">
                    <Icon className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-300">{item.message}</p>
                    <p className="text-xs text-gray-500">
                      {item.workflow} · {formatRelativeTime(item.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-white">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Test Webhook", view: "webhook" as DemoView },
            { label: "View Open Failures", view: "failures" as DemoView },
            { label: "Configure Retry", view: "retry" as DemoView },
            { label: "Freeze a Workflow", view: "freeze" as DemoView },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.view)}
              className="rounded-lg border border-white/10 bg-surface-700/50 px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-brand-500/30 hover:bg-surface-600 hover:text-white"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
