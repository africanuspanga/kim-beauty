-- Kiswahili copy for the language switcher.
--
-- Each editable field gets a `<field>_sw` twin in the same block; the site
-- shows it to visitors who pick SW and falls back to English when blank.
-- `new || value` keeps anything already saved, so this never overwrites
-- an admin's edits and is safe to re-run. Opening hours stay English-only
-- so they are only ever maintained in one place.

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
