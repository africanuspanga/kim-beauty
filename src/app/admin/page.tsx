"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Mail,
  Package,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { Card, PageHeader, Spinner, StatusPill } from "@/components/admin/AdminUI";
import { getSupabase } from "@/lib/supabase/client";
import { formatDate, formatDateTime, formatPrice } from "@/lib/utils";

type Stats = {
  bookings: number;
  newBookings: number;
  orders: number;
  newOrders: number;
  products: number;
  services: number;
  messages: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

const QUICK_LINKS = [
  { href: "/admin/content", label: "Edit Site Content", Icon: FileText },
  { href: "/admin/services", label: "Manage Services", Icon: Sparkles },
  { href: "/admin/products", label: "Manage Products", Icon: Package },
  { href: "/admin/bookings", label: "View Bookings", Icon: CalendarDays },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [bookings, setBookings] = useState<Row[]>([]);
  const [orders, setOrders] = useState<Row[]>([]);

  useEffect(() => {
    const supabase = getSupabase();

    async function load() {
      const count = { count: "exact" as const, head: true };

      const [
        bookingsAll,
        bookingsNew,
        ordersAll,
        ordersNew,
        productsAll,
        servicesAll,
        messagesAll,
        recentBookings,
        recentOrders,
      ] = await Promise.all([
        supabase.from("bookings").select("id", count),
        supabase.from("bookings").select("id", count).eq("status", "new"),
        supabase.from("orders").select("id", count),
        supabase.from("orders").select("id", count).eq("status", "new"),
        supabase.from("products").select("id", count).eq("is_active", true),
        supabase.from("services").select("id", count).eq("is_active", true),
        supabase.from("contact_messages").select("id", count),
        supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setStats({
        bookings: bookingsAll.count ?? 0,
        newBookings: bookingsNew.count ?? 0,
        orders: ordersAll.count ?? 0,
        newOrders: ordersNew.count ?? 0,
        products: productsAll.count ?? 0,
        services: servicesAll.count ?? 0,
        messages: messagesAll.count ?? 0,
      });
      setBookings(recentBookings.data ?? []);
      setOrders(recentOrders.data ?? []);
    }

    load();
  }, []);

  if (!stats) {
    return (
      <>
        <PageHeader title="Dashboard" />
        <Spinner label="Loading your dashboard…" />
      </>
    );
  }

  const cards = [
    {
      label: "Bookings",
      value: stats.bookings,
      badge: stats.newBookings ? `${stats.newBookings} new` : undefined,
      href: "/admin/bookings",
      Icon: CalendarDays,
    },
    {
      label: "Orders",
      value: stats.orders,
      badge: stats.newOrders ? `${stats.newOrders} new` : undefined,
      href: "/admin/orders",
      Icon: ShoppingCart,
    },
    {
      label: "Live Products",
      value: stats.products,
      href: "/admin/products",
      Icon: Package,
    },
    {
      label: "Live Services",
      value: stats.services,
      href: "/admin/services",
      Icon: Sparkles,
    },
    {
      label: "Messages",
      value: stats.messages,
      href: "/admin/messages",
      Icon: Mail,
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A snapshot of what is happening on your website right now."
      />

      {/* stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl border border-line bg-cream p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-lift"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <c.Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              {c.badge ? (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  {c.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-4 font-display text-3xl font-semibold text-ink">
              {c.value}
            </p>
            <p className="mt-0.5 text-[13px] text-muted">{c.label}</p>
          </Link>
        ))}
      </div>

      {/* quick links */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-blush-50/60 px-5 py-4 transition hover:border-gold-200 hover:bg-blush-50"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-ink">
              <q.Icon className="h-[18px] w-[18px] text-gold-600" aria-hidden="true" />
              {q.label}
            </span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-gold-600"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      {/* recent activity */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Latest Bookings</h2>
            <Link
              href="/admin/bookings"
              className="text-[13px] font-medium text-gold-600 hover:text-gold-700"
            >
              View all
            </Link>
          </div>

          {bookings.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">No bookings yet.</p>
          ) : (
            <ul className="mt-5 divide-y divide-line">
              {bookings.map((b) => (
                <li key={b.id} className="flex items-start justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {b.full_name}
                    </p>
                    <p className="truncate text-[12px] text-muted">
                      {b.service_name} · {formatDate(b.preferred_date)} at{" "}
                      {b.preferred_time}
                    </p>
                  </div>
                  <StatusPill status={b.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Latest Orders</h2>
            <Link
              href="/admin/orders"
              className="text-[13px] font-medium text-gold-600 hover:text-gold-700"
            >
              View all
            </Link>
          </div>

          {orders.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">No orders yet.</p>
          ) : (
            <ul className="mt-5 divide-y divide-line">
              {orders.map((o) => (
                <li key={o.id} className="flex items-start justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {o.customer_name || o.reference}
                    </p>
                    <p className="truncate text-[12px] text-muted">
                      {(o.items ?? []).length} items · {formatDateTime(o.created_at)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-ink">
                      {formatPrice(o.total, o.currency)}
                    </p>
                    <StatusPill status={o.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
