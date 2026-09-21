"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/client";

const fieldCls =
  "h-12 w-full rounded-xl border border-line bg-cream pl-11 pr-4 text-[15px] text-ink outline-none transition placeholder:text-muted/70 focus:border-gold-400";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "not-admin"
      ? "That account does not have admin access."
      : null
  );

  // already signed in? go straight through
  useEffect(() => {
    getSupabase()
      .auth.getUser()
      .then(({ data: { user } }) => {
        if (user) router.replace("/admin");
      });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const supabase = getSupabase();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError || !data.user) {
      setError(signInError?.message ?? "Could not sign you in.");
      setBusy(false);
      return;
    }

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (!adminRow) {
      await supabase.auth.signOut();
      setError("That account does not have admin access.");
      setBusy(false);
      return;
    }

    router.replace("/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block text-[13px] font-semibold text-ink">
          Email
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@kimbeauty.co.tz"
            required
            className={fieldCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-[13px] font-semibold text-ink">
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className={fieldCls}
          />
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={busy} className="w-full">
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blush-50/50 px-5 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-gold-100/60 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-blush-200/50 blur-[110px]"
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-[2rem] border border-line bg-cream p-8 shadow-lift sm:p-10">
          <div className="flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Kim Beauty"
              width={718}
              height={490}
              priority
              className="h-16 w-auto"
            />
          </div>

          <div className="mt-7 text-center">
            <h1 className="text-3xl">Admin Sign In</h1>
            <p className="mt-2 text-sm text-muted">
              Manage your website content, services and orders.
            </p>
          </div>

          <div className="mt-8">
            <Suspense
              fallback={
                <div className="h-64 animate-pulse rounded-xl bg-blush-100" />
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted transition hover:text-gold-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to website
        </Link>
      </div>
    </div>
  );
}
