import Image from "next/image";
import { ArrowRight, MapPin, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { GoogleG } from "@/components/ui/GoogleG";
import { Stars } from "@/components/ui/Stars";
import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";

/** Renders the title with its final word swept in the logo's metallic gradient. */
function HeroTitle({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  const last = words.pop() ?? "";
  const lead = words.join(" ");

  return (
    <h1 className="text-[clamp(2.75rem,7.4vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
      {lead ? <span className="block">{lead}</span> : null}
      <span className="block italic text-gold-gradient">{last}</span>
    </h1>
  );
}

export function Hero({ content }: { content: ContentMap }) {
  const eyebrow = pick(content, "hero", "eyebrow");
  const title = pick(content, "hero", "title", "Beauty, Perfectly Crafted");
  const description = pick(content, "hero", "description");
  const image = pick(content, "hero", "image_url", "/images/hero.jpg");

  const stats = [
    { value: pick(content, "hero", "stat_1_value"), label: pick(content, "hero", "stat_1_label") },
    { value: pick(content, "hero", "stat_2_value"), label: pick(content, "hero", "stat_2_label") },
    { value: pick(content, "hero", "stat_3_value"), label: pick(content, "hero", "stat_3_label") },
  ].filter((s) => s.value);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-36">
      {/* ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 h-[42rem] w-[42rem] rounded-full bg-blush-200/45 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-40 h-[34rem] w-[34rem] rounded-full bg-gold-100/55 blur-[110px]"
      />

      <div className="container-kb relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:gap-20">
          {/* ---------- copy ---------- */}
          <div className="max-w-xl">
            {eyebrow ? (
              <span
                className="hero-in inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700 backdrop-blur-sm"
                style={{ animationDelay: "0.05s" }}
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {eyebrow}
              </span>
            ) : null}

            <div className="hero-in mt-6" style={{ animationDelay: "0.15s" }}>
              <HeroTitle title={title} />
            </div>

            <p
              className="hero-in mt-6 max-w-lg text-[17px] leading-relaxed text-ink-soft sm:text-lg"
              style={{ animationDelay: "0.28s" }}
            >
              {description}
            </p>

            <div
              className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.4s" }}
            >
              <ButtonLink
                href={pick(content, "hero", "primary_cta_href", "/booking")}
                size="lg"
                className="group"
              >
                {pick(content, "hero", "primary_cta_label", "Book Appointment")}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </ButtonLink>

              <ButtonLink
                href={pick(content, "hero", "secondary_cta_href", "/shop")}
                variant="outline"
                size="lg"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {pick(content, "hero", "secondary_cta_label", "Shop Now")}
              </ButtonLink>
            </div>

            {stats.length > 0 ? (
              <dl
                className="hero-in mt-12 grid max-w-md grid-cols-3 gap-5 border-t border-line pt-7"
                style={{ animationDelay: "0.52s" }}
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-semibold text-gold-gradient sm:text-4xl">
                        {s.value}
                      </span>
                      <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {/* ---------- imagery ---------- */}
          <div className="hero-scale relative" style={{ animationDelay: "0.3s" }}>
            <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
              {/* blush shape behind */}
              <div
                aria-hidden="true"
                className="absolute -right-5 -top-6 h-full w-full rounded-[14rem_14rem_2.5rem_2.5rem] bg-blush-200/55"
              />
              <div
                aria-hidden="true"
                className="absolute -left-4 bottom-8 h-32 w-32 rounded-full border border-gold-300/50"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[14rem_14rem_2.5rem_2.5rem] shadow-[0_28px_70px_-24px_rgba(66,44,23,0.38)]">
                <Image
                  src={image}
                  alt="A Kim Beauty stylist finishing a client's braids"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 46vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
                />
              </div>

              {/* floating google rating card */}
              <div className="float-soft absolute -left-3 bottom-10 rounded-2xl border border-line/80 bg-cream/95 p-3.5 shadow-lift backdrop-blur-sm sm:-left-7 sm:p-4">
                <div className="flex items-center gap-3">
                  <GoogleG className="h-7 w-7 shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-xl font-semibold leading-none text-ink">
                        {pick(content, "hero", "stat_3_value", "4.9")}
                      </span>
                      <Stars rating={5} size="h-3 w-3" />
                    </div>
                    <p className="mt-1 text-[11px] font-medium text-muted">
                      Google Reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* floating open-today pill */}
              <div className="absolute -right-1 top-8 rounded-full border border-line/80 bg-cream/95 px-4 py-2.5 shadow-soft backdrop-blur-sm sm:right-2">
                <span className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Open Today
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
