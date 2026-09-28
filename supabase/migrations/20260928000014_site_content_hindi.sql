-- Hindi copy for the language switcher (`<field>_hi`). Same rules as the
-- other language migrations: `new || value` keeps anything already saved,
-- safe to re-run, opening hours stay English.

update public.site_content set value = jsonb_build_object(
  'title_hi', 'सौंदर्य, कुशलता से निखरा',
  'description_hi', 'ब्रेड्स, लैशेज़, नेल्स, स्पा और ग्लैम — अरूशा की सबसे पसंदीदा ब्यूटी टीम के हाथों।',
  'stat_1_label_hi', 'साल का अनुभव',
  'stat_2_label_hi', 'खुश ग्राहक',
  'stat_3_label_hi', 'Google रेटिंग',
  'primary_cta_label_hi', 'अपॉइंटमेंट बुक करें',
  'secondary_cta_label_hi', 'अभी ख़रीदें'
) || value where key = 'hero';

update public.site_content set value = jsonb_build_object(
  'eyebrow_hi', 'हमारी कहानी',
  'title_hi', 'जहाँ अरूशा निखरता है',
  'body_hi', 'Kim Beauty की शुरुआत अरूशा की सोकोइन रोड पर एक सीधे-से विश्वास के साथ हुई — हर महिला को सैलून की कुर्सी से अपना सबसे बेहतरीन रूप लेकर उठना चाहिए। आज हमारे सैलून में माहिर ब्रेडर, लैश आर्टिस्ट, मेकअप प्रोफ़ेशनल और स्पा थेरेपिस्ट एक ही छत के नीचे हैं।',
  'body_2_hi', 'प्रोटेक्टिव स्टाइल और बारीक एक्सटेंशन से लेकर हमारे ख़ास स्पा अनुभवों और Kim Collection तक, हमारा हर काम साफ़-सुथरी तकनीक, बेहतरीन प्रोडक्ट और सच्ची देखभाल पर टिका है।',
  'point_1_hi', 'प्रमाणित, अनुभवी स्टाइलिस्ट',
  'point_2_hi', 'सिर्फ़ प्रीमियम प्रोडक्ट',
  'point_3_hi', 'साफ़-सुथरा, सुकून भरा सैलून',
  'point_4_hi', 'Kim Beauty अकादमी',
  'cta_label_hi', 'हमारे बारे में और जानें'
) || value where key = 'about';

update public.site_content set value = jsonb_build_object(
  'eyebrow_hi', 'Kim Beauty के बारे में',
  'title_hi', 'सोच-समझकर निखारी गई ख़ूबसूरती',
  'description_hi', 'अरूशा के बीचों-बीच एक मॉडर्न ब्यूटी सैलून।',
  'story_title_hi', 'हमारी शुरुआत',
  'story_body_hi', 'Kim Beauty ने अरूशा, तंज़ानिया में सिर्फ़ एक ब्रेडिंग कुर्सी और वफ़ादार ग्राहकों की लंबी सूची के साथ अपने दरवाज़े खोले। बात तेज़ी से फैली। जो एक स्टाइलिस्ट से शुरू हुआ, वह एक पूरा सैलून बन गया — ब्रेडिंग, एक्सटेंशन, लैशेज़, मेकअप, नेल्स, स्पा और हमारी अपनी प्रोडक्ट रेंज।',
  'story_body_2_hi', 'हम हर स्टाइलिस्ट को Kim Academy में ख़ुद ट्रेन करते हैं, इसलिए जो हुनर आपको पहली बार मिलता है, वही पचासवीं बार भी मिलेगा।',
  'mission_title_hi', 'हमारा मिशन',
  'mission_body_hi', 'हर ग्राहक को ऐसी जगह देना जहाँ उसकी बात सुनी जाए, उसका ख़याल रखा जाए, और वह निखरकर लौटे।',
  'vision_title_hi', 'हमारा विज़न',
  'vision_body_hi', 'बालों, ब्यूटी और ब्यूटी एजुकेशन में पूर्वी अफ़्रीका का सबसे भरोसेमंद नाम बनना।',
  'value_1_title_hi', 'हुनर सबसे पहले',
  'value_1_body_hi', 'साफ़ पार्टिंग, सही कसाव और देर तक टिकने वाली फ़िनिश।',
  'value_2_title_hi', 'प्रीमियम प्रोडक्ट',
  'value_2_body_hi', 'हम वही इस्तेमाल करते हैं जो अपने बालों पर लगाएँ।',
  'value_3_title_hi', 'सच्ची देखभाल',
  'value_3_body_hi', 'आप पर क्या जँचेगा, इसकी ईमानदार सलाह — बेवजह बिक्री नहीं।',
  'value_4_title_hi', 'हमेशा सीखते रहना',
  'value_4_body_hi', 'Kim Academy हमारी टीम को हर नए ट्रेंड से आगे रखती है।'
) || value where key = 'about_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_hi', 'अपॉइंटमेंट बुक करें',
  'title_hi', 'अपनी सीट बुक करें',
  'description_hi', 'अपनी जानकारी भरें और हम तुरंत व्हाट्सऐप पर आपका स्लॉट पक्का करेंगे।'
) || value where key = 'booking_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_hi', 'संपर्क करें',
  'title_hi', 'हमें आपसे सुनकर ख़ुशी होगी',
  'description_hi', 'कॉल करें, व्हाट्सऐप या ईमेल करें, या सोकोइन रोड, अरूशा, तंज़ानिया में हमारे सैलून आएँ।'
) || value where key = 'contact_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_hi', 'जब आप तैयार, हम तैयार',
  'title_hi', 'आपकी सीट आपका इंतज़ार कर रही है',
  'description_hi', 'एक मिनट से कम में अपॉइंटमेंट बुक करें — हम व्हाट्सऐप पर पुष्टि करेंगे।',
  'primary_cta_label_hi', 'अपॉइंटमेंट बुक करें',
  'secondary_cta_label_hi', 'हमसे बात करें'
) || value where key = 'cta_section';

update public.site_content set value = jsonb_build_object(
  'tagline_hi', 'सोकोइन रोड, अरूशा, तंज़ानिया पर एक मॉडर्न ब्यूटी सैलून — बाल, लैशेज़, नेल्स, स्पा और Kim Collection।',
  'copyright_hi', 'Kim Beauty. सर्वाधिकार सुरक्षित।'
) || value where key = 'footer';

update public.site_content set value = jsonb_build_object(
  'title_hi', 'भुगतान के तरीके',
  'description_hi', 'अपने ऑर्डर या एडवांस का भुगतान ऑनलाइन सुरक्षित रूप से करें — कार्ड, मोबाइल मनी और बैंक ट्रांसफ़र सब स्वीकार हैं। सैलून में भुगतान करना चाहती हैं? बस अपना ऑर्डर व्हाट्सऐप पर भेजें।'
) || value where key = 'payments';

update public.site_content set value = jsonb_build_object(
  'eyebrow_hi', 'हमारी सेवाएँ',
  'title_hi', 'ब्यूटी का सब कुछ, एक ही छत के नीचे',
  'description_hi', 'Kim Beauty की पूरी सूची देखें और अपने लिए सही सेवा बुक करें।'
) || value where key = 'services_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_hi', 'हम क्या करते हैं',
  'title_hi', 'आपके लिए बनी सेवाएँ',
  'description_hi', 'बाल, लैशेज़, नेल्स, स्पा और घर पर सब कुछ बेहतरीन बनाए रखने के प्रोडक्ट।'
) || value where key = 'services_section';

update public.site_content set value = jsonb_build_object(
  'title_hi', 'सैलून-क्वालिटी ब्यूटी ज़रूरतें',
  'description_hi', 'जो पसंद आए उसे कार्ट में डालें और अपना ऑर्डर सीधे हमारे व्हाट्सऐप पर भेजें।'
) || value where key = 'shop_page';

update public.site_content set value = jsonb_build_object(
  'title_hi', 'सैलून को घर ले जाएँ',
  'description_hi', 'चुनिंदा हेयर, लैश और स्किन प्रोडक्ट — पूरे अरूशा में डिलीवरी।',
  'cta_label_hi', 'शॉप देखें'
) || value where key = 'shop_section';

update public.site_content set value = jsonb_build_object(
  'eyebrow_hi', 'ग्राहकों का प्यार',
  'title_hi', 'असली ग्राहकों के रिव्यू',
  'description_hi', 'अरूशा के सैकड़ों ग्राहकों ने Google पर 4.9 रेटिंग दी है।'
) || value where key = 'testimonials_section';
