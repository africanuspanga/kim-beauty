import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CalendarCheck, Check, ChevronRight, Clock, MessageCircle } from "lucide-react";
import { CtaSection } from "@/components/home/CtaSection";
import { AddOptionToCart } from "@/components/services/AddOptionToCart";
import { ServiceOptionMedia } from "@/components/services/ServiceOptionMedia";
import { OptionCard, bookingHref, optionHref } from "@/components/services/ServiceOptions";
import { ButtonLink } from "@/components/ui/Button";
import { ShareButton } from "@/components/ui/ShareButton";
import { getServiceOption, getSiteContent } from "@/lib/content";
import { getT } from "@/lib/i18n/server";
import { absoluteUrl, breadcrumbSchema, JsonLd } from "@/lib/seo";
import { optionPriceLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; option: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, option: optionSlug } = await params;
  const [found, t] = await Promise.all([getServiceOption(slug, optionSlug), getT()]);

  if (!found) return { title: t.detail.notFound };

  const { service, option } = found;
  const path = optionHref(service, option);
  const image = option.image_url || service.image_url;
  const description = [
    option.description ?? "",
    optionPriceLabel(option, ""),
    t.meta.service.bookAt,
  ]
    .filter(Boolean)
    .join(" — ")
    .slice(0, 300);

  return {
    title: `${option.name} — ${service.title}`,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: `${option.name} — ${service.title} | Kim Beauty Arusha`,
      description,
      url: absoluteUrl(path),
      type: "website",
      images: image ? [{ url: absoluteUrl(image) }] : undefined,
    },
  };
}

export default async function ServiceOptionPage({ params }: Props) {
  const { slug, option: optionSlug } = await params;

  const [content, found, t] = await Promise.all([
    getSiteContent(),
    getServiceOption(slug, optionSlug),
    getT(),
  ]);

  if (!found) notFound();

  const { service, option } = found;
  const path = optionHref(service, option);
  const image = option.image_url || service.image_url;
  const price = optionPriceLabel(option, t.common.priceOnRequest);
  const others = (service.service_options ?? []).filter((o) => o.id !== option.id).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${service.title} — ${option.name}`,
            serviceType: service.title,
            description: option.description ?? undefined,
            url: absoluteUrl(path),
            image: image ? absoluteUrl(image) : undefined,
            provider: { "@id": absoluteUrl("/#business") },
            areaServed: { "@type": "City", name: "Arusha" },
            ...(option.price != null
              ? { offers: { "@type": "Offer", price: option.price, priceCurrency: "TZS" } }
              : {}),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
            { name: option.name, path },
          ]),
        ]}
      />

      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container-kb">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
              <li>
                <Link href="/" className="transition hover:text-gold-700">
                  {t.common.home}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </li>
              <li>
                <Link href="/services" className="transition hover:text-gold-700">
                  {t.services.breadcrumb}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </li>
              <li>
                <Link href={`/services/${service.slug}`} className="transition hover:text-gold-700">
                  {service.title}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </li>
              <li className="font-medium text-ink" aria-current="page">
                {option.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="overflow-hidden rounded-3xl border border-line">
              <ServiceOptionMedia
                imageUrl={image}
                videoUrl={option.video_url}
                alt={`${option.name} — ${service.title} at Kim Beauty Arusha`}
                className="aspect-[4/3] md:aspect-square"
                sizes="(max-width: 768px) 92vw, 46vw"
              />
            </div>

            <div className="flex flex-col">
              <Link
                href={`/services/${service.slug}`}
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-600 hover:text-gold-700"
              >
                {option.group_label?.trim() || service.title}
              </Link>

              <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] leading-tight">{option.name}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {price}
                </span>
                {option.is_featured ? (
                  <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                    {t.serviceDetail.popular}
                  </span>
                ) : null}
              </div>

              {option.duration ? (
                <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {option.duration}
                </p>
              ) : null}

              {option.description ? (
                <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">
                  {option.description}
                </p>
              ) : null}

              {option.highlights?.length ? (
                <ul className="mt-5 space-y-2">
                  {option.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100">
                        <Check className="h-3 w-3 text-gold-700" aria-hidden="true" />
                      </span>
                      <span className="text-sm text-ink-soft">{h}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={bookingHref(service.title, option.name)} size="md">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  {t.serviceDetail.bookThisStyle}
                </ButtonLink>
                {option.price != null ? (
                  <AddOptionToCart
                    id={option.id}
                    name={`${service.title} — ${option.name}`}
                    price={option.price}
                    imageUrl={image}
                    label={t.common.addToCart}
                    size="md"
                  />
                ) : null}
                <ShareButton
                  path={path}
                  title={`${service.title} — ${option.name}`}
                  text={`${option.name} (${service.title}) — Kim Beauty Arusha`}
                  variant="button"
                  className="h-12 w-full sm:w-auto"
                />
              </div>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-700 hover:text-gold-600"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t.serviceDetail.askQuestion}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="pb-14 md:pb-20">
          <div className="container-kb">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[clamp(1.4rem,3vw,2rem)]">
                {t.detail.moreStyles(service.title)}
              </h2>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-700 hover:text-gold-600"
              >
                <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                {t.detail.backToService(service.title)}
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o, i) => (
                <OptionCard key={o.id} option={o} service={service} delay={i * 60} t={t} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection content={content} />
    </>
  );
}
