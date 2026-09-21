-- =============================================================
-- Hair bundles — real product photography supplied by Kim Beauty
-- =============================================================

insert into public.product_categories (name, slug, description, sort_order) values
('Hair Bundles', 'hair-bundles', 'Bulk braiding and extension hair in every texture and shade.', 2)
on conflict (slug) do update
  set description = excluded.description,
      sort_order  = excluded.sort_order;

insert into public.products
  (name, slug, description, price, compare_at_price, category_id, image_url, is_featured, in_stock, sort_order)
select p.name, p.slug, p.description, p.price, p.compare_at_price,
       (select id from public.product_categories where slug = 'hair-bundles'),
       p.image_url, p.is_featured, true, p.sort_order
from (values
  ('Kinky Curly Bulk Hair — Honey Brown', 'bulk-kinky-curly-honey-brown',
   'Soft kinky-curly bulk hair in a warm honey brown. Ideal for boho braids, crochet styles and curly locs — tangle-free and reusable.',
   95000::numeric, 120000::numeric, '/images/bundle-kinky-curly-honey.avif', true, 1),

  ('Body Wave Bulk Hair — Copper Auburn', 'bulk-body-wave-copper-auburn',
   'Silky body-wave bulk hair in a rich copper auburn. Holds a loose S-wave beautifully and blends seamlessly for a full, glossy finish.',
   110000::numeric, 135000::numeric, '/images/bundle-body-wave-copper.avif', true, 2),

  ('Deep Wave Bulk Hair — Chocolate Highlights', 'bulk-deep-wave-chocolate',
   'Deep-wave bulk hair in dark chocolate with caramel highlights. Dense, bouncy curls with plenty of body for braids and twists.',
   115000::numeric, null::numeric, '/images/bundle-deep-wave-chocolate.avif', true, 3),

  ('Body Wave Bulk Hair — Natural Black', 'bulk-body-wave-natural-black',
   'Our best-selling natural black body-wave bulk hair. A true 1B shade that matches most natural textures straight out of the pack.',
   105000::numeric, 130000::numeric, '/images/bundle-body-wave-black.avif', true, 4),

  ('Water Wave Bulk Hair — Auburn Ombré', 'bulk-water-wave-auburn-ombre',
   'Water-wave bulk hair with a dark root melting into warm auburn. Defined, springy curls that hold their pattern wash after wash.',
   120000::numeric, 145000::numeric, '/images/bundle-water-wave-ombre.avif', true, 5)
) as p(name, slug, description, price, compare_at_price, image_url, is_featured, sort_order)
on conflict (slug) do update
  set description      = excluded.description,
      price            = excluded.price,
      compare_at_price = excluded.compare_at_price,
      image_url        = excluded.image_url,
      is_featured      = excluded.is_featured,
      sort_order       = excluded.sort_order;

-- push the older placeholder items below the real product shots
update public.products
   set sort_order = sort_order + 20
 where category_id is distinct from (select id from public.product_categories where slug = 'hair-bundles')
   and sort_order < 20;

-- keep the homepage showcase to the photographed bundles plus a few favourites
update public.products set is_featured = false
 where slug in ('kim-braid-spray','hydrating-shampoo','deep-repair-hair-mask',
                'body-wave-wig-20','straight-bob-wig-12');
