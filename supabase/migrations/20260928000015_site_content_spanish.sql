-- Spanish copy for the language switcher (`<field>_es`). Same rules as the
-- other language migrations: `new || value` keeps anything already saved,
-- safe to re-run, opening hours stay English.

update public.site_content set value = jsonb_build_object(
  'title_es', 'La belleza, hecha con maestría',
  'description_es', 'Trenzas, pestañas, uñas, spa y glamour de la mano del equipo de belleza más querido de Arusha.',
  'stat_1_label_es', 'Años de oficio',
  'stat_2_label_es', 'Clientas felices',
  'stat_3_label_es', 'Valoración en Google',
  'primary_cta_label_es', 'Reservar cita',
  'secondary_cta_label_es', 'Comprar ahora'
) || value where key = 'hero';

update public.site_content set value = jsonb_build_object(
  'eyebrow_es', 'Nuestra historia',
  'title_es', 'Donde Arusha viene a brillar',
  'body_es', 'Kim Beauty nació en Sokoine Road, Arusha, con una idea sencilla: toda mujer merece levantarse del sillón sintiéndose la mejor versión de sí misma. Hoy nuestro salón reúne bajo un mismo techo a trenzadoras expertas, artistas de pestañas, maquilladoras profesionales y terapeutas de spa.',
  'body_2_es', 'Desde peinados protectores y extensiones de precisión hasta nuestros rituales de spa y la Kim Collection, todo lo que hacemos se basa en una técnica impecable, productos de primera y un cuidado sincero.',
  'point_1_es', 'Estilistas certificadas y con experiencia',
  'point_2_es', 'Solo productos premium',
  'point_3_es', 'Salón impecable y relajante',
  'point_4_es', 'Kim Beauty Academy',
  'cta_label_es', 'Más sobre nosotros'
) || value where key = 'about';

update public.site_content set value = jsonb_build_object(
  'eyebrow_es', 'Sobre Kim Beauty',
  'title_es', 'Belleza con intención',
  'description_es', 'Un salón de belleza moderno en el corazón de Arusha.',
  'story_title_es', 'Cómo empezamos',
  'story_body_es', 'Kim Beauty abrió sus puertas en Arusha, Tanzania, con un solo sillón de trenzado y una larga lista de clientas fieles. La voz se corrió rápido. Lo que empezó con una estilista se convirtió en un salón completo: trenzas, extensiones, pestañas, maquillaje, uñas, spa y una línea de productos propia.',
  'story_body_2_es', 'Formamos a cada estilista en casa a través de Kim Academy, así que la técnica que recibe en su primera visita es la misma que en la número cincuenta.',
  'mission_title_es', 'Nuestra misión',
  'mission_body_es', 'Ofrecer a cada clienta un sillón donde se la escucha, se la cuida y de donde sale radiante.',
  'vision_title_es', 'Nuestra visión',
  'vision_body_es', 'Ser el nombre de mayor confianza de África Oriental en cabello, belleza y formación en belleza.',
  'value_1_title_es', 'El oficio primero',
  'value_1_body_es', 'Particiones limpias, tensión saludable y acabados que duran.',
  'value_2_title_es', 'Productos premium',
  'value_2_body_es', 'Solo usamos lo que pondríamos en nuestro propio cabello.',
  'value_3_title_es', 'Cuidado sincero',
  'value_3_body_es', 'Consejos honestos sobre lo que le favorece, sin ventas forzadas.',
  'value_4_title_es', 'Siempre aprendiendo',
  'value_4_body_es', 'Kim Academy mantiene a nuestro equipo a la vanguardia de cada tendencia.'
) || value where key = 'about_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_es', 'Reservar cita',
  'title_es', 'Reserve su sillón',
  'description_es', 'Complete sus datos y confirmaremos su hora por WhatsApp al instante.'
) || value where key = 'booking_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_es', 'Contacto',
  'title_es', 'Nos encantará saber de usted',
  'description_es', 'Llámenos, escríbanos por WhatsApp o correo, o visite el salón en Sokoine Road, Arusha, Tanzania.'
) || value where key = 'contact_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_es', 'Listas cuando usted lo esté',
  'title_es', 'Su sillón la espera',
  'description_es', 'Reserve su cita en menos de un minuto; se la confirmamos por WhatsApp.',
  'primary_cta_label_es', 'Reservar cita',
  'secondary_cta_label_es', 'Hable con nosotros'
) || value where key = 'cta_section';

update public.site_content set value = jsonb_build_object(
  'tagline_es', 'Un salón de belleza moderno en Sokoine Road, Arusha, Tanzania: cabello, pestañas, uñas, spa y la Kim Collection.',
  'copyright_es', 'Kim Beauty. Todos los derechos reservados.'
) || value where key = 'footer';

update public.site_content set value = jsonb_build_object(
  'title_es', 'Formas de pago',
  'description_es', 'Pague su pedido o deje un anticipo en línea de forma segura: aceptamos tarjeta, dinero móvil y transferencia bancaria. ¿Prefiere pagar en el salón? Solo envíe su pedido por WhatsApp.'
) || value where key = 'payments';

update public.site_content set value = jsonb_build_object(
  'eyebrow_es', 'Nuestros servicios',
  'title_es', 'Toda la belleza bajo un mismo techo',
  'description_es', 'Explore la carta completa de Kim Beauty y reserve el servicio ideal para usted.'
) || value where key = 'services_page';

update public.site_content set value = jsonb_build_object(
  'eyebrow_es', 'Lo que hacemos',
  'title_es', 'Servicios pensados para usted',
  'description_es', 'Cabello, pestañas, uñas, spa y los productos para mantenerlo todo perfecto en casa.'
) || value where key = 'services_section';

update public.site_content set value = jsonb_build_object(
  'title_es', 'Esenciales de belleza de calidad salón',
  'description_es', 'Añada lo que le guste al carrito y envíe su pedido directamente a nuestro WhatsApp.'
) || value where key = 'shop_page';

update public.site_content set value = jsonb_build_object(
  'title_es', 'Llévese el salón a casa',
  'description_es', 'Productos seleccionados para cabello, pestañas y piel, con entrega en todo Arusha.',
  'cta_label_es', 'Ver la tienda'
) || value where key = 'shop_section';

update public.site_content set value = jsonb_build_object(
  'eyebrow_es', 'Nos adoran',
  'title_es', 'Valorado por clientas reales',
  'description_es', 'Valoración de 4,9 en Google por cientos de clientas de Arusha.'
) || value where key = 'testimonials_section';
