"use client";

import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

interface DevNoteProps {
  title: string;
  children: React.ReactNode;
}

export function DevNote({ title, children }: DevNoteProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 rounded-full border border-brand-500/30 bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-400 transition hover:bg-brand-500/20"
        aria-label="Developer note"
      >
        <Info className="h-3 w-3" />
        DEV
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 animate-fade-in rounded-lg border border-brand-500/20 bg-surface-800 p-3 shadow-2xl">
          <p className="mb-1 text-xs font-semibold text-brand-400">{title}</p>
          <div className="text-xs leading-relaxed text-gray-400">{children}</div>
        </div>
      )}
    </div>
  );
}
