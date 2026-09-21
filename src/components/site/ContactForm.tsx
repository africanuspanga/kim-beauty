"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/client";
import { buildContactMessage, waLink } from "@/lib/whatsapp";

const labelCls = "block text-[13px] font-semibold text-ink mb-2";
const fieldCls =
  "h-12 w-full rounded-xl border border-line bg-cream px-4 text-[15px] text-ink outline-none transition placeholder:text-muted/70 focus:border-gold-400";

export function ContactForm({ whatsapp }: { whatsapp?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !message.trim()) {
      setError("Please tell us your name and your message.");
      return;
    }

    setStatus("sending");

    try {
      const supabase = getSupabase();
      await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.trim() || null,
        phone: phone.trim() || null,
        subject: subject.trim() || null,
        message: message.trim(),
      });
    } catch {
      /* offline — still hand off to WhatsApp */
    }

    const url = waLink(
      buildContactMessage({
        name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        subject: subject.trim() || undefined,
        message: message.trim(),
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
        <h2 className="mt-6 text-2xl">Message Sent</h2>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
          Thanks for reaching out — we have your message and opened WhatsApp so
          you can reach us instantly too.
        </p>
        <Button
          variant="outline"
          className="mt-7"
          onClick={() => {
            setStatus("idle");
            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setMessage("");
          }}
        >
          Send Another Message
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
          <label htmlFor="c-name" className={labelCls}>
            Your Name <span className="text-gold-600">*</span>
          </label>
          <input
            id="c-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Grace Mollel"
            required
            className={fieldCls}
          />
        </div>

        <div>
          <label htmlFor="c-phone" className={labelCls}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="c-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0766 400 961"
            inputMode="tel"
            className={fieldCls}
          />
        </div>

        <div>
          <label htmlFor="c-email" className={labelCls}>
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="c-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldCls}
          />
        </div>

        <div>
          <label htmlFor="c-subject" className={labelCls}>
            Subject <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="c-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What is this about?"
            className={fieldCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-message" className={labelCls}>
            Message <span className="text-gold-600">*</span>
          </label>
          <textarea
            id="c-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Tell us how we can help…"
            required
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
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
