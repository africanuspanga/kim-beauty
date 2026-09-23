import { Suspense } from "react";
import type { Metadata } from "next";
import { CalendarCheck, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal } from "@/components/ui/Reveal";
import { getServices, getSiteContent, pick } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { waLink, WHATSAPP_GREETING } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Reserve your chair at Kim Beauty, Pangani Street Arusha. Pick your service and the exact style you want, choose a date and time — we confirm on WhatsApp.",
  alternates: { canonical: absoluteUrl("/booking") },
  openGraph: {
    title: "Book an Appointment — Kim Beauty Arusha",
    description:
      "Pick your service and style, choose a date and time. We confirm on WhatsApp.",
    url: absoluteUrl("/booking"),
  },
};

const STEPS = [
  { n: "1", title: "Pick your service", body: "Choose from the full Kim Beauty menu." },
  { n: "2", title: "Choose date & time", body: "Tell us when suits you best." },
  { n: "3", title: "Confirm on WhatsApp", body: "We reply to lock your slot in." },
];

function FormFallback() {
  return (
    <div className="h-[36rem] animate-pulse rounded-3xl border border-line bg-blush-50/60" />
  );
}

export default async function BookingPage() {
  const [content, services] = await Promise.all([getSiteContent(), getServices()]);

  const phone = pick(content, "contact", "phone");
  const whatsapp = pick(content, "contact", "whatsapp");
  const address = pick(content, "contact", "address");

  return (
    <>
      <PageHero
        breadcrumb="Book Appointment"
        eyebrow={pick(content, "booking_page", "eyebrow", "Book An Appointment")}
        title={pick(content, "booking_page", "title", "Reserve Your Chair")}
        description={pick(content, "booking_page", "description")}
      />

      <section className="pb-20 md:pb-28">
        <div className="container-kb">
          <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            {/* form */}
            <Reveal>
              <Suspense fallback={<FormFallback />}>
                <BookingForm services={services} whatsapp={whatsapp} />
              </Suspense>
            </Reveal>

            {/* sidebar */}
            <Reveal delay={120} className="space-y-5">
              {/* how it works */}
              <div className="rounded-3xl border border-line bg-blush-50/70 p-7">
                <h2 className="flex items-center gap-2.5 text-xl">
                  <CalendarCheck className="h-5 w-5 text-gold-600" aria-hidden="true" />
                  How It Works
                </h2>
                <ol className="mt-6 space-y-5">
                  {STEPS.map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-[13px] font-bold text-white">
                        {s.n}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{s.title}</p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-muted">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* opening hours */}
              <div className="rounded-3xl border border-line bg-cream p-7">
                <h2 className="flex items-center gap-2.5 text-xl">
                  <Clock className="h-5 w-5 text-gold-600" aria-hidden="true" />
                  Opening Hours
                </h2>
                <ul className="mt-5 space-y-2.5 text-[14px] text-ink-soft">
                  <li>{pick(content, "contact", "hours_weekday")}</li>
                  <li>{pick(content, "contact", "hours_saturday")}</li>
                  <li>{pick(content, "contact", "hours_sunday")}</li>
                </ul>
              </div>

              {/* direct contact */}
              <div className="rounded-3xl border border-line bg-ink p-7 text-cream">
                <h2 className="text-xl text-cream">Prefer To Talk?</h2>
                <p className="mt-2.5 text-[14px] leading-relaxed text-cream/60">
                  Call us or start a WhatsApp chat and we will book you in.
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 rounded-xl border border-cream/15 px-4 py-3 text-sm transition hover:border-gold-400 hover:bg-cream/5"
                  >
                    <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    {phone}
                  </a>
                  <a
                    href={waLink(WHATSAPP_GREETING, whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-cream/15 px-4 py-3 text-sm transition hover:border-gold-400 hover:bg-cream/5"
                  >
                    <MessageCircle className="h-4 w-4 text-gold-400" aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                  <p className="flex items-start gap-3 px-4 py-2 text-[13px] text-cream/55">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                    {address}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
