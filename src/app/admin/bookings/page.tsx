"use client";

import { InboxTable } from "@/components/admin/InboxTable";
import { formatDate, formatDateTime } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

export default function AdminBookingsPage() {
  return (
    <InboxTable
      table="bookings"
      title="Bookings"
      description="Every appointment request sent from your website."
      statuses={["new", "confirmed", "completed", "cancelled"]}
      searchKeys={["full_name", "phone", "service_name", "reference"]}
      columns={[
        {
          key: "full_name",
          label: "Client",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{r.full_name}</p>
              <a
                href={waLink(
                  `Hi ${r.full_name}, this is Kim Beauty about your ${r.service_name ?? "appointment"} booking (${r.reference}).`,
                  r.phone
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-gold-600 underline underline-offset-2 hover:text-gold-700"
              >
                {r.phone}
              </a>
              {r.email ? (
                <p className="text-[12px] text-muted">{r.email}</p>
              ) : null}
            </div>
          ),
        },
        {
          key: "service_name",
          label: "Service",
          render: (r) => (
            <div>
              <p className="text-ink">{r.service_name || "—"}</p>
              <p className="text-[12px] text-muted">{r.reference}</p>
            </div>
          ),
        },
        {
          key: "preferred_date",
          label: "When",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{formatDate(r.preferred_date)}</p>
              <p className="text-[12px] text-muted">{r.preferred_time}</p>
            </div>
          ),
        },
        {
          key: "notes",
          label: "Notes",
          render: (r) => (
            <p className="line-clamp-2 max-w-[16rem] text-[13px] text-muted">
              {r.notes || "—"}
            </p>
          ),
        },
        {
          key: "created_at",
          label: "Received",
          render: (r) => (
            <span className="text-[12px] text-muted">{formatDateTime(r.created_at)}</span>
          ),
        },
      ]}
    />
  );
}
