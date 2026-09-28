-- Arabic copy for the language switcher (`<field>_ar`). The site renders
-- Arabic right-to-left. Same rules as the other language migrations:
-- `new || value` keeps anything already saved, safe to re-run, opening
-- hours stay English.

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
