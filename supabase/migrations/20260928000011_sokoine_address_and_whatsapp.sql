-- Confirmed by the owner on 2026-09-28:
--   * the salon is on Sokoine Rd, Arusha 23102 (matches the Google Business profile)
--   * WhatsApp is 0766 400 961 — the same line as the phone number
-- Replaces the earlier "Metropole" / "Arusha, Tanzania" wording and the
-- 0789 631 010 WhatsApp number that bookings and the contact form used.

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
