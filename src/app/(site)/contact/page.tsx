import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/ui/SocialIcons";
import { getSiteContent, pick } from "@/lib/content";
import { waLink, WHATSAPP_GREETING } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, WhatsApp, email or visit Kim Beauty on Pangani Street, Arusha, Tanzania.",
};

export default async function ContactPage() {
  const content = await getSiteContent();

  const phone = pick(content, "contact", "phone");
  const email = pick(content, "contact", "email");
  const address = pick(content, "contact", "address");
  const whatsapp = pick(content, "contact", "whatsapp");
  const mapQuery = pick(content, "contact", "map_query", address);

  const socials = [
    { href: pick(content, "contact", "instagram"), Icon: InstagramIcon, label: "Instagram" },
    { href: pick(content, "contact", "facebook"), Icon: FacebookIcon, label: "Facebook" },
    { href: pick(content, "contact", "tiktok"), Icon: TikTokIcon, label: "TikTok" },
  ].filter((s) => s.href);

  const cards = [
    {
      Icon: Phone,
      title: "Call Us",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      Icon: MessageCircle,
      title: "WhatsApp",
      value: "Chat with us now",
      href: waLink(WHATSAPP_GREETING, whatsapp),
      external: true,
    },
    {
      Icon: Mail,
      title: "Email Us",
      value: email,
      href: `mailto:${email}`,
    },
    {
      Icon: MapPin,
      title: "Visit The Studio",
      value: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`,
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow={pick(content, "contact_page", "eyebrow", "Get In Touch")}
        title={pick(content, "contact_page", "title", "We Would Love To Hear From You")}
        description={pick(content, "contact_page", "description")}
      />

      {/* contact cards */}
      <section className="pb-10">
        <div className="container-kb">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 transition-colors group-hover:bg-gold-gradient group-hover:text-white">
                    <c.Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-lg">{c.title}</h2>
                  <p className="mt-1.5 break-words text-[14px] leading-relaxed text-muted">
                    {c.value}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* form + hours + map */}
      <section className="py-12 md:py-16">
        <div className="container-kb">
          <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <Reveal>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.4rem)]">Send Us A Message</h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
                Fill in the form and we will get back to you — usually within the
                hour during opening times.
              </p>
              <div className="mt-7">
                <ContactForm whatsapp={whatsapp} />
              </div>
            </Reveal>

            <Reveal delay={120} className="space-y-5">
              <div className="rounded-3xl border border-line bg-blush-50/70 p-7">
                <h2 className="flex items-center gap-2.5 text-xl">
                  <Clock className="h-5 w-5 text-gold-600" aria-hidden="true" />
                  Opening Hours
                </h2>
                <ul className="mt-5 space-y-3 text-[14px] text-ink-soft">
                  <li className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <span>{pick(content, "contact", "hours_weekday")}</span>
                  </li>
                  <li className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <span>{pick(content, "contact", "hours_saturday")}</span>
                  </li>
                  <li>{pick(content, "contact", "hours_sunday")}</li>
                </ul>
              </div>

              {socials.length > 0 ? (
                <div className="rounded-3xl border border-line bg-cream p-7">
                  <h2 className="text-xl">Follow Kim Beauty</h2>
                  <p className="mt-2 text-[14px] text-muted">
                    See our latest work on social.
                  </p>
                  <div className="mt-5 flex gap-2.5">
                    {socials.map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-transparent hover:bg-gold-gradient hover:text-white"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* map */}
              <div className="overflow-hidden rounded-3xl border border-line">
                <iframe
                  title="Kim Beauty location map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    mapQuery
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
