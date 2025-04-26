import { createClient } from "@supabase/supabase-js"

// Server-side Supabase client (uses service role key)
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || ""
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  return createClient(supabaseUrl, supabaseKey)
}

// Client-side Supabase client (uses anon key)
let clientSupabaseClient: ReturnType<typeof createClient> | null = null

export function createClientSupabaseClient() {
  if (clientSupabaseClient) return clientSupabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  clientSupabaseClient = createClient(supabaseUrl, supabaseKey)
  return clientSupabaseClient
}
