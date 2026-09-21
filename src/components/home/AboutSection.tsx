import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";

export function AboutSection({ content }: { content: ContentMap }) {
  const points = [
    pick(content, "about", "point_1"),
    pick(content, "about", "point_2"),
    pick(content, "about", "point_3"),
    pick(content, "about", "point_4"),
  ].filter(Boolean);

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container-kb">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* imagery */}
          <Reveal className="relative order-last lg:order-first">
            <div className="relative mx-auto max-w-[30rem] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-gold-100"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift">
                <Image
                  src={pick(content, "about", "image_url", "/images/gallery-5.webp")}
                  alt="A happy Kim Beauty client"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>

              {/* experience badge */}
              <div className="absolute -bottom-6 -right-2 rounded-3xl border border-line bg-cream px-6 py-5 text-center shadow-lift sm:right-4">
                <span className="block font-display text-4xl font-semibold text-gold-gradient">
                  {pick(content, "hero", "stat_1_value", "8+")}
                </span>
                <span className="mt-1 block max-w-20 text-[11px] font-medium uppercase leading-tight tracking-[0.12em] text-muted">
                  {pick(content, "hero", "stat_1_label", "Years of Craft")}
                </span>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal delay={120}>
            <Eyebrow>{pick(content, "about", "eyebrow", "Our Story")}</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.08]">
              {pick(content, "about", "title")}
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {pick(content, "about", "body")}
            </p>
            {pick(content, "about", "body_2") ? (
              <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
                {pick(content, "about", "body_2")}
              </p>
            ) : null}

            {points.length > 0 ? (
              <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100">
                      <Check className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-ink-soft">{p}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <ButtonLink
              href={pick(content, "about", "cta_href", "/about")}
              variant="outline"
              size="md"
              className="group mt-9"
            >
              {pick(content, "about", "cta_label", "More About Us")}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
