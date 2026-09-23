import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { getServices, getSiteContent, pick } from "@/lib/content";
import {
  absoluteUrl,
  breadcrumbSchema,
  JsonLd,
  localBusinessSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Services & Prices",
  description:
    "Braiding, extensions, lashes, makeup, spa packages, manicure & pedicure, hair treatments and Kim Academy — every style, duration and price at Kim Beauty, Pangani Street, Arusha.",
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: "Kim Beauty Services & Prices — Arusha",
    description:
      "Pick your service, then the exact style inside it. Every option shows its photo, duration and price.",
    url: absoluteUrl("/services"),
    images: [{ url: absoluteUrl("/images/hero.jpg"), width: 2000, height: 1359 }],
  },
};

export default async function ServicesPage() {
  const [content, services] = await Promise.all([getSiteContent(), getServices()]);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(content, services),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Kim Beauty services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: absoluteUrl(`/services/${s.slug}`),
            })),
          },
        ]}
      />

      <PageHero
        breadcrumb="Services"
        eyebrow={pick(content, "services_page", "eyebrow", "Our Services")}
        title={pick(content, "services_page", "title", "Everything Beauty, Under One Roof")}
        description={pick(
          content,
          "services_page",
          "description",
          "Choose a service below, then pick the exact style, size or package you want — every option shows its own photo, time and price."
        )}
      />

      {/* quick jump chips */}
      {services.length > 0 ? (
        <div className="container-kb">
          <Reveal className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="shrink-0 rounded-full border border-line bg-cream px-4 py-2 text-[13px] font-medium text-ink-soft transition hover:border-gold-300 hover:text-gold-700"
              >
                {s.title}
              </Link>
            ))}
          </Reveal>
        </div>
      ) : null}

      <section className="py-12 md:py-16">
        <div className="container-kb">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const options = service.service_options ?? [];
              const preview = options.slice(0, 4);

              return (
                <Reveal key={service.id} as="article" delay={(i % 3) * 70}>
                  <Link
                    id={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-line bg-cream transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-200 hover:shadow-lift"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden bg-blush-100">
                      {service.image_url ? (
                        <Image
                          src={service.image_url}
                          alt={`${service.title} at Kim Beauty, Arusha`}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : null}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent"
                      />
                      <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream/95 text-gold-600 shadow-soft backdrop-blur-sm">
                        <ServiceIcon name={service.icon} className="h-[18px] w-[18px]" />
                      </span>
                      {service.price_label ? (
                        <span className="absolute bottom-4 left-4 rounded-full bg-cream/95 px-3.5 py-1.5 text-[11px] font-semibold text-gold-700 backdrop-blur-sm">
                          {service.price_label}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-xl leading-snug">{service.title}</h2>
                        <ArrowUpRight
                          className="mt-1 h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600"
                          aria-hidden="true"
                        />
                      </div>

                      {service.tagline ? (
                        <p className="mt-1 text-[13px] font-medium text-gold-600">
                          {service.tagline}
                        </p>
                      ) : null}

                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">
                        {service.description}
                      </p>

                      {preview.length > 0 ? (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {preview.map((o) => (
                            <li
                              key={o.id}
                              className="rounded-full bg-blush-100 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                            >
                              {o.name}
                            </li>
                          ))}
                          {options.length > preview.length ? (
                            <li className="rounded-full bg-gold-100 px-2.5 py-1 text-[11px] font-semibold text-gold-700">
                              +{options.length - preview.length} more
                            </li>
                          ) : null}
                        </ul>
                      ) : null}

                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3.5">
                        <span className="text-[12px] font-semibold uppercase tracking-wider text-gold-700">
                          {options.length > 0
                            ? `View ${options.length} ${options.length === 1 ? "option" : "options"}`
                            : "View service"}
                        </span>
                        {service.duration ? (
                          <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {service.duration}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {services.length === 0 ? (
            <p className="py-16 text-center text-muted">
              Services are being updated. Please check back shortly.
            </p>
          ) : null}
        </div>
      </section>

      <CtaSection content={content} />
    </>
  );
}
