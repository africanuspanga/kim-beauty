import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";
import type { Service } from "@/lib/types";

export function ServicesSection({
  content,
  services,
}: {
  content: ContentMap;
  services: Service[];
}) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="relative overflow-hidden bg-blush-50/60 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold-100/40 blur-[100px]"
      />

      <div className="container-kb relative">
        <Reveal>
          <SectionHeading
            eyebrow={pick(content, "services_section", "eyebrow", "What We Do")}
            title={pick(content, "services_section", "title", "Services Built Around You")}
            description={pick(content, "services_section", "description")}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, i) => (
            <Reveal key={service.id} delay={i * 70} as="article">
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-200 hover:shadow-lift"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  {service.image_url ? (
                    <Image
                      src={service.image_url}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-blush-100" />
                  )}
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
                    <h3 className="text-xl leading-snug">{service.title}</h3>
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

                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  {service.duration ? (
                    <p className="mt-4 border-t border-line pt-3 text-[12px] font-medium uppercase tracking-wider text-muted">
                      {service.duration}
                    </p>
                  ) : null}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href="/services" variant="outline" size="lg" className="group">
            View All Services
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
