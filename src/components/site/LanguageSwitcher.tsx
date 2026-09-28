"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "sw", label: "Kiswahili", shortLabel: "SW" },
  { code: "zh-CN", label: "中文", shortLabel: "中文" },
  { code: "hi", label: "हिन्दी", shortLabel: "HI" },
  { code: "es", label: "Español", shortLabel: "ES" },
  { code: "ar", label: "العربية", shortLabel: "AR" },
  { code: "fr", label: "Français", shortLabel: "FR" },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string
        ) => unknown;
      };
    };
    kimBeautyGoogleTranslateInit?: () => void;
  }
}

function selectedLanguageFromCookie(): LanguageCode {
  const value = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("googtrans="))
    ?.split("=")[1];
  const code = value ? decodeURIComponent(value).split("/").pop() : "en";

  return LANGUAGES.some((language) => language.code === code)
    ? (code as LanguageCode)
    : "en";
}

function initialiseGoogleTranslate() {
  if (!window.google?.translate?.TranslateElement) return;

  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: LANGUAGES.map((language) => language.code).join(","),
      autoDisplay: false,
    },
    "google_translate_element"
  );
}

function applyDocumentLanguage(language: LanguageCode) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const selectedLanguage = selectedLanguageFromCookie();
      setLanguage(selectedLanguage);
      applyDocumentLanguage(selectedLanguage);
    });

    if (document.getElementById("google-translate-script")) {
      return () => window.cancelAnimationFrame(frame);
    }

    window.kimBeautyGoogleTranslateInit = initialiseGoogleTranslate;
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=kimBeautyGoogleTranslateInit";
    script.async = true;
    document.body.appendChild(script);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function changeLanguage(nextLanguage: LanguageCode) {
    setLanguage(nextLanguage);
    applyDocumentLanguage(nextLanguage);

    if (nextLanguage === "en") {
      document.cookie = "googtrans=; path=/; max-age=0; SameSite=Lax";
    } else {
      document.cookie = `googtrans=${encodeURIComponent(`/en/${nextLanguage}`)}; path=/; max-age=31536000; SameSite=Lax`;
    }

    window.location.reload();
  }

  return (
    <div className={cn("notranslate relative", compact ? "w-[72px]" : "w-[142px]")}>
      <Languages
        className={cn(
          "pointer-events-none absolute top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gold-600",
          compact ? "left-2" : "left-3"
        )}
        aria-hidden="true"
      />
      <select
        value={language}
        onChange={(event) => changeLanguage(event.target.value as LanguageCode)}
        aria-label="Choose language"
        title="Choose language"
        className={cn(
          "h-10 w-full cursor-pointer appearance-none rounded-full border border-line bg-white/70 pr-2 text-xs font-semibold text-ink-soft backdrop-blur-sm transition hover:border-gold-300 focus:border-gold-400 focus:outline-none",
          compact ? "pl-7" : "pl-9 pr-3 text-sm"
        )}
      >
        {LANGUAGES.map((option) => (
          <option key={option.code} value={option.code}>
            {compact ? option.shortLabel : option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
