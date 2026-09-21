"use client";

import { ResourceManager, ThumbCell } from "@/components/admin/ResourceManager";

export default function AdminCategoriesPage() {
  return (
    <ResourceManager
      table="product_categories"
      title="Product Categories"
      singular="Category"
      description="The filter chips shoppers use on your shop page."
      searchKeys={["name", "slug"]}
      defaults={{
        name: "",
        slug: "",
        description: "",
        image_url: "",
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { name: "name", label: "Category Name", type: "text", required: true, placeholder: "e.g. Kim Products" },
        { name: "slug", label: "URL Slug", type: "text", required: true, slugFrom: "name" },
        { name: "description", label: "Description", type: "textarea", full: true },
        { name: "image_url", label: "Category Image", type: "image" },
        { name: "sort_order", label: "Sort Order", type: "number" },
        { name: "is_active", label: "Visible on website", type: "checkbox" },
      ]}
      columns={[
        { key: "image_url", label: "", className: "w-16", render: (r) => <ThumbCell src={r.image_url} alt={r.name} /> },
        { key: "name", label: "Category", render: (r) => <span className="font-medium text-ink">{r.name}</span> },
        { key: "slug", label: "Slug", render: (r) => <code className="text-[12px] text-muted">{r.slug}</code> },
        { key: "sort_order", label: "Order", className: "w-20" },
      ]}
    />
  );
}
