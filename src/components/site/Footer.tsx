import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";
import { getPaymentLinks, getSocialLinks } from "@/lib/social";
import { waLink, WHATSAPP_GREETING } from "@/lib/whatsapp";

const SERVICE_LINKS = [
  { href: "/services#extensions", label: "Extensions" },
  { href: "/services#braiding-hair", label: "Braiding Hair" },
  { href: "/services#lashes", label: "Lashes" },
  { href: "/services#make-up", label: "Make Up" },
  { href: "/services#spa-packages", label: "Spa Packages" },
  { href: "/services#manicure-pedicure", label: "Manicure & Pedicure" },
];

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "All Services" },
  { href: "/shop", label: "Shop" },
  { href: "/booking", label: "Book Appointment" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ content }: { content: ContentMap }) {
  const phone = pick(content, "contact", "phone");
  const email = pick(content, "contact", "email");
  const address = pick(content, "contact", "address");
  const whatsapp = pick(content, "contact", "whatsapp");
  const logoUrl = pick(content, "branding", "logo_url", "/images/logo.png");
  const year = new Date().getFullYear();

  const socials = getSocialLinks(content);
  const payments = getPaymentLinks(content);

  return (
    <footer className="relative overflow-hidden bg-ink text-cream/80">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-600/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-blush-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-kb relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <div className="inline-flex rounded-2xl bg-cream/95 px-4 py-3">
              <Image
                src={logoUrl}
                alt="Kim Beauty"
                width={718}
                height={490}
                className="h-12 w-auto"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
              {pick(content, "footer", "tagline")}
            </p>

            {socials.length > 0 ? (
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition hover:border-gold-400 hover:bg-gold-500 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold text-cream">Explore</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/60 transition hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-semibold text-cream">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/60 transition hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-semibold text-cream">Visit Us</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span className="text-cream/60">{address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-cream/60 transition hover:text-gold-300"
                >
                  {phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a
                  href={`mailto:${email}`}
                  className="break-all text-cream/60 transition hover:text-gold-300"
                >
                  {email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <div className="space-y-1 text-cream/60">
                  <p>{pick(content, "contact", "hours_weekday")}</p>
                  <p>{pick(content, "contact", "hours_saturday")}</p>
                  <p>{pick(content, "contact", "hours_sunday")}</p>
                </div>
              </li>
            </ul>

            <a
              href={waLink(WHATSAPP_GREETING, whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-5 py-2.5 text-sm font-medium text-gold-300 transition hover:bg-gold-500 hover:text-white"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {payments.length > 0 ? (
          <div className="mt-14 flex flex-col gap-4 rounded-3xl border border-cream/10 bg-cream/[0.03] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2.5 text-sm text-cream/60">
              <ShieldCheck className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              Secure online payments
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {payments.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-cream/15 px-4 py-2 text-xs font-medium text-cream/70 transition hover:border-gold-400 hover:bg-gold-500 hover:text-white"
                >
                  Pay with {p.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-xs text-cream/45 sm:flex-row">
          <p>
            © {year} {pick(content, "footer", "copyright")}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/booking" className="transition hover:text-gold-300">
              Book
            </Link>
            <Link href="/shop" className="transition hover:text-gold-300">
              Shop
            </Link>
            <Link href="/admin" className="transition hover:text-gold-300">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
