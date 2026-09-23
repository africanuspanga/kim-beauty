import { CalendarCheck, Check, Clock } from "lucide-react";
import { AddOptionToCart } from "./AddOptionToCart";
import { ServiceOptionMedia } from "./ServiceOptionMedia";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Service, ServiceOption } from "@/lib/types";
import { optionPriceLabel } from "@/lib/utils";

export function bookingHref(serviceTitle: string, optionName?: string) {
  const params = new URLSearchParams({ service: serviceTitle });
  if (optionName) params.set("option", optionName);
  return `/booking?${params.toString()}`;
}

/** Options in the order they should appear, grouped by their heading. */
export function groupOptions(options: ServiceOption[]) {
  const groups: { label: string | null; options: ServiceOption[] }[] = [];

  for (const option of options) {
    const label = option.group_label?.trim() || null;
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.options.push(option);
    else groups.push({ label, options: [option] });
  }

  return groups;
}

function OptionCard({
  option,
  service,
  delay,
}: {
  option: ServiceOption;
  service: Service;
  delay: number;
}) {
  const image = option.image_url || service.image_url;
  const price = optionPriceLabel(option);

  return (
    <Reveal
      as="article"
      id={option.slug}
      delay={delay}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-line bg-cream transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-200 hover:shadow-lift"
    >
      <ServiceOptionMedia
        imageUrl={image}
        videoUrl={option.video_url}
        alt={`${option.name} — ${service.title} at Kim Beauty Arusha`}
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.35rem] leading-snug">{option.name}</h3>
          {option.is_featured ? (
            <span className="mt-1 shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-700">
              Popular
            </span>
          ) : null}
        </div>

        {option.duration ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-medium text-muted">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {option.duration}
          </p>
        ) : null}

        {option.description ? (
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
            {option.description}
          </p>
        ) : null}

        {option.highlights?.length ? (
          <ul className="mt-3.5 space-y-1.5">
            {option.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-100">
                  <Check className="h-2.5 w-2.5 text-gold-700" aria-hidden="true" />
                </span>
                <span className="text-[13px] text-muted">{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto border-t border-line pt-4">
          <p className="font-display text-xl font-semibold text-ink">{price}</p>

          <div className="mt-3.5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={bookingHref(service.title, option.name)}
              size="sm"
              className="w-full sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book This Style
            </ButtonLink>

            {option.price != null ? (
              <AddOptionToCart
                id={option.id}
                name={`${service.title} — ${option.name}`}
                price={option.price}
                imageUrl={image}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Every bookable style inside one service, grouped under its headings.
 * This is what turns "Braiding Hair — 40,000" into a menu a client can
 * actually choose from.
 */
export function ServiceOptions({ service }: { service: Service }) {
  const options = service.service_options ?? [];
  if (options.length === 0) return null;

  const groups = groupOptions(options);

  return (
    <div className="space-y-12">
      {groups.map((group, gi) => (
        <div key={group.label ?? `group-${gi}`}>
          {group.label ? (
            <Reveal className="mb-6 flex items-center gap-4">
              <h3 className="text-[1.05rem] font-semibold uppercase tracking-[0.14em] text-gold-700">
                {group.label}
              </h3>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </Reveal>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.options.map((option, i) => (
              <OptionCard
                key={option.id}
                option={option}
                service={service}
                delay={i * 60}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
