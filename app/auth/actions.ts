"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { learnerGoals } from "@/data/siteContent";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthState = {
  error?: string;
  message?: string;
  /** Echoed back so the form keeps what the student typed. */
  values?: { fullName?: string; email?: string; goal?: string };
};

const NOT_CONFIGURED =
  "Student accounts are not switched on yet. Connect Supabase first (see the README).";

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Please enter a valid email address."));

const goalValues = learnerGoals.map((goal) => goal.value) as [string, ...string[]];

const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Please enter your password."),
});

const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Please keep your name under 120 characters."),
  email: emailField,
  password: z
    .string()
    .min(8, "Please choose a password with at least 8 characters.")
    .max(72, "Please keep your password under 72 characters."),
  goal: z.enum(goalValues, "Please choose your main learning goal."),
});

/** Only allow redirects to pages on this site. */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}

async function siteOrigin() {
  const headerList = await headers();
  const origin = headerList.get("origin");
  if (origin) return origin;
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "https";
  return host ? `${protocol}://${host}` : "";
}

export async function logIn(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const values = { email: String(formData.get("email") ?? "") };
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, values };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: NOT_CONFIGURED, values };

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    const unconfirmed = error.code === "email_not_confirmed";
    return {
      error: unconfirmed
        ? "Please confirm your email first. Open the link we sent you, then log in."
        : "That email and password don't match. Please try again.",
      values,
    };
  }

  revalidatePath("/", "layout");
  redirect(safeNext(formData.get("next")));
}

export async function signUp(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const values = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    goal: String(formData.get("goal") ?? ""),
  };
  const parsed = signupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    goal: formData.get("goal"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message, values };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: NOT_CONFIGURED, values };

  const origin = await siteOrigin();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      // Read by the database trigger that creates the student's profile.
      data: {
        full_name: parsed.data.fullName,
        learning_goal: parsed.data.goal,
      },
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });

  if (error) {
    console.error("[signup] Supabase sign-up failed:", error.message);
    return {
      error:
        error.code === "weak_password"
          ? "Please choose a stronger password."
          : "We couldn't create your account just now. Please try again in a minute.",
      values,
    };
  }

  // With "Confirm email" switched off in Supabase, the student is signed
  // in straight away. Otherwise they need to open the confirmation link.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return {
    message:
      "Almost there. We've sent a confirmation link to your email. Open it to finish creating your account.",
  };
}

export async function logOut() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
