import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";

export function CtaSection({ content }: { content: ContentMap }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-kb">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink">
            {/* background image, dimmed */}
            <div className="absolute inset-0" aria-hidden="true">
              <Image
                src={pick(content, "cta_section", "image_url", "/images/gallery-3.webp")}
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl"
            />

            <div className="relative px-7 py-16 sm:px-12 md:px-16 md:py-24">
              <div className="max-w-xl">
                <Eyebrow className="text-gold-300">
                  {pick(content, "cta_section", "eyebrow", "Ready When You Are")}
                </Eyebrow>

                <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-cream">
                  {pick(content, "cta_section", "title", "Your Chair Is Waiting")}
                </h2>

                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-cream/70 sm:text-base">
                  {pick(content, "cta_section", "description")}
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink
                    href={pick(content, "cta_section", "primary_cta_href", "/booking")}
                    size="lg"
                    className="group"
                  >
                    {pick(content, "cta_section", "primary_cta_label", "Book Appointment")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </ButtonLink>

                  <ButtonLink
                    href={pick(content, "cta_section", "secondary_cta_href", "/contact")}
                    size="lg"
                    className="border border-cream/25 bg-transparent text-cream backdrop-blur-sm hover:bg-cream/10 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {pick(content, "cta_section", "secondary_cta_label", "Talk To Us")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
