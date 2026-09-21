"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, RotateCcw, Save } from "lucide-react";
import { Card, PageHeader, Spinner, Toast } from "@/components/admin/AdminUI";
import { ImageField } from "@/components/admin/ImageField";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Section = {
  key: string;
  label: string;
  value: Record<string, string>;
};

/** Human labels for the fields inside each content block. */
const FIELD_LABELS: Record<string, string> = {
  eyebrow: "Eyebrow / Small Label",
  title: "Heading",
  description: "Description",
  body: "Body Text",
  body_2: "Body Text (second paragraph)",
  primary_cta_label: "Primary Button Label",
  primary_cta_href: "Primary Button Link",
  secondary_cta_label: "Secondary Button Label",
  secondary_cta_href: "Secondary Button Link",
  cta_label: "Button Label",
  cta_href: "Button Link",
  image_url: "Image",
  hero_image: "Image",
  logo_url: "Logo",
  tagline: "Tagline",
  copyright: "Copyright Line",
  whatsapp_prefill: "WhatsApp Opening Message",
  site_name: "Site Name",
  phone: "Phone Number",
  whatsapp: "WhatsApp Number (digits only)",
  email: "Email Address",
  address: "Street Address",
  map_query: "Google Maps Search Text",
  hours_weekday: "Weekday Hours",
  hours_saturday: "Saturday Hours",
  hours_sunday: "Sunday Hours",
  instagram: "Instagram URL",
  facebook: "Facebook URL",
  tiktok: "TikTok URL",
  rating: "Google Rating",
  review_count: "Number of Reviews",
  story_title: "Story Heading",
  story_body: "Story Paragraph 1",
  story_body_2: "Story Paragraph 2",
  mission_title: "Mission Heading",
  mission_body: "Mission Text",
  vision_title: "Vision Heading",
  vision_body: "Vision Text",
};

function labelFor(key: string) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bCta\b/g, "Button");
}

const LONG_FIELDS = /^(description|body|body_2|story_body|story_body_2|mission_body|vision_body|quote|tagline)/;
const IMAGE_FIELDS = /(image_url|hero_image|logo_url|avatar_url)$/;

export default function AdminContentPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; tone: "success" | "error" } | null>(
    null
  );

  const load = useCallback(async () => {
    const { data, error } = await getSupabase()
      .from("site_content")
      .select("key, label, value")
      .order("key", { ascending: true });

    if (error) {
      setToast({ msg: error.message, tone: "error" });
      setLoading(false);
      return;
    }

    const rows = (data ?? []).map((r) => ({
      key: r.key as string,
      label: (r.label as string) ?? r.key,
      value: (r.value ?? {}) as Record<string, string>,
    }));

    setSections(rows);
    setDrafts(Object.fromEntries(rows.map((r) => [r.key, { ...r.value }])));
    setOpenKey((prev) => prev ?? rows[0]?.key ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    // load() only sets state after awaiting the network, never synchronously
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const dirty = useMemo(() => {
    const out: Record<string, boolean> = {};
    for (const s of sections) {
      out[s.key] = JSON.stringify(s.value) !== JSON.stringify(drafts[s.key] ?? {});
    }
    return out;
  }, [sections, drafts]);

  function setField(sectionKey: string, field: string, value: string) {
    setDrafts((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [field]: value },
    }));
  }

  async function save(sectionKey: string) {
    setSavingKey(sectionKey);

    const { error } = await getSupabase()
      .from("site_content")
      .update({ value: drafts[sectionKey] })
      .eq("key", sectionKey);

    setSavingKey(null);

    if (error) {
      setToast({ msg: error.message, tone: "error" });
      return;
    }

    setSections((prev) =>
      prev.map((s) =>
        s.key === sectionKey ? { ...s, value: { ...drafts[sectionKey] } } : s
      )
    );
    setToast({ msg: "Saved — your website is updated.", tone: "success" });
  }

  function reset(sectionKey: string) {
    const original = sections.find((s) => s.key === sectionKey);
    if (!original) return;
    setDrafts((prev) => ({ ...prev, [sectionKey]: { ...original.value } }));
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Site Content" />
        <Spinner label="Loading your content…" />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Site Content"
        description="Edit every headline, paragraph, button and contact detail on your website. Changes go live immediately."
      />

      <div className="space-y-3">
        {sections.map((section) => {
          const isOpen = openKey === section.key;
          const draft = drafts[section.key] ?? {};
          const fieldKeys = Object.keys(section.value);

          return (
            <Card key={section.key} className="p-0 overflow-hidden">
              <button
                onClick={() => setOpenKey(isOpen ? null : section.key)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-blush-50/60 sm:px-6"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[15px] font-semibold text-ink">
                    {section.label}
                  </span>
                  {dirty[section.key] ? (
                    <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                      Unsaved
                    </span>
                  ) : null}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {isOpen ? (
                <div className="border-t border-line px-5 py-6 sm:px-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {fieldKeys.map((field) => {
                      const value = draft[field] ?? "";

                      if (IMAGE_FIELDS.test(field)) {
                        return (
                          <div key={field} className="sm:col-span-2">
                            <ImageField
                              label={labelFor(field)}
                              value={value}
                              onChange={(url) => setField(section.key, field, url)}
                            />
                          </div>
                        );
                      }

                      const isLong = LONG_FIELDS.test(field);

                      return (
                        <div
                          key={field}
                          className={isLong ? "sm:col-span-2" : ""}
                        >
                          <label
                            htmlFor={`${section.key}-${field}`}
                            className="mb-2 block text-[13px] font-semibold text-ink"
                          >
                            {labelFor(field)}
                          </label>
                          {isLong ? (
                            <textarea
                              id={`${section.key}-${field}`}
                              rows={3}
                              value={value}
                              onChange={(e) =>
                                setField(section.key, field, e.target.value)
                              }
                              className="w-full resize-y rounded-xl border border-line bg-cream px-3.5 py-3 text-[14px] text-ink outline-none transition focus:border-gold-400"
                            />
                          ) : (
                            <input
                              id={`${section.key}-${field}`}
                              value={value}
                              onChange={(e) =>
                                setField(section.key, field, e.target.value)
                              }
                              className="h-11 w-full rounded-xl border border-line bg-cream px-3.5 text-[14px] text-ink outline-none transition focus:border-gold-400"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => reset(section.key)}
                      disabled={!dirty[section.key]}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-6 text-sm font-medium text-ink-soft transition hover:bg-blush-50 disabled:opacity-40"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Undo Changes
                    </button>
                    <Button
                      onClick={() => save(section.key)}
                      disabled={!dirty[section.key] || savingKey === section.key}
                    >
                      <Save className="h-4 w-4" aria-hidden="true" />
                      {savingKey === section.key ? "Saving…" : "Save Section"}
                    </Button>
                  </div>
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>

      {toast ? (
        <Toast message={toast.msg} tone={toast.tone} onDone={() => setToast(null)} />
      ) : null}
    </>
  );
}
