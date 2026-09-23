import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumb,
  parent,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  breadcrumb: string;
  /** Adds a middle crumb, e.g. Home › Services › Braiding Hair. */
  parent?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush-200/40 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-gold-100/50 blur-[110px]"
      />

      <div className="container-kb relative">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex items-center gap-1.5 text-[13px] text-muted">
            <li>
              <Link href="/" className="transition hover:text-gold-600">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            {parent ? (
              <>
                <li>
                  <Link href={parent.href} className="transition hover:text-gold-600">
                    {parent.label}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
              </>
            ) : null}
            <li className="font-medium text-gold-700">{breadcrumb}</li>
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-2xl">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="mt-4 text-[clamp(2.25rem,5.6vw,4rem)] leading-[1.04]">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft sm:text-lg">
                {description}
              </p>
            ) : null}
            {children}
          </div>

          {image ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] shadow-lift lg:aspect-[5/4]">
              <Image
                src={image}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
