"use client";

import { useState } from "react";
import { Copy, Check, Play, Code } from "lucide-react";
import {
  WEBHOOK_URL,
  webhookPayloadExample,
  workflows,
} from "@/lib/mock-data";
import { DevNote } from "@/components/ui/DevNote";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

export function WebhookPanel() {
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<
    "Make" | "n8n" | "Zapier"
  >("Make");
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [testResult, setTestResult] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const { showToast } = useToast();

  const copyWebhook = () => {
    navigator.clipboard.writeText(WEBHOOK_URL);
    setCopied(true);
    showToast("Webhook URL copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const runTest = () => {
    setTestRunning(true);
    setTestResult("idle");
    setTimeout(() => {
      setTestRunning(false);
      setTestResult("success");
      showToast(
        "Test webhook received! Error classified as 'missing_field'",
        "success"
      );
    }, 2000);
  };

  const platformInstructions: Record<string, string[]> = {
    Make: [
      "Open your scenario in Make.com",
      "Add an HTTP module after your error handler",
      "Set method to POST and paste the FlowGuard webhook URL",
      "Map the error output fields to the JSON body template below",
      "Enable 'Evaluate all states as errors' in scenario settings",
    ],
    n8n: [
      "Open your workflow in n8n",
      "Add an Error Trigger node connected to your workflow",
      "Add an HTTP Request node pointing to the FlowGuard webhook",
      "Set body to JSON and use the template below",
      "Activate the workflow",
    ],
    Zapier: [
      "Create a new Zap with 'Catch Hook' as trigger (for testing)",
      "In your existing Zap, add a 'Webhooks by Zapier' action on error paths",
      "Set POST method and paste the FlowGuard webhook URL",
      "Map error fields to the JSON body template",
      "Turn on the Zap",
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Webhook Setup</h2>
          <p className="text-sm text-gray-400">
            Add this URL to any workflow&apos;s error handler. Zero code
            changes required.
          </p>
        </div>
        <DevNote title="Webhook Interceptor">
          Production: Express/Fastify endpoint receives POST payloads, validates
          signature, enqueues to BullMQ for classification. Each customer gets a
          unique webhook URL with HMAC verification.
        </DevNote>
      </div>

      {/* Webhook URL */}
      <div className="glass-card p-6">
        <label className="text-sm font-medium text-gray-300">
          Your FlowGuard Webhook URL
        </label>
        <div className="mt-2 flex items-center gap-2">
          <code className="flex-1 overflow-x-auto rounded-lg border border-white/10 bg-surface-900 px-4 py-3 font-mono text-sm text-brand-300">
            {WEBHOOK_URL}
          </code>
          <button
            onClick={copyWebhook}
            className="btn-secondary shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <button
          onClick={() => setTestModalOpen(true)}
          className="btn-primary mt-4"
        >
          <Play className="h-4 w-4" />
          Send Test Webhook
        </button>
      </div>

      {/* Platform tabs */}
      <div className="glass-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-white">Platform Setup Guide</h3>
          <DevNote title="Platform Integration">
            Each platform has a different error handling mechanism. FlowGuard
            normalizes all payloads into a standard schema regardless of source.
          </DevNote>
        </div>
        <div className="mb-4 flex gap-2">
          {(["Make", "n8n", "Zapier"] as const).map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                selectedPlatform === platform
                  ? "bg-brand-600 text-white"
                  : "bg-surface-700 text-gray-400 hover:text-white"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
        <ol className="space-y-2">
          {platformInstructions[selectedPlatform].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600/20 text-xs font-bold text-brand-400">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* JSON template */}
      <div className="glass-card p-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-gray-400" />
            <h3 className="font-semibold text-white">Expected Payload Format</h3>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(webhookPayloadExample);
              showToast("Payload template copied", "success");
            }}
            className="text-xs text-brand-400 hover:text-brand-300"
          >
            Copy template
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-white/10 bg-surface-900 p-4 font-mono text-xs leading-relaxed text-gray-300">
          {webhookPayloadExample}
        </pre>
      </div>

      {/* Connected workflows */}
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-white">
          Connected Workflows ({workflows.length})
        </h3>
        <div className="space-y-2">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-surface-700/30 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-white">{wf.name}</p>
                <p className="text-xs text-gray-500">
                  {wf.company} · {wf.platform}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  wf.status === "healthy"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : wf.status === "frozen"
                      ? "bg-blue-500/10 text-blue-400"
                      : wf.status === "failing"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {wf.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Test modal */}
      <Modal
        open={testModalOpen}
        onClose={() => {
          setTestModalOpen(false);
          setTestResult("idle");
        }}
        title="Send Test Webhook"
        size="md"
      >
        <p className="mb-4 text-sm text-gray-400">
          Simulates an error payload from &quot;Client Onboarding Pipeline&quot;
          hitting your FlowGuard endpoint.
        </p>
        <pre className="mb-4 overflow-x-auto rounded-lg border border-white/10 bg-surface-900 p-3 font-mono text-xs text-gray-300">
          {webhookPayloadExample}
        </pre>
        {testResult === "success" && (
          <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            ✓ Webhook received and classified as &quot;Missing Field&quot;. View
            in the Failure Dashboard.
          </div>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setTestModalOpen(false)}
            className="btn-secondary"
          >
            Close
          </button>
          <button
            onClick={runTest}
            disabled={testRunning}
            className="btn-primary"
          >
            {testRunning ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Sending...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Send Test
              </>
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}
