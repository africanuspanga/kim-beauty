"use client";

import { ResourceManager, ThumbCell } from "@/components/admin/ResourceManager";
import { optionPriceLabel } from "@/lib/utils";

export default function AdminServiceOptionsPage() {
  return (
    <ResourceManager
      table="service_options"
      title="Service Menu"
      singular="Option"
      description="The styles inside each service — Extra-Small Knotless, Soft Glam, Classic Lashes. This is what a client picks, books and pays for."
      select="*, services(title, slug)"
      orderBy={[
        { column: "service_id", ascending: true },
        { column: "sort_order", ascending: true },
      ]}
      searchKeys={["name", "group_label", "services.title"]}
      defaults={{
        service_id: "",
        name: "",
        slug: "",
        group_label: "",
        description: "",
        price: "",
        price_max: "",
        price_label: "",
        duration: "",
        image_url: "",
        video_url: "",
        highlights: "",
        is_featured: false,
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        {
          name: "service_id",
          label: "Belongs To Service",
          type: "select",
          required: true,
          optionsFrom: { table: "services", valueKey: "id", labelKey: "title" },
          help: "Which service page this option shows up on.",
        },
        {
          name: "name",
          label: "Option Name",
          type: "text",
          required: true,
          placeholder: "e.g. Miracle Knotless",
        },
        {
          name: "slug",
          label: "URL Slug",
          type: "text",
          required: true,
          slugFrom: "name",
          help: "Auto-filled from the name. Must be unique within the service.",
        },
        {
          name: "group_label",
          label: "Group Heading",
          type: "text",
          placeholder: "e.g. Knotless Braids",
          help: "Optional. Options sharing a heading are shown together under it.",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          full: true,
          rows: 3,
          placeholder: "What it is, who it suits, how long it lasts…",
        },
        {
          name: "price",
          label: "Price (TZS)",
          type: "number",
          placeholder: "35000",
          help: "Leave blank to show 'Price on request'. This is what the cart charges.",
        },
        {
          name: "price_max",
          label: "Up To (TZS)",
          type: "number",
          placeholder: "50000",
          help: "Only for ranges — shows as 'TZS 35,000 – 50,000'.",
        },
        {
          name: "price_label",
          label: "Custom Price Text",
          type: "text",
          placeholder: "From TZS 35,000",
          help: "Overrides the prices above when filled in.",
        },
        {
          name: "duration",
          label: "Time It Takes",
          type: "text",
          placeholder: "5 – 8 hrs",
        },
        { name: "image_url", label: "Photo", type: "image" },
        {
          name: "video_url",
          label: "Video Link",
          type: "text",
          full: true,
          placeholder: "YouTube link or a direct .mp4 link",
          help: "Optional. A video replaces the photo on the card.",
        },
        {
          name: "highlights",
          label: "Highlights",
          type: "list",
          full: true,
          help: "One per line — shown as ticks under the description.",
        },
        {
          name: "sort_order",
          label: "Sort Order",
          type: "number",
          help: "Lower numbers appear first within the service.",
        },
        { name: "is_featured", label: "Mark as Popular", type: "checkbox" },
        { name: "is_active", label: "Visible on website", type: "checkbox" },
      ]}
      columns={[
        {
          key: "image_url",
          label: "",
          className: "w-16",
          render: (r) => <ThumbCell src={r.image_url} alt={r.name} />,
        },
        {
          key: "name",
          label: "Option",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{r.name}</p>
              <p className="text-[12px] text-muted">
                {r.services?.title ?? "—"}
                {r.group_label ? ` · ${r.group_label}` : ""}
              </p>
            </div>
          ),
        },
        {
          key: "price",
          label: "Price",
          render: (r) => (
            <span className={r.price == null ? "text-muted" : "text-ink"}>
              {optionPriceLabel(r)}
            </span>
          ),
        },
        { key: "duration", label: "Time", render: (r) => r.duration || "—" },
        {
          key: "is_featured",
          label: "Popular",
          render: (r) =>
            r.is_featured ? (
              <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[11px] font-semibold text-gold-700">
                Popular
              </span>
            ) : (
              <span className="text-[12px] text-muted">—</span>
            ),
        },
        { key: "sort_order", label: "Order", className: "w-20" },
      ]}
    />
  );
}
