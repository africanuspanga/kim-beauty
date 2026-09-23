import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { ServiceOptions, bookingHref } from "@/components/services/ServiceOptions";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { getServiceBySlug, getServices, getSiteContent } from "@/lib/content";
import {
  absoluteUrl,
  breadcrumbSchema,
  JsonLd,
  serviceSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) return { title: "Service Not Found" };

  const options = service.service_options ?? [];
  const styleNames = options.slice(0, 6).map((o) => o.name).join(", ");

  const description = [
    service.description ?? service.tagline ?? "",
    styleNames ? `Options: ${styleNames}.` : "",
    "Book at Kim Beauty, Pangani Street, Arusha.",
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 300);

  return {
    title: `${service.title} in Arusha — Styles & Prices`,
    description,
    alternates: { canonical: absoluteUrl(`/services/${service.slug}`) },
    openGraph: {
      title: `${service.title} — Kim Beauty Arusha`,
      description,
      url: absoluteUrl(`/services/${service.slug}`),
      type: "website",
      images: service.image_url
        ? [{ url: absoluteUrl(service.image_url) }]
        : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const [content, service, allServices] = await Promise.all([
    getSiteContent(),
    getServiceBySlug(slug),
    getServices(),
  ]);

  if (!service) notFound();

  const options = service.service_options ?? [];
  const others = allServices.filter((s) => s.id !== service.id).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service, content),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        breadcrumb={service.title}
        parent={{ label: "Services", href: "/services" }}
        eyebrow={service.tagline ?? "Kim Beauty"}
        title={service.title}
        description={service.description ?? undefined}
        image={service.image_url ?? undefined}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
            <ServiceIcon name={service.icon} className="h-5 w-5" />
          </span>
          {service.price_label ? (
            <span className="rounded-full bg-blush-100 px-3.5 py-1.5 text-[12px] font-semibold text-gold-700">
              {service.price_label}
            </span>
          ) : null}
          {service.duration ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[12px] font-medium text-muted">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {service.duration}
            </span>
          ) : null}
          {options.length > 0 ? (
            <span className="rounded-full border border-line px-3.5 py-1.5 text-[12px] font-medium text-muted">
              {options.length} {options.length === 1 ? "option" : "options"} to choose from
            </span>
          ) : null}
        </div>

        {service.highlights?.length ? (
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100">
                  <Check className="h-3 w-3 text-gold-700" aria-hidden="true" />
                </span>
                <span className="text-sm text-ink-soft">{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={bookingHref(service.title)} size="md">
            Book {service.title}
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="md">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Ask A Question
          </ButtonLink>
        </div>
      </PageHero>

      {/* ---------- the styles inside this service ---------- */}
      <section className="py-10 md:py-14">
        <div className="container-kb">
          {options.length > 0 ? (
            <>
              <Reveal className="mb-9 max-w-2xl">
                <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
                  Choose Your {service.title === "Kim Academy" ? "Course" : "Style"}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  Every option below has its own photo, time and price. Pick the
                  one you want and book it — or add it to your cart to pay online.
                </p>
              </Reveal>

              <ServiceOptions service={service} />
            </>
          ) : (
            <Reveal className="rounded-3xl border border-line bg-blush-50/70 p-9 text-center">
              <p className="text-[15px] leading-relaxed text-ink-soft">
                We are still photographing and pricing the individual{" "}
                {service.title.toLowerCase()} options. Message us on WhatsApp and
                we will talk you through everything available.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={bookingHref(service.title)} size="md">
                  Book {service.title}
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="md">
                  Talk To Us
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- other services ---------- */}
      {others.length > 0 ? (
        <section className="pb-14 md:pb-20">
          <div className="container-kb">
            <Reveal className="rounded-3xl border border-line bg-blush-50/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl">Other Kim Beauty Services</h2>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-700 hover:text-gold-600"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  All services
                </Link>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {others.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-block rounded-full border border-line bg-cream px-4 py-2 text-[13px] font-medium text-ink-soft transition hover:border-gold-300 hover:text-gold-700"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CtaSection content={content} />
    </>
  );
}
