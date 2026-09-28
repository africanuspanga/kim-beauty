"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useT } from "@/components/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/client";
import { buildBookingMessage, waLink } from "@/lib/whatsapp";
import { optionPriceLabel } from "@/lib/utils";
import type { Service, ServiceOption } from "@/lib/types";

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
  const t = useT();
  const f = t.bookingForm;
  const onRequest = t.common.priceOnRequest;
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";
  const preselectedOption = searchParams.get("option") ?? "";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceName, setServiceName] = useState(preselected);
  const [optionName, setOptionName] = useState(preselectedOption);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [stylist, setStylist] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const selectedService = services.find((s) => s.title === serviceName);
  const options: ServiceOption[] = selectedService?.service_options ?? [];
  const selectedOption = options.find((o) => o.name === optionName);

  // The styles inside a service, kept in their admin order but split
  // under their headings so the dropdown reads like the services page.
  const optionGroups = options.reduce<
    { label: string | null; items: ServiceOption[] }[]
  >((groups, option) => {
    const label = option.group_label?.trim() || null;
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.items.push(option);
    else groups.push({ label, items: [option] });
    return groups;
  }, []);

  function handleServiceChange(next: string) {
    setServiceName(next);
    // a style from the old service would be meaningless under the new one
    setOptionName("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !phone.trim() || !serviceName || !date || !time) {
      setError(f.errorRequired);
      return;
    }

    if (options.length > 0 && !optionName) {
      setError(f.errorStyle(serviceName));
      return;
    }

    setStatus("sending");

    const matched = selectedService;
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
        p_service_option_id: selectedOption?.id ?? null,
        p_service_option_name: optionName || null,
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
        optionName: optionName || undefined,
        optionPrice: selectedOption ? optionPriceLabel(selectedOption) : undefined,
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
        <h2 className="mt-6 text-2xl">{f.sentTitle}</h2>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
          {f.sentBody}
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
            setOptionName("");
            setDate("");
            setTime("");
            setStylist("");
            setNotes("");
          }}
        >
          {f.bookAnother}
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
            {f.fullName} <span className="text-gold-600">*</span>
          </label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={f.fullNamePlaceholder}
            required
            className={fieldCls}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelCls}>
            {f.phone} <span className="text-gold-600">*</span>
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={f.phonePlaceholder}
            inputMode="tel"
            required
            className={fieldCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelCls}>
            {f.email} <span className="font-normal text-muted">{t.common.optional}</span>
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
            {f.service} <span className="text-gold-600">*</span>
          </label>
          <select
            id="service"
            value={serviceName}
            onChange={(e) => handleServiceChange(e.target.value)}
            required
            className={`${fieldCls} cursor-pointer`}
          >
            <option value="">{f.chooseService}</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
                {s.price_label ? ` — ${s.price_label}` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Which style inside that service — the detail that stops us
            having to ask "which braids?" on WhatsApp every time. */}
        {options.length > 0 ? (
          <div className="sm:col-span-2">
            <label htmlFor="serviceOption" className={labelCls}>
              {f.style} <span className="text-gold-600">*</span>
            </label>
            <select
              id="serviceOption"
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
              required
              className={`${fieldCls} cursor-pointer`}
            >
              <option value="">{f.chooseStyle}</option>
              {optionGroups.map((group) =>
                group.label ? (
                  <optgroup key={group.label} label={group.label}>
                    {group.items.map((o) => (
                      <option key={o.id} value={o.name}>
                        {o.name} — {optionPriceLabel(o, onRequest)}
                      </option>
                    ))}
                  </optgroup>
                ) : (
                  group.items.map((o) => (
                    <option key={o.id} value={o.name}>
                      {o.name} — {optionPriceLabel(o, onRequest)}
                    </option>
                  ))
                )
              )}
            </select>
            <p className="mt-2 text-[12px] leading-relaxed text-muted">
              {selectedOption ? (
                <>
                  <span className="font-semibold text-gold-700">
                    {optionPriceLabel(selectedOption, onRequest)}
                  </span>
                  {selectedOption.duration ? f.about(selectedOption.duration) : ""}
                  {selectedOption.description ? ` — ${selectedOption.description}` : ""}
                </>
              ) : (
                <>
                  {f.notSure}{" "}
                  <Link
                    href={`/services/${selectedService?.slug ?? ""}`}
                    className="font-semibold text-gold-700 underline underline-offset-2"
                  >
                    {f.seePhotos}
                  </Link>
                </>
              )}
            </p>
          </div>
        ) : null}

        <div>
          <label htmlFor="date" className={labelCls}>
            {f.date} <span className="text-gold-600">*</span>
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
            {f.time} <span className="text-gold-600">*</span>
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className={`${fieldCls} cursor-pointer`}
          >
            <option value="">{f.chooseTime}</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="stylist" className={labelCls}>
            {f.stylist}{" "}
            <span className="font-normal text-muted">{t.common.optional}</span>
          </label>
          <input
            id="stylist"
            value={stylist}
            onChange={(e) => setStylist(e.target.value)}
            placeholder={f.stylistPlaceholder}
            className={fieldCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelCls}>
            {f.notes}{" "}
            <span className="font-normal text-muted">{t.common.optional}</span>
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder={f.notesPlaceholder}
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
            {t.common.sending}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            {f.submit}
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-[12px] leading-relaxed text-muted">
        {f.savedHint}
      </p>
    </form>
  );
}
