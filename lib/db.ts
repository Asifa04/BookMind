import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the server
const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

// For compatibility with existing code
export const db = {
  query: async (text: string, params?: any[]) => {
    // Convert pg-style query to Supabase query
    // This is a simplified version and may need adjustments for complex queries
    if (text.trim().toLowerCase().startsWith("select")) {
      const { data, error } = await supabase.from("your_table").select("*")
      if (error) throw error
      return { rows: data }
    } else {
      // For non-SELECT queries, you'll need to implement the appropriate Supabase calls
      // This is just a placeholder
      const { data, error } = await supabase.rpc("execute_sql", { sql: text, params })
      if (error) throw error
      return { rows: data || [] }
    }
  },
}
