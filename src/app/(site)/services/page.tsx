import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Check, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { getServices, getSiteContent, pick } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Extensions, braiding, lashes, makeup, spa packages, manicure & pedicure, hair treatment, Kim Academy and more — the full Kim Beauty menu.",
};

export default async function ServicesPage() {
  const [content, services] = await Promise.all([getSiteContent(), getServices()]);

  return (
    <>
      <PageHero
        breadcrumb="Services"
        eyebrow={pick(content, "services_page", "eyebrow", "Our Services")}
        title={pick(content, "services_page", "title", "Everything Beauty, Under One Roof")}
        description={pick(content, "services_page", "description")}
      />

      {/* quick jump chips */}
      {services.length > 0 ? (
        <div className="container-kb">
          <Reveal className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.slug}`}
                className="shrink-0 rounded-full border border-line bg-cream px-4 py-2 text-[13px] font-medium text-ink-soft transition hover:border-gold-300 hover:text-gold-700"
              >
                {s.title}
              </a>
            ))}
          </Reveal>
        </div>
      ) : null}

      <section className="py-14 md:py-20">
        <div className="container-kb space-y-16 md:space-y-24">
          {services.map((service, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal
                key={service.id}
                as="article"
                className="scroll-mt-28"
              >
                <div id={service.slug} className="scroll-mt-28" />
                <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
                  {/* image */}
                  <div className={flip ? "lg:order-last" : ""}>
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem] bg-blush-100 shadow-lift">
                      {service.image_url ? (
                        <Image
                          src={service.image_url}
                          alt={service.title}
                          fill
                          sizes="(max-width: 1024px) 92vw, 48vw"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </div>

                  {/* copy */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                        <ServiceIcon name={service.icon} className="h-5 w-5" />
                      </span>
                      {service.price_label ? (
                        <span className="rounded-full bg-blush-100 px-3.5 py-1.5 text-[12px] font-semibold text-gold-700">
                          {service.price_label}
                        </span>
                      ) : null}
                      {service.duration ? (
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {service.duration}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.6rem)] leading-tight">
                      {service.title}
                    </h2>

                    {service.tagline ? (
                      <p className="mt-2 text-base font-medium text-gold-600">
                        {service.tagline}
                      </p>
                    ) : null}

                    <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                      {service.description}
                    </p>

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
                      <ButtonLink
                        href={`/booking?service=${encodeURIComponent(service.title)}`}
                        size="md"
                        className="group"
                      >
                        Book This Service
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </ButtonLink>
                      <ButtonLink href="/contact" variant="outline" size="md">
                        Ask A Question
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}

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
