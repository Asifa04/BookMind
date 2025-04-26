import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message } = await request.json()

    // Get user's reading history for context
    const userHistory = await db.query(
      "SELECT b.title, b.author FROM user_books ub JOIN books b ON ub.book_id = b.id WHERE ub.user_id = $1 LIMIT 5",
      [user.id],
    )

    const readingHistory = userHistory.rows.map((book) => `${book.title} by ${book.author}`).join(", ")

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a helpful book recommendation assistant. The user's reading history includes: ${readingHistory || "No reading history available yet."}`,
      prompt: message,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
