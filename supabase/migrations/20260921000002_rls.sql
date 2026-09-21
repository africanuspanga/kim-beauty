-- =============================================================
-- KIM BEAUTY — Row Level Security
-- Public site reads active rows. Only admins write.
-- Visitors may submit bookings / orders / contact messages.
-- =============================================================

alter table public.admin_users      enable row level security;
alter table public.site_content     enable row level security;
alter table public.services         enable row level security;
alter table public.product_categories enable row level security;
alter table public.products         enable row level security;
alter table public.testimonials     enable row level security;
alter table public.gallery_images   enable row level security;
alter table public.bookings         enable row level security;
alter table public.orders           enable row level security;
alter table public.contact_messages enable row level security;

-- ---------- admin_users ----------
drop policy if exists "admins read own record" on public.admin_users;
create policy "admins read own record" on public.admin_users
  for select using (user_id = auth.uid());

-- ---------- site_content : world readable, admin writable ----------
drop policy if exists "site_content public read"  on public.site_content;
drop policy if exists "site_content admin write"  on public.site_content;
create policy "site_content public read" on public.site_content
  for select using (true);
create policy "site_content admin write" on public.site_content
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- services ----------
drop policy if exists "services public read" on public.services;
drop policy if exists "services admin write" on public.services;
create policy "services public read" on public.services
  for select using (is_active or public.is_admin());
create policy "services admin write" on public.services
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- product_categories ----------
drop policy if exists "categories public read" on public.product_categories;
drop policy if exists "categories admin write" on public.product_categories;
create policy "categories public read" on public.product_categories
  for select using (is_active or public.is_admin());
create policy "categories admin write" on public.product_categories
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- products ----------
drop policy if exists "products public read" on public.products;
drop policy if exists "products admin write" on public.products;
create policy "products public read" on public.products
  for select using (is_active or public.is_admin());
create policy "products admin write" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- testimonials ----------
drop policy if exists "testimonials public read" on public.testimonials;
drop policy if exists "testimonials admin write" on public.testimonials;
create policy "testimonials public read" on public.testimonials
  for select using (is_active or public.is_admin());
create policy "testimonials admin write" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- gallery ----------
drop policy if exists "gallery public read" on public.gallery_images;
drop policy if exists "gallery admin write" on public.gallery_images;
create policy "gallery public read" on public.gallery_images
  for select using (is_active or public.is_admin());
create policy "gallery admin write" on public.gallery_images
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- bookings : anyone may create, only admins may read ----------
drop policy if exists "bookings public insert" on public.bookings;
drop policy if exists "bookings admin read"    on public.bookings;
drop policy if exists "bookings admin write"   on public.bookings;
create policy "bookings public insert" on public.bookings
  for insert with check (true);
create policy "bookings admin read" on public.bookings
  for select using (public.is_admin());
create policy "bookings admin write" on public.bookings
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- orders ----------
drop policy if exists "orders public insert" on public.orders;
drop policy if exists "orders admin read"    on public.orders;
drop policy if exists "orders admin write"   on public.orders;
create policy "orders public insert" on public.orders
  for insert with check (true);
create policy "orders admin read" on public.orders
  for select using (public.is_admin());
create policy "orders admin write" on public.orders
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- contact messages ----------
drop policy if exists "contact public insert" on public.contact_messages;
drop policy if exists "contact admin read"    on public.contact_messages;
drop policy if exists "contact admin write"   on public.contact_messages;
create policy "contact public insert" on public.contact_messages
  for insert with check (true);
create policy "contact admin read" on public.contact_messages
  for select using (public.is_admin());
create policy "contact admin write" on public.contact_messages
  for all using (public.is_admin()) with check (public.is_admin());

-- =============================================================
-- Storage bucket for admin-uploaded media
-- =============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media public read"   on storage.objects;
drop policy if exists "media admin write"   on storage.objects;
drop policy if exists "media admin update"  on storage.objects;
drop policy if exists "media admin delete"  on storage.objects;

create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');
create policy "media admin write" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());
create policy "media admin update" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());
create policy "media admin delete" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());
