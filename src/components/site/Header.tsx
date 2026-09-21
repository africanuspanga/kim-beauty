"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  logoUrl = "/images/logo.png",
  phone = "+255 766 400 961",
}: {
  logoUrl?: string;
  phone?: string;
}) {
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/70 bg-cream/85 backdrop-blur-xl shadow-[0_1px_20px_rgba(66,44,23,0.05)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-kb flex h-18 items-center justify-between gap-4 py-3 md:h-20">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Kim Beauty home">
          <Image
            src={logoUrl}
            alt="Kim Beauty"
            width={718}
            height={490}
            priority
            className="h-11 w-auto md:h-13"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-gold-700"
                    : "text-ink-soft hover:text-gold-600"
                )}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold-500" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition hover:text-gold-600 xl:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {phone}
          </a>

          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative rounded-full border border-line bg-white/70 p-2.5 text-ink-soft backdrop-blur-sm transition hover:border-gold-300 hover:text-gold-600"
          >
            <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
            {hydrated && count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-gradient px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            ) : null}
          </button>

          <ButtonLink href="/booking" size="sm" className="hidden sm:inline-flex">
            Book Appointment
          </ButtonLink>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-full border border-line bg-white/70 p-2.5 text-ink-soft backdrop-blur-sm transition hover:border-gold-300 hover:text-gold-600 lg:hidden"
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-t border-line bg-cream transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          menuOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-kb flex flex-col gap-1 py-4" aria-label="Mobile">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                  active
                    ? "bg-gold-50 text-gold-700"
                    : "text-ink-soft hover:bg-blush-50 hover:text-gold-600"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div onClick={() => setMenuOpen(false)} className="sm:hidden">
            <ButtonLink href="/booking" size="md" className="mt-2 w-full">
              Book Appointment
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
