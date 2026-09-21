"use client";

import { ResourceManager, ThumbCell } from "@/components/admin/ResourceManager";
import { ICON_NAMES } from "@/components/ui/ServiceIcon";
import { formatPrice } from "@/lib/utils";

export default function AdminServicesPage() {
  return (
    <ResourceManager
      table="services"
      title="Services"
      singular="Service"
      description="Everything on your Services page and the services grid on the homepage."
      searchKeys={["title", "slug", "tagline"]}
      defaults={{
        title: "",
        slug: "",
        tagline: "",
        description: "",
        price_from: "",
        price_label: "",
        duration: "",
        image_url: "",
        icon: "sparkles",
        highlights: "",
        is_featured: false,
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { name: "title", label: "Service Name", type: "text", required: true, placeholder: "e.g. Knotless Braids" },
        { name: "slug", label: "URL Slug", type: "text", required: true, slugFrom: "title", help: "Used for the #anchor link on the services page." },
        { name: "tagline", label: "Short Tagline", type: "text", placeholder: "e.g. Protective styles that last", full: true },
        { name: "description", label: "Description", type: "textarea", full: true, rows: 4 },
        { name: "price_from", label: "Price From (TZS)", type: "number", placeholder: "50000" },
        { name: "price_label", label: "Price Label", type: "text", placeholder: "From TZS 50,000", help: "Shown on the card. Leave blank to hide." },
        { name: "duration", label: "Duration", type: "text", placeholder: "3 – 6 hrs" },
        { name: "icon", label: "Icon", type: "select", options: ICON_NAMES.map((n) => ({ value: n, label: n })) },
        { name: "image_url", label: "Service Image", type: "image" },
        { name: "highlights", label: "Highlights", type: "list", full: true, help: "One per line — shown as ticks on the services page." },
        { name: "sort_order", label: "Sort Order", type: "number", help: "Lower numbers appear first." },
        { name: "is_featured", label: "Show on homepage", type: "checkbox" },
        { name: "is_active", label: "Visible on website", type: "checkbox" },
      ]}
      columns={[
        { key: "image_url", label: "", className: "w-16", render: (r) => <ThumbCell src={r.image_url} alt={r.title} /> },
        {
          key: "title",
          label: "Service",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{r.title}</p>
              {r.tagline ? <p className="text-[12px] text-muted">{r.tagline}</p> : null}
            </div>
          ),
        },
        { key: "price_from", label: "From", render: (r) => (r.price_from ? formatPrice(r.price_from) : "—") },
        { key: "duration", label: "Duration", render: (r) => r.duration || "—" },
        {
          key: "is_featured",
          label: "Homepage",
          render: (r) =>
            r.is_featured ? (
              <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[11px] font-semibold text-gold-700">Featured</span>
            ) : (
              <span className="text-[12px] text-muted">—</span>
            ),
        },
        { key: "sort_order", label: "Order", className: "w-20" },
      ]}
    />
  );
}
