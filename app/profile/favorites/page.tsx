"use client"

import { useEffect, useState } from "react"
import { BookGrid } from "@/components/book-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { mockBooks } from "@/lib/books"
import type { Book } from "@/lib/types"
import Link from "next/link"

export default function FavoritesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [favorites, setFavorites] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    // For demo purposes, we'll use the first 3 books as favorites
    setFavorites(mockBooks.slice(0, 3))
    setIsLoading(false)
  }, [user, router])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Your Favorite Books</h1>
        <p className="text-muted-foreground">Books you've marked as favorites</p>
      </div>

      {favorites.length > 0 ? (
        <>
          <BookGrid books={favorites} />

          <div className="mt-8 flex justify-end">
            <Button variant="outline">Export as PDF</Button>
          </div>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No favorites yet</CardTitle>
            <CardDescription>You haven't added any books to your favorites</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Browse our collection and click the "Add to Favorites" button on any book you love.
            </p>
            <Button asChild>
              <Link href="/explore">Explore Books</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
