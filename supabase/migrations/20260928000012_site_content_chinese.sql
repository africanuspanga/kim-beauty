-- Simplified Chinese copy for the language switcher (`<field>_zh`).
-- Same rules as the SW/FR migrations: `new || value` keeps anything already
-- saved, safe to re-run, opening hours stay English.
--
-- The hero title keeps one space on purpose: the site turns the text after
-- the last space gold, and Chinese has no spaces of its own.

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
