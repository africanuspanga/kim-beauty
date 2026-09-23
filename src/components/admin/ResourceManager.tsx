"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Save, Search, Trash2 } from "lucide-react";
import {
  Card,
  ConfirmDialog,
  EmptyState,
  Modal,
  PageHeader,
  Spinner,
  Toast,
} from "./AdminUI";
import { ImageField } from "./ImageField";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/client";
import { cn, slugify } from "@/lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "checkbox"
    | "select"
    | "image"
    | "list";
  placeholder?: string;
  options?: { value: string; label: string }[];
  /** Load select options from another table. */
  optionsFrom?: { table: string; valueKey: string; labelKey: string };
  required?: boolean;
  full?: boolean;
  help?: string;
  /** Auto-fill this slug field from another field while creating. */
  slugFrom?: string;
  rows?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;

export type OrderBy = { column: string; ascending: boolean };

export type ColumnDef = {
  key: string;
  label: string;
  render?: (row: Row) => React.ReactNode;
  className?: string;
};

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-cream px-3.5 text-[14px] text-ink outline-none transition placeholder:text-muted/70 focus:border-gold-400";

export function ResourceManager({
  table,
  title,
  description,
  singular,
  fields,
  columns,
  defaults,
  select = "*",
  orderBy = [{ column: "sort_order", ascending: true }],
  searchKeys = ["name", "title"],
}: {
  table: string;
  title: string;
  description?: string;
  singular: string;
  fields: FieldDef[];
  columns: ColumnDef[];
  defaults: Row;
  select?: string;
  /** One clause, or several applied in order — e.g. service, then position. */
  orderBy?: OrderBy | OrderBy[];
  /** Row keys to match against; dotted paths reach into joined rows. */
  searchKeys?: string[];
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>(defaults);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState<{ msg: string; tone: "success" | "error" } | null>(
    null
  );

  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, { value: string; label: string }[]>
  >({});

  // Serialised so the callback identity only changes when the clauses do.
  const orderKey = JSON.stringify(
    Array.isArray(orderBy) ? orderBy : [orderBy]
  );

  const load = useCallback(async () => {
    const supabase = getSupabase();
    const clauses: OrderBy[] = JSON.parse(orderKey);

    let query = supabase.from(table).select(select);
    for (const clause of clauses) {
      query = query.order(clause.column, { ascending: clause.ascending });
    }

    const { data, error } = await query;

    if (error) setToast({ msg: error.message, tone: "error" });
    setRows((data as unknown as Row[]) ?? []);
    setLoading(false);
  }, [table, select, orderKey]);

  useEffect(() => {
    // load() only sets state after awaiting the network, never synchronously
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  // load any select options that come from another table
  useEffect(() => {
    const needed = fields.filter((f) => f.optionsFrom);
    if (needed.length === 0) return;

    const supabase = getSupabase();
    Promise.all(
      needed.map(async (f) => {
        const { table: t, valueKey, labelKey } = f.optionsFrom!;
        const { data } = await supabase.from(t).select(`${valueKey}, ${labelKey}`);
        return [
          f.name,
          ((data as unknown as Row[]) ?? []).map((r) => ({
            value: String(r[valueKey]),
            label: String(r[labelKey]),
          })),
        ] as const;
      })
    ).then((pairs) => setDynamicOptions(Object.fromEntries(pairs)));
  }, [fields]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    const read = (row: Row, key: string) =>
      key
        .split(".")
        .reduce<unknown>((value, part) => (value as Row | null)?.[part], row);

    return rows.filter((r) =>
      searchKeys.some((k) => String(read(r, k) ?? "").toLowerCase().includes(q))
    );
  }, [rows, query, searchKeys]);

  // On phones the table becomes cards: an unlabelled first column is the
  // thumbnail, the next column is the card title, the rest become detail pairs.
  const { leadColumn, titleColumn, detailColumns } = useMemo(() => {
    const hasThumb = columns[0]?.label === "";
    const body = hasThumb ? columns.slice(1) : columns;
    return {
      leadColumn: hasThumb ? columns[0] : null,
      titleColumn: body[0] ?? null,
      detailColumns: body.slice(1),
    };
  }, [columns]);

  function openCreate() {
    setEditing({});
    setForm({ ...defaults });
    setFormError(null);
  }

  function openEdit(row: Row) {
    const next: Row = { ...defaults };
    for (const f of fields) {
      const raw = row[f.name];
      next[f.name] =
        f.type === "list"
          ? Array.isArray(raw)
            ? raw.join("\n")
            : ""
          : raw ?? defaults[f.name] ?? "";
    }
    next.id = row.id;
    setEditing(row);
    setForm(next);
    setFormError(null);
  }

  function setField(name: string, value: unknown) {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // keep slug in sync while creating a brand-new record
      const slugField = fields.find((f) => f.slugFrom === name);
      if (slugField && !editing?.id) {
        next[slugField.name] = slugify(String(value ?? ""));
      }
      return next;
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    for (const f of fields) {
      if (f.required && !String(form[f.name] ?? "").trim()) {
        setFormError(`${f.label} is required.`);
        return;
      }
    }

    setSaving(true);

    const payload: Row = {};
    for (const f of fields) {
      const raw = form[f.name];
      switch (f.type) {
        case "number":
          payload[f.name] =
            raw === "" || raw === null || raw === undefined ? null : Number(raw);
          break;
        case "checkbox":
          payload[f.name] = Boolean(raw);
          break;
        case "list":
          payload[f.name] = String(raw ?? "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
          break;
        case "select":
          payload[f.name] = raw === "" ? null : raw;
          break;
        default:
          payload[f.name] = raw === "" ? null : raw;
      }
    }

    const supabase = getSupabase();
    const { error } = editing?.id
      ? await supabase.from(table).update(payload).eq("id", editing.id)
      : await supabase.from(table).insert(payload);

    setSaving(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    setEditing(null);
    setToast({
      msg: `${singular} ${editing?.id ? "updated" : "created"}.`,
      tone: "success",
    });
    load();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    const { error } = await getSupabase()
      .from(table)
      .delete()
      .eq("id", deleteTarget.id);

    setDeleting(false);
    setDeleteTarget(null);

    if (error) {
      setToast({ msg: error.message, tone: "error" });
      return;
    }
    setToast({ msg: `${singular} deleted.`, tone: "success" });
    load();
  }

  async function toggleActive(row: Row) {
    const { error } = await getSupabase()
      .from(table)
      .update({ is_active: !row.is_active })
      .eq("id", row.id);

    if (error) {
      setToast({ msg: error.message, tone: "error" });
      return;
    }
    load();
  }

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        action={
          <Button onClick={openCreate} size="md">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add {singular}
          </Button>
        }
      />

      <Card className="p-0">
        <div className="border-b border-line p-4">
          <div className="relative max-w-sm">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}…`}
              aria-label={`Search ${title}`}
              className="h-10 w-full rounded-full border border-line bg-cream pl-10 pr-4 text-sm outline-none transition focus:border-gold-400"
            />
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : visible.length === 0 ? (
          <EmptyState
            title={query ? "Nothing matched that search" : `No ${title.toLowerCase()} yet`}
            description={
              query
                ? "Try a different keyword."
                : `Add your first ${singular.toLowerCase()} to get started.`
            }
            action={
              !query ? (
                <Button onClick={openCreate}>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add {singular}
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            {/* ---------- phone: one card per record ---------- */}
            <ul className="divide-y divide-line md:hidden">
              {visible.map((row) => (
                <li key={row.id} className="p-4">
                  <div className="flex gap-3.5">
                    {leadColumn ? (
                      <div className="shrink-0">{leadColumn.render?.(row)}</div>
                    ) : null}

                    <div className="min-w-0 flex-1">
                      {titleColumn
                        ? titleColumn.render
                          ? titleColumn.render(row)
                          : String(row[titleColumn.key] ?? "—")
                        : null}

                      {detailColumns.length > 0 ? (
                        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
                          {detailColumns.map((c) => (
                            <div key={c.key} className="min-w-0">
                              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted">
                                {c.label}
                              </dt>
                              <dd className="mt-0.5 text-[13px] text-ink-soft">
                                {c.render ? c.render(row) : String(row[c.key] ?? "—")}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
                    {"is_active" in row ? (
                      <button
                        onClick={() => toggleActive(row)}
                        className={cn(
                          "rounded-lg px-3 py-2 text-[12px] font-semibold transition",
                          row.is_active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-blush-100 text-muted"
                        )}
                      >
                        {row.is_active ? "Live" : "Hidden"}
                      </button>
                    ) : null}

                    <button
                      onClick={() => openEdit(row)}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[12px] font-semibold text-ink-soft transition hover:border-gold-300 hover:text-gold-700"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(row)}
                      aria-label="Delete"
                      className="rounded-lg border border-line p-2 text-ink-soft transition hover:border-red-300 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* ---------- tablet and up: full table ---------- */}
            <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[42rem] text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      className={cn(
                        "px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted",
                        c.className
                      )}
                    >
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-line/70 transition last:border-0 hover:bg-blush-50/60"
                  >
                    {columns.map((c) => (
                      <td key={c.key} className={cn("px-4 py-3 align-middle", c.className)}>
                        {c.render ? c.render(row) : String(row[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {"is_active" in row ? (
                          <button
                            onClick={() => toggleActive(row)}
                            title={row.is_active ? "Hide from website" : "Show on website"}
                            className={cn(
                              "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition",
                              row.is_active
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-blush-100 text-muted hover:bg-blush-200"
                            )}
                          >
                            {row.is_active ? "Live" : "Hidden"}
                          </button>
                        ) : null}
                        <button
                          onClick={() => openEdit(row)}
                          aria-label="Edit"
                          className="rounded-lg p-2 text-ink-soft transition hover:bg-gold-50 hover:text-gold-700"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(row)}
                          aria-label="Delete"
                          className="rounded-lg p-2 text-ink-soft transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
      </Card>

      {/* ---------- create / edit ---------- */}
      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={`${editing?.id ? "Edit" : "Add"} ${singular}`}
        wide
      >
        <form onSubmit={handleSave}>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((f) => {
              const options = f.optionsFrom
                ? dynamicOptions[f.name] ?? []
                : f.options ?? [];

              return (
                <div
                  key={f.name}
                  className={f.full || f.type === "image" ? "sm:col-span-2" : ""}
                >
                  {f.type === "image" ? (
                    <ImageField
                      label={f.label}
                      value={String(form[f.name] ?? "")}
                      onChange={(url) => setField(f.name, url)}
                    />
                  ) : f.type === "checkbox" ? (
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-cream px-4 py-3">
                      <input
                        type="checkbox"
                        checked={Boolean(form[f.name])}
                        onChange={(e) => setField(f.name, e.target.checked)}
                        className="h-4 w-4 accent-[#B8864B]"
                      />
                      <span className="text-[14px] font-medium text-ink">
                        {f.label}
                      </span>
                    </label>
                  ) : (
                    <>
                      <label
                        htmlFor={`f-${f.name}`}
                        className="mb-2 block text-[13px] font-semibold text-ink"
                      >
                        {f.label}
                        {f.required ? (
                          <span className="text-gold-600"> *</span>
                        ) : null}
                      </label>

                      {f.type === "textarea" || f.type === "list" ? (
                        <textarea
                          id={`f-${f.name}`}
                          rows={f.rows ?? (f.type === "list" ? 4 : 3)}
                          value={String(form[f.name] ?? "")}
                          onChange={(e) => setField(f.name, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full resize-y rounded-xl border border-line bg-cream px-3.5 py-3 text-[14px] text-ink outline-none transition placeholder:text-muted/70 focus:border-gold-400"
                        />
                      ) : f.type === "select" ? (
                        <select
                          id={`f-${f.name}`}
                          value={String(form[f.name] ?? "")}
                          onChange={(e) => setField(f.name, e.target.value)}
                          className={cn(inputCls, "cursor-pointer")}
                        >
                          <option value="">— none —</option>
                          {options.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={`f-${f.name}`}
                          type={f.type === "number" ? "number" : "text"}
                          step={f.type === "number" ? "any" : undefined}
                          value={String(form[f.name] ?? "")}
                          onChange={(e) => setField(f.name, e.target.value)}
                          placeholder={f.placeholder}
                          className={inputCls}
                        />
                      )}

                      {f.help ? (
                        <p className="mt-1.5 text-[12px] text-muted">{f.help}</p>
                      ) : null}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {formError ? (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {formError}
            </p>
          ) : null}

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="h-12 rounded-full border border-line px-7 text-sm font-medium text-ink-soft transition hover:bg-blush-50"
            >
              Cancel
            </button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4" aria-hidden="true" />
              {saving ? "Saving…" : `Save ${singular}`}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={deleteTarget !== null}
        title={`Delete this ${singular.toLowerCase()}?`}
        body="This permanently removes it from your website. This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        busy={deleting}
      />

      {toast ? (
        <Toast message={toast.msg} tone={toast.tone} onDone={() => setToast(null)} />
      ) : null}
    </>
  );
}

/** Small helpers for table cells. */
export function ThumbCell({ src, alt }: { src?: string | null; alt: string }) {
  return (
    <div className="relative h-11 w-11 overflow-hidden rounded-lg bg-blush-100">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="44px"
          className="object-cover"
          unoptimized={!src.startsWith("/")}
        />
      ) : null}
    </div>
  );
}
