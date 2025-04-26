import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { mockBooks } from "@/lib/books"

export async function POST() {
  try {
    // Create tables if they don't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS books (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        description TEXT,
        genre VARCHAR(100) NOT NULL,
        published_year INTEGER,
        pages INTEGER,
        isbn VARCHAR(20) UNIQUE,
        cover_image VARCHAR(255),
        rating DECIMAL(3, 1) DEFAULT 0,
        rating_count INTEGER DEFAULT 0,
        language VARCHAR(50) DEFAULT 'English',
        popularity_score INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insert books
    for (const book of mockBooks) {
      await db.query(
        `
        INSERT INTO books (
          id, title, author, description, genre, published_year, 
          pages, isbn, cover_image, rating, rating_count, language
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (isbn) DO UPDATE SET
          title = EXCLUDED.title,
          author = EXCLUDED.author,
          description = EXCLUDED.description,
          genre = EXCLUDED.genre,
          published_year = EXCLUDED.published_year,
          pages = EXCLUDED.pages,
          cover_image = EXCLUDED.cover_image,
          rating = EXCLUDED.rating,
          rating_count = EXCLUDED.rating_count,
          language = EXCLUDED.language,
          updated_at = CURRENT_TIMESTAMP
        `,
        [
          book.id,
          book.title,
          book.author,
          book.description,
          book.genre,
          book.publishedYear,
          book.pages,
          book.isbn,
          book.coverImage,
          book.rating,
          book.ratingCount,
          book.language,
        ],
      )
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully", count: mockBooks.length })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      { error: "Failed to seed database", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
