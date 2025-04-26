"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookGrid } from "@/components/book-grid"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { mockBooks } from "@/lib/books"
import type { Book } from "@/lib/types"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [favorites, setFavorites] = useState<Book[]>([])
  const [readingHistory, setReadingHistory] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    // For demo purposes, we'll use mock data
    setFavorites(mockBooks.slice(0, 3))
    setReadingHistory(mockBooks.slice(3, 6))
    setIsLoading(false)
  }, [user, router])

  if (isLoading || !user) {
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
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.image || ""} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings">Edit Profile</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings?tab=preferences">Reading Preferences</Link>
            </Button>
            <Button variant="outline" size="sm">
              Export Favorites as PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Reading Stats</CardTitle>
            <CardDescription>Your reading activity at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-center rounded-lg border p-4">
                <span className="text-3xl font-bold">{readingHistory.length}</span>
                <span className="text-sm text-muted-foreground">Books Read</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4">
                <span className="text-3xl font-bold">{favorites.length}</span>
                <span className="text-sm text-muted-foreground">Favorites</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4">
                <span className="text-3xl font-bold">4.2</span>
                <span className="text-sm text-muted-foreground">Avg. Rating</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4">
                <span className="text-3xl font-bold">Fiction</span>
                <span className="text-sm text-muted-foreground">Top Genre</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            <CardDescription>Your bio and reading preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Bio</h3>
                <p>{user.bio || "No bio yet. Add one in your profile settings!"}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Fiction</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Fantasy</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Mystery</span>
                </div>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">Member Since</h3>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="favorites" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="history">Reading History</TabsTrigger>
          <TabsTrigger value="recommendations">Personalized Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="favorites">
          {favorites.length > 0 ? (
            <BookGrid books={favorites} />
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <h3 className="mb-2 text-xl font-medium">No favorites yet</h3>
              <p className="mb-4 text-muted-foreground">Start adding books to your favorites to see them here.</p>
              <Button asChild>
                <Link href="/explore">Explore Books</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="history">
          {readingHistory.length > 0 ? (
            <BookGrid books={readingHistory} />
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <h3 className="mb-2 text-xl font-medium">No reading history yet</h3>
              <p className="mb-4 text-muted-foreground">
                Your reading history will appear here once you start reading books.
              </p>
              <Button asChild>
                <Link href="/explore">Explore Books</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="recommendations">
          <BookGrid books={mockBooks.slice(6, 11)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
