"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-slide-up flex items-center gap-3 rounded-lg border px-4 py-3 shadow-xl ${
              toast.type === "success"
                ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-100"
                : toast.type === "error"
                  ? "border-red-500/30 bg-red-950/90 text-red-100"
                  : "border-brand-500/30 bg-surface-800/95 text-gray-100"
            }`}
          >
            {toast.type === "success" && (
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            )}
            {toast.type === "info" && (
              <Info className="h-4 w-4 shrink-0 text-brand-400" />
            )}
            <span className="text-sm">{toast.message}</span>
            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-2 shrink-0 rounded p-0.5 hover:bg-white/10"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
