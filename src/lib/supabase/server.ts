import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client for Server Components.
 * Public site data is world-readable under RLS, so no session cookie is needed.
 */
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
