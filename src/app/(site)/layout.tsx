import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getSiteContent, pick } from "@/lib/content";
import { getLocale } from "@/lib/i18n/server";
import { getPaymentLinks } from "@/lib/social";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, locale] = await Promise.all([getSiteContent(), getLocale()]);

  const logoUrl = pick(content, "branding", "logo_url", "/images/logo.png");
  const phone = pick(content, "contact", "phone");
  const whatsapp = pick(content, "contact", "whatsapp");
  const prefill = pick(
    content,
    "branding",
    "whatsapp_prefill",
    "I am coming from Kim Beauty website"
  );
  const payments = getPaymentLinks(content);

  return (
    <I18nProvider locale={locale}>
      <CartProvider>
        <Header logoUrl={logoUrl} phone={phone} />
        <main className="min-h-screen">{children}</main>
        <Footer content={content} />
        <CartDrawer payments={payments} />
        <WhatsAppButton phone={whatsapp} message={prefill} />
      </CartProvider>
    </I18nProvider>
  );
}
