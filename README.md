# Kim Beauty

Website and admin system for **Kim Beauty** — a beauty studio on Pangani Street, Arusha, Tanzania.

- **Hair, lashes, nails, spa** — full service menu with online booking
- **Shop** — cart that sends the whole order to WhatsApp
- **Admin panel** — edit every word, image, service, product and price without touching code

---

## Contact

| | |
|---|---|
| Phone / WhatsApp | +255 766 400 961 |
| Email | kimbeautysaloons@gmail.com |
| Address | Pangani Street, Arusha, Tanzania |
| Social | Kim Beauty Salons (Instagram · Facebook · TikTok) |

---

## Tech

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database / Auth / Storage | Supabase (Postgres + RLS) |
| Icons | lucide-react |

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Environment variables live in `.env.local` (see `.env.example` for the shape).

---

## Deploying to Vercel

Import the repo, then set these **three** environment variables (Production, Preview and Development):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the Supabase **anon / public** key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `255766400961` — digits only, no `+` or spaces |

That is everything the app reads at runtime. Optionally add:

| Variable | Why |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.kimbeauty.store` — canonical URLs, `sitemap.xml`, `robots.txt` and every structured-data block are built from this. Set it in production. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | the token from Google Search Console → *verify by HTML tag* |
| `NEXT_PUBLIC_ADMIN_EMAIL` | prefills the email box on `/admin/login` |

**Never set in Vercel:** `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_PASSWORD`, `SUPABASE_DB_URL` or
`NEXT_PUBLIC_DEV_ADMIN_PASSWORD`. Nothing in the app uses them at runtime — they are local tooling
only, and anything prefixed `NEXT_PUBLIC_` is readable by anyone who visits the site.

No build settings need changing: Vercel detects Next.js and runs `next build` on its own.


```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # eslint
```

---

## Admin panel

Sign in at **`/admin`**.

| | |
|---|---|
| Email | `kimbeautysaloons@gmail.com` |
| Password | set when the account was created — change it in Supabase → Authentication → Users |

What you can manage:

| Page | What it controls |
|---|---|
| **Dashboard** | Booking / order / message counts and latest activity |
| **Site Content** | Every headline, paragraph, button label, image and contact detail on the public site |
| **Services** | The service *categories* — Braiding Hair, Lashes, Make Up, Kim Academy… |
| **Service Menu** | The *styles inside* each category — Miracle Knotless, Soft Glam, Classic Lashes — each with its own photo/video, time and price |
| **Products** | Everything in the shop and cart |
| **Categories** | The shop's filter chips |
| **Testimonials** | The scrolling Google-style review cards |
| **Gallery** | The work gallery on the About page |
| **Bookings** | Appointment requests, with status tracking |
| **Orders** | Carts sent to WhatsApp, with status tracking |
| **Messages** | Contact-form enquiries |

Images uploaded in the admin go to the Supabase `media` bucket and are served from there.

### Adding another admin

1. Create the user in Supabase → Authentication → Users.
2. Add them to the allow-list:

```sql
insert into public.admin_users (user_id, email, full_name, role)
select id, email, 'Their Name', 'admin'
from auth.users
where email = 'their@email.com';
```

Membership in `admin_users` is what grants write access — Row Level Security enforces it at the database, so it cannot be bypassed from the browser.

---

## How WhatsApp works

Three flows hand off to WhatsApp, each saving a record first:

| Flow | Saved to | Message |
|---|---|---|
| Booking form | `bookings` | Reference, name, phone, service, date, time, stylist, notes |
| Shop cart | `orders` | Reference, name, phone, itemised list, total |
| Contact form | `contact_messages` | Name, phone, email, subject, message |

Every message opens with **"I am coming from Kim Beauty website"**. Nothing is sent automatically — WhatsApp opens pre-filled and the customer presses send.

The WhatsApp number is editable in **Admin → Site Content → Contact Details**, and falls back to `NEXT_PUBLIC_WHATSAPP_NUMBER`.

---

## How the service menu works

A service on its own does not tell a client enough. *"Braiding Hair — TZS 40,000"* leaves
her guessing, and leaves us answering the same questions on WhatsApp every day.

So a service is a **category**, and what she actually books is a **style inside it**:

```
Braiding Hair            ← services            (Admin → Services)
├── Extra-Small Knotless ← service_options     (Admin → Service Menu)
├── Small Size Knotless
├── Miracle Knotless
└── French Curl Braids
```

Every style carries its own photo (or video), description, duration and price, and appears on
its own service page at `/services/<service-slug>`. From there a client can:

- **Book This Style** — lands on `/booking` with the service *and* the style already chosen,
  and both are recorded on the booking and written into the WhatsApp message
- **Add to Cart** — pays for that exact style online, alongside shop products

A style with no price set shows **"Price on request"** and hides its cart button, so an
unpriced style still books cleanly. Fill the price in at **Admin → Service Menu** and the
button appears by itself.

Use **Group Heading** when a category needs internal structure — Lashes, for example, splits
into *Strip Lashes* and *Lash Extensions*. Styles sharing a heading are shown together under it.

---

## SEO

| | |
|---|---|
| `sitemap.xml` | generated per request from the live services list |
| `robots.txt` | allows everything except `/admin` |
| Canonical URLs | every page, built from `NEXT_PUBLIC_SITE_URL` |
| Structured data | `BeautySalon` (address, hours, phone, socials, service catalog), `WebSite`, `BreadcrumbList`, `Service` + `OfferCatalog` per service page, `Product` per shop item |
| Per-service pages | `/services/braiding-hair`, `/services/lashes`, … so each service ranks on its own terms |

Each service page's structured data lists every style with its real price, which is what lets
"knotless braids Arusha price" match a page that actually answers the question.

After deploying, submit `https://www.kimbeauty.store/sitemap.xml` in
[Google Search Console](https://search.google.com/search-console) and validate a service page
with the [Rich Results Test](https://search.google.com/test/rich-results).

---

## Database

Migrations are in `supabase/migrations/`, sample content in `supabase/seed.sql`,
`supabase/seed_bundles.sql` and `supabase/seed_service_options.sql`.

```
admin_users         who may edit the site
site_content        all editable copy, as key/value JSON
services            service categories
service_options     the styles inside each category, with their own price
product_categories  shop categories
products            shop items
testimonials        review cards
gallery_images      About-page gallery
bookings            appointment requests
orders              carts sent to WhatsApp
contact_messages    contact-form enquiries
```

Apply them with the Supabase CLI:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

Seed files are not run by `db push` — paste them into the Supabase SQL editor, or:

```bash
psql "$SUPABASE_DB_URL" -f supabase/seed_service_options.sql
```

### Security model

Row Level Security is on for every table:

- **Anyone** can read active services, products, testimonials, gallery and site content.
- **Anyone** can submit a booking, order or contact message — but cannot read any of them back.
- **Only `admin_users`** can create, edit or delete anything.

Bookings and orders are created through the `create_booking` / `create_order` Postgres functions, which return only the generated reference. `create_order` re-prices the cart from the `products` and `service_options` tables, so a tampered client price cannot change what gets recorded.

---

## Brand

Colours are sampled from the logo and defined as Tailwind theme tokens in `src/app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `gold-500` | `#B8864B` | Primary — buttons, accents |
| `gold-700` | `#7C542B` | Deep bronze text |
| `gold-300` | `#E0B784` | Light metallic highlight |
| `blush-200` | `#F4DBD3` | Soft pink shapes |
| `cream` | `#FDFBF8` | Page background |
| `ink` | `#2A211C` | Body text, dark sections |

Type: **Cormorant Garamond** for display headings, **Inter** for body and UI.
