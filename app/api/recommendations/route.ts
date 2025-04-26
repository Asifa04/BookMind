import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { getRecommendations } from "@/lib/ml/recommendation-engine"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      // Return generic recommendations for non-logged in users
      const popularBooks = await db.query("SELECT * FROM books ORDER BY rating DESC, rating_count DESC LIMIT 10")

      return NextResponse.json({ books: popularBooks.rows })
    }

    // Get user's reading history and preferences
    const userHistory = await db.query("SELECT book_id FROM user_books WHERE user_id = $1", [user.id])

    const userPreferences = await db.query("SELECT genre FROM user_preferences WHERE user_id = $1", [user.id])

    // Get personalized recommendations
    const bookIds = userHistory.rows.map((row) => row.book_id)
    const genres = userPreferences.rows.map((row) => row.genre)

    const recommendations = await getRecommendations(user.id, bookIds, genres)

    return NextResponse.json({ books: recommendations })
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
