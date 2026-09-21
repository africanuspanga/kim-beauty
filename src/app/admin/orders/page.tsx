"use client";

import { InboxTable } from "@/components/admin/InboxTable";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

type Item = { name: string; price: number; quantity: number };

export default function AdminOrdersPage() {
  return (
    <InboxTable
      table="orders"
      title="Orders"
      description="Every cart sent to your WhatsApp from the shop."
      statuses={["new", "confirmed", "fulfilled", "cancelled"]}
      searchKeys={["customer_name", "phone", "reference"]}
      columns={[
        {
          key: "reference",
          label: "Order",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{r.reference}</p>
              <p className="text-[12px] text-muted">{formatDateTime(r.created_at)}</p>
            </div>
          ),
        },
        {
          key: "customer_name",
          label: "Customer",
          render: (r) => (
            <div>
              <p className="text-ink">{r.customer_name || "—"}</p>
              {r.phone ? (
                <a
                  href={waLink(
                    `Hi${r.customer_name ? " " + r.customer_name : ""}, this is Kim Beauty about your order ${r.reference}.`,
                    r.phone
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-gold-600 underline underline-offset-2 hover:text-gold-700"
                >
                  {r.phone}
                </a>
              ) : null}
            </div>
          ),
        },
        {
          key: "items",
          label: "Items",
          render: (r) => (
            <ul className="max-w-[18rem] space-y-0.5 text-[13px] text-ink-soft">
              {((r.items ?? []) as Item[]).map((it, i) => (
                <li key={i} className="truncate">
                  {it.quantity} × {it.name}
                </li>
              ))}
            </ul>
          ),
        },
        {
          key: "total",
          label: "Total",
          render: (r) => (
            <span className="font-semibold text-ink">
              {formatPrice(r.total, r.currency)}
            </span>
          ),
        },
      ]}
    />
  );
}
