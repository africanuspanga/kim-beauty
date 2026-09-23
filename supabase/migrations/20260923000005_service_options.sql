-- =============================================================
-- KIM BEAUTY — service options (sub-categories inside a service)
--
-- "Braiding Hair — TZS 40,000" tells a client nothing. A service is a
-- CATEGORY; what she actually books is a style inside it: Extra-Small
-- Knotless, Miracle Knotless, Soft Glam, Classic Lash Set…
--
-- Each option carries its own photo/video, description, duration and
-- price, so she can pick, book and pay for the exact thing she wants.
-- =============================================================

create table if not exists public.service_options (
  id          uuid primary key default gen_random_uuid(),
  service_id  uuid not null references public.services(id) on delete cascade,
  name        text not null,
  slug        text not null,
  -- optional heading that clusters options inside one service,
  -- e.g. "Strip Lashes" vs "Lash Extensions" under Lashes
  group_label text,
  description text,
  price       numeric(12,2),      -- the "from" price, and what the cart charges
  price_max   numeric(12,2),      -- set for ranges: 35,000 – 50,000
  price_label text,               -- overrides the generated label when set
  duration    text,
  image_url   text,
  video_url   text,
  highlights  jsonb not null default '[]'::jsonb,
  is_featured boolean not null default false,
  is_active   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (service_id, slug)
);

drop trigger if exists service_options_updated_at on public.service_options;
create trigger service_options_updated_at
  before update on public.service_options
  for each row execute function public.set_updated_at();

create index if not exists service_options_service_idx
  on public.service_options (service_id, sort_order);
create index if not exists service_options_active_idx
  on public.service_options (is_active, sort_order);

-- ---------- RLS: same shape as services ----------
alter table public.service_options enable row level security;

drop policy if exists "service_options public read" on public.service_options;
drop policy if exists "service_options admin write" on public.service_options;

create policy "service_options public read" on public.service_options
  for select using (is_active or public.is_admin());
create policy "service_options admin write" on public.service_options
  for all using (public.is_admin()) with check (public.is_admin());

-- =============================================================
-- bookings: remember WHICH option was picked, not just the category
-- =============================================================
alter table public.bookings
  add column if not exists service_option_id   uuid references public.service_options(id) on delete set null,
  add column if not exists service_option_name text;

-- =============================================================
-- create_booking — now records the chosen option
-- (dropped first: adding parameters would create an ambiguous overload)
-- =============================================================
drop function if exists public.create_booking(text, text, text, date, text, text, uuid, text, text);

create or replace function public.create_booking(
  p_full_name           text,
  p_phone               text,
  p_service_name        text,
  p_preferred_date      date,
  p_preferred_time      text,
  p_email               text default null,
  p_service_id          uuid default null,
  p_stylist             text default null,
  p_notes               text default null,
  p_service_option_id   uuid default null,
  p_service_option_name text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reference text;
begin
  if coalesce(btrim(p_full_name), '') = '' then
    raise exception 'A name is required';
  end if;
  if coalesce(btrim(p_phone), '') = '' then
    raise exception 'A phone number is required';
  end if;
  if p_preferred_date is null then
    raise exception 'A preferred date is required';
  end if;

  insert into public.bookings (
    full_name, phone, email, service_id, service_name,
    service_option_id, service_option_name,
    preferred_date, preferred_time, stylist, notes
  )
  values (
    left(btrim(p_full_name), 120),
    left(btrim(p_phone), 40),
    nullif(btrim(coalesce(p_email, '')), ''),
    p_service_id,
    left(nullif(btrim(coalesce(p_service_name, '')), ''), 120),
    p_service_option_id,
    left(nullif(btrim(coalesce(p_service_option_name, '')), ''), 160),
    p_preferred_date,
    left(coalesce(p_preferred_time, ''), 40),
    left(nullif(btrim(coalesce(p_stylist, '')), ''), 120),
    left(nullif(btrim(coalesce(p_notes, '')), ''), 1500)
  )
  returning reference into v_reference;

  return v_reference;
end;
$$;

-- =============================================================
-- create_order — a cart line may now be a product OR a service option,
-- and is still re-priced server-side so a tampered client price is ignored.
-- =============================================================
create or replace function public.create_order(
  p_items         jsonb,
  p_customer_name text default null,
  p_phone         text default null,
  p_note          text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reference text;
  v_total     numeric(12,2);
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'An order needs at least one item';
  end if;
  if jsonb_array_length(p_items) > 100 then
    raise exception 'Too many items in one order';
  end if;

  with line as (
    select
      case
        when item ->> 'id' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        then (item ->> 'id')::uuid
      end                                                              as ref_id,
      greatest(1, least(99, coalesce((item ->> 'quantity')::int, 1)))  as qty
    from jsonb_array_elements(p_items) as item
  )
  select coalesce(sum(coalesce(p.price, so.price, 0) * line.qty), 0)
    into v_total
  from line
  left join public.products        p  on p.id  = line.ref_id
  left join public.service_options so on so.id = line.ref_id;

  insert into public.orders (customer_name, phone, items, total)
  values (
    left(nullif(btrim(coalesce(p_customer_name, '')), ''), 120),
    left(nullif(btrim(coalesce(p_phone, '')), ''), 40),
    p_items,
    v_total
  )
  returning reference into v_reference;

  return v_reference;
end;
$$;

revoke all on function public.create_booking(text, text, text, date, text, text, uuid, text, text, uuid, text) from public;
revoke all on function public.create_order(jsonb, text, text, text) from public;

grant execute on function public.create_booking(text, text, text, date, text, text, uuid, text, text, uuid, text)
  to anon, authenticated;
grant execute on function public.create_order(jsonb, text, text, text)
  to anon, authenticated;
