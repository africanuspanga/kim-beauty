-- =============================================================
-- KIM BEAUTY — service options (styles inside each service)
-- Safe to re-run: nothing is overwritten once a row exists.
--
-- PRICES: only the prices the salon supplied are filled in.
-- Rows with a NULL price show as "Price on request" on the website
-- until an admin sets one in  Admin → Service Menu.
-- =============================================================

insert into public.service_options
  (service_id, name, slug, group_label, description, price, price_max, duration, sort_order)
select s.id, o.name, o.slug, o.group_label, o.description, o.price, o.price_max, o.duration, o.sort_order
from (values

  -- ---------- BRAIDING HAIR ----------
  ('braiding-hair', 'Extra-Small Knotless', 'extra-small-knotless', 'Knotless Braids',
   'The finest parting we do — tiny, feather-light knotless braids with the most natural fall. The longest sit, and the longest wear.',
   null::numeric, null::numeric, '6 – 9 hrs', 1),
  ('braiding-hair', 'Small Size Knotless', 'small-size-knotless', 'Knotless Braids',
   'Neat small braids — the everyday favourite. Light on the scalp and holds its shape for weeks.',
   null::numeric, null::numeric, '5 – 7 hrs', 2),
  ('braiding-hair', 'Extra-Medium Knotless', 'extra-medium-knotless', 'Knotless Braids',
   'A fuller, faster style with medium partings — all the polish of knotless in a shorter sitting.',
   null::numeric, null::numeric, '3 – 5 hrs', 3),
  ('braiding-hair', 'Miracle Knotless', 'miracle-knotless', 'Knotless Braids',
   'Our signature feed-in knotless with an invisible start, so the braid melts into your own hair right at the root.',
   null::numeric, null::numeric, '5 – 8 hrs', 4),
  ('braiding-hair', 'Boho Knotless Braids', 'boho-knotless-braids', 'Knotless Braids',
   'Knotless braids finished with loose curly strands through the length for that soft, undone boho look.',
   null::numeric, null::numeric, '5 – 8 hrs', 5),
  ('braiding-hair', 'French Curl Braids', 'french-curl-braids', 'Curls & Twists',
   'Braids finished with soft French curl ends — romantic, bouncy and very light to wear.',
   null::numeric, null::numeric, '4 – 6 hrs', 6),
  ('braiding-hair', 'Cornrows & Feed-In Braids', 'cornrows-feed-in-braids', 'Cornrows',
   'Straight-backs, patterns and feed-in cornrows, laid with healthy tension so your edges stay exactly where they belong.',
   null::numeric, null::numeric, '2 – 4 hrs', 7),

  -- ---------- EXTENSIONS ----------
  ('extensions', 'Extensions with Normal Hair', 'extensions-normal-hair', null,
   'Synthetic extensions fitted and blended for instant length and volume — the budget-friendly way to change your look.',
   null::numeric, null::numeric, '2 – 3 hrs', 1),
  ('extensions', 'Extensions with Semi Human Hair', 'extensions-semi-human-hair', null,
   'A human and synthetic blend — softer movement and more shine than synthetic, and gentler on the pocket than full human hair.',
   null::numeric, null::numeric, '2 – 4 hrs', 2),
  ('extensions', 'Extensions with Full Human Hair', 'extensions-full-human-hair', null,
   '100% human hair, colour-matched to your own. Washes, styles and takes heat exactly like natural hair, and lasts the longest.',
   null::numeric, null::numeric, '3 – 4 hrs', 3),

  -- ---------- LASHES ----------
  ('lashes', 'Simple Strip Lashes', 'simple-strip-lashes', 'Strip Lashes · you apply at home',
   'A natural everyday strip with a light, comfortable band that is easy to put on yourself.',
   5000::numeric, null::numeric, 'Take home', 1),
  ('lashes', '3D Mink Strip Lashes', '3d-mink-strip-lashes', 'Strip Lashes · you apply at home',
   'Fuller 3D mink strips with soft, wispy layers. Reusable when you care for them properly.',
   10000::numeric, 15000::numeric, 'Take home', 2),
  ('lashes', '5D / 6D Dramatic Strip Lashes', '5d-6d-dramatic-strip-lashes', 'Strip Lashes · you apply at home',
   'Maximum drama — dense 5D and 6D strips made for events, shoots and nights out.',
   15000::numeric, 18000::numeric, 'Take home', 3),
  ('lashes', 'Classic Lash Extensions', 'classic-lash-extensions', 'Lash Extensions · fitted in salon',
   'One extension on every natural lash — your own lashes, just longer and darker. Wears about three weeks.',
   30000::numeric, null::numeric, '1 – 2 hrs', 4),
  ('lashes', 'Hybrid Lash Extensions', 'hybrid-lash-extensions', 'Lash Extensions · fitted in salon',
   'Classic lashes and volume fans mixed for texture and a fuller, fluffy finish. Wears about three weeks.',
   40000::numeric, null::numeric, '1.5 – 2 hrs', 5),
  ('lashes', 'Volume Lash Extensions', 'volume-lash-extensions', 'Lash Extensions · fitted in salon',
   'Handmade fans on every lash for a soft, dense, glamorous set. Wears about three weeks.',
   50000::numeric, null::numeric, '2 – 2.5 hrs', 6),
  ('lashes', 'Mega Volume Lash Extensions', 'mega-volume-lash-extensions', 'Lash Extensions · fitted in salon',
   'Our fullest set — ultra-fine fans packed lash by lash for maximum impact. Wears about three weeks.',
   60000::numeric, null::numeric, '2.5 – 3 hrs', 7),
  ('lashes', 'Lash Refill', 'lash-refill', 'Lash Extensions · fitted in salon',
   'A top-up for an existing set. Book every two to three weeks to keep your lashes looking freshly done.',
   20000::numeric, null::numeric, '1 – 1.5 hrs', 8),

  -- ---------- MAKE UP ----------
  ('make-up', 'Simple Makeup', 'simple-makeup', null,
   'Clean, fresh everyday makeup — evened skin, soft eyes and a finish that still looks like you.',
   35000::numeric, 50000::numeric, '45 – 60 min', 1),
  ('make-up', 'Soft Glam', 'soft-glam', null,
   'Birthday, dinner or photoshoot glam — defined eyes, glowing skin and lashes included.',
   50000::numeric, 80000::numeric, '1 – 1.5 hrs', 2),
  ('make-up', 'Bridal Makeup — Bride', 'bridal-makeup-bride', 'Bridal Makeup',
   'Full bridal glam built to last from the first photo to the last dance, with a trial before the day.',
   150000::numeric, 300000::numeric, '2 – 3 hrs', 3),
  ('make-up', 'Bridal Makeup — Bridesmaid', 'bridal-makeup-bridesmaid', 'Bridal Makeup',
   'Coordinated bridesmaid makeup that photographs beautifully standing next to the bride.',
   60000::numeric, 100000::numeric, '45 – 60 min', 4),
  ('make-up', 'Send-Off / Kitchen Party', 'send-off-kitchen-party', 'Bridal Makeup',
   'Traditional send-off and kitchen party glam, styled to your outfit and your colours.',
   80000::numeric, 120000::numeric, '1.5 – 2 hrs', 5),
  ('make-up', 'Full Package — Makeup + Wig Install + Gele', 'full-package-makeup-wig-gele', null,
   'Everything in one sitting: full face, wig installed and styled, and your gele tied.',
   100000::numeric, 180000::numeric, '3 – 4 hrs', 6),

  -- ---------- SPA PACKAGES ----------
  ('spa-packages', 'Full Body Massage', 'full-body-massage', null,
   'A full-body relaxation massage that works tension out from your shoulders down to your feet.',
   30000::numeric, 50000::numeric, '60 min', 1),
  ('spa-packages', 'Hot Stone Massage', 'hot-stone-massage', null,
   'Warm basalt stones with deep pressure — the fastest way to melt a stiff back and shoulders.',
   50000::numeric, 70000::numeric, '60 – 90 min', 2),
  ('spa-packages', 'Swedish / Aromatherapy Massage', 'swedish-aromatherapy-massage', null,
   'Long, flowing Swedish strokes with essential oils chosen for exactly how you want to feel afterwards.',
   40000::numeric, 60000::numeric, '90 min', 3),
  ('spa-packages', 'Body Scrub + Massage Combo', 'body-scrub-massage-combo', null,
   'A full-body exfoliating scrub followed by a massage — skin left soft, smooth and glowing.',
   60000::numeric, 85000::numeric, '90 – 120 min', 4),
  ('spa-packages', 'Facial + Massage Package', 'facial-massage-package', null,
   'A deep-cleansing facial matched to your skin type, paired with a relaxing full-body massage.',
   70000::numeric, 100000::numeric, '2 hrs', 5),
  ('spa-packages', 'Pedicure + Manicure + Massage', 'pedicure-manicure-massage', null,
   'Hands, feet and body all handled in one visit — the complete reset.',
   50000::numeric, 75000::numeric, '2 – 2.5 hrs', 6),

  -- ---------- MANICURE & PEDICURE ----------
  ('manicure-pedicure', 'Spa Manicure', 'spa-manicure', null,
   'Soak, shape, full cuticle work, hand massage and your choice of gel, acrylic or natural finish.',
   null::numeric, null::numeric, '45 – 60 min', 1),
  ('manicure-pedicure', 'Spa Pedicure', 'spa-pedicure', null,
   'Soak, hard-skin removal, shaping, scrub and a proper massage — feet completely renewed.',
   null::numeric, null::numeric, '60 – 75 min', 2),
  ('manicure-pedicure', 'Full Nail Care', 'full-nail-care', null,
   'Manicure and pedicure together, with gel, acrylic or natural finish and optional nail art.',
   null::numeric, null::numeric, '1.5 – 2 hrs', 3),

  -- ---------- HAIR TREATMENT ----------
  ('hair-treatment', 'Easy Treatment', 'easy-treatment', null,
   'Deep conditioning and steam for hair that is healthy but thirsty — softness and shine restored in one visit.',
   null::numeric, null::numeric, '45 – 60 min', 1),
  ('hair-treatment', 'Hard Treatment', 'hard-treatment', null,
   'Intensive protein and keratin rebuild for heat-damaged, over-processed or breaking hair, with scalp therapy.',
   null::numeric, null::numeric, '1.5 – 2 hrs', 2),

  -- ---------- KIM ACADEMY ----------
  ('kim-academy', 'Short Course Training', 'short-course-training', null,
   'A focused four-month course covering one discipline end to end — braiding, lashes, makeup or nails — with hands-on client practice.',
   null::numeric, null::numeric, '~ 4 months', 1),
  ('kim-academy', 'Long Course Training', 'long-course-training', null,
   'Six months across several disciplines, with salon floor time and the business side of running your own chair.',
   null::numeric, null::numeric, '~ 6 months', 2),
  ('kim-academy', 'Full Course Training', 'full-course-training', null,
   'Our complete eight-month programme — every service we offer, plus business, pricing and client care. Graduate ready to open.',
   null::numeric, null::numeric, '~ 8 months', 3)

) as o(service_slug, name, slug, group_label, description, price, price_max, duration, sort_order)
join public.services s on s.slug = o.service_slug
on conflict (service_id, slug) do nothing;

-- =============================================================
-- Keep each service's headline price honest now that the real
-- per-style prices are in. Only the services the salon priced.
-- =============================================================
update public.services set price_from = 5000,  price_label = 'From TZS 5,000'  where slug = 'lashes';
update public.services set price_from = 35000, price_label = 'From TZS 35,000' where slug = 'make-up';
update public.services set price_from = 30000, price_label = 'From TZS 30,000' where slug = 'spa-packages';

-- Kim Academy courses run in months, not weeks.
update public.services set duration = '4 – 8 months' where slug = 'kim-academy';

-- The Make Up price list had been pasted into the service description by
-- hand. Those prices are now proper options above, so trim the description
-- back to prose and stop showing the same numbers twice.
update public.services
set description = 'Soft glam, full glam, bridal and editorial makeup. Long-wear, photo-ready and matched to your exact skin tone. Every look below is priced — pick the one that fits your occasion.'
where slug = 'make-up'
  and description like '%MAKE UP PRICE%';
