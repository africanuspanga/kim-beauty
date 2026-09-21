-- =============================================================
-- KIM BEAUTY — sample content (safe to re-run)
-- =============================================================

-- ---------- editable site copy ----------
insert into public.site_content (key, label, value) values
('hero', 'Homepage Hero', jsonb_build_object(
  'eyebrow', 'Pangani Street · Arusha',
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
  'body', 'Kim Beauty began on Pangani Street with one simple belief — every woman deserves to leave a chair feeling like the best version of herself. Today our studio brings together master braiders, lash artists, makeup pros and spa therapists under one roof.',
  'body_2', 'From protective styles and precision extensions to signature spa rituals and the Kim Collection, everything we do is built on clean technique, premium product and genuine care.',
  'image_url', '/images/gallery-5.webp',
  'point_1', 'Certified, career stylists',
  'point_2', 'Premium products only',
  'point_3', 'Spotless, relaxed studio',
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
  'address', 'Pangani Street, Arusha, Tanzania',
  'map_query', 'Pangani Street, Arusha, Tanzania',
  'hours_weekday', 'Mon – Fri · 8:00 AM – 8:00 PM',
  'hours_saturday', 'Saturday · 8:00 AM – 9:00 PM',
  'hours_sunday', 'Sunday · 10:00 AM – 6:00 PM',
  'instagram', 'https://instagram.com/kimbeautysalons',
  'facebook', 'https://facebook.com/kimbeautysalons',
  'tiktok', 'https://tiktok.com/@kimbeautysalons'
)),
('about_page', 'About Page', jsonb_build_object(
  'eyebrow', 'About Kim Beauty',
  'title', 'Beauty With Intention',
  'description', 'A modern beauty studio in the heart of Arusha.',
  'hero_image', '/images/gallery-2.webp',
  'story_title', 'How It Started',
  'story_body', 'Kim Beauty opened its doors on Pangani Street with a single braiding chair and a long list of loyal clients. Word travelled fast. What started as one stylist became a full studio — braiding, extensions, lashes, makeup, nails, spa and a product line of our own.',
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
  'description', 'Call, WhatsApp, email or stop by the studio on Pangani Street.'
)),
('footer', 'Footer', jsonb_build_object(
  'tagline', 'A modern beauty studio on Pangani Street, Arusha — hair, lashes, nails, spa and the Kim Collection.',
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
('Amina Hassan', 'Arusha', 5, 'Best knotless braids I have ever had. Three weeks in and my edges are still perfect. The studio is spotless and the team actually listens to what you want.', 'google', 1),
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
