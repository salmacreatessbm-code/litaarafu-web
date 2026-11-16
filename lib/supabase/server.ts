import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getServerConfig,
  isSupabaseConfigured,
  siteConfig,
} from "@/lib/siteConfig";

/**
 * Supabase client for Server Components, Server Actions and Route
 * Handlers. It acts as the signed-in student, so Row-Level Security
 * applies. Returns null in preview mode (Supabase not configured).
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();

  return createServerClient(siteConfig.supabaseUrl, siteConfig.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // The middleware refreshes the session, so this is safe to ignore.
        }
      },
    },
  });
}

/**
 * Service-role client. Bypasses Row-Level Security, so it must only be
 * used on the server, after checking who is asking. Returns null when
 * SUPABASE_SERVICE_ROLE_KEY is not set.
 */
export function createSupabaseAdminClient(): SupabaseClient | null {
  const { serviceRoleKey } = getServerConfig();
  if (!isSupabaseConfigured || !serviceRoleKey) return null;

  return createClient(siteConfig.supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** The signed-in user, or null (also null in preview mode). */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
