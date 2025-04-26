import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const bookId = params.id
    const { isFavorite } = await request.json()

    if (isFavorite) {
      // Add to favorites
      await db.query("INSERT INTO user_favorites (user_id, book_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [
        user.id,
        bookId,
      ])
    } else {
      // Remove from favorites
      await db.query("DELETE FROM user_favorites WHERE user_id = $1 AND book_id = $2", [user.id, bookId])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating favorite status:", error)
    return NextResponse.json({ error: "Failed to update favorite status" }, { status: 500 })
  }
}
