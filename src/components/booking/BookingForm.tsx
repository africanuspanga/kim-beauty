"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/client";
import { buildBookingMessage, waLink } from "@/lib/whatsapp";
import type { Service } from "@/lib/types";

const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
];

const labelCls = "block text-[13px] font-semibold text-ink mb-2";
const fieldCls =
  "h-12 w-full rounded-xl border border-line bg-cream px-4 text-[15px] text-ink outline-none transition placeholder:text-muted/70 focus:border-gold-400";

function today() {
  return new Date().toISOString().split("T")[0];
}

export function BookingForm({
  services,
  whatsapp,
}: {
  services: Service[];
  whatsapp?: string;
}) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceName, setServiceName] = useState(preselected);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [stylist, setStylist] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !phone.trim() || !serviceName || !date || !time) {
      setError("Please fill in your name, phone, service, date and time.");
      return;
    }

    setStatus("sending");

    const matched = services.find((s) => s.title === serviceName);
    let reference: string | undefined;

    // Save the booking — never block the WhatsApp handoff if this fails.
    try {
      const supabase = getSupabase();
      const { data } = await supabase.rpc("create_booking", {
        p_full_name: fullName.trim(),
        p_phone: phone.trim(),
        p_service_name: serviceName,
        p_preferred_date: date,
        p_preferred_time: time,
        p_email: email.trim() || null,
        p_service_id: matched?.id ?? null,
        p_stylist: stylist.trim() || null,
        p_notes: notes.trim() || null,
      });
      reference = data ?? undefined;
    } catch {
      /* offline — still hand off to WhatsApp */
    }

    const url = waLink(
      buildBookingMessage({
        reference,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        serviceName,
        date,
        time,
        stylist: stylist.trim() || undefined,
        notes: notes.trim() || undefined,
      }),
      whatsapp
    );

    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-line bg-cream p-10 text-center shadow-soft">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl">Request Sent</h2>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
          Your appointment details have been opened in WhatsApp. Send the message
          and we will confirm your slot right away.
        </p>
        <Button
          variant="outline"
          className="mt-7"
          onClick={() => {
            setStatus("idle");
            setFullName("");
            setPhone("");
            setEmail("");
            setServiceName("");
            setDate("");
            setTime("");
            setStylist("");
            setNotes("");
          }}
        >
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-cream p-6 shadow-soft sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelCls}>
            Full Name <span className="text-gold-600">*</span>
          </label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Amina Hassan"
            required
            className={fieldCls}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone / WhatsApp <span className="text-gold-600">*</span>
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0766 400 961"
            inputMode="tel"
            required
            className={fieldCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelCls}>
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelCls}>
            Service <span className="text-gold-600">*</span>
          </label>
          <select
            id="service"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            className={`${fieldCls} cursor-pointer`}
          >
            <option value="">Choose a service…</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
                {s.price_label ? ` — ${s.price_label}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className={labelCls}>
            Preferred Date <span className="text-gold-600">*</span>
          </label>
          <input
            id="date"
            type="date"
            value={date}
            min={today()}
            onChange={(e) => setDate(e.target.value)}
            required
            className={`${fieldCls} cursor-pointer`}
          />
        </div>

        <div>
          <label htmlFor="time" className={labelCls}>
            Preferred Time <span className="text-gold-600">*</span>
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className={`${fieldCls} cursor-pointer`}
          >
            <option value="">Choose a time…</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="stylist" className={labelCls}>
            Preferred Stylist{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="stylist"
            value={stylist}
            onChange={(e) => setStylist(e.target.value)}
            placeholder="Anyone available"
            className={fieldCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelCls}>
            Anything We Should Know?{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Style reference, hair length, allergies, occasion…"
            className="w-full resize-y rounded-xl border border-line bg-cream px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted/70 focus:border-gold-400"
          />
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mt-7 w-full"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Booking on WhatsApp
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-[12px] leading-relaxed text-muted">
        Your request is saved and opened in WhatsApp so we can confirm your slot
        straight away.
      </p>
    </form>
  );
}
