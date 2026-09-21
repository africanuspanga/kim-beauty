"use client";

import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[clamp(1.6rem,3vw,2.15rem)] leading-tight">{title}</h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-cream p-5 shadow-soft sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <Loader2 className="h-6 w-6 animate-spin text-gold-500" aria-hidden="true" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line py-16 text-center">
      <p className="text-lg text-ink">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function Toast({
  message,
  tone = "success",
  onDone,
}: {
  message: string;
  tone?: "success" | "error";
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  const Icon = tone === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium text-white shadow-lift",
        tone === "success" ? "bg-emerald-600" : "bg-red-600"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink/45 p-4 backdrop-blur-[2px] sm:p-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "my-auto w-full rounded-2xl border border-line bg-cream shadow-lift",
          wide ? "max-w-4xl" : "max-w-2xl"
        )}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-xl">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-muted transition hover:bg-blush-100 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  busy,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/50 p-5 backdrop-blur-[2px]">
      <div
        role="alertdialog"
        aria-modal="true"
        className="w-full max-w-sm rounded-2xl border border-line bg-cream p-7 text-center shadow-lift"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-xl">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        <div className="mt-7 flex gap-3">
          <button
            onClick={onCancel}
            disabled={busy}
            className="h-11 flex-1 rounded-full border border-line text-sm font-medium text-ink-soft transition hover:bg-blush-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="h-11 flex-1 rounded-full bg-red-600 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {busy ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tones: Record<string, string> = {
    new: "bg-blue-50 text-blue-700",
    confirmed: "bg-amber-50 text-amber-700",
    completed: "bg-emerald-50 text-emerald-700",
    fulfilled: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        tones[status] ?? "bg-blush-100 text-gold-700"
      )}
    >
      {status}
    </span>
  );
}
