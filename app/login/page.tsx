import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell, SetupNotice } from "@/components/AuthShell";
import { LoginForm } from "@/components/AuthForms";
import { isSupabaseConfigured } from "@/lib/siteConfig";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  if (await getCurrentUser()) redirect("/dashboard");

  return (
    <AuthShell
      title="Welcome back"
      intro="Log in to see your booked classes, your progress, and every root you've covered so far."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-semibold text-lapis underline">
            Create a free student account
          </Link>
        </>
      }
    >
      {!isSupabaseConfigured && <SetupNotice />}
      <LoginForm
        next={next}
        notice={
          error === "confirmation"
            ? "That confirmation link has expired or was already used. Try logging in, or sign up again to get a new link."
            : undefined
        }
      />
    </AuthShell>
  );
}
