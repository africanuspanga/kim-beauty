"use client";

import { useEffect, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { useT } from "@/components/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/**
 * Shares the link to one product or one service style.
 *
 * Phones open their own share sheet (WhatsApp, Instagram, SMS…); desktops
 * copy the link instead, and fall back to WhatsApp if copying is blocked.
 */
export function ShareButton({
  path,
  title,
  text,
  variant = "icon",
  className,
}: {
  /** Site path, e.g. `/shop/kim-growth-oil`. */
  path: string;
  title: string;
  text?: string;
  variant?: "icon" | "button";
  className?: string;
}) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  async function share() {
    const url = new URL(path, window.location.origin).toString();

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        // Closing the share sheet is not a failure.
        if ((error as DOMException)?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      const message = [text ?? title, url].join("\n");
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  const Icon = copied ? Check : Share2;

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={share}
        aria-label={t.share.label(title)}
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-line bg-cream px-5 text-sm font-medium text-ink-soft transition hover:border-gold-300 hover:text-gold-700",
          className
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span aria-live="polite">{copied ? t.share.copied : t.share.button}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? t.share.copied : t.share.label(title)}
      title={copied ? t.share.copied : t.share.button}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 text-ink shadow-sm backdrop-blur-sm transition hover:bg-cream hover:text-gold-700",
        className
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {copied ? (
        <span
          role="status"
          className="pointer-events-none absolute end-0 top-full mt-1.5 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-cream shadow"
        >
          {t.share.copied}
        </span>
      ) : null}
    </button>
  );
}
