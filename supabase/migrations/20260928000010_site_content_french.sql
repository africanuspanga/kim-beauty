-- French copy for the language switcher, alongside the Kiswahili from
-- 20260928000009. Same rules: `<field>_fr` twins, `new || value` keeps
-- anything already saved, safe to re-run, opening hours stay English.

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
