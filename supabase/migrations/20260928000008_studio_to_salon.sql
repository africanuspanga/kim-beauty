-- Keep all existing editable English customer copy aligned with the salon name.
update public.site_content
set value = regexp_replace(value::text, '\\mstudio\\M', 'salon', 'gi')::jsonb
where value::text ~* '\\mstudio\\M';
