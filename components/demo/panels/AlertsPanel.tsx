"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Eye, Calendar } from "lucide-react";
import { alertPreviews, formatDate } from "@/lib/mock-data";
import { DevNote } from "@/components/ui/DevNote";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

export function AlertsPanel() {
  const [channelFilter, setChannelFilter] = useState<"all" | "slack" | "email">(
    "all"
  );
  const [selectedAlert, setSelectedAlert] = useState<
    (typeof alertPreviews)[0] | null
  >(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [digestPreview, setDigestPreview] = useState(false);
  const { showToast } = useToast();

  const filtered = alertPreviews.filter(
    (a) => channelFilter === "all" || a.channel === channelFilter
  );

  const sendTestAlert = () => {
    showToast("Test alert sent to #ops-alerts on Slack", "success");
    setComposeOpen(false);
  };

  const weeklyDigestContent = `📊 FlowGuard Weekly Digest — Jul 3–10, 2026

Hi Sarah,

Here's your workflow health summary for the past week:

📈 47 total errors detected across 8 workflows
✅ 31 auto-resolved (66% resolution rate)
⏸️ 2 workflows frozen for manual review
🚨 3 escalated to you for action

Top issues:
• API Timeouts: 18 (mostly Airtable & HubSpot)
• Rate Limits: 12 (HubSpot lead capture)
• Missing Fields: 9 (onboarding forms)

Workflows needing attention:
1. Lead Capture → HubSpot CRM (12 errors, rate limits)
2. Client Onboarding Pipeline (7 errors, missing fields)

Everything else is running smoothly.

— FlowGuard`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Plain-English Alerts
          </h2>
          <p className="text-sm text-gray-400">
            Slack and email notifications that explain failures in language your
            clients understand.
          </p>
        </div>
        <DevNote title="Alert System">
          Production: OpenAI generates plain-English summaries from classified
          errors. Sent via Slack API and Resend (email). Templates stored per
          customer with channel preferences.
        </DevNote>
      </div>

      {/* Actions bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-surface-800 p-1">
          {(["all", "slack", "email"] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
                channelFilter === ch
                  ? "bg-brand-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {ch === "all" ? "All Channels" : ch}
            </button>
          ))}
        </div>
        <button onClick={() => setComposeOpen(true)} className="btn-primary text-sm">
          <Send className="h-4 w-4" />
          Send Test Alert
        </button>
        <button
          onClick={() => setDigestPreview(true)}
          className="btn-secondary text-sm"
        >
          <Calendar className="h-4 w-4" />
          Preview Weekly Digest
        </button>
      </div>

      {/* Alert cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((alert) => (
          <button
            key={alert.id}
            onClick={() => setSelectedAlert(alert)}
            className="glass-card p-5 text-left transition hover:border-brand-500/30"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {alert.channel === "slack" ? (
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                ) : (
                  <Mail className="h-4 w-4 text-brand-400" />
                )}
                <span className="text-sm font-medium text-white capitalize">
                  {alert.channel}
                </span>
                <span className="text-xs text-gray-500">
                  → {alert.recipient}
                </span>
              </div>
              <Eye className="h-4 w-4 text-gray-500" />
            </div>
            {alert.subject && (
              <p className="mb-2 text-sm font-medium text-gray-200">
                {alert.subject}
              </p>
            )}
            <p className="line-clamp-3 text-sm text-gray-400 whitespace-pre-line">
              {alert.body.split("\n").slice(0, 3).join("\n")}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>{alert.workflow}</span>
              <span>{formatDate(alert.sentAt)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Alert channels config */}
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-white">Notification Channels</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-surface-700/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-400" />
                <span className="font-medium text-white">Slack</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                Connected
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              #ops-alerts, #automation-health
            </p>
            <button
              onClick={() =>
                showToast("Slack channel settings opened", "info")
              }
              className="mt-3 text-xs text-brand-400 hover:text-brand-300"
            >
              Manage channels →
            </button>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-700/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-brand-400" />
                <span className="font-medium text-white">Email</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                Connected
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              sarah@brightpath.io, james@cloudnine.io
            </p>
            <button
              onClick={() =>
                showToast("Email recipient settings opened", "info")
              }
              className="mt-3 text-xs text-brand-400 hover:text-brand-300"
            >
              Manage recipients →
            </button>
          </div>
        </div>
      </div>

      {/* Alert detail modal */}
      <Modal
        open={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        title={
          selectedAlert
            ? `${selectedAlert.channel === "slack" ? "Slack" : "Email"} Alert`
            : ""
        }
        size="lg"
      >
        {selectedAlert && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-sm text-gray-400">
              <span>To: {selectedAlert.recipient}</span>
              <span>·</span>
              <span>{formatDate(selectedAlert.sentAt)}</span>
            </div>
            {selectedAlert.subject && (
              <h4 className="text-lg font-semibold text-white">
                {selectedAlert.subject}
              </h4>
            )}
            <div className="rounded-lg border border-white/10 bg-surface-900 p-4">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-300">
                {selectedAlert.body}
              </pre>
            </div>
            <p className="text-xs text-gray-500">
              Workflow: {selectedAlert.workflow}
            </p>
          </div>
        )}
      </Modal>

      {/* Compose test alert modal */}
      <Modal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        title="Send Test Alert"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Channel</label>
            <select className="mt-1 w-full rounded-lg border border-white/10 bg-surface-700 px-3 py-2 text-sm text-white">
              <option>Slack — #ops-alerts</option>
              <option>Email — sarah@brightpath.io</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400">Workflow</label>
            <select className="mt-1 w-full rounded-lg border border-white/10 bg-surface-700 px-3 py-2 text-sm text-white">
              <option>Client Onboarding Pipeline</option>
              <option>Lead Capture → HubSpot CRM</option>
            </select>
          </div>
          <p className="text-sm text-gray-400">
            A sample plain-English alert will be generated and sent to the
            selected channel.
          </p>
          <button onClick={sendTestAlert} className="btn-primary w-full">
            <Send className="h-4 w-4" />
            Send Test Alert
          </button>
        </div>
      </Modal>

      {/* Weekly digest modal */}
      <Modal
        open={digestPreview}
        onClose={() => setDigestPreview(false)}
        title="Weekly Digest Preview"
        size="lg"
      >
        <p className="mb-4 text-sm text-gray-400">
          Sent every Monday at 8:00 AM via email. Generated by cron job
          aggregating the week&apos;s error data.
        </p>
        <div className="rounded-lg border border-white/10 bg-surface-900 p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-300">
            {weeklyDigestContent}
          </pre>
        </div>
        <button
          onClick={() => {
            showToast("Weekly digest sent to sarah@brightpath.io", "success");
            setDigestPreview(false);
          }}
          className="btn-primary mt-4"
        >
          Send Now
        </button>
      </Modal>
    </div>
  );
}
