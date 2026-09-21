"use client";

import { InboxTable } from "@/components/admin/InboxTable";
import { formatDateTime } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

export default function AdminMessagesPage() {
  return (
    <InboxTable
      table="contact_messages"
      title="Messages"
      description="Enquiries sent through your contact page."
      searchKeys={["name", "email", "phone", "subject", "message"]}
      columns={[
        {
          key: "name",
          label: "From",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{r.name}</p>
              {r.email ? (
                <a
                  href={`mailto:${r.email}`}
                  className="block text-[12px] text-gold-600 underline underline-offset-2"
                >
                  {r.email}
                </a>
              ) : null}
              {r.phone ? (
                <a
                  href={waLink(`Hi ${r.name}, this is Kim Beauty replying to your message.`, r.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[12px] text-gold-600 underline underline-offset-2"
                >
                  {r.phone}
                </a>
              ) : null}
            </div>
          ),
        },
        { key: "subject", label: "Subject", render: (r) => r.subject || "—" },
        {
          key: "message",
          label: "Message",
          render: (r) => (
            <p className="max-w-md whitespace-pre-wrap text-[13px] leading-relaxed text-ink-soft">
              {r.message}
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
