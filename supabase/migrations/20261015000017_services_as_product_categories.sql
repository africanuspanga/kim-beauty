-- =====================================================================
-- KIM BEAUTY — every service is also a product category
-- =====================================================================
-- The admin product form only offered the hand-made product categories,
-- so most services couldn't be picked. Copy each service in as a category
-- (matched by slug, existing categories are left alone) and keep new or
-- renamed services in step from now on.

insert into public.product_categories (name, slug, description, image_url, is_active, sort_order)
select s.title,
       s.slug,
       s.tagline,
       s.image_url,
       s.is_active,
       (select coalesce(max(sort_order), 0) from public.product_categories) + s.sort_order
  from public.services s
on conflict (slug) do nothing;

create or replace function public.sync_service_category()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' then
    update public.product_categories
       set name = new.title,
           slug = new.slug
     where slug = old.slug
       and (new.slug = old.slug
            or not exists (select 1 from public.product_categories where slug = new.slug));
  end if;

  insert into public.product_categories (name, slug, description, image_url, is_active, sort_order)
  values (
    new.title,
    new.slug,
    new.tagline,
    new.image_url,
    true,
    (select coalesce(max(sort_order), 0) + 1 from public.product_categories)
  )
  on conflict (slug) do nothing;

  return new;
end;
$$;

drop trigger if exists services_sync_category on public.services;
create trigger services_sync_category
  after insert or update of title, slug on public.services
  for each row execute function public.sync_service_category();

notify pgrst, 'reload schema';
