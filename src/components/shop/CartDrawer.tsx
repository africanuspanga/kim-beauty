"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { buildOrderMessage, waLink } from "@/lib/whatsapp";
import { getSupabase } from "@/lib/supabase/client";

export function CartDrawer() {
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

    const url = waLink(buildOrderMessage({ ...payload, reference }));
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
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[70] flex h-[100dvh] w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-gold-600" aria-hidden="true" />
            <h2 className="text-xl">Your Cart</h2>
            <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-700">
              {items.length}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
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
            <p className="text-lg text-ink">Your cart is empty</p>
            <p className="text-sm text-muted">
              Browse the shop and add the pieces you love.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 text-sm font-semibold text-gold-600 underline underline-offset-4 hover:text-gold-700"
            >
              Go to the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3.5">
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
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
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
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-1.5 text-ink-soft transition hover:text-gold-600"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-7 text-center text-sm font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
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

            <footer className="space-y-3 border-t border-line bg-white/70 px-5 py-4">
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className="h-11 rounded-xl border border-line bg-cream px-3.5 text-sm outline-none transition focus:border-gold-400"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone"
                  inputMode="tel"
                  aria-label="Your phone"
                  className="h-11 rounded-xl border border-line bg-cream px-3.5 text-sm outline-none transition focus:border-gold-400"
                />
              </div>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Delivery note (optional)"
                aria-label="Delivery note"
                className="h-11 w-full rounded-xl border border-line bg-cream px-3.5 text-sm outline-none transition focus:border-gold-400"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm text-muted">Total</span>
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
                {sending ? "Sending…" : "Send Order on WhatsApp"}
              </Button>
              <p className="text-center text-[11px] leading-relaxed text-muted">
                Your order opens in WhatsApp — we confirm stock and delivery there.
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
