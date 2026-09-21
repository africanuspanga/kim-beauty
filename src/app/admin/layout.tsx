"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSupabase } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  const [state, setState] = useState<"checking" | "allowed" | "denied">(
    "checking"
  );
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    // the login route renders its own children below, so no gate is needed
    if (isLogin) return;

    const supabase = getSupabase();
    let cancelled = false;

    async function check() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelled) {
          setState("denied");
          router.replace("/admin/login");
        }
        return;
      }

      // membership in admin_users is the real gate (enforced again by RLS)
      const { data: adminRow } = await supabase
        .from("admin_users")
        .select("user_id, email")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (!adminRow) {
        await supabase.auth.signOut();
        setState("denied");
        router.replace("/admin/login?error=not-admin");
        return;
      }

      setEmail(adminRow.email ?? user.email ?? undefined);
      setState("allowed");
    }

    check();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") router.replace("/admin/login");
  });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [isLogin, router]);

  if (isLogin) return <>{children}</>;

  if (state !== "allowed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blush-50/40">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-gold-500" aria-hidden="true" />
          <p className="text-sm text-muted">Checking your access…</p>
        </div>
      </div>
    );
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}
