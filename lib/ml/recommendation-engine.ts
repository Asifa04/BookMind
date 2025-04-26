import type { Book } from "@/lib/types"
import { db } from "@/lib/db"

// Enhanced recommendation engine with collaborative filtering
export async function getRecommendations(
  userId: string,
  readBookIds: string[] = [],
  preferredGenres: string[] = [],
): Promise<Book[]> {
  try {
    // If user has no reading history, use content-based approach with genres
    if (readBookIds.length === 0) {
      return getContentBasedRecommendations(preferredGenres)
    }

    // Combine collaborative and content-based filtering
    const [collaborativeResults, contentResults] = await Promise.all([
      getCollaborativeFilteringRecommendations(userId, readBookIds),
      getContentBasedRecommendations(preferredGenres, readBookIds),
    ])

    // Merge and deduplicate results
    const mergedResults = [...collaborativeResults]

    // Add content-based results that aren't already in collaborative results
    for (const book of contentResults) {
      if (!mergedResults.some((b) => b.id === book.id)) {
        mergedResults.push(book)
      }
    }

    // Sort by a weighted score (rating * popularity)
    return mergedResults
      .sort((a, b) => b.rating * Math.log10(b.ratingCount) - a.rating * Math.log10(a.ratingCount))
      .slice(0, 10)
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return []
  }
}

// Collaborative filtering: Find books that similar users liked
async function getCollaborativeFilteringRecommendations(userId: string, readBookIds: string[]): Promise<Book[]> {
  try {
    // Find users who read similar books
    const similarUsersQuery = `
      SELECT DISTINCT ub.user_id 
      FROM user_books ub
      WHERE ub.book_id IN (${readBookIds.map((_, i) => `$${i + 1}`).join(",")})
      AND ub.user_id != $${readBookIds.length + 1}
      LIMIT 50
    `

    const similarUsers = await db.query(similarUsersQuery, [...readBookIds, userId])

    if (similarUsers.rows.length === 0) {
      return []
    }

    // Find books that these similar users liked but the current user hasn't read
    const recommendedBooksQuery = `
      SELECT b.* 
      FROM books b
      JOIN user_books ub ON b.id = ub.book_id
      WHERE ub.user_id IN (${similarUsers.rows.map((_, i) => `$${i + 1}`).join(",")})
      AND ub.rating >= 4
      AND b.id NOT IN (${readBookIds.map((_, i) => `$${i + similarUsers.rows.length + 1}`).join(",")})
      GROUP BY b.id
      ORDER BY COUNT(DISTINCT ub.user_id) DESC, b.rating DESC
      LIMIT 10
    `

    const params = [...similarUsers.rows.map((row) => row.user_id), ...readBookIds]

    const result = await db.query(recommendedBooksQuery, params)
    return result.rows
  } catch (error) {
    console.error("Error in collaborative filtering:", error)
    return []
  }
}

// Content-based filtering: Find books similar to user's preferences
async function getContentBasedRecommendations(
  preferredGenres: string[] = [],
  excludeBookIds: string[] = [],
): Promise<Book[]> {
  try {
    let query = `
      SELECT * FROM books 
      WHERE 1=1
    `

    const params: any[] = []

    // Exclude books the user has already read
    if (excludeBookIds.length > 0) {
      query += ` AND id NOT IN (${excludeBookIds.map((_, i) => `$${i + 1}`).join(",")})`
      params.push(...excludeBookIds)
    }

    // Filter by preferred genres if available
    if (preferredGenres.length > 0) {
      query += ` AND genre IN (${preferredGenres.map((_, i) => `$${i + params.length + 1}`).join(",")})`
      params.push(...preferredGenres)
    }

    // Order by rating and popularity
    query += ` ORDER BY rating DESC, rating_count DESC LIMIT 15`

    const result = await db.query(query, params)
    return result.rows
  } catch (error) {
    console.error("Error in content-based filtering:", error)
    return []
  }
}

// Train the recommendation model with new user data
export async function trainRecommendationModel(): Promise<void> {
  try {
    // In a real ML system, this would update model weights, retrain classifiers, etc.
    // For our simplified model, we'll just update some metadata that helps with recommendations

    // 1. Update genre popularity scores
    await db.query(`
      UPDATE books b
      SET popularity_score = (
        SELECT COUNT(*) 
        FROM user_books ub 
        WHERE ub.book_id = b.id
      )
    `)

    // 2. Update genre affinity scores for users
    await db.query(`
      INSERT INTO user_genre_affinity (user_id, genre, affinity_score)
      SELECT 
        ub.user_id,
        b.genre,
        AVG(ub.rating) * COUNT(ub.id) as affinity_score
      FROM user_books ub
      JOIN books b ON ub.book_id = b.id
      GROUP BY ub.user_id, b.genre
      ON CONFLICT (user_id, genre) 
      DO UPDATE SET 
        affinity_score = EXCLUDED.affinity_score,
        updated_at = CURRENT_TIMESTAMP
    `)

    console.log("Recommendation model training completed")
  } catch (error) {
    console.error("Error training recommendation model:", error)
    throw error
  }
}
