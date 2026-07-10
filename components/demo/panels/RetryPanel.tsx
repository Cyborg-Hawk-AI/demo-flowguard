"use client";

import { useState } from "react";
import { Save, Play, Clock, Zap } from "lucide-react";
import { DevNote } from "@/components/ui/DevNote";
import { useToast } from "@/components/ui/Toast";

interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryOnCategories: string[];
}

const defaultConfig: RetryConfig = {
  maxRetries: 5,
  initialDelay: 5,
  maxDelay: 300,
  backoffMultiplier: 2,
  retryOnCategories: ["api_timeout", "rate_limit"],
};

const retryHistory = [
  {
    id: "rh-001",
    workflow: "Stripe → Airtable Revenue Log",
    attempt: 3,
    delay: "30s",
    result: "success" as const,
    timestamp: "2026-07-10T20:39:00Z",
  },
  {
    id: "rh-002",
    workflow: "Lead Capture → HubSpot CRM",
    attempt: 2,
    delay: "15s",
    result: "pending" as const,
    timestamp: "2026-07-10T19:32:30Z",
  },
  {
    id: "rh-003",
    workflow: "Client Onboarding Pipeline",
    attempt: 2,
    delay: "10s",
    result: "failed" as const,
    timestamp: "2026-07-10T20:14:30Z",
  },
  {
    id: "rh-004",
    workflow: "Stripe → Airtable Revenue Log",
    attempt: 1,
    delay: "5s",
    result: "failed" as const,
    timestamp: "2026-07-10T20:38:05Z",
  },
  {
    id: "rh-005",
    workflow: "Stripe → Airtable Revenue Log",
    attempt: 2,
    delay: "10s",
    result: "failed" as const,
    timestamp: "2026-07-10T20:38:20Z",
  },
];

export function RetryPanel() {
  const [config, setConfig] = useState<RetryConfig>(defaultConfig);
  const [simulating, setSimulating] = useState(false);
  const [simulationSteps, setSimulationSteps] = useState<string[]>([]);
  const { showToast } = useToast();

  const saveConfig = () => {
    showToast("Retry configuration saved", "success");
  };

  const simulateRetry = () => {
    setSimulating(true);
    setSimulationSteps([]);
    const steps = [
      `Attempt 1: Waiting ${config.initialDelay}s...`,
      "Attempt 1: Failed (API timeout)",
      `Attempt 2: Waiting ${config.initialDelay * config.backoffMultiplier}s...`,
      "Attempt 2: Failed (API timeout)",
      `Attempt 3: Waiting ${config.initialDelay * config.backoffMultiplier ** 2}s...`,
      "Attempt 3: Success! Workflow resumed.",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setSimulationSteps((prev) => [...prev, steps[i]]);
        i++;
      } else {
        clearInterval(interval);
        setSimulating(false);
        showToast("Simulation complete — resolved on attempt 3", "success");
      }
    }, 800);
  };

  const toggleCategory = (cat: string) => {
    setConfig((prev) => ({
      ...prev,
      retryOnCategories: prev.retryOnCategories.includes(cat)
        ? prev.retryOnCategories.filter((c) => c !== cat)
        : [...prev.retryOnCategories, cat],
    }));
  };

  const categories = [
    { id: "api_timeout", label: "API Timeout" },
    { id: "rate_limit", label: "Rate Limit" },
    { id: "missing_field", label: "Missing Field" },
    { id: "auth_error", label: "Auth Error" },
    { id: "validation", label: "Validation" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Auto-Retry Configuration</h2>
          <p className="text-sm text-gray-400">
            Configure exponential backoff for transient failures. Most timeouts
            and rate limits resolve automatically.
          </p>
        </div>
        <DevNote title="Auto-Retry Engine">
          Production: BullMQ schedules retry jobs with configurable backoff.
          Each retry re-invokes the original workflow step via platform API.
          Jobs persist in Redis with dead-letter queue for max retries exceeded.
        </DevNote>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Config form */}
        <div className="glass-card p-6">
          <h3 className="mb-4 font-semibold text-white">Retry Settings</h3>
          <div className="space-y-5">
            <div>
              <label className="flex items-center justify-between text-sm text-gray-300">
                Max Retries
                <span className="font-mono text-brand-400">
                  {config.maxRetries}
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={config.maxRetries}
                onChange={(e) =>
                  setConfig({ ...config, maxRetries: Number(e.target.value) })
                }
                className="mt-2 w-full accent-brand-500"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm text-gray-300">
                Initial Delay (seconds)
                <span className="font-mono text-brand-400">
                  {config.initialDelay}s
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={60}
                value={config.initialDelay}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    initialDelay: Number(e.target.value),
                  })
                }
                className="mt-2 w-full accent-brand-500"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm text-gray-300">
                Max Delay (seconds)
                <span className="font-mono text-brand-400">
                  {config.maxDelay}s
                </span>
              </label>
              <input
                type="range"
                min={30}
                max={600}
                step={30}
                value={config.maxDelay}
                onChange={(e) =>
                  setConfig({ ...config, maxDelay: Number(e.target.value) })
                }
                className="mt-2 w-full accent-brand-500"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm text-gray-300">
                Backoff Multiplier
                <span className="font-mono text-brand-400">
                  {config.backoffMultiplier}x
                </span>
              </label>
              <input
                type="range"
                min={1.5}
                max={4}
                step={0.5}
                value={config.backoffMultiplier}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    backoffMultiplier: Number(e.target.value),
                  })
                }
                className="mt-2 w-full accent-brand-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Auto-retry on categories
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      config.retryOnCategories.includes(cat.id)
                        ? "bg-brand-600 text-white"
                        : "bg-surface-700 text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={saveConfig} className="btn-primary">
              <Save className="h-4 w-4" />
              Save Configuration
            </button>
            <button
              onClick={simulateRetry}
              disabled={simulating}
              className="btn-secondary"
            >
              <Play className="h-4 w-4" />
              Simulate Retry
            </button>
          </div>
        </div>

        {/* Backoff preview + simulation */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="mb-4 font-semibold text-white">
              Backoff Schedule Preview
            </h3>
            <div className="space-y-2">
              {Array.from({ length: config.maxRetries }, (_, i) => {
                const delay = Math.min(
                  config.initialDelay * config.backoffMultiplier ** i,
                  config.maxDelay
                );
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-600 text-xs font-bold text-gray-400">
                      {i + 1}
                    </span>
                    <Clock className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-gray-300">
                      Wait {delay}s then retry
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {simulationSteps.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
                <Zap className="h-4 w-4 text-amber-400" />
                Live Simulation
              </h3>
              <div className="space-y-2">
                {simulationSteps.map((step, i) => (
                  <div
                    key={i}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      step.includes("Success")
                        ? "bg-emerald-500/10 text-emerald-300"
                        : step.includes("Failed")
                          ? "bg-red-500/10 text-red-300"
                          : "bg-surface-700 text-gray-300"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Retry history */}
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-white">Recent Retry Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase text-gray-500">
                <th className="pb-2 pr-4">Workflow</th>
                <th className="pb-2 pr-4">Attempt</th>
                <th className="pb-2 pr-4">Delay</th>
                <th className="pb-2 pr-4">Result</th>
                <th className="pb-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {retryHistory.map((rh) => (
                <tr key={rh.id} className="border-b border-white/5">
                  <td className="py-2.5 pr-4 text-gray-300">{rh.workflow}</td>
                  <td className="py-2.5 pr-4 text-gray-400">#{rh.attempt}</td>
                  <td className="py-2.5 pr-4 text-gray-400">{rh.delay}</td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={`text-xs font-medium ${
                        rh.result === "success"
                          ? "text-emerald-400"
                          : rh.result === "pending"
                            ? "text-amber-400"
                            : "text-red-400"
                      }`}
                    >
                      {rh.result}
                    </span>
                  </td>
                  <td className="py-2.5 text-gray-500 text-xs">
                    {new Date(rh.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
