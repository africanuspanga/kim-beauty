import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { getSiteContent, pick } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  const logoUrl = pick(content, "branding", "logo_url", "/images/logo.png");
  const phone = pick(content, "contact", "phone");
  const whatsapp = pick(content, "contact", "whatsapp");
  const prefill = pick(
    content,
    "branding",
    "whatsapp_prefill",
    "I am coming from Kim Beauty website"
  );

  return (
    <CartProvider>
      <Header logoUrl={logoUrl} phone={phone} />
      <main className="min-h-screen">{children}</main>
      <Footer content={content} />
      <CartDrawer />
      <WhatsAppButton phone={whatsapp} message={prefill} />
    </CartProvider>
  );
}
