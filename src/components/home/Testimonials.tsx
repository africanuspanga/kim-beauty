import { Quote } from "lucide-react";
import { GoogleG } from "@/components/ui/GoogleG";
import { Stars } from "@/components/ui/Stars";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";
import type { Testimonial } from "@/lib/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-[19rem] shrink-0 flex-col rounded-3xl border border-line bg-cream p-6 shadow-soft transition-colors duration-300 hover:border-gold-200 sm:w-[22rem]">
      <div className="flex items-center justify-between">
        <Stars rating={t.rating} />
        <Quote className="h-6 w-6 text-gold-200" aria-hidden="true" />
      </div>

      <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
        “{t.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 font-display text-sm font-semibold text-gold-700">
          {initials(t.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
          {t.location ? (
            <p className="truncate text-xs text-muted">{t.location}</p>
          ) : null}
        </div>
        <GoogleG className="h-5 w-5 shrink-0" />
      </figcaption>
    </figure>
  );
}

/** One infinite row. The list is duplicated so the loop never shows a seam. */
function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <div className="marquee-mask group relative overflow-hidden">
      <div
        className={`flex w-max gap-5 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {loop.map((t, i) => (
          <ReviewCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials({
  content,
  testimonials,
}: {
  content: ContentMap;
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  const mid = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, mid);
  const rowB = testimonials.length > 3 ? testimonials.slice(mid) : testimonials;

  const rating = pick(content, "testimonials_section", "rating", "4.9");
  const reviewCount = pick(content, "testimonials_section", "review_count", "320");

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-blush-50/60 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-100/30 blur-[120px]"
      />

      <div className="relative">
        <div className="container-kb">
          <Reveal>
            <SectionHeading
              eyebrow={pick(content, "testimonials_section", "eyebrow", "Client Love")}
              title={pick(content, "testimonials_section", "title", "Reviewed By Real Clients")}
              description={pick(content, "testimonials_section", "description")}
            />
          </Reveal>

          {/* google summary badge */}
          <Reveal delay={100} className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 rounded-2xl border border-line bg-cream px-6 py-4 shadow-soft">
              <GoogleG className="h-9 w-9" />
              <div className="h-10 w-px bg-line" aria-hidden="true" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-semibold leading-none text-ink">
                    {rating}
                  </span>
                  <Stars rating={5} size="h-3.5 w-3.5" />
                </div>
                <p className="mt-1 text-[11px] font-medium text-muted">
                  Based on {reviewCount}+ Google reviews
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 space-y-5">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
