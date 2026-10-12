-- =====================================================================
-- KIM BEAUTY — a product can sit in as many categories as it fits
-- =====================================================================
-- `category_id` stays as the product's main category (shown on the card);
-- `category_ids` is the full list the shop filters on.

alter table public.products
  add column if not exists category_ids uuid[] not null default '{}';

update public.products
   set category_ids = array[category_id]
 where category_id is not null
   and cardinality(category_ids) = 0;

create index if not exists products_category_ids_idx
  on public.products using gin (category_ids);

notify pgrst, 'reload schema';
