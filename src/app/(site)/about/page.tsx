import Image from "next/image";
import type { Metadata } from "next";
import { Award, Heart, Sparkles, Target } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CtaSection } from "@/components/home/CtaSection";
import { Testimonials } from "@/components/home/Testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGallery, getSiteContent, getTestimonials, pick } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Kim Beauty is a modern beauty studio on Pangani Street, Arusha — master braiders, lash artists, makeup pros and spa therapists under one roof.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: "About Kim Beauty — Arusha",
    description:
      "Master braiders, lash artists, makeup pros and spa therapists under one roof on Pangani Street, Arusha.",
    url: absoluteUrl("/about"),
  },
};

const VALUE_ICONS = [Sparkles, Award, Heart, Target];

export default async function AboutPage() {
  const [content, testimonials, gallery] = await Promise.all([
    getSiteContent(),
    getTestimonials(),
    getGallery(),
  ]);

  const values = [1, 2, 3, 4]
    .map((n) => ({
      title: pick(content, "about_page", `value_${n}_title`),
      body: pick(content, "about_page", `value_${n}_body`),
      Icon: VALUE_ICONS[n - 1],
    }))
    .filter((v) => v.title);

  const stats = [
    { value: pick(content, "hero", "stat_1_value"), label: pick(content, "hero", "stat_1_label") },
    { value: pick(content, "hero", "stat_2_value"), label: pick(content, "hero", "stat_2_label") },
    { value: pick(content, "hero", "stat_3_value"), label: pick(content, "hero", "stat_3_label") },
  ].filter((s) => s.value);

  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow={pick(content, "about_page", "eyebrow", "About Kim Beauty")}
        title={pick(content, "about_page", "title", "Beauty With Intention")}
        description={pick(content, "about_page", "description")}
        image={pick(content, "about_page", "hero_image", "/images/gallery-2.webp")}
      />

      {/* ---------- story ---------- */}
      <section className="py-16 md:py-24">
        <div className="container-kb">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="text-[clamp(1.85rem,3.8vw,2.75rem)] leading-tight">
                {pick(content, "about_page", "story_title", "How It Started")}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                {pick(content, "about_page", "story_body")}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
                {pick(content, "about_page", "story_body_2")}
              </p>

              {stats.length > 0 ? (
                <dl className="mt-10 grid grid-cols-3 gap-5 border-t border-line pt-8">
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
            </Reveal>

            {/* mission + vision */}
            <Reveal delay={120} className="space-y-5">
              <div className="rounded-3xl border border-line bg-blush-50/70 p-7 md:p-9">
                <h3 className="text-2xl">
                  {pick(content, "about_page", "mission_title", "Our Mission")}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {pick(content, "about_page", "mission_body")}
                </p>
              </div>
              <div className="rounded-3xl border border-line bg-gold-50/70 p-7 md:p-9">
                <h3 className="text-2xl">
                  {pick(content, "about_page", "vision_title", "Our Vision")}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {pick(content, "about_page", "vision_body")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- values ---------- */}
      {values.length > 0 ? (
        <section className="bg-blush-50/60 py-16 md:py-24">
          <div className="container-kb">
            <Reveal>
              <SectionHeading
                eyebrow="What We Stand For"
                title="The Kim Beauty Standard"
                description="Four things every client can count on, every single visit."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="h-full rounded-3xl border border-line bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-soft">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                      <v.Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl">{v.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {v.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- gallery ---------- */}
      {gallery.length > 0 ? (
        <section className="py-16 md:py-24">
          <div className="container-kb">
            <Reveal>
              <SectionHeading
                eyebrow="Our Work"
                title="Straight From The Chair"
                description="A look at what leaves our studio every week."
              />
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {gallery.map((g, i) => (
                <Reveal
                  key={g.id}
                  delay={i * 70}
                  className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
                >
                  <div
                    className={`group relative overflow-hidden rounded-3xl bg-blush-100 ${
                      i === 0 ? "aspect-square lg:h-full" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={g.image_url}
                      alt={g.title ?? "Kim Beauty work"}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {g.title ? (
                      <>
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                        />
                        <span className="absolute bottom-4 left-4 translate-y-2 text-sm font-medium text-cream opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                          {g.title}
                        </span>
                      </>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Testimonials content={content} testimonials={testimonials} />
      <CtaSection content={content} />
    </>
  );
}
