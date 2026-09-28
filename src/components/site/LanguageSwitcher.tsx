"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useOptimistic, useRef, useState, useTransition } from "react";
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

/** Five-point star as a polygon, pointing `rotate` degrees from straight up. */
function starPoints(cx: number, cy: number, r: number, rotate = 0) {
  return Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : r * 0.382;
    const angle = ((rotate + i * 36 - 90) * Math.PI) / 180;
    return `${(cx + radius * Math.cos(angle)).toFixed(3)},${(cy + radius * Math.sin(angle)).toFixed(3)}`;
  }).join(" ");
}

function ChinaFlag() {
  // Anchored left: the stars sit in the top-left corner, off a centred crop.
  return (
    <svg viewBox="0 0 30 20" preserveAspectRatio="xMinYMid slice" className="h-full w-full">
      <rect width="30" height="20" fill="#EE1C25" />
      <g fill="#FFFF00">
        <polygon points={starPoints(5, 5, 3)} />
        <polygon points={starPoints(10, 2, 1, 23)} />
        <polygon points={starPoints(12, 4, 1, 46)} />
        <polygon points={starPoints(12, 7, 1, 70)} />
        <polygon points={starPoints(10, 9, 1, 21)} />
      </g>
    </svg>
  );
}

function UaeFlag() {
  // Anchored left so the red hoist band stays in the round crop.
  return (
    <svg viewBox="0 0 12 6" preserveAspectRatio="xMinYMid slice" className="h-full w-full">
      <rect width="12" height="2" fill="#00732F" />
      <rect y="2" width="12" height="2" fill="#fff" />
      <rect y="4" width="12" height="2" fill="#000" />
      <rect width="3" height="6" fill="#FF0000" />
    </svg>
  );
}

type Language = {
  code: Locale;
  short: string;
  name: string;
  Flag: () => React.ReactElement;
};

const LANGUAGES: Language[] = [
  { code: "en", short: "EN", name: "English", Flag: UkFlag },
  { code: "sw", short: "SW", name: "Kiswahili", Flag: TanzaniaFlag },
  { code: "fr", short: "FR", name: "Français", Flag: FranceFlag },
  { code: "zh", short: "中文", name: "中文", Flag: ChinaFlag },
  { code: "ar", short: "عربي", name: "العربية", Flag: UaeFlag },
];

function FlagDot({ Flag, dim = false }: { Flag: Language["Flag"]; dim?: boolean }) {
  return (
    <span
      className={cn(
        "block h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 transition",
        dim && "opacity-60 grayscale-[35%]"
      )}
      aria-hidden="true"
    >
      <Flag />
    </span>
  );
}

/** Saves the choice; the server re-renders the page in the new language. */
function useLanguageChoice() {
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

  return { active, pending, choose };
}

/**
 * Desktop: every flag in a row, one tap to switch.
 * Compact (phones): the current flag opens a small menu — four flags in a
 * row would crowd the cart and menu buttons off a narrow screen.
 */
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  return compact ? <LanguageMenu /> : <LanguageRow />;
}

function LanguageRow() {
  const t = useT();
  const { active, pending, choose } = useLanguageChoice();

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
              "flex h-8 items-center gap-1.5 rounded-full ps-1 pe-2.5 text-xs font-semibold transition",
              selected
                ? "bg-cream text-gold-700 shadow-[0_1px_6px_rgba(66,44,23,0.14)]"
                : "text-muted hover:text-ink"
            )}
          >
            <FlagDot Flag={Flag} dim={!selected} />
            {short}
          </button>
        );
      })}
    </div>
  );
}

function LanguageMenu() {
  const t = useT();
  const { active, pending, choose } = useLanguageChoice();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === active) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t.language.label}: ${current.name}`}
        className={cn(
          "flex h-10 items-center gap-1 rounded-full border border-line bg-white/70 ps-1.5 pe-2 text-ink-soft backdrop-blur-sm transition hover:border-gold-300",
          pending && "opacity-70"
        )}
      >
        <FlagDot Flag={current.Flag} />
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="radiogroup"
          aria-label={t.language.label}
          className="absolute end-0 top-full z-10 mt-2 w-44 rounded-2xl border border-line bg-cream p-1.5 shadow-lift"
        >
          {LANGUAGES.map(({ code, name, Flag }) => {
            const selected = active === code;
            return (
              <button
                key={code}
                type="button"
                role="radio"
                aria-checked={selected}
                lang={code}
                onClick={() => {
                  setOpen(false);
                  choose(code);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-start text-sm font-medium transition",
                  selected ? "bg-gold-50 text-gold-700" : "text-ink-soft hover:bg-blush-50"
                )}
              >
                <FlagDot Flag={Flag} />
                <span className="flex-1">{name}</span>
                {selected ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
