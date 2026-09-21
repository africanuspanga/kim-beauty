-- =============================================================
-- Real social profiles + hosted payment links
--
-- The seed only inserts, so databases that already hold a
-- `contact` row never picked these up. Merge the new keys in and
-- overwrite the placeholder handles that shipped with the seed.
-- Safe to re-run.
-- =============================================================

update public.site_content
set value = value || jsonb_build_object(
  'instagram', 'https://www.instagram.com/kim_beauty_salons',
  'tiktok', 'https://www.tiktok.com/@kimbeautysaloons',
  'facebook', 'https://www.facebook.com/profile.php?id=61594282689600',
  'facebook_profile', 'https://www.facebook.com/profile.php?id=61594686741887',
  'youtube', 'https://youtube.com/@kimbeautysalons',
  'x', 'https://x.com/kimbeautysalons',
  'pinterest', 'https://pin.it/6Xs5oO9fN',
  'threads', 'https://www.threads.com/@kim_beauty_salons',
  'likee', coalesce(value ->> 'likee', ''),
  'linktree', 'https://linktr.ee/kimbeautysalons'
)
where key = 'contact';

insert into public.site_content (key, label, value) values
('payments', 'Payment Links', jsonb_build_object(
  'title', 'Ways To Pay',
  'description', 'Pay for your order or leave a deposit securely online — card, mobile money and bank transfer all supported. Prefer to pay in the salon? Just send your order on WhatsApp.',
  'pesapal_url', 'https://payments.pesapal.com/kim-tours',
  'dpo_url', 'https://shop.directpay.online/paymybills/KIMZEBRAADVENTURESANDSAFARISLIMITED',
  'paypal_url', ''
))
on conflict (key) do update
set value = public.site_content.value || jsonb_build_object(
  'pesapal_url', 'https://payments.pesapal.com/kim-tours',
  'dpo_url', 'https://shop.directpay.online/paymybills/KIMZEBRAADVENTURESANDSAFARISLIMITED'
);
