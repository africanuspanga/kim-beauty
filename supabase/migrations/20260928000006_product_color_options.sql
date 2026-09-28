-- Customer-selectable colour or hair-number choices. Each choice can point
-- at its corresponding image in the product's main-image-plus-gallery list.
alter table public.products
  add column if not exists color_options jsonb not null default '[]'::jsonb;
