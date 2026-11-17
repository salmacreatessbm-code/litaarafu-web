/**
 * Environment-driven configuration.
 *
 * Every value comes from an environment variable (see .env.example).
 * Nothing here throws when a variable is missing: the site falls back to
 * "preview mode" so it still builds and runs before Supabase is set up.
 *
 * NEXT_PUBLIC_* values are safe for the browser. The rest are only ever
 * read on the server.
 */

const clean = (value: string | undefined) => (value ?? "").trim();

export const siteConfig = {
  supabaseUrl: clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),

  /** Optional direct calendar links, one per bookable service. */
  calendarLinks: {
    assessment: clean(process.env.NEXT_PUBLIC_CAL_ASSESSMENT_URL),
    oneOnOne: clean(process.env.NEXT_PUBLIC_CAL_ONE_ON_ONE_URL),
    group: clean(process.env.NEXT_PUBLIC_CAL_GROUP_URL),
  } as Record<string, string>,
};

/** True once the public Supabase URL and anon key are both set. */
export const isSupabaseConfigured = Boolean(
  siteConfig.supabaseUrl && siteConfig.supabaseAnonKey,
);

/**
 * Server-only settings. Read through a function so the secret values are
 * never bundled into client code by accident.
 */
export function getServerConfig() {
  return {
    serviceRoleKey: clean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    resendApiKey: clean(process.env.RESEND_API_KEY),
    resendFromEmail: clean(process.env.RESEND_FROM_EMAIL),
    adminEmail: clean(process.env.ADMIN_EMAIL).toLowerCase(),
  };
}

/** True when the given email belongs to the teacher (ADMIN_EMAIL). */
export function isAdminEmail(email: string | null | undefined) {
  const { adminEmail } = getServerConfig();
  return Boolean(adminEmail && email && email.toLowerCase() === adminEmail);
}
