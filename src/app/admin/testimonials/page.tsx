"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";
import { Stars } from "@/components/ui/Stars";

export default function AdminTestimonialsPage() {
  return (
    <ResourceManager
      table="testimonials"
      title="Testimonials"
      singular="Testimonial"
      description="The scrolling Google-style review cards on your homepage."
      searchKeys={["name", "quote", "location"]}
      defaults={{
        name: "",
        location: "",
        rating: 5,
        quote: "",
        avatar_url: "",
        source: "google",
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { name: "name", label: "Client Name", type: "text", required: true, placeholder: "e.g. Amina Hassan" },
        { name: "location", label: "Location", type: "text", placeholder: "e.g. Njiro, Arusha" },
        { name: "quote", label: "Review", type: "textarea", required: true, full: true, rows: 4 },
        {
          name: "rating",
          label: "Rating",
          type: "select",
          options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} star${n > 1 ? "s" : ""}` })),
        },
        {
          name: "source",
          label: "Source",
          type: "select",
          options: [
            { value: "google", label: "Google" },
            { value: "instagram", label: "Instagram" },
            { value: "facebook", label: "Facebook" },
            { value: "direct", label: "Direct" },
          ],
        },
        { name: "sort_order", label: "Sort Order", type: "number" },
        { name: "is_active", label: "Visible on website", type: "checkbox" },
      ]}
      columns={[
        {
          key: "name",
          label: "Client",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{r.name}</p>
              {r.location ? <p className="text-[12px] text-muted">{r.location}</p> : null}
            </div>
          ),
        },
        { key: "rating", label: "Rating", className: "w-28", render: (r) => <Stars rating={r.rating} size="h-3.5 w-3.5" /> },
        {
          key: "quote",
          label: "Review",
          render: (r) => (
            <p className="line-clamp-2 max-w-md text-[13px] text-ink-soft">{r.quote}</p>
          ),
        },
        { key: "sort_order", label: "Order", className: "w-20" },
      ]}
    />
  );
}
