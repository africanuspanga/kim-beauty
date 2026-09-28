-- =============================================================
-- KIM BEAUTY — sample content (safe to re-run)
-- =============================================================

-- ---------- editable site copy ----------
insert into public.site_content (key, label, value) values
('hero', 'Homepage Hero', jsonb_build_object(
  'eyebrow', 'Sokoine Road · Arusha',
  'title', 'Beauty, Perfectly Crafted',
  'description', 'Braids, lashes, spa and glam by Arusha''s most loved beauty team.',
  'primary_cta_label', 'Book Appointment',
  'primary_cta_href', '/booking',
  'secondary_cta_label', 'Shop Now',
  'secondary_cta_href', '/shop',
  'image_url', '/images/hero.jpg',
  'stat_1_value', '8+', 'stat_1_label', 'Years of Craft',
  'stat_2_value', '5K+', 'stat_2_label', 'Happy Clients',
  'stat_3_value', '4.9', 'stat_3_label', 'Google Rating'
)),
('about', 'About Section', jsonb_build_object(
  'eyebrow', 'Our Story',
  'title', 'Where Arusha Comes To Glow',
  'body', 'Kim Beauty began on Sokoine Road, Arusha with one simple belief — every woman deserves to leave a chair feeling like the best version of herself. Today our salon brings together master braiders, lash artists, makeup pros and spa therapists under one roof.',
  'body_2', 'From protective styles and precision extensions to signature spa rituals and the Kim Collection, everything we do is built on clean technique, premium product and genuine care.',
  'image_url', '/images/gallery-5.webp',
  'point_1', 'Certified, career stylists',
  'point_2', 'Premium products only',
  'point_3', 'Spotless, relaxed salon',
  'point_4', 'Kim Academy training',
  'cta_label', 'More About Us',
  'cta_href', '/about'
)),
('services_section', 'Services Section', jsonb_build_object(
  'eyebrow', 'What We Do',
  'title', 'Services Built Around You',
  'description', 'Hair, lashes, nails, spa and the products to keep it all perfect at home.'
)),
('shop_section', 'Shop Section', jsonb_build_object(
  'eyebrow', 'Kim Shop',
  'title', 'Take The Salon Home',
  'description', 'Hand-picked hair, lash and skin essentials — delivered across Arusha.',
  'cta_label', 'Browse The Shop',
  'cta_href', '/shop'
)),
('testimonials_section', 'Testimonials Section', jsonb_build_object(
  'eyebrow', 'Client Love',
  'title', 'Reviewed By Real Clients',
  'description', 'Rated 4.9 on Google by hundreds of Arusha clients.',
  'rating', '4.9',
  'review_count', '320'
)),
('cta_section', 'Closing CTA', jsonb_build_object(
  'eyebrow', 'Ready When You Are',
  'title', 'Your Chair Is Waiting',
  'description', 'Book your appointment in under a minute — we will confirm you on WhatsApp.',
  'primary_cta_label', 'Book Appointment',
  'primary_cta_href', '/booking',
  'secondary_cta_label', 'Talk To Us',
  'secondary_cta_href', '/contact',
  'image_url', '/images/gallery-3.webp'
)),
('contact', 'Contact Details', jsonb_build_object(
  'phone', '+255 766 400 961',
  'whatsapp', '255766400961',
  'email', 'kimbeautysaloons@gmail.com',
  'address', 'Sokoine Rd, Arusha 23102, Tanzania',
  'map_query', 'Sokoine Rd, Arusha 23102, Tanzania',
  'map_url', 'https://maps.app.goo.gl/Uo27eHDR2KzSVjxd7?g_st=ipc',
  'hours_weekday', 'Mon – Fri · 8:00 AM – 8:00 PM',
  'hours_saturday', 'Saturday · 8:00 AM – 9:00 PM',
  'hours_sunday', 'Sunday · 10:00 AM – 6:00 PM',
  'instagram', 'https://www.instagram.com/kim_beauty_salons',
  'tiktok', 'https://www.tiktok.com/@kimbeautysaloons',
  'facebook', 'https://www.facebook.com/profile.php?id=61594282689600',
  'facebook_profile', 'https://www.facebook.com/profile.php?id=61594686741887',
  'youtube', 'https://youtube.com/@kimbeautysalons',
  'x', 'https://x.com/kimbeautysalons',
  'pinterest', 'https://pin.it/6Xs5oO9fN',
  'threads', 'https://www.threads.com/@kim_beauty_salons',
  'likee', '',
  'linktree', 'https://linktr.ee/kimbeautysalons'
)),
('payments', 'Payment Links', jsonb_build_object(
  'title', 'Ways To Pay',
  'description', 'Pay for your order or leave a deposit securely online — card, mobile money and bank transfer all supported. Prefer to pay in the salon? Just send your order on WhatsApp.',
  'pesapal_url', 'https://payments.pesapal.com/kim-tours',
  'dpo_url', 'https://shop.directpay.online/paymybills/KIMZEBRAADVENTURESANDSAFARISLIMITED',
  'paypal_url', ''
)),
('about_page', 'About Page', jsonb_build_object(
  'eyebrow', 'About Kim Beauty',
  'title', 'Beauty With Intention',
  'description', 'A modern beauty salon in the heart of Arusha.',
  'hero_image', '/images/gallery-2.webp',
  'story_title', 'How It Started',
  'story_body', 'Kim Beauty opened its doors on Sokoine Road, Arusha with a single braiding chair and a long list of loyal clients. Word travelled fast. What started as one stylist became a full salon — braiding, extensions, lashes, makeup, nails, spa and a product line of our own.',
  'story_body_2', 'We train every stylist in-house through Kim Academy, so the technique you get on your first visit is the technique you get on your fiftieth.',
  'mission_title', 'Our Mission',
  'mission_body', 'To give every client a seat where she is listened to, cared for, and sent back out glowing.',
  'vision_title', 'Our Vision',
  'vision_body', 'To be East Africa''s most trusted name in hair, beauty and beauty education.',
  'value_1_title', 'Craft First', 'value_1_body', 'Clean parts, healthy tension, finishes that last.',
  'value_2_title', 'Premium Product', 'value_2_body', 'We only use what we would put on our own hair.',
  'value_3_title', 'Real Care', 'value_3_body', 'Honest advice about what suits you — never an upsell.',
  'value_4_title', 'Always Learning', 'value_4_body', 'Kim Academy keeps our team ahead of every trend.'
)),
('services_page', 'Services Page', jsonb_build_object(
  'eyebrow', 'Our Services',
  'title', 'Everything Beauty, Under One Roof',
  'description', 'Explore the full Kim Beauty menu and book the chair that is right for you.'
)),
('shop_page', 'Shop Page', jsonb_build_object(
  'eyebrow', 'Kim Shop',
  'title', 'Salon-Grade Beauty Essentials',
  'description', 'Add what you love to the cart and send your order straight to our WhatsApp.'
)),
('booking_page', 'Booking Page', jsonb_build_object(
  'eyebrow', 'Book An Appointment',
  'title', 'Reserve Your Chair',
  'description', 'Fill in your details and we will confirm your slot on WhatsApp right away.'
)),
('contact_page', 'Contact Page', jsonb_build_object(
  'eyebrow', 'Get In Touch',
  'title', 'We Would Love To Hear From You',
  'description', 'Call, WhatsApp, email or stop by the salon on Sokoine Road, Arusha, Tanzania.'
)),
('footer', 'Footer', jsonb_build_object(
  'tagline', 'A modern beauty salon on Sokoine Road, Arusha, offering hair, lashes, nails, spa and the Kim Collection.',
  'copyright', 'Kim Beauty. All rights reserved.'
)),
('branding', 'Branding', jsonb_build_object(
  'site_name', 'Kim Beauty',
  'logo_url', '/images/logo.png',
  'whatsapp_prefill', 'I am coming from Kim Beauty website'
))
on conflict (key) do nothing;

-- ---------- services ----------
insert into public.services (title, slug, tagline, description, price_from, price_label, duration, image_url, icon, highlights, is_featured, sort_order) values
('Extensions', 'extensions', 'Length, volume and shine', 'Seamless weaves, closures, frontals and tape-ins fitted to blend perfectly with your own hair. We colour-match, install and style in one sitting.', 80000, 'From TZS 80,000', '2 – 4 hrs', '/images/gallery-2.webp', 'scissors', '["Colour matched","Closures & frontals","Tape-in & clip-in"]'::jsonb, true, 1),
('Braiding Hair', 'braiding-hair', 'Protective styles that last', 'Knotless braids, boho curls, cornrows, twists and feed-ins — installed with healthy tension so your edges stay exactly where they belong.', 50000, 'From TZS 50,000', '3 – 6 hrs', '/images/gallery-1.webp', 'sparkles', '["Knotless & boho","Cornrows & feed-ins","Edge-safe tension"]'::jsonb, true, 2),
('Lashes', 'lashes', 'Wake up ready', 'Classic, hybrid, volume and mega-volume lash sets applied by certified lash artists using medical-grade adhesive.', 35000, 'From TZS 35,000', '1 – 2 hrs', '/images/gallery-4.webp', 'eye', '["Classic to mega volume","Certified lash artists","Refills available"]'::jsonb, true, 3),
('Make Up', 'make-up', 'Glam for every occasion', 'Soft glam, full glam, bridal and editorial makeup. Long-wear, photo-ready and matched to your exact skin tone.', 60000, 'From TZS 60,000', '1 – 2 hrs', '/images/gallery-5.webp', 'brush', '["Bridal & events","Photo-ready finish","Shade matched"]'::jsonb, true, 4),
('Spa Packages', 'spa-packages', 'Switch off completely', 'Full-body massage, facials, steam and body scrubs bundled into packages designed to reset you head to toe.', 70000, 'From TZS 70,000', '1 – 3 hrs', '/images/gallery-3.webp', 'flower', '["Massage & facials","Body scrub & steam","Couples packages"]'::jsonb, true, 5),
('Manicure & Pedicure', 'manicure-pedicure', 'Hands and feet, handled', 'Gel, acrylic and natural nail care with full cuticle work, shaping, and a finish that survives real life.', 25000, 'From TZS 25,000', '45 – 90 min', '/images/gallery-4.webp', 'hand', '["Gel & acrylic","Nail art","Spa pedicure"]'::jsonb, true, 6),
('Hair Treatment', 'hair-treatment', 'Repair from the root', 'Deep conditioning, protein and keratin treatments, scalp therapy and trims that bring damaged hair back to life.', 40000, 'From TZS 40,000', '1 – 2 hrs', '/images/gallery-1.webp', 'droplet', '["Protein & keratin","Scalp therapy","Steam treatment"]'::jsonb, false, 7),
('Kim Academy', 'kim-academy', 'Learn the craft', 'Hands-on certification courses in braiding, lashes, makeup and salon business — taught by our senior stylists.', 250000, 'From TZS 250,000', '2 – 8 weeks', '/images/gallery-2.webp', 'graduation-cap', '["Certified courses","Hands-on training","Business modules"]'::jsonb, false, 8),
('Hair Products', 'hair-products', 'Keep the look at home', 'Shampoos, conditioners, oils, serums and styling products curated by our stylists for every hair type.', 15000, 'From TZS 15,000', 'In store', '/images/gallery-3.webp', 'shopping-bag', '["Stylist curated","Every hair type","In-store & delivery"]'::jsonb, false, 9),
('Kim Products', 'kim-products', 'Our own label', 'The Kim Beauty in-house line — growth oil, edge control, leave-in and braid spray, made for African hair.', 12000, 'From TZS 12,000', 'In store', '/images/gallery-5.webp', 'crown', '["In-house formulated","Made for 4A–4C hair","Salon tested"]'::jsonb, false, 10),
('Kim Collection', 'kim-collection', 'Wigs and ready-to-wear', 'Premium wigs, ponytails and ready-to-wear units, pre-plucked and styled, ready to go straight on.', 150000, 'From TZS 150,000', 'In store', '/images/gallery-2.webp', 'gem', '["Premium wigs","Pre-plucked & styled","Custom orders"]'::jsonb, false, 11),
('Other Products', 'other-products', 'The finishing touches', 'Lash kits, nail care, skincare, accessories and tools to complete your routine.', 8000, 'From TZS 8,000', 'In store', '/images/gallery-4.webp', 'package', '["Lash & nail kits","Skincare","Tools & accessories"]'::jsonb, false, 12)
on conflict (slug) do nothing;

-- ---------- product categories ----------
insert into public.product_categories (name, slug, description, sort_order) values
('Hair Products', 'hair-products', 'Shampoos, conditioners, oils and styling essentials.', 1),
('Kim Products', 'kim-products', 'Our own in-house beauty line.', 2),
('Kim Collection', 'kim-collection', 'Premium wigs, ponytails and ready-to-wear units.', 3),
('Lashes', 'lashes', 'Lash extensions, strips and aftercare.', 4),
('Nails & Tools', 'nails-tools', 'Nail care, kits and salon tools.', 5),
('Other Products', 'other-products', 'Skincare, accessories and extras.', 6)
on conflict (slug) do nothing;

-- ---------- products ----------
insert into public.products (name, slug, description, price, compare_at_price, category_id, image_url, is_featured, in_stock, sort_order)
select p.name, p.slug, p.description, p.price, p.compare_at_price,
       (select id from public.product_categories where slug = p.cat),
       p.image_url, p.is_featured, true, p.sort_order
from (values
  ('Kim Growth Oil 100ml', 'kim-growth-oil', 'Our best-selling scalp and growth oil — rosemary, castor and peppermint blend that feeds the follicle and soothes the scalp.', 25000::numeric, 32000::numeric, 'kim-products', '/images/gallery-3.webp', true, 1),
  ('Kim Edge Control', 'kim-edge-control', 'Strong-hold, non-flaking edge control with a soft shine finish. Holds baby hairs all day without build-up.', 12000::numeric, null::numeric, 'kim-products', '/images/gallery-1.webp', true, 2),
  ('Kim Braid Spray 250ml', 'kim-braid-spray', 'Light moisturising spray for braids and twists. Fights itch, refreshes the scalp and keeps protective styles soft.', 15000::numeric, 18000::numeric, 'kim-products', '/images/gallery-1.webp', true, 3),
  ('Kim Leave-In Conditioner', 'kim-leave-in-conditioner', 'Slip-rich leave-in that detangles 4A–4C hair and locks in moisture before styling.', 18000::numeric, null::numeric, 'kim-products', '/images/gallery-5.webp', false, 4),
  ('Hydrating Shampoo 400ml', 'hydrating-shampoo', 'Sulphate-free cleanser that washes without stripping. Safe on colour-treated and relaxed hair.', 22000::numeric, null::numeric, 'hair-products', '/images/gallery-3.webp', true, 5),
  ('Deep Repair Hair Mask', 'deep-repair-hair-mask', 'Weekly protein and shea treatment that rebuilds heat-damaged and over-processed hair.', 28000::numeric, 35000::numeric, 'hair-products', '/images/gallery-2.webp', true, 6),
  ('Argan Shine Serum', 'argan-shine-serum', 'Weightless finishing serum for glass-like shine and frizz control on wigs and natural hair.', 20000::numeric, null::numeric, 'hair-products', '/images/gallery-4.webp', false, 7),
  ('Silk Bonnet', 'silk-bonnet', 'Double-lined pure silk bonnet that protects braids, silk presses and wigs overnight.', 15000::numeric, null::numeric, 'other-products', '/images/gallery-5.webp', false, 8),
  ('Body Wave Wig 20"', 'body-wave-wig-20', 'Premium HD lace body wave unit, pre-plucked with bleached knots. Ready to wear straight from the box.', 350000::numeric, 420000::numeric, 'kim-collection', '/images/gallery-2.webp', true, 9),
  ('Straight Bob Wig 12"', 'straight-bob-wig-12', 'Sleek 100% human hair bob on a transparent lace frontal. Light, comfortable and fully restylable.', 260000::numeric, null::numeric, 'kim-collection', '/images/gallery-4.webp', true, 10),
  ('Curly Drawstring Ponytail', 'curly-drawstring-ponytail', 'Instant volume ponytail that clips in in seconds — perfect for a fast, polished look.', 65000::numeric, 80000::numeric, 'kim-collection', '/images/gallery-1.webp', false, 11),
  ('Classic Lash Strips (3 Pack)', 'classic-lash-strips-3pack', 'Reusable natural-length lash strips with a soft cotton band. Comfortable enough for all-day wear.', 18000::numeric, null::numeric, 'lashes', '/images/gallery-4.webp', false, 12),
  ('Lash Aftercare Kit', 'lash-aftercare-kit', 'Foam cleanser, brush and sealant to keep extension sets full between refills.', 24000::numeric, null::numeric, 'lashes', '/images/gallery-5.webp', false, 13),
  ('Gel Polish Set (6 Colours)', 'gel-polish-set', 'Six salon-favourite gel shades with a high-shine, chip-resistant top coat.', 45000::numeric, 55000::numeric, 'nails-tools', '/images/gallery-3.webp', false, 14),
  ('Cuticle Care Kit', 'cuticle-care-kit', 'Oil, pusher, nipper and buffer — everything for a salon-standard manicure at home.', 20000::numeric, null::numeric, 'nails-tools', '/images/gallery-1.webp', false, 15),
  ('Satin Pillowcase', 'satin-pillowcase', 'Friction-free satin pillowcase that protects your style and your skin while you sleep.', 22000::numeric, null::numeric, 'other-products', '/images/gallery-2.webp', false, 16)
) as p(name, slug, description, price, compare_at_price, cat, image_url, is_featured, sort_order)
on conflict (slug) do nothing;

-- ---------- testimonials ----------
insert into public.testimonials (name, location, rating, quote, source, sort_order) values
('Amina Hassan', 'Arusha', 5, 'Best knotless braids I have ever had. Three weeks in and my edges are still perfect. The salon is spotless and the team actually listens to what you want.', 'google', 1),
('Grace Mollel', 'Njiro, Arusha', 5, 'I came in for a lash set before my sister''s wedding and left obsessed. They lasted the whole trip and still looked full when I got back.', 'google', 2),
('Neema Kileo', 'Arusha', 5, 'The spa package is worth every shilling. Massage, facial, steam — I walked out feeling like a completely different person.', 'google', 3),
('Fatma Said', 'Sakina, Arusha', 5, 'My bridal makeup was flawless from morning until the last dance. Photos came out incredible. Thank you Kim Beauty team.', 'google', 4),
('Joyce Mushi', 'Arusha', 5, 'I buy the Kim growth oil every month now. My edges have genuinely filled back in after years of tight styles.', 'google', 5),
('Sarah Lema', 'Kijenge, Arusha', 5, 'Booked on WhatsApp, confirmed in five minutes, in and out with a perfect silk press. Service here is on another level.', 'google', 6),
('Rehema Juma', 'Arusha', 5, 'Did the braiding course at Kim Academy and I am now doing clients of my own. The training was hands-on and properly thorough.', 'google', 7),
('Diana Mbwambo', 'Arusha', 5, 'The wig I ordered from the Kim Collection arrived pre-plucked and ready. Honestly looked better than the photos.', 'google', 8)
on conflict do nothing;

-- ---------- gallery ----------
insert into public.gallery_images (title, image_url, sort_order) values
('Cornrow Feed-In Braids', '/images/gallery-1.webp', 1),
('Lash & Glam Finish', '/images/gallery-2.webp', 2),
('Spa & Treatment Room', '/images/gallery-3.webp', 3),
('Knotless Braid Set', '/images/gallery-4.webp', 4),
('Colour & Boho Curls', '/images/gallery-5.webp', 5)
on conflict do nothing;

-- ---------------------------------------------------------------
-- Translations + confirmed address/WhatsApp.
-- Copied from migrations 20260928000009–13: `supabase db reset` runs
-- migrations before this seed, so those updates found no rows to change.
-- ---------------------------------------------------------------

update public.site_content set value = jsonb_build_object(
  'title_sw', 'Urembo Uliotengenezwa kwa Ustadi',
  'description_sw', 'Mitindo ya kusuka, kope, kucha, spa na urembo kutoka kwa timu ya urembo inayopendwa zaidi Arusha.',
  'stat_1_label_sw', 'Miaka ya Ustadi',
  'stat_2_label_sw', 'Wateja Wenye Furaha',
  'stat_3_label_sw', 'Ukadiriaji wa Google',
  'primary_cta_label_sw', 'Weka Miadi',
  'secondary_cta_label_sw', 'Nunua Sasa'
) || value where key = 'hero';

update public.site_content set value = jsonb_build_object(
  'eyebrow_sw', 'Hadithi Yetu',
  'title_sw', 'Arusha Huja Hapa Kung''aa',
  'body_sw', 'Kim Beauty ilianzia Metropole, Arusha, Tanzania kwa imani moja rahisi — kila mwanamke anastahili kuinuka kitini akijiona katika ubora wake wa hali ya juu. Leo saluni yetu inawaleta pamoja wasusi mahiri, wataalamu wa kope, wataalamu wa make up na wa spa chini ya paa moja.',
  'body_2_sw', 'Kuanzia mitindo ya kulinda nywele na extensions za umakini hadi huduma zetu maalum za spa na Kim Collection, kila tunachofanya kimejengwa juu ya ufundi safi, bidhaa bora na kujali kwa dhati.',
  'point_1_sw', 'Wataalamu waliothibitishwa na wenye uzoefu',
  'point_2_sw', 'Bidhaa bora pekee',
  'point_3_sw', 'Saluni safi na tulivu',
  'point_4_sw', 'Kim Beauty Academy',
  'cta_label_sw', 'Zaidi Kuhusu Sisi'
) || value where key = 'about';

update public.site_content set value = jsonb_build_object(
  'eyebrow_sw', 'Kuhusu Kim Beauty',
  'title_sw', 'Urembo Wenye Makusudi',
  'description_sw', 'Saluni ya kisasa ya urembo katikati ya Arusha.',
  'story_title_sw', 'Tulivyoanza',
  'story_body_sw', 'Kim Beauty ilifungua milango yake Arusha, Tanzania ikiwa na kiti kimoja cha kusuka na orodha ndefu ya wateja waaminifu. Habari zilienea haraka. Kilichoanza kama msusi mmoja kikawa saluni kamili — kusuka, extensions, kope, make up, kucha, spa na bidhaa zetu wenyewe.',
  'story_body_2_sw', 'Tunamfundisha kila mtaalamu wetu sisi wenyewe kupitia Kim Academy, hivyo ufundi unaoupata katika ziara yako ya kwanza ndio utakaoupata katika ziara yako ya hamsini.',
  'mission_title_sw', 'Dhamira Yetu',
  'mission_body_sw', 'Kumpa kila mteja kiti ambapo anasikilizwa, anatunzwa, na anaondoka akiwa anang''aa.',
  'vision_title_sw', 'Maono Yetu',
  'vision_body_sw', 'Kuwa jina linaloaminika zaidi Afrika Mashariki katika nywele, urembo na elimu ya urembo.',
  'value_1_title_sw', 'Ufundi Kwanza',
  'value_1_body_sw', 'Mistari safi, msuko usiobana kupita kiasi, na matokeo yanayodumu.',
  'value_2_title_sw', 'Bidhaa Bora',
  'value_2_body_sw', 'Tunatumia tu kile ambacho tungeweka kwenye nywele zetu wenyewe.',
  'value_3_title_sw', 'Kujali kwa Dhati',
  'value_3_body_sw', 'Ushauri wa kweli kuhusu kinachokufaa — bila kukushinikiza kununua zaidi.',
  'value_4_title_sw', 'Kujifunza Daima',
  'value_4_body_sw', 'Kim Academy inaiweka timu yetu mbele katika kila mtindo mpya.'
) || value where key = 'about_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_sw', 'Weka Miadi',
  'title_sw', 'Hifadhi Kiti Chako',
  'description_sw', 'Jaza maelezo yako nasi tutathibitisha nafasi yako kwa WhatsApp mara moja.'
) || value where key = 'booking_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_sw', 'Wasiliana Nasi',
  'title_sw', 'Tungependa Kusikia Kutoka Kwako',
  'description_sw', 'Tupigie simu, WhatsApp, barua pepe au tutembelee saluni Metropole, Arusha, Tanzania.'
) || value where key = 'contact_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_sw', 'Tuko Tayari Ukiwa Tayari',
  'title_sw', 'Kiti Chako Kinakusubiri',
  'description_sw', 'Weka miadi yako chini ya dakika moja — tutakuthibitishia kwa WhatsApp.',
  'primary_cta_label_sw', 'Weka Miadi',
  'secondary_cta_label_sw', 'Ongea Nasi'
) || value where key = 'cta_section';

update public.site_content set value = jsonb_build_object(
  'tagline_sw', 'Saluni ya kisasa ya urembo Metropole, Arusha, Tanzania — nywele, kope, kucha, spa na Kim Collection.',
  'copyright_sw', 'Kim Beauty. Haki zote zimehifadhiwa.'
) || value where key = 'footer';

update public.site_content set value = jsonb_build_object(
  'title_sw', 'Njia za Kulipa',
  'description_sw', 'Lipia oda yako au weka amana kwa usalama mtandaoni — kadi, pesa kwa simu na uhamisho wa benki vyote vinakubalika. Ungependa kulipa ukiwa saluni? Tuma tu oda yako kwa WhatsApp.'
) || value where key = 'payments';

update public.site_content set value = jsonb_build_object(
  'eyebrow_sw', 'Huduma Zetu',
  'title_sw', 'Kila Kitu cha Urembo, Chini ya Paa Moja',
  'description_sw', 'Pitia orodha kamili ya huduma za Kim Beauty na uchague kiti kinachokufaa.'
) || value where key = 'services_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_sw', 'Tunachofanya',
  'title_sw', 'Huduma Zilizoandaliwa kwa Ajili Yako',
  'description_sw', 'Nywele, kope, kucha, spa na bidhaa za kuvitunza vyote ukiwa nyumbani.'
) || value where key = 'services_section';

update public.site_content set value = jsonb_build_object(
  'title_sw', 'Bidhaa za Urembo za Kiwango cha Saluni',
  'description_sw', 'Weka unachokipenda kikapuni kisha tuma oda yako moja kwa moja WhatsApp.'
) || value where key = 'shop_page';

update public.site_content set value = jsonb_build_object(
  'title_sw', 'Beba Saluni Nyumbani',
  'description_sw', 'Bidhaa teule za nywele, kope na ngozi — tunaleta popote Arusha.',
  'cta_label_sw', 'Tembelea Duka'
) || value where key = 'shop_section';

update public.site_content set value = jsonb_build_object(
  'eyebrow_sw', 'Wateja Wanatupenda',
  'title_sw', 'Maoni ya Wateja Halisi',
  'description_sw', 'Tumekadiriwa 4.9 kwenye Google na mamia ya wateja wa Arusha.'
) || value where key = 'testimonials_section';

update public.site_content set value = jsonb_build_object(
  'title_fr', 'La beauté, façonnée avec soin',
  'description_fr', 'Tresses, cils, ongles, spa et glamour par l''équipe beauté la plus appréciée d''Arusha.',
  'stat_1_label_fr', 'Années de savoir-faire',
  'stat_2_label_fr', 'Clientes ravies',
  'stat_3_label_fr', 'Note Google',
  'primary_cta_label_fr', 'Prendre rendez-vous',
  'secondary_cta_label_fr', 'Boutique'
) || value where key = 'hero';

update public.site_content set value = jsonb_build_object(
  'eyebrow_fr', 'Notre histoire',
  'title_fr', 'Là où Arusha vient briller',
  'body_fr', 'Kim Beauty est née à Metropole, Arusha, en Tanzanie, d''une conviction simple — chaque femme mérite de quitter le fauteuil en se sentant la meilleure version d''elle-même. Aujourd''hui, notre salon réunit sous un même toit des maîtres tresseuses, des expertes en cils, des pros du maquillage et des thérapeutes spa.',
  'body_2_fr', 'Des coiffures protectrices aux extensions de précision, en passant par nos rituels spa signature et la Kim Collection, tout ce que nous faisons repose sur une technique irréprochable, des produits haut de gamme et une attention sincère.',
  'point_1_fr', 'Stylistes certifiées et expérimentées',
  'point_2_fr', 'Uniquement des produits haut de gamme',
  'point_3_fr', 'Salon impeccable et apaisant',
  'point_4_fr', 'Kim Beauty Academy',
  'cta_label_fr', 'En savoir plus'
) || value where key = 'about';

update public.site_content set value = jsonb_build_object(
  'eyebrow_fr', 'À propos de Kim Beauty',
  'title_fr', 'La beauté avec intention',
  'description_fr', 'Un salon de beauté moderne au cœur d''Arusha.',
  'story_title_fr', 'Nos débuts',
  'story_body_fr', 'Kim Beauty a ouvert ses portes à Arusha, en Tanzanie, avec un seul fauteuil de tressage et une longue liste de clientes fidèles. Le bouche-à-oreille a fait le reste. Ce qui a commencé avec une seule styliste est devenu un salon complet — tresses, extensions, cils, maquillage, ongles, spa et notre propre gamme de produits.',
  'story_body_2_fr', 'Nous formons chaque styliste en interne grâce à la Kim Academy : la technique que vous découvrez à votre première visite est celle que vous retrouverez à la cinquantième.',
  'mission_title_fr', 'Notre mission',
  'mission_body_fr', 'Offrir à chaque cliente un fauteuil où elle est écoutée, choyée, et d''où elle repart rayonnante.',
  'vision_title_fr', 'Notre vision',
  'vision_body_fr', 'Devenir le nom le plus fiable d''Afrique de l''Est pour la coiffure, la beauté et la formation beauté.',
  'value_1_title_fr', 'Le savoir-faire d''abord',
  'value_1_body_fr', 'Des raies nettes, une tension saine et des finitions qui durent.',
  'value_2_title_fr', 'Produits haut de gamme',
  'value_2_body_fr', 'Nous n''utilisons que ce que nous mettrions sur nos propres cheveux.',
  'value_3_title_fr', 'Une attention sincère',
  'value_3_body_fr', 'Des conseils honnêtes sur ce qui vous va — jamais de vente forcée.',
  'value_4_title_fr', 'Toujours apprendre',
  'value_4_body_fr', 'La Kim Academy garde notre équipe en avance sur chaque tendance.'
) || value where key = 'about_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_fr', 'Prendre rendez-vous',
  'title_fr', 'Réservez votre fauteuil',
  'description_fr', 'Indiquez vos coordonnées et nous confirmerons votre créneau sur WhatsApp immédiatement.'
) || value where key = 'booking_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_fr', 'Contactez-nous',
  'title_fr', 'Nous serions ravis de vous entendre',
  'description_fr', 'Appelez-nous, écrivez-nous sur WhatsApp ou par e-mail, ou passez au salon à Metropole, Arusha, Tanzanie.'
) || value where key = 'contact_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_fr', 'Prêtes quand vous l''êtes',
  'title_fr', 'Votre fauteuil vous attend',
  'description_fr', 'Réservez en moins d''une minute — nous vous confirmons sur WhatsApp.',
  'primary_cta_label_fr', 'Prendre rendez-vous',
  'secondary_cta_label_fr', 'Parlez-nous'
) || value where key = 'cta_section';

update public.site_content set value = jsonb_build_object(
  'tagline_fr', 'Un salon de beauté moderne à Metropole, Arusha, Tanzanie — cheveux, cils, ongles, spa et la Kim Collection.',
  'copyright_fr', 'Kim Beauty. Tous droits réservés.'
) || value where key = 'footer';

update public.site_content set value = jsonb_build_object(
  'title_fr', 'Moyens de paiement',
  'description_fr', 'Réglez votre commande ou versez un acompte en ligne en toute sécurité — carte, mobile money et virement bancaire acceptés. Vous préférez payer au salon ? Envoyez simplement votre commande sur WhatsApp.'
) || value where key = 'payments';

update public.site_content set value = jsonb_build_object(
  'eyebrow_fr', 'Nos services',
  'title_fr', 'Toute la beauté, sous un même toit',
  'description_fr', 'Découvrez toute la carte Kim Beauty et réservez le fauteuil qui vous convient.'
) || value where key = 'services_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_fr', 'Ce que nous faisons',
  'title_fr', 'Des services pensés pour vous',
  'description_fr', 'Cheveux, cils, ongles, spa et les produits pour tout garder parfait à la maison.'
) || value where key = 'services_section';

update public.site_content set value = jsonb_build_object(
  'title_fr', 'L''essentiel beauté, qualité salon',
  'description_fr', 'Ajoutez ce que vous aimez au panier et envoyez votre commande directement sur notre WhatsApp.'
) || value where key = 'shop_page';

update public.site_content set value = jsonb_build_object(
  'title_fr', 'Le salon à la maison',
  'description_fr', 'Une sélection de soins pour cheveux, cils et peau — livrés partout à Arusha.',
  'cta_label_fr', 'Voir la boutique'
) || value where key = 'shop_section';

update public.site_content set value = jsonb_build_object(
  'eyebrow_fr', 'Elles nous adorent',
  'title_fr', 'Notées par de vraies clientes',
  'description_fr', 'Noté 4,9 sur Google par des centaines de clientes d''Arusha.'
) || value where key = 'testimonials_section';

update public.site_content set value = value || jsonb_build_object(
  'address', 'Sokoine Rd, Arusha 23102, Tanzania',
  'map_query', 'KIM BEAUTY SALONS, Sokoine Rd, Arusha',
  'map_url', 'https://www.google.com/maps/place/KIM+BEAUTY+SALONS/@-3.3734029,36.690324,17z/data=!3m1!4b1!4m6!3m5!1s0x18371df4331c2ff1:0xabb9545e5a95079d!8m2!3d-3.3734029!4d36.690324!16s%2Fg%2F11p19rfz69',
  'whatsapp', '255766400961'
) where key = 'contact';

update public.site_content set value = value || jsonb_build_object(
  'body', 'Kim Beauty began on Sokoine Road, Arusha with one simple belief — every woman deserves to leave a chair feeling like the best version of herself. Today our salon brings together master braiders, lash artists, makeup pros and spa therapists under one roof.',
  'body_sw', 'Kim Beauty ilianzia Sokoine Road, Arusha kwa imani moja rahisi — kila mwanamke anastahili kuinuka kitini akijiona katika ubora wake wa hali ya juu. Leo saluni yetu inawaleta pamoja wasusi mahiri, wataalamu wa kope, wataalamu wa make up na wa spa chini ya paa moja.',
  'body_fr', 'Kim Beauty est née sur Sokoine Road, à Arusha, d''une conviction simple — chaque femme mérite de quitter le fauteuil en se sentant la meilleure version d''elle-même. Aujourd''hui, notre salon réunit sous un même toit des maîtres tresseuses, des expertes en cils, des pros du maquillage et des thérapeutes spa.'
) where key = 'about';

update public.site_content set value = value || jsonb_build_object(
  'description', 'Call, WhatsApp, email or stop by the salon on Sokoine Road, Arusha, Tanzania.',
  'description_sw', 'Tupigie simu, WhatsApp, barua pepe au tutembelee saluni yetu Sokoine Road, Arusha, Tanzania.',
  'description_fr', 'Appelez-nous, écrivez-nous sur WhatsApp ou par e-mail, ou passez au salon sur Sokoine Road, à Arusha, en Tanzanie.'
) where key = 'contact_page';

update public.site_content set value = value || jsonb_build_object(
  'tagline', 'A modern beauty salon on Sokoine Road, Arusha, Tanzania — hair, lashes, nails, spa and the Kim Collection.',
  'tagline_sw', 'Saluni ya kisasa ya urembo iliyopo Sokoine Road, Arusha, Tanzania — nywele, kope, kucha, spa na Kim Collection.',
  'tagline_fr', 'Un salon de beauté moderne sur Sokoine Road, à Arusha, en Tanzanie — cheveux, cils, ongles, spa et la Kim Collection.'
) where key = 'footer';

update public.site_content set value = jsonb_build_object(
  'title_zh', '美丽， 匠心雕琢',
  'description_zh', '编发、睫毛、美甲、水疗与妆容，由阿鲁沙最受喜爱的美容团队为您打造。',
  'stat_1_label_zh', '年匠心经验',
  'stat_2_label_zh', '满意顾客',
  'stat_3_label_zh', 'Google 评分',
  'primary_cta_label_zh', '立即预约',
  'secondary_cta_label_zh', '去商店'
) || value where key = 'hero';

update public.site_content set value = jsonb_build_object(
  'eyebrow_zh', '我们的故事',
  'title_zh', '阿鲁沙焕发光彩之地',
  'body_zh', 'Kim Beauty 创立于阿鲁沙 Sokoine Road，源于一个简单的信念——每一位女性离开座椅时，都应感受到最好的自己。如今，我们的沙龙汇聚了资深编发师、睫毛师、专业化妆师和水疗理疗师。',
  'body_2_zh', '从护发造型、精细接发，到招牌水疗与 Kim Collection，我们所做的一切都建立在扎实的手艺、优质的产品和真诚的关怀之上。',
  'point_1_zh', '持证专业造型师',
  'point_2_zh', '只用优质产品',
  'point_3_zh', '整洁舒适的沙龙环境',
  'point_4_zh', 'Kim Beauty 学院',
  'cta_label_zh', '了解更多'
) || value where key = 'about';

update public.site_content set value = jsonb_build_object(
  'eyebrow_zh', '关于 Kim Beauty',
  'title_zh', '用心成就美丽',
  'description_zh', '位于阿鲁沙市中心的现代美容沙龙。',
  'story_title_zh', '我们的起点',
  'story_body_zh', 'Kim Beauty 在坦桑尼亚阿鲁沙开业时，只有一张编发椅和一长串忠实顾客。口碑很快传开。从一位造型师起步，如今已发展为一家综合沙龙——编发、接发、睫毛、化妆、美甲、水疗，还有我们自己的产品线。',
  'story_body_2_zh', '每一位造型师都经过 Kim Academy 的内部培训，因此您第一次到店和第五十次到店，享受到的都是同样的手艺。',
  'mission_title_zh', '我们的使命',
  'mission_body_zh', '让每位顾客都拥有被倾听、被呵护的体验，并容光焕发地离开。',
  'vision_title_zh', '我们的愿景',
  'vision_body_zh', '成为东非在美发、美容及美容教育领域最值得信赖的品牌。',
  'value_1_title_zh', '手艺至上',
  'value_1_body_zh', '分区干净、松紧适度，效果持久。',
  'value_2_title_zh', '优质产品',
  'value_2_body_zh', '只用我们愿意用在自己头发上的产品。',
  'value_3_title_zh', '真诚关怀',
  'value_3_body_zh', '诚实建议什么最适合您——绝不强行推销。',
  'value_4_title_zh', '持续学习',
  'value_4_body_zh', 'Kim Academy 让我们的团队始终走在潮流前沿。'
) || value where key = 'about_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_zh', '预约',
  'title_zh', '预留您的座位',
  'description_zh', '填写您的信息，我们会立即通过 WhatsApp 确认您的时段。'
) || value where key = 'booking_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_zh', '联系我们',
  'title_zh', '期待您的来信',
  'description_zh', '欢迎致电、WhatsApp、发邮件，或到坦桑尼亚阿鲁沙 Sokoine Road 的沙龙到店拜访。'
) || value where key = 'contact_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_zh', '随时为您准备',
  'title_zh', '您的座位已就绪',
  'description_zh', '一分钟内即可完成预约——我们会通过 WhatsApp 与您确认。',
  'primary_cta_label_zh', '立即预约',
  'secondary_cta_label_zh', '联系我们'
) || value where key = 'cta_section';

update public.site_content set value = jsonb_build_object(
  'tagline_zh', '位于坦桑尼亚阿鲁沙 Sokoine Road 的现代美容沙龙——美发、睫毛、美甲、水疗及 Kim Collection。',
  'copyright_zh', 'Kim Beauty 版权所有。'
) || value where key = 'footer';

update public.site_content set value = jsonb_build_object(
  'title_zh', '支付方式',
  'description_zh', '可在线安全支付订单或定金——支持银行卡、移动支付和银行转账。想到店付款？只需通过 WhatsApp 发送您的订单。'
) || value where key = 'payments';

update public.site_content set value = jsonb_build_object(
  'eyebrow_zh', '我们的服务',
  'title_zh', '一站式美丽体验',
  'description_zh', '浏览 Kim Beauty 全部服务，预约最适合您的项目。'
) || value where key = 'services_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_zh', '我们的专长',
  'title_zh', '为您量身打造的服务',
  'description_zh', '美发、睫毛、美甲、水疗，以及让您在家也能保持完美的护理产品。'
) || value where key = 'services_section';

update public.site_content set value = jsonb_build_object(
  'title_zh', '沙龙级美容好物',
  'description_zh', '把喜欢的商品加入购物车，直接发送订单到我们的 WhatsApp。'
) || value where key = 'shop_page';

update public.site_content set value = jsonb_build_object(
  'title_zh', '把沙龙带回家',
  'description_zh', '精选护发、睫毛和护肤好物——阿鲁沙全城配送。',
  'cta_label_zh', '逛逛商店'
) || value where key = 'shop_section';

update public.site_content set value = jsonb_build_object(
  'eyebrow_zh', '顾客好评',
  'title_zh', '真实顾客的评价',
  'description_zh', '数百位阿鲁沙顾客在 Google 上给出 4.9 分好评。'
) || value where key = 'testimonials_section';

update public.site_content set value = jsonb_build_object(
  'title_ar', 'جمال صُنع بإتقان',
  'description_ar', 'تضفير ورموش وأظافر وسبا وإطلالات ساحرة على يد فريق التجميل الأكثر محبة في أروشا.',
  'stat_1_label_ar', 'سنوات من الخبرة',
  'stat_2_label_ar', 'عميلة سعيدة',
  'stat_3_label_ar', 'تقييم Google',
  'primary_cta_label_ar', 'احجز موعدًا',
  'secondary_cta_label_ar', 'تسوّق الآن'
) || value where key = 'hero';

update public.site_content set value = jsonb_build_object(
  'eyebrow_ar', 'قصتنا',
  'title_ar', 'حيث تتألق أروشا',
  'body_ar', 'بدأت Kim Beauty في شارع سوكوين في أروشا بقناعة بسيطة — كل امرأة تستحق أن تغادر الكرسي وهي تشعر بأنها في أجمل صورها. واليوم يجمع صالوننا خبيرات التضفير وفنانات الرموش ومحترفات المكياج ومعالجات السبا تحت سقف واحد.',
  'body_2_ar', 'من تسريحات حماية الشعر والوصلات الدقيقة إلى طقوس السبا المميزة وKim Collection، كل ما نقدمه قائم على تقنية متقنة ومنتجات فاخرة واهتمام صادق.',
  'point_1_ar', 'مصففات معتمدات ومحترفات',
  'point_2_ar', 'منتجات فاخرة فقط',
  'point_3_ar', 'صالون نظيف ومريح',
  'point_4_ar', 'أكاديمية Kim Beauty',
  'cta_label_ar', 'المزيد عنا'
) || value where key = 'about';

update public.site_content set value = jsonb_build_object(
  'eyebrow_ar', 'عن Kim Beauty',
  'title_ar', 'جمال بعناية وقصد',
  'description_ar', 'صالون تجميل عصري في قلب أروشا.',
  'story_title_ar', 'كيف بدأنا',
  'story_body_ar', 'افتتحت Kim Beauty أبوابها في أروشا، تنزانيا، بكرسي تضفير واحد وقائمة طويلة من العميلات الوفيات. وانتشر الخبر بسرعة. ما بدأ بمصففة واحدة أصبح صالونًا متكاملًا — تضفير، ووصلات، ورموش، ومكياج، وأظافر، وسبا، وخط منتجات خاص بنا.',
  'story_body_2_ar', 'ندرّب كل مصففة لدينا داخليًا عبر Kim Academy، لذا فالمهارة التي تجدينها في زيارتك الأولى هي نفسها في زيارتك الخمسين.',
  'mission_title_ar', 'رسالتنا',
  'mission_body_ar', 'أن نمنح كل عميلة مقعدًا تُسمع فيه وتُدلَّل، وتغادره وهي متألقة.',
  'vision_title_ar', 'رؤيتنا',
  'vision_body_ar', 'أن نكون الاسم الأكثر ثقة في شرق أفريقيا في مجال الشعر والتجميل وتعليم التجميل.',
  'value_1_title_ar', 'الإتقان أولًا',
  'value_1_body_ar', 'تقسيمات نظيفة وشدّ صحي ولمسات نهائية تدوم.',
  'value_2_title_ar', 'منتجات فاخرة',
  'value_2_body_ar', 'لا نستخدم إلا ما نضعه على شعرنا نحن.',
  'value_3_title_ar', 'اهتمام صادق',
  'value_3_body_ar', 'نصيحة صادقة بما يناسبك — دون إلحاح على الشراء.',
  'value_4_title_ar', 'تعلّم دائم',
  'value_4_body_ar', 'تُبقي Kim Academy فريقنا في طليعة كل صيحة جديدة.'
) || value where key = 'about_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_ar', 'احجز موعدًا',
  'title_ar', 'احجز مقعدك',
  'description_ar', 'أدخل بياناتك وسنؤكد موعدك عبر واتساب فورًا.'
) || value where key = 'booking_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_ar', 'تواصل معنا',
  'title_ar', 'يسعدنا أن نسمع منك',
  'description_ar', 'اتصل بنا أو راسلنا عبر واتساب أو البريد الإلكتروني، أو زر الصالون في شارع سوكوين، أروشا، تنزانيا.'
) || value where key = 'contact_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_ar', 'جاهزون متى كنت جاهزة',
  'title_ar', 'مقعدك بانتظارك',
  'description_ar', 'احجزي موعدك في أقل من دقيقة — وسنؤكده لك عبر واتساب.',
  'primary_cta_label_ar', 'احجز موعدًا',
  'secondary_cta_label_ar', 'تحدث إلينا'
) || value where key = 'cta_section';

update public.site_content set value = jsonb_build_object(
  'tagline_ar', 'صالون تجميل عصري في شارع سوكوين، أروشا، تنزانيا — شعر ورموش وأظافر وسبا وKim Collection.',
  'copyright_ar', 'Kim Beauty. جميع الحقوق محفوظة.'
) || value where key = 'footer';

update public.site_content set value = jsonb_build_object(
  'title_ar', 'طرق الدفع',
  'description_ar', 'ادفع ثمن طلبك أو عربونًا بأمان عبر الإنترنت — نقبل البطاقات والمحافظ الإلكترونية والتحويل البنكي. تفضّل الدفع في الصالون؟ أرسل طلبك عبر واتساب فقط.'
) || value where key = 'payments';

update public.site_content set value = jsonb_build_object(
  'eyebrow_ar', 'خدماتنا',
  'title_ar', 'كل ما يخص الجمال تحت سقف واحد',
  'description_ar', 'تصفّح قائمة خدمات Kim Beauty الكاملة واحجز ما يناسبك.'
) || value where key = 'services_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_ar', 'ما نقدمه',
  'title_ar', 'خدمات مصممة من أجلك',
  'description_ar', 'شعر ورموش وأظافر وسبا، ومنتجات تحافظ على كل شيء مثاليًا في المنزل.'
) || value where key = 'services_section';

update public.site_content set value = jsonb_build_object(
  'title_ar', 'مستلزمات تجميل بجودة الصالون',
  'description_ar', 'أضف ما يعجبك إلى السلة وأرسل طلبك مباشرة إلى واتساب.'
) || value where key = 'shop_page';

update public.site_content set value = jsonb_build_object(
  'title_ar', 'خذ الصالون إلى منزلك',
  'description_ar', 'منتجات مختارة للشعر والرموش والبشرة — توصيل إلى جميع أنحاء أروشا.',
  'cta_label_ar', 'تصفّح المتجر'
) || value where key = 'shop_section';

update public.site_content set value = jsonb_build_object(
  'eyebrow_ar', 'آراء عميلاتنا',
  'title_ar', 'تقييمات من عملاء حقيقيين',
  'description_ar', 'تقييم 4.9 على Google من مئات العملاء في أروشا.'
) || value where key = 'testimonials_section';
