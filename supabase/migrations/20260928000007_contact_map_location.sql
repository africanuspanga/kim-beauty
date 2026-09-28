-- The Google Business profile resolves to this precise customer location.
update public.site_content
set value = value || jsonb_build_object(
  'address', 'Sokoine Rd, Arusha 23102, Tanzania',
  'map_query', 'Sokoine Rd, Arusha 23102, Tanzania',
  'map_url', 'https://maps.app.goo.gl/Uo27eHDR2KzSVjxd7?g_st=ipc'
)
where key = 'contact';

update public.site_content
set value = value || jsonb_build_object('eyebrow', 'Sokoine Road · Arusha')
where key = 'hero';

update public.site_content
set value = value || jsonb_build_object(
  'tagline',
  'A modern beauty salon on Sokoine Road, Arusha, offering hair, lashes, nails, spa and the Kim Collection.'
)
where key = 'footer';
