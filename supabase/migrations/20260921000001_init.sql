-- =============================================================
-- KIM BEAUTY — core schema
-- =============================================================

create extension if not exists "pgcrypto";

-- ---------- helper: updated_at ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================================
-- admin_users
-- =============================================================
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  full_name  text,
  role       text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ---------- helper: is the caller an admin? ----------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

-- =============================================================
-- site_content  (editable copy, key/value JSON)
-- =============================================================
create table if not exists public.site_content (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  label      text,
  updated_at timestamptz not null default now()
);

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- =============================================================
-- services
-- =============================================================
create table if not exists public.services (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  tagline      text,
  description  text,
  price_from   numeric(12,2),
  price_label  text,
  duration     text,
  image_url    text,
  icon         text default 'sparkles',
  highlights   jsonb not null default '[]'::jsonb,
  is_featured  boolean not null default false,
  is_active    boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

create index if not exists services_active_idx on public.services (is_active, sort_order);

-- =============================================================
-- product categories
-- =============================================================
create table if not exists public.product_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text not null unique,
  description text,
  image_url  text,
  is_active  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- =============================================================
-- products
-- =============================================================
create table if not exists public.products (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  slug             text not null unique,
  description      text,
  price            numeric(12,2) not null default 0,
  compare_at_price numeric(12,2),
  currency         text not null default 'TZS',
  category_id      uuid references public.product_categories(id) on delete set null,
  image_url        text,
  gallery          jsonb not null default '[]'::jsonb,
  in_stock         boolean not null default true,
  is_featured      boolean not null default false,
  is_active        boolean not null default true,
  sort_order       integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create index if not exists products_active_idx on public.products (is_active, sort_order);
create index if not exists products_category_idx on public.products (category_id);

-- =============================================================
-- testimonials
-- =============================================================
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  location   text,
  rating     integer not null default 5 check (rating between 1 and 5),
  quote      text not null,
  avatar_url text,
  source     text not null default 'google',
  is_active  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists testimonials_active_idx on public.testimonials (is_active, sort_order);

-- =============================================================
-- gallery
-- =============================================================
create table if not exists public.gallery_images (
  id         uuid primary key default gen_random_uuid(),
  title      text,
  image_url  text not null,
  is_active  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- =============================================================
-- bookings
-- =============================================================
create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  reference      text not null unique default ('KB-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,6))),
  full_name      text not null,
  phone          text not null,
  email          text,
  service_id     uuid references public.services(id) on delete set null,
  service_name   text,
  preferred_date date not null,
  preferred_time text not null,
  stylist        text,
  notes          text,
  status         text not null default 'new' check (status in ('new','confirmed','completed','cancelled')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

create index if not exists bookings_status_idx on public.bookings (status, created_at desc);

-- =============================================================
-- orders (a record of every cart sent to WhatsApp)
-- =============================================================
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  reference     text not null unique default ('KO-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,6))),
  customer_name text,
  phone         text,
  items         jsonb not null default '[]'::jsonb,
  total         numeric(12,2) not null default 0,
  currency      text not null default 'TZS',
  status        text not null default 'new' check (status in ('new','confirmed','fulfilled','cancelled')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create index if not exists orders_status_idx on public.orders (status, created_at desc);

-- =============================================================
-- contact messages
-- =============================================================
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text,
  phone      text,
  subject    text,
  message    text not null,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);
