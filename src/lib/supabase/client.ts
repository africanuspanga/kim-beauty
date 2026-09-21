"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/** Single shared browser client — avoids re-creating on every render. */
let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!browserClient) browserClient = createClient();
  return browserClient;
}
