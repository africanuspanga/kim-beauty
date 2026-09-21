export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "255766400961";

/** The greeting every floating-button / generic chat starts with. */
export const WHATSAPP_GREETING = "I am coming from Kim Beauty website";

export function waLink(message: string, phone: string = WHATSAPP_NUMBER) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export type BookingPayload = {
  reference?: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceName: string;
  date: string;
  time: string;
  stylist?: string;
  notes?: string;
};

export function buildBookingMessage(b: BookingPayload) {
  const lines = [
    `${WHATSAPP_GREETING}.`,
    "",
    "*NEW APPOINTMENT REQUEST*",
    "",
    b.reference ? `*Ref:* ${b.reference}` : null,
    `*Name:* ${b.fullName}`,
    `*Phone:* ${b.phone}`,
    b.email ? `*Email:* ${b.email}` : null,
    `*Service:* ${b.serviceName}`,
    `*Date:* ${b.date}`,
    `*Time:* ${b.time}`,
    b.stylist ? `*Stylist:* ${b.stylist}` : null,
    b.notes ? `*Notes:* ${b.notes}` : null,
    "",
    "Please confirm my booking. Thank you!",
  ].filter(Boolean);

  return lines.join("\n");
}

export type OrderPayload = {
  reference?: string;
  customerName?: string;
  phone?: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  currency?: string;
  note?: string;
};

export function buildOrderMessage(o: OrderPayload) {
  const currency = o.currency || "TZS";
  const money = (n: number) => `${currency} ${Math.round(n).toLocaleString("en-US")}`;

  const itemLines = o.items.map(
    (it, i) =>
      `${i + 1}. ${it.name}\n    ${it.quantity} x ${money(it.price)} = ${money(
        it.price * it.quantity
      )}`
  );

  const lines = [
    `${WHATSAPP_GREETING}.`,
    "",
    "*NEW ORDER*",
    "",
    o.reference ? `*Ref:* ${o.reference}` : null,
    o.customerName ? `*Name:* ${o.customerName}` : null,
    o.phone ? `*Phone:* ${o.phone}` : null,
    "",
    "*Items*",
    ...itemLines,
    "",
    `*Total: ${money(o.total)}*`,
    o.note ? `\n*Note:* ${o.note}` : null,
    "",
    "Please confirm availability and delivery. Thank you!",
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildContactMessage(c: {
  name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
}) {
  return [
    `${WHATSAPP_GREETING}.`,
    "",
    "*NEW ENQUIRY*",
    "",
    `*Name:* ${c.name}`,
    c.phone ? `*Phone:* ${c.phone}` : null,
    c.email ? `*Email:* ${c.email}` : null,
    c.subject ? `*Subject:* ${c.subject}` : null,
    "",
    c.message,
  ]
    .filter(Boolean)
    .join("\n");
}
