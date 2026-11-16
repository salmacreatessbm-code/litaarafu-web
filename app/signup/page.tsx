import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell, SetupNotice } from "@/components/AuthShell";
import { SignupForm } from "@/components/AuthForms";
import { isSupabaseConfigured } from "@/lib/siteConfig";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Create your student account" };

export default async function SignupPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  return (
    <AuthShell
      title="Create your free student account"
      intro="Track your booked classes, your progress, and every root and topic you cover. It takes about a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-lapis underline">
            Log in
          </Link>
        </>
      }
    >
      {!isSupabaseConfigured && <SetupNotice />}
      <SignupForm />
    </AuthShell>
  );
}
