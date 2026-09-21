-- =============================================================
-- Public submission RPCs
--
-- Visitors may INSERT into bookings/orders but must not SELECT them,
-- which means `insert ... returning` is refused by RLS. These
-- SECURITY DEFINER functions do the insert and hand back only the
-- generated reference, so the tables stay unreadable to the public.
-- =============================================================

create or replace function public.create_booking(
  p_full_name      text,
  p_phone          text,
  p_service_name   text,
  p_preferred_date date,
  p_preferred_time text,
  p_email          text default null,
  p_service_id     uuid default null,
  p_stylist        text default null,
  p_notes          text default null
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
    preferred_date, preferred_time, stylist, notes
  )
  values (
    left(btrim(p_full_name), 120),
    left(btrim(p_phone), 40),
    nullif(btrim(coalesce(p_email, '')), ''),
    p_service_id,
    left(nullif(btrim(coalesce(p_service_name, '')), ''), 120),
    p_preferred_date,
    left(coalesce(p_preferred_time, ''), 40),
    left(nullif(btrim(coalesce(p_stylist, '')), ''), 120),
    left(nullif(btrim(coalesce(p_notes, '')), ''), 1500)
  )
  returning reference into v_reference;

  return v_reference;
end;
$$;

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

  -- price the order from the products table, never from the client
  select coalesce(sum(p.price * greatest(1, least(99, (item ->> 'quantity')::int))), 0)
    into v_total
  from jsonb_array_elements(p_items) as item
  join public.products p on p.id = (item ->> 'id')::uuid;

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

revoke all on function public.create_booking(text, text, text, date, text, text, uuid, text, text) from public;
revoke all on function public.create_order(jsonb, text, text, text) from public;

grant execute on function public.create_booking(text, text, text, date, text, text, uuid, text, text)
  to anon, authenticated;
grant execute on function public.create_order(jsonb, text, text, text)
  to anon, authenticated;
