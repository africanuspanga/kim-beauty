"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { useT } from "@/components/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";
import type { PaymentLink } from "@/lib/social";
import { formatPrice } from "@/lib/utils";
import { buildOrderMessage, waLink } from "@/lib/whatsapp";
import { getSupabase } from "@/lib/supabase/client";

export function CartDrawer({
  payments = [],
  whatsapp,
}: {
  payments?: PaymentLink[];
  /** The salon's WhatsApp from admin, so orders go where bookings go. */
  whatsapp?: string;
}) {
  const t = useT();
  const c = t.cart;
  const { items, total, isOpen, closeCart, setQuantity, removeItem, clear } =
    useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  async function handleCheckout() {
    if (items.length === 0 || sending) return;
    setSending(true);

    const payload = {
      customerName: name.trim() || undefined,
      phone: phone.trim() || undefined,
      items: items.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      note: note.trim() || undefined,
    };

    let reference: string | undefined;

    // Record the order — never block the WhatsApp handoff if this fails.
    // The server re-prices the order from the products table.
    try {
      const supabase = getSupabase();
      const { data } = await supabase.rpc("create_order", {
        p_items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        p_customer_name: payload.customerName ?? null,
        p_phone: payload.phone ?? null,
        p_note: payload.note ?? null,
      });
      reference = data ?? undefined;
    } catch {
      /* offline — carry on to WhatsApp */
    }

    const url = waLink(buildOrderMessage({ ...payload, reference }), whatsapp);
    window.open(url, "_blank", "noopener,noreferrer");

    clear();
    setName("");
    setPhone("");
    setNote("");
    setSending(false);
    closeCart();
  }

  return (
    <>
      {/* scrim */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={c.dialogLabel}
        className={`fixed right-0 top-0 z-[70] flex h-[100dvh] w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:max-w-4xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-gold-600" aria-hidden="true" />
            <h2 className="text-xl">{c.title}</h2>
            <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-700">
              {items.length}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label={c.close}
            className="rounded-full p-2 text-muted transition hover:bg-blush-100 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blush-100">
              <ShoppingBag className="h-8 w-8 text-gold-400" aria-hidden="true" />
            </div>
            <p className="text-lg text-ink">{c.empty}</p>
            <p className="text-sm text-muted">
              {c.emptyHint}
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 text-sm font-semibold text-gold-600 underline underline-offset-4 hover:text-gold-700"
            >
              {c.goToShop}
            </Link>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 lg:px-7 lg:py-6">
              <ul className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                {items.map((item) => (
                  <li key={item.lineId ?? item.id} className="flex gap-3.5 lg:rounded-2xl lg:border lg:border-line lg:bg-white/60 lg:p-3.5">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-blush-100">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug text-ink">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.lineId ?? item.id)}
                          aria-label={c.remove(item.name)}
                          className="shrink-0 rounded-md p-1 text-muted transition hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-0.5 text-sm text-gold-600">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-line bg-white">
                          <button
                            onClick={() => setQuantity(item.lineId ?? item.id, item.quantity - 1)}
                            aria-label={c.decrease}
                            className="p-1.5 text-ink-soft transition hover:text-gold-600"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-7 text-center text-sm font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(item.lineId ?? item.id, item.quantity + 1)}
                            aria-label={c.increase}
                            className="p-1.5 text-ink-soft transition hover:text-gold-600"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-ink tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="space-y-3 border-t border-line bg-white/70 px-5 py-4 lg:w-[22rem] lg:shrink-0 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:px-6 lg:py-6">
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={c.yourName}
                  aria-label={c.yourName}
                  className="h-11 rounded-xl border border-line bg-cream px-3.5 text-sm outline-none transition focus:border-gold-400"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={c.yourPhone}
                  inputMode="tel"
                  aria-label={c.yourPhone}
                  className="h-11 rounded-xl border border-line bg-cream px-3.5 text-sm outline-none transition focus:border-gold-400"
                />
              </div>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={c.deliveryNote}
                aria-label={c.deliveryNoteLabel}
                className="h-11 w-full rounded-xl border border-line bg-cream px-3.5 text-sm outline-none transition focus:border-gold-400"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm text-muted">{c.total}</span>
                <span className="text-xl font-semibold text-ink tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={sending}
                size="lg"
                className="w-full"
              >
                {sending ? t.common.sending : c.sendOrder}
              </Button>
              <p className="text-center text-[11px] leading-relaxed text-muted">
                {c.sendHint}
              </p>

              {payments.length > 0 ? (
                <div className="border-t border-line pt-3">
                  <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                    {c.payOnline}
                  </p>
                  <div className="mt-2.5 grid gap-2">
                    {payments.map((p) => (
                      <a
                        key={p.label}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t.payments[p.label] ?? p.description}
                        className="flex h-11 items-center justify-center rounded-xl border border-line bg-white text-sm font-medium text-ink transition hover:border-gold-300 hover:text-gold-700"
                      >
                        {t.footer.payWith(p.label)}
                      </a>
                    ))}
                  </div>
                  <p className="mt-2 text-center text-[11px] leading-relaxed text-muted">
                    {c.paidAlready}
                  </p>
                </div>
              ) : null}
            </footer>
          </div>
        )}
      </aside>
    </>
  );
}
