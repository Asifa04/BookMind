"use client"

import { useEffect, useState } from "react"
import { BookGrid } from "@/components/book-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { getPersonalizedRecommendations, mockBooks, additionalBooks } from "@/lib/books"
import type { Book } from "@/lib/types"
import Link from "next/link"
import { BookOpen, Sparkles, TrendingUp, Users } from "lucide-react"

export default function RecommendationsPage() {
  const { user } = useAuth()
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<Book[]>([])
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([])
  const [newReleases, setNewReleases] = useState<Book[]>([])
  const [similarUserRecs, setSimilarUserRecs] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        // For logged in users, get personalized recommendations
        if (user) {
          const userPreferences = user.favoriteGenres || ["Fiction", "Fantasy"]
          const personalized = await getPersonalizedRecommendations(user.id, userPreferences)
          setPersonalizedRecommendations(personalized)
        } else {
          // For non-logged in users, show popular books
          setPersonalizedRecommendations(mockBooks.slice(0, 5))
        }

        // Set other recommendation categories
        // In a real app, these would come from the recommendation engine
        setTrendingBooks([...mockBooks, ...additionalBooks].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 5))

        setNewReleases([...mockBooks, ...additionalBooks].sort((a, b) => b.publishedYear - a.publishedYear).slice(0, 5))

        setSimilarUserRecs([...mockBooks, ...additionalBooks].sort(() => 0.5 - Math.random()).slice(0, 5))

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading recommendations:", error)
        setIsLoading(false)
      }
    }

    loadRecommendations()
  }, [user])

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
        <h1 className="mb-2 text-3xl font-bold">Your Recommendations</h1>
        <p className="text-muted-foreground">
          {user
            ? "Personalized book suggestions based on your reading history and preferences"
            : "Popular books you might enjoy"}
        </p>
      </div>

      {!user ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sign in for personalized recommendations</CardTitle>
            <CardDescription>
              Create an account or sign in to get book recommendations tailored to your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Tabs defaultValue="for-you" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="for-you" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>For You</span>
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </TabsTrigger>
          <TabsTrigger value="new-releases" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>New Releases</span>
          </TabsTrigger>
          <TabsTrigger value="similar-readers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Similar Readers</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="for-you">
          <BookGrid books={personalizedRecommendations} />
          <RecommendationExplanation
            title="Why these recommendations?"
            description={
              user
                ? `These books are recommended based on your favorite genres: ${(user.favoriteGenres || ["Fiction", "Fantasy"]).join(", ")}`
                : "These are popular books across all readers"
            }
          />
        </TabsContent>

        <TabsContent value="trending">
          <BookGrid books={trendingBooks} />
          <RecommendationExplanation
            title="Trending Books"
            description="These books are currently popular with readers across our platform"
          />
        </TabsContent>

        <TabsContent value="new-releases">
          <BookGrid books={newReleases} />
          <RecommendationExplanation
            title="New Releases"
            description="Recently published books that match your reading preferences"
          />
        </TabsContent>

        <TabsContent value="similar-readers">
          <BookGrid books={similarUserRecs} />
          <RecommendationExplanation
            title="From Similar Readers"
            description="Books enjoyed by readers with similar taste to yours"
          />
        </TabsContent>
      </Tabs>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Improve Your Recommendations</CardTitle>
            <CardDescription>Help us provide better book suggestions by updating your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/settings?tab=preferences">Update Reading Preferences</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/history">View Reading History</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function RecommendationExplanation({ title, description }: { title: string; description: string }) {
  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Our AI-powered recommendation engine analyzes reading patterns, preferences, and book characteristics to
            suggest titles you'll love. The more you interact with BookMind, the better your recommendations will
            become!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
