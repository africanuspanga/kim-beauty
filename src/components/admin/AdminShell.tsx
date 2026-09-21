"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquareQuote,
  Package,
  ShoppingCart,
  Sparkles,
  Tags,
  X,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/content", label: "Site Content", Icon: FileText },
  { href: "/admin/services", label: "Services", Icon: Sparkles },
  { href: "/admin/products", label: "Products", Icon: Package },
  { href: "/admin/categories", label: "Categories", Icon: Tags },
  { href: "/admin/testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { href: "/admin/gallery", label: "Gallery", Icon: ImageIcon },
  { href: "/admin/bookings", label: "Bookings", Icon: CalendarDays },
  { href: "/admin/orders", label: "Orders", Icon: ShoppingCart },
  { href: "/admin/messages", label: "Messages", Icon: Mail },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await getSupabase().auth.signOut();
    router.replace("/admin/login");
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Admin">
      {NAV.map(({ href, label, Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition",
              active
                ? "bg-gold-gradient text-white shadow-[0_6px_16px_-6px_rgba(156,108,56,0.7)]"
                : "text-ink-soft hover:bg-blush-100 hover:text-gold-700"
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-blush-50/40">
      {/* ---------- desktop sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-cream lg:flex">
        <div className="flex h-20 items-center px-6">
          <Link href="/admin" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Kim Beauty"
              width={718}
              height={490}
              className="h-11 w-auto"
            />
          </Link>
        </div>

        <div className="px-6 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
            Admin Panel
          </span>
        </div>

        {nav}

        <div className="border-t border-line p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-blush-100 hover:text-gold-700"
          >
            <ExternalLink className="h-[18px] w-[18px]" aria-hidden="true" />
            View Website
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            Sign Out
          </button>
          {email ? (
            <p className="truncate px-3.5 pt-3 text-[11px] text-muted">{email}</p>
          ) : null}
        </div>
      </aside>

      {/* ---------- mobile drawer ---------- */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-cream transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-between px-5">
          <Image
            src="/images/logo.png"
            alt="Kim Beauty"
            width={718}
            height={490}
            className="h-10 w-auto"
          />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-full p-2 text-muted hover:bg-blush-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {nav}
        <div className="border-t border-line p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft hover:bg-blush-100"
          >
            <ExternalLink className="h-[18px] w-[18px]" aria-hidden="true" />
            View Website
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ---------- content ---------- */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-cream/90 px-4 backdrop-blur-xl sm:px-6 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-xl border border-line p-2 text-ink-soft"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Image
            src="/images/logo.png"
            alt="Kim Beauty"
            width={718}
            height={490}
            className="h-8 w-auto"
          />
        </header>

        <main className="px-4 py-7 sm:px-6 lg:px-9 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
