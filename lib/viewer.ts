import { getCurrentUser } from "@/lib/supabase/server";
import type { Viewer } from "@/lib/types";

/** Name and email of the signed-in student, for headers and form pre-fill. */
export async function getViewer(): Promise<Viewer> {
  const user = await getCurrentUser();
  if (!user?.email) return null;
  const fullName = user.user_metadata?.full_name;
  return {
    name: typeof fullName === "string" ? fullName : "",
    email: user.email,
  };
}
