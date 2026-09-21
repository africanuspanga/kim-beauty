"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { waLink, WHATSAPP_GREETING } from "@/lib/whatsapp";

/**
 * Floating WhatsApp launcher.
 * The icon artwork fills the whole button — no coloured plate behind it.
 */
export function WhatsAppButton({
  phone,
  message = WHATSAPP_GREETING,
}: {
  phone?: string;
  message?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={waLink(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kim Beauty on WhatsApp"
      className={`group fixed bottom-5 right-5 z-[80] block h-14 w-14 rounded-full transition-all duration-500 ease-out sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } hover:scale-110 active:scale-95`}
      style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.22))" }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30 [animation-duration:2.5s]" aria-hidden="true" />
      <Image
        src="/images/whatsapp.png"
        alt=""
        width={512}
        height={512}
        className="relative h-full w-full rounded-full object-contain"
      />
    </a>
  );
}
