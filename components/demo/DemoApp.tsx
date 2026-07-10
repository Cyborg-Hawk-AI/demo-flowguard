"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Webhook,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  Snowflake,
  Search,
  Bell,
  Settings,
  ChevronDown,
} from "lucide-react";
import { DevNote } from "@/components/ui/DevNote";
import { OverviewPanel } from "./panels/OverviewPanel";
import { WebhookPanel } from "./panels/WebhookPanel";
import { FailuresPanel } from "./panels/FailuresPanel";
import { RetryPanel } from "./panels/RetryPanel";
import { AlertsPanel } from "./panels/AlertsPanel";
import { FreezePanel } from "./panels/FreezePanel";

export type DemoView =
  | "overview"
  | "webhook"
  | "failures"
  | "retry"
  | "alerts"
  | "freeze";

const navItems: { id: DemoView; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "webhook", label: "Webhook Setup", icon: Webhook },
  { id: "failures", label: "Failure Dashboard", icon: AlertTriangle },
  { id: "retry", label: "Auto-Retry", icon: RefreshCw },
  { id: "alerts", label: "Alerts", icon: MessageSquare },
  { id: "freeze", label: "Freeze & Notify", icon: Snowflake },
];

export function DemoApp() {
  const [activeView, setActiveView] = useState<DemoView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPanel = () => {
    switch (activeView) {
      case "overview":
        return <OverviewPanel onNavigate={setActiveView} />;
      case "webhook":
        return <WebhookPanel />;
      case "failures":
        return <FailuresPanel />;
      case "retry":
        return <RetryPanel />;
      case "alerts":
        return <AlertsPanel />;
      case "freeze":
        return <FreezePanel />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-surface-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 mt-16 w-64 transform border-r border-white/5 bg-surface-800 transition-transform lg:static lg:mt-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-6 flex items-center justify-between px-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              FlowGuard Console
            </span>
            <DevNote title="Demo Navigation">
              Each section maps to a core MVP feature. In production, this would
              be a full authenticated dashboard backed by Supabase.
            </DevNote>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  activeView === item.id
                    ? "bg-brand-600/20 text-brand-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-lg border border-white/5 bg-surface-700/50 p-3">
            <p className="text-xs text-gray-500">Plan: Starter</p>
            <p className="text-sm font-medium text-white">8 / 10 workflows</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-600">
              <div className="h-full w-[80%] rounded-full bg-brand-500" />
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-surface-800/50 px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 lg:hidden"
            >
              <ChevronDown
                className={`h-5 w-5 transition ${sidebarOpen ? "rotate-180" : ""}`}
              />
            </button>
            <h1 className="text-lg font-semibold text-white">
              {navItems.find((n) => n.id === activeView)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white">
              <Search className="h-4 w-4" />
            </button>
            <button className="relative rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white">
              <Settings className="h-4 w-4" />
            </button>
            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              SC
            </div>
          </div>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">{renderPanel()}</div>
      </div>
    </div>
  );
}
