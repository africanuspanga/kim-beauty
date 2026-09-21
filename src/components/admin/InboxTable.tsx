"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import {
  Card,
  ConfirmDialog,
  EmptyState,
  PageHeader,
  Spinner,
  StatusPill,
  Toast,
} from "./AdminUI";
import { getSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;

export type InboxColumn = {
  key: string;
  label: string;
  render?: (row: Row) => React.ReactNode;
  className?: string;
};

/**
 * Read-mostly list for submissions (bookings, orders, messages):
 * filter by status, update status, delete.
 */
export function InboxTable({
  table,
  title,
  description,
  columns,
  statuses,
  searchKeys,
  orderBy = "created_at",
}: {
  table: string;
  title: string;
  description?: string;
  columns: InboxColumn[];
  statuses?: string[];
  searchKeys: string[];
  orderBy?: string;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; tone: "success" | "error" } | null>(
    null
  );

  const load = useCallback(async () => {
    const { data, error } = await getSupabase()
      .from(table)
      .select("*")
      .order(orderBy, { ascending: false });

    if (error) setToast({ msg: error.message, tone: "error" });
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => {
    // load() only sets state after awaiting the network, never synchronously
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesStatus = filter === "all" || r.status === filter;
      const matchesQuery =
        !q || searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [rows, query, filter, searchKeys]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: rows.length };
    for (const r of rows) {
      if (r.status) map[r.status] = (map[r.status] ?? 0) + 1;
    }
    return map;
  }, [rows]);

  async function updateStatus(row: Row, status: string) {
    const { error } = await getSupabase()
      .from(table)
      .update({ status })
      .eq("id", row.id);

    if (error) {
      setToast({ msg: error.message, tone: "error" });
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status } : r)));
    setToast({ msg: "Status updated.", tone: "success" });
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
    setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setToast({ msg: "Deleted.", tone: "success" });
  }

  return (
    <>
      <PageHeader title={title} description={description} />

      <Card className="p-0">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              aria-label="Search"
              className="h-10 w-full rounded-full border border-line bg-cream pl-10 pr-4 text-sm outline-none transition focus:border-gold-400"
            />
          </div>

          {statuses ? (
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {["all", ...statuses].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium capitalize transition",
                    filter === s
                      ? "border-transparent bg-gold-gradient text-white"
                      : "border-line bg-cream text-ink-soft hover:border-gold-300"
                  )}
                >
                  {s} <span className="opacity-60">{counts[s] ?? 0}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {loading ? (
          <Spinner />
        ) : visible.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="New submissions from your website will appear on this page."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-sm">
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
                  {statuses ? (
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted">
                      Status
                    </th>
                  ) : null}
                  <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-line/70 align-top transition last:border-0 hover:bg-blush-50/60"
                  >
                    {columns.map((c) => (
                      <td key={c.key} className={cn("px-4 py-3.5", c.className)}>
                        {c.render ? c.render(row) : String(row[c.key] ?? "—")}
                      </td>
                    ))}

                    {statuses ? (
                      <td className="px-4 py-3.5">
                        <select
                          value={row.status}
                          onChange={(e) => updateStatus(row, e.target.value)}
                          aria-label="Change status"
                          className="h-9 cursor-pointer rounded-lg border border-line bg-cream px-2.5 text-[12px] capitalize outline-none transition focus:border-gold-400"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    ) : null}

                    <td className="px-4 py-3.5">
                      <div className="flex justify-end">
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
        )}
      </Card>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this record?"
        body="This permanently removes it. This cannot be undone."
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

export { StatusPill };
