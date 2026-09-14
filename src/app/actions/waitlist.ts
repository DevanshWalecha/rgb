"use server";

import { createAdminClient } from "@/app/lib/supabase/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function joinWaitlist(formData: FormData) {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { ok: false, error: "Invalid email" };

  const email = parsed.data.email.trim().toLowerCase();
  const supabase = createAdminClient();

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error?.code === "23505") {
    return { ok: true, message: "You're already on the list." };
  }
  if (error) {
    console.error("Waitlist insert failed:", error);
    return { ok: false, error: "Something went wrong." };
  }

  return { ok: true, message: "You're on the list!" };
}