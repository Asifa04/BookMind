import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const genre = searchParams.get("genre")
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  try {
    // Construct SQL query based on parameters
    let sql = "SELECT * FROM books"
    const params: any[] = []

    if (query || genre) {
      sql += " WHERE"

      if (query) {
        sql += " (title ILIKE $1 OR author ILIKE $1 OR isbn = $2)"
        params.push(`%${query}%`, query)
      }

      if (genre) {
        if (query) sql += " AND"
        sql += ` genre = $${params.length + 1}`
        params.push(genre)
      }
    }

    sql += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const books = await db.query(sql, params)

    return NextResponse.json({ books: books.rows })
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}
