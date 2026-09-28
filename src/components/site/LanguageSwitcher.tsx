"use client";

import { useId, useOptimistic, useTransition } from "react";
import { useLocale, useT } from "@/components/i18n/I18nProvider";
import { setLocale } from "@/lib/i18n/actions";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/** Drawn inline: flag emoji render as bare letters on Windows. */
function UkFlag() {
  const id = useId();
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <clipPath id={id}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath={`url(#${id})`}
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function TanzaniaFlag() {
  return (
    <svg viewBox="0 0 72 48" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <path d="M0,0 H72 L0,48 Z" fill="#1EB53A" />
      <path d="M72,0 V48 H0 Z" fill="#00A3DD" />
      <path d="M0,48 L72,0" stroke="#FCD116" strokeWidth="20" />
      <path d="M0,48 L72,0" stroke="#000" strokeWidth="13" />
    </svg>
  );
}

function FranceFlag() {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  );
}

const LANGUAGES: { code: Locale; short: string; name: string; Flag: () => React.ReactElement }[] = [
  { code: "en", short: "EN", name: "English", Flag: UkFlag },
  { code: "sw", short: "SW", name: "Kiswahili", Flag: TanzaniaFlag },
  { code: "fr", short: "FR", name: "Français", Flag: FranceFlag },
];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const locale = useLocale();
  const [active, setActive] = useOptimistic(locale);
  const [pending, startTransition] = useTransition();

  function choose(next: Locale) {
    if (next === active) return;
    startTransition(async () => {
      setActive(next);
      await setLocale(next);
    });
  }

  return (
    <div
      role="radiogroup"
      aria-label={t.language.label}
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-line bg-white/70 p-1 backdrop-blur-sm transition-opacity",
        pending && "opacity-70"
      )}
    >
      {LANGUAGES.map(({ code, short, name, Flag }) => {
        const selected = active === code;
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={name}
            title={name}
            lang={code}
            onClick={() => choose(code)}
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-full text-xs font-semibold transition",
              compact ? "px-1" : "pl-1 pr-2.5",
              selected
                ? "bg-cream text-gold-700 shadow-[0_1px_6px_rgba(66,44,23,0.14)]"
                : "text-muted hover:text-ink"
            )}
          >
            <span
              className={cn(
                "block h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 transition",
                !selected && "opacity-60 grayscale-[35%]"
              )}
              aria-hidden="true"
            >
              <Flag />
            </span>
            {compact ? null : short}
          </button>
        );
      })}
    </div>
  );
}
