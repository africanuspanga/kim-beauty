"use client";

import { ResourceManager, ThumbCell } from "@/components/admin/ResourceManager";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <ResourceManager
      table="products"
      title="Products"
      singular="Product"
      description="Everything customers can add to their cart and send to your WhatsApp."
      select="*, product_categories(name, slug)"
      searchKeys={["name", "slug"]}
      defaults={{
        name: "",
        slug: "",
        description: "",
        price: "",
        compare_at_price: "",
        category_id: "",
        image_url: "",
        in_stock: true,
        is_featured: false,
        is_active: true,
        sort_order: 0,
      }}
      fields={[
        { name: "name", label: "Product Name", type: "text", required: true, placeholder: "e.g. Kim Growth Oil 100ml" },
        { name: "slug", label: "URL Slug", type: "text", required: true, slugFrom: "name" },
        { name: "description", label: "Description", type: "textarea", full: true, rows: 4 },
        { name: "price", label: "Price (TZS)", type: "number", required: true, placeholder: "25000" },
        { name: "compare_at_price", label: "Compare-at Price (TZS)", type: "number", help: "Set higher than price to show a discount badge." },
        { name: "category_id", label: "Category", type: "select", optionsFrom: { table: "product_categories", valueKey: "id", labelKey: "name" } },
        { name: "sort_order", label: "Sort Order", type: "number" },
        { name: "image_url", label: "Product Image", type: "image" },
        { name: "in_stock", label: "In stock", type: "checkbox" },
        { name: "is_featured", label: "Show on homepage", type: "checkbox" },
        { name: "is_active", label: "Visible on website", type: "checkbox" },
      ]}
      columns={[
        { key: "image_url", label: "", className: "w-16", render: (r) => <ThumbCell src={r.image_url} alt={r.name} /> },
        {
          key: "name",
          label: "Product",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{r.name}</p>
              {r.product_categories?.name ? (
                <p className="text-[12px] text-muted">{r.product_categories.name}</p>
              ) : null}
            </div>
          ),
        },
        {
          key: "price",
          label: "Price",
          render: (r) => (
            <div>
              <p className="font-medium text-ink">{formatPrice(r.price)}</p>
              {r.compare_at_price ? (
                <p className="text-[12px] text-muted line-through">{formatPrice(r.compare_at_price)}</p>
              ) : null}
            </div>
          ),
        },
        {
          key: "in_stock",
          label: "Stock",
          render: (r) =>
            r.in_stock ? (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">In stock</span>
            ) : (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">Sold out</span>
            ),
        },
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
      ]}
    />
  );
}
