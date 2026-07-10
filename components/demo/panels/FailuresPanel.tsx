"use client";

import { useState } from "react";
import {
  Filter,
  ChevronDown,
  Eye,
  RefreshCw,
  Snowflake,
  CheckCircle,
} from "lucide-react";
import {
  failures,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  formatRelativeTime,
  type FailureCategory,
  type FailureStatus,
} from "@/lib/mock-data";
import { DevNote } from "@/components/ui/DevNote";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

export function FailuresPanel() {
  const [categoryFilter, setCategoryFilter] = useState<FailureCategory | "all">(
    "all"
  );
  const [statusFilter, setStatusFilter] = useState<FailureStatus | "all">(
    "all"
  );
  const [selectedFailure, setSelectedFailure] = useState<
    (typeof failures)[0] | null
  >(null);
  const [localFailures, setLocalFailures] = useState(failures);
  const [filterOpen, setFilterOpen] = useState(false);
  const { showToast } = useToast();

  const filtered = localFailures.filter((f) => {
    if (categoryFilter !== "all" && f.category !== categoryFilter) return false;
    if (statusFilter !== "all" && f.status !== statusFilter) return false;
    return true;
  });

  const handleRetry = (id: string) => {
    setLocalFailures((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, status: "retrying" as const, retries: f.retries + 1 }
          : f
      )
    );
    showToast("Retry scheduled with exponential backoff", "success");
    setSelectedFailure(null);
  };

  const handleResolve = (id: string) => {
    setLocalFailures((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "resolved" as const } : f
      )
    );
    showToast("Failure marked as resolved", "success");
    setSelectedFailure(null);
  };

  const handleFreeze = (id: string) => {
    setLocalFailures((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "frozen" as const } : f
      )
    );
    showToast("Workflow frozen and owner notified", "info");
    setSelectedFailure(null);
  };

  const categories: (FailureCategory | "all")[] = [
    "all",
    "api_timeout",
    "missing_field",
    "rate_limit",
    "auth_error",
    "validation",
  ];

  const statuses: (FailureStatus | "all")[] = [
    "all",
    "open",
    "retrying",
    "resolved",
    "frozen",
    "escalated",
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Failure Dashboard</h2>
          <p className="text-sm text-gray-400">
            Categorized errors with suggested fixes. Click any row for details.
          </p>
        </div>
        <DevNote title="Categorized Failures">
          Production: OpenAI classifies each webhook error into categories and
          generates suggested fixes. Stored in error_logs with full-text search.
        </DevNote>
      </div>

      {/* Category summary cards */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {(
          [
            "api_timeout",
            "missing_field",
            "rate_limit",
            "auth_error",
            "validation",
          ] as FailureCategory[]
        ).map((cat) => {
          const count = localFailures.filter(
            (f) => f.category === cat && f.status !== "resolved"
          ).length;
          return (
            <button
              key={cat}
              onClick={() =>
                setCategoryFilter(categoryFilter === cat ? "all" : cat)
              }
              className={`rounded-lg border p-3 text-left transition ${
                categoryFilter === cat
                  ? CATEGORY_COLORS[cat] + " ring-1 ring-current"
                  : "border-white/10 bg-surface-800 hover:border-white/20"
              }`}
            >
              <p className="text-xs text-gray-400">{CATEGORY_LABELS[cat]}</p>
              <p className="text-xl font-bold text-white">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="btn-secondary text-sm"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-3 w-3" />
          </button>
          {filterOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 w-64 rounded-lg border border-white/10 bg-surface-800 p-4 shadow-xl">
              <p className="mb-2 text-xs font-semibold text-gray-400">
                Category
              </p>
              <div className="mb-3 flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded px-2 py-1 text-xs ${
                      categoryFilter === cat
                        ? "bg-brand-600 text-white"
                        : "bg-surface-700 text-gray-400"
                    }`}
                  >
                    {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
              <p className="mb-2 text-xs font-semibold text-gray-400">
                Status
              </p>
              <div className="flex flex-wrap gap-1">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`rounded px-2 py-1 text-xs capitalize ${
                      statusFilter === s
                        ? "bg-brand-600 text-white"
                        : "bg-surface-700 text-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <span className="text-sm text-gray-500">
          Showing {filtered.length} of {localFailures.length} failures
        </span>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Workflow</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Retries</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((failure) => (
                <tr
                  key={failure.id}
                  className="border-b border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">
                      {failure.workflowName}
                    </p>
                    <p className="text-xs text-gray-500">{failure.company}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[failure.category]}`}
                    >
                      {CATEGORY_LABELS[failure.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium capitalize ${
                        failure.status === "resolved"
                          ? "text-emerald-400"
                          : failure.status === "frozen"
                            ? "text-blue-400"
                            : failure.status === "retrying"
                              ? "text-amber-400"
                              : "text-red-400"
                      }`}
                    >
                      {failure.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {failure.retries}/{failure.maxRetries}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {formatRelativeTime(failure.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedFailure(failure)}
                      className="rounded p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      <Modal
        open={!!selectedFailure}
        onClose={() => setSelectedFailure(null)}
        title={selectedFailure?.workflowName ?? "Failure Details"}
        size="lg"
      >
        {selectedFailure && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[selectedFailure.category]}`}
              >
                {CATEGORY_LABELS[selectedFailure.category]}
              </span>
              <span className="rounded-full bg-surface-700 px-2 py-0.5 text-xs text-gray-400">
                {selectedFailure.company}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-500">
                Technical Error
              </h4>
              <code className="mt-1 block rounded-lg bg-surface-900 p-3 font-mono text-xs text-red-300">
                {selectedFailure.message}
              </code>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-500">
                Plain English
              </h4>
              <p className="mt-1 text-sm text-gray-300">
                {selectedFailure.plainEnglish}
              </p>
            </div>

            <div className="rounded-lg border border-brand-500/20 bg-brand-500/5 p-4">
              <h4 className="text-xs font-semibold uppercase text-brand-400">
                Suggested Fix
              </h4>
              <p className="mt-1 text-sm text-gray-300">
                {selectedFailure.suggestedFix}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              {selectedFailure.status !== "resolved" && (
                <>
                  <button
                    onClick={() => handleRetry(selectedFailure.id)}
                    className="btn-primary text-sm"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Retry Now
                  </button>
                  <button
                    onClick={() => handleFreeze(selectedFailure.id)}
                    className="btn-secondary text-sm"
                  >
                    <Snowflake className="h-3.5 w-3.5" />
                    Freeze Workflow
                  </button>
                </>
              )}
              <button
                onClick={() => handleResolve(selectedFailure.id)}
                className="btn-secondary text-sm"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Mark Resolved
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
