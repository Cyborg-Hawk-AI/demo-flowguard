"use client";

import { useState } from "react";
import {
  Snowflake,
  Play,
  Bell,
  AlertTriangle,
  Shield,
  Pause,
} from "lucide-react";
import { workflows as initialWorkflows } from "@/lib/mock-data";
import { DevNote } from "@/components/ui/DevNote";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

export function FreezePanel() {
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [confirmModal, setConfirmModal] = useState<{
    id: string;
    name: string;
    action: "freeze" | "unfreeze";
  } | null>(null);
  const [globalFreeze, setGlobalFreeze] = useState(false);
  const { showToast } = useToast();

  const handleFreeze = (id: string, freeze: boolean) => {
    setWorkflows((prev) =>
      prev.map((wf) =>
        wf.id === id
          ? {
              ...wf,
              freezeMode: freeze,
              status: freeze
                ? ("frozen" as const)
                : wf.errorCount24h > 5
                  ? ("failing" as const)
                  : wf.errorCount24h > 0
                    ? ("degraded" as const)
                    : ("healthy" as const),
            }
          : wf
      )
    );
    if (freeze) {
      showToast(
        "Workflow frozen — owner notified via Slack and email",
        "info"
      );
    } else {
      showToast("Workflow resumed — monitoring active", "success");
    }
    setConfirmModal(null);
  };

  const toggleGlobalFreeze = () => {
    const newState = !globalFreeze;
    setGlobalFreeze(newState);
    if (newState) {
      setWorkflows((prev) =>
        prev.map((wf) => ({
          ...wf,
          freezeMode: true,
          status: "frozen" as const,
        }))
      );
      showToast("All workflows frozen — emergency stop activated", "error");
    } else {
      setWorkflows(initialWorkflows);
      showToast("Global freeze lifted — workflows resuming", "success");
    }
  };

  const frozenCount = workflows.filter((w) => w.freezeMode).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Freeze &amp; Notify</h2>
          <p className="text-sm text-gray-400">
            Pause failing workflows and alert the owner instead of letting errors
            cascade silently.
          </p>
        </div>
        <DevNote title="Freeze & Notify">
          Production: Calls platform API to disable/pause the workflow (Make
          scenario off, n8n workflow deactivated). Sends immediate Slack + email
          alert with plain-English explanation. Owner clicks Resume in
          FlowGuard to re-enable.
        </DevNote>
      </div>

      {/* Emergency stop */}
      <div
        className={`glass-card p-6 ${globalFreeze ? "border-red-500/30 bg-red-950/20" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                globalFreeze ? "bg-red-500/20" : "bg-surface-600"
              }`}
            >
              <Shield
                className={`h-6 w-6 ${globalFreeze ? "text-red-400" : "text-gray-400"}`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Emergency Stop — All Workflows
              </h3>
              <p className="text-sm text-gray-400">
                Instantly freeze every monitored workflow and notify all owners.
              </p>
            </div>
          </div>
          <button
            onClick={toggleGlobalFreeze}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              globalFreeze
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
          >
            {globalFreeze ? (
              <>
                <Play className="mr-1 inline h-4 w-4" />
                Resume All
              </>
            ) : (
              <>
                <Pause className="mr-1 inline h-4 w-4" />
                Freeze All
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{frozenCount}</p>
          <p className="text-sm text-gray-400">Frozen</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">
            {workflows.filter((w) => w.status === "degraded").length}
          </p>
          <p className="text-sm text-gray-400">Degraded</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">
            {workflows.filter((w) => w.status === "healthy").length}
          </p>
          <p className="text-sm text-gray-400">Healthy</p>
        </div>
      </div>

      {/* Workflow list */}
      <div className="glass-card overflow-hidden">
        <div className="border-b border-white/5 px-6 py-4">
          <h3 className="font-semibold text-white">Workflow Controls</h3>
        </div>
        <div className="divide-y divide-white/5">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    wf.freezeMode
                      ? "bg-blue-500/20"
                      : wf.status === "failing"
                        ? "bg-red-500/20"
                        : wf.status === "degraded"
                          ? "bg-amber-500/20"
                          : "bg-emerald-500/20"
                  }`}
                >
                  {wf.freezeMode ? (
                    <Snowflake className="h-5 w-5 text-blue-400" />
                  ) : (
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        wf.status === "healthy"
                          ? "text-emerald-400"
                          : wf.status === "failing"
                            ? "text-red-400"
                            : "text-amber-400"
                      }`}
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">{wf.name}</p>
                  <p className="text-xs text-gray-500">
                    {wf.company} · {wf.platform} · {wf.errorCount24h} errors
                    today
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`hidden rounded-full px-2 py-0.5 text-xs font-medium sm:inline ${
                    wf.freezeMode
                      ? "bg-blue-500/10 text-blue-400"
                      : wf.status === "healthy"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : wf.status === "failing"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {wf.freezeMode ? "frozen" : wf.status}
                </span>
                {wf.freezeMode ? (
                  <button
                    onClick={() =>
                      setConfirmModal({
                        id: wf.id,
                        name: wf.name,
                        action: "unfreeze",
                      })
                    }
                    className="btn-secondary text-xs"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Resume
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setConfirmModal({
                        id: wf.id,
                        name: wf.name,
                        action: "freeze",
                      })
                    }
                    className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/20"
                  >
                    <Snowflake className="mr-1 inline h-3.5 w-3.5" />
                    Freeze &amp; Notify
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="glass-card p-6">
        <h3 className="mb-3 font-semibold text-white">What happens when you freeze?</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Pause,
              title: "Workflow paused",
              desc: "FlowGuard calls the platform API to disable the scenario/workflow immediately.",
            },
            {
              icon: Bell,
              title: "Owner notified",
              desc: "Plain-English Slack and email alert sent with what failed and how to fix it.",
            },
            {
              icon: Shield,
              title: "Errors stopped",
              desc: "No more silent failures or cascading errors. Data is safe until you resume.",
            },
          ].map((step) => (
            <div key={step.title} className="text-center">
              <step.icon className="mx-auto h-6 w-6 text-brand-400" />
              <p className="mt-2 text-sm font-medium text-white">{step.title}</p>
              <p className="mt-1 text-xs text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm modal */}
      <Modal
        open={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title={
          confirmModal?.action === "freeze"
            ? "Freeze Workflow?"
            : "Resume Workflow?"
        }
      >
        {confirmModal && (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              {confirmModal.action === "freeze" ? (
                <>
                  This will pause <strong>{confirmModal.name}</strong> and send
                  an immediate alert to the workflow owner explaining what
                  happened and what to do next.
                </>
              ) : (
                <>
                  This will resume <strong>{confirmModal.name}</strong> and
                  re-enable error monitoring. Make sure the underlying issue has
                  been fixed.
                </>
              )}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleFreeze(
                    confirmModal.id,
                    confirmModal.action === "freeze"
                  )
                }
                className={
                  confirmModal.action === "freeze"
                    ? "rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                    : "btn-primary"
                }
              >
                {confirmModal.action === "freeze" ? (
                  <>
                    <Snowflake className="mr-1 inline h-4 w-4" />
                    Freeze &amp; Notify
                  </>
                ) : (
                  <>
                    <Play className="mr-1 inline h-4 w-4" />
                    Resume Workflow
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
