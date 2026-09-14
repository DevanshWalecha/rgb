import { createBrowserClient } from "@supabase/ssr";

console.log("BUILD ENV CHECK:", {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonDefined: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  anonPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 8),
});

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}