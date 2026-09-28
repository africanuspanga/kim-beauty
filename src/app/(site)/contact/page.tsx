import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteContent, pick } from "@/lib/content";
import { getT } from "@/lib/i18n/server";
import { absoluteUrl } from "@/lib/seo";
import { getPaymentLinks, getSocialLinks } from "@/lib/social";
import { waLink, WHATSAPP_GREETING } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, WhatsApp, email or visit Kim Beauty on Pangani Street, Arusha, Tanzania. Open Monday to Sunday.",
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: "Contact Kim Beauty — Pangani Street, Arusha",
    description:
      "Call, WhatsApp, email or visit us on Pangani Street, Arusha, Tanzania.",
    url: absoluteUrl("/contact"),
  },
};

export default async function ContactPage() {
  const [content, t] = await Promise.all([getSiteContent(), getT()]);

  const phone = pick(content, "contact", "phone");
  const email = pick(content, "contact", "email");
  const address = pick(content, "contact", "address");
  const whatsapp = pick(content, "contact", "whatsapp");
  const mapQueryValue = pick(content, "contact", "map_query", address);
  const mapQuery = /^https?:\/\//i.test(mapQueryValue) ? address : mapQueryValue;
  const mapUrl = pick(
    content,
    "contact",
    "map_url",
    `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`
  );

  const socials = getSocialLinks(content);
  const payments = getPaymentLinks(content);

  const cards = [
    {
      Icon: Phone,
      title: t.contact.callUs,
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      Icon: MessageCircle,
      title: t.contact.whatsapp,
      value: t.contact.chatNow,
      href: waLink(WHATSAPP_GREETING, whatsapp),
      external: true,
    },
    {
      Icon: Mail,
      title: t.contact.emailUs,
      value: email,
      href: `mailto:${email}`,
    },
    {
      Icon: MapPin,
      title: t.contact.visitSalon,
      value: address,
      href: mapUrl,
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb={t.contact.breadcrumb}
        eyebrow={pick(content, "contact_page", "eyebrow", "Get In Touch")}
        title={pick(content, "contact_page", "title", "We Would Love To Hear From You")}
        description={pick(content, "contact_page", "description")}
      />

      {/* contact cards */}
      <section className="pb-10">
        <div className="container-kb">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 transition-colors group-hover:bg-gold-gradient group-hover:text-white">
                    <c.Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-lg">{c.title}</h2>
                  <p className="mt-1.5 break-words text-[14px] leading-relaxed text-muted">
                    {c.value}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* form + hours + map */}
      <section className="py-12 md:py-16">
        <div className="container-kb">
          <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <Reveal>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.4rem)]">{t.contact.sendUsMessage}</h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
                {t.contact.sendUsMessageBody}
              </p>
              <div className="mt-7">
                <ContactForm whatsapp={whatsapp} />
              </div>
            </Reveal>

            <Reveal delay={120} className="space-y-5">
              <div className="rounded-3xl border border-line bg-blush-50/70 p-7">
                <h2 className="flex items-center gap-2.5 text-xl">
                  <Clock className="h-5 w-5 text-gold-600" aria-hidden="true" />
                  {t.common.openingHours}
                </h2>
                <ul className="mt-5 space-y-3 text-[14px] text-ink-soft">
                  <li className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <span>{pick(content, "contact", "hours_weekday")}</span>
                  </li>
                  <li className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <span>{pick(content, "contact", "hours_saturday")}</span>
                  </li>
                  <li>{pick(content, "contact", "hours_sunday")}</li>
                </ul>
              </div>

              {socials.length > 0 ? (
                <div className="rounded-3xl border border-line bg-cream p-7">
                  <h2 className="text-xl">{t.contact.follow}</h2>
                  <p className="mt-2 text-[14px] text-muted">
                    {t.contact.followBody}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {socials.map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-transparent hover:bg-gold-gradient hover:text-white"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {payments.length > 0 ? (
                <div className="rounded-3xl border border-line bg-cream p-7">
                  <h2 className="flex items-center gap-2.5 text-xl">
                    <ShieldCheck className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    {pick(content, "payments", "title", "Ways To Pay")}
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {pick(content, "payments", "description")}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {payments.map((p) => (
                      <li key={p.label}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-3 transition hover:border-gold-300 hover:shadow-soft"
                        >
                          <span>
                            <span className="block text-[14px] font-semibold text-ink">
                              {p.label}
                            </span>
                            <span className="block text-[12px] text-muted">
                              {t.payments[p.label] ?? p.description}
                            </span>
                          </span>
                          <span className="shrink-0 text-[13px] font-semibold text-gold-600">
                            {t.contact.payNow}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* map */}
              <div className="overflow-hidden rounded-3xl border border-line">
                <iframe
                  title={t.contact.mapTitle}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    mapQuery
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0"
                />
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-t border-line bg-cream px-4 py-3 text-sm font-semibold text-gold-700 transition hover:bg-gold-50"
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {t.contact.openInMaps}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
