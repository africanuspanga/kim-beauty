"use client";

import { ResourceManager, ThumbCell } from "@/components/admin/ResourceManager";

export default function AdminGalleryPage() {
  return (
    <ResourceManager
      table="gallery_images"
      title="Gallery"
      singular="Image"
      description="The work gallery shown on your About page."
      searchKeys={["title"]}
      defaults={{ title: "", image_url: "", is_active: true, sort_order: 0 }}
      fields={[
        { name: "title", label: "Caption", type: "text", placeholder: "e.g. Knotless Braid Set", full: true },
        { name: "image_url", label: "Image", type: "image" },
        { name: "sort_order", label: "Sort Order", type: "number" },
        { name: "is_active", label: "Visible on website", type: "checkbox" },
      ]}
      columns={[
        { key: "image_url", label: "", className: "w-16", render: (r) => <ThumbCell src={r.image_url} alt={r.title ?? "Gallery image"} /> },
        { key: "title", label: "Caption", render: (r) => <span className="font-medium text-ink">{r.title || "—"}</span> },
        { key: "sort_order", label: "Order", className: "w-20" },
      ]}
    />
  );
}
