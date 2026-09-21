import {
  FacebookIcon,
  InstagramIcon,
  LinktreeIcon,
  PinterestIcon,
  ThreadsIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import type { ContentMap } from "@/lib/content";
import { pick } from "@/lib/content";
import { waLink, WHATSAPP_GREETING } from "@/lib/whatsapp";

type Icon = (props: { className?: string }) => React.ReactElement;

export type SocialLink = { href: string; label: string; Icon: Icon };

/**
 * Every channel the salon publishes on, in the order they should appear.
 * A blank value in `site_content.contact` simply drops the icon, so the
 * admin can retire a channel — or add Likee later — without a code change.
 */
const SOCIAL_FIELDS: { field: string; label: string; Icon: Icon }[] = [
  { field: "instagram", label: "Instagram", Icon: InstagramIcon },
  { field: "tiktok", label: "TikTok", Icon: TikTokIcon },
  { field: "facebook", label: "Facebook Page", Icon: FacebookIcon },
  { field: "facebook_profile", label: "Facebook Profile", Icon: FacebookIcon },
  { field: "youtube", label: "YouTube", Icon: YouTubeIcon },
  { field: "x", label: "X", Icon: XIcon },
  { field: "pinterest", label: "Pinterest", Icon: PinterestIcon },
  { field: "threads", label: "Threads", Icon: ThreadsIcon },
  { field: "likee", label: "Likee", Icon: LinktreeIcon },
  { field: "linktree", label: "Linktree", Icon: LinktreeIcon },
];

export function getSocialLinks(
  content: ContentMap,
  { includeWhatsApp = false } = {}
): SocialLink[] {
  const links = SOCIAL_FIELDS.map(({ field, label, Icon }) => ({
    href: pick(content, "contact", field),
    label,
    Icon,
  })).filter((s) => s.href);

  if (includeWhatsApp) {
    const whatsapp = pick(content, "contact", "whatsapp");
    if (whatsapp) {
      links.unshift({
        href: waLink(WHATSAPP_GREETING, whatsapp),
        label: "WhatsApp",
        Icon: WhatsAppIcon,
      });
    }
  }

  return links;
}

export type PaymentLink = { href: string; label: string; description: string };

/** Hosted checkout pages customers can settle an order or deposit through. */
const PAYMENT_FIELDS: { field: string; label: string; description: string }[] = [
  {
    field: "pesapal_url",
    label: "Pesapal",
    description: "Card, mobile money and bank transfer",
  },
  {
    field: "dpo_url",
    label: "DPO Pay",
    description: "Secure card payments via DirectPay",
  },
  {
    field: "paypal_url",
    label: "PayPal",
    description: "Pay from anywhere in the world",
  },
];

export function getPaymentLinks(content: ContentMap): PaymentLink[] {
  return PAYMENT_FIELDS.map(({ field, label, description }) => ({
    href: pick(content, "payments", field),
    label,
    description,
  })).filter((p) => p.href);
}
