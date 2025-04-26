"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { mockBooks } from "@/lib/books"
import type { Book } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookCover } from "@/components/book-cover"
import { CalendarDays, Clock, Star } from "lucide-react"

interface ReadingHistoryItem extends Book {
  dateRead: string
  status: "completed" | "reading" | "abandoned"
  progress?: number
  userRating?: number
}

export default function HistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    // For demo purposes, we'll create mock reading history
    const mockHistory: ReadingHistoryItem[] = [
      {
        ...mockBooks[0],
        dateRead: "2023-12-15",
        status: "completed",
        userRating: 5,
      },
      {
        ...mockBooks[1],
        dateRead: "2023-11-20",
        status: "completed",
        userRating: 4,
      },
      {
        ...mockBooks[2],
        dateRead: "2023-10-05",
        status: "completed",
        userRating: 5,
      },
      {
        ...mockBooks[3],
        dateRead: "",
        status: "reading",
        progress: 65,
      },
      {
        ...mockBooks[4],
        dateRead: "",
        status: "reading",
        progress: 30,
      },
      {
        ...mockBooks[5],
        dateRead: "2023-09-10",
        status: "abandoned",
        progress: 45,
      },
    ]

    setReadingHistory(mockHistory)
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

  const completedBooks = readingHistory.filter((book) => book.status === "completed")
  const currentlyReading = readingHistory.filter((book) => book.status === "reading")
  const abandonedBooks = readingHistory.filter((book) => book.status === "abandoned")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Reading History</h1>
        <p className="text-muted-foreground">Track your reading journey and progress</p>
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
                <span className="text-3xl font-bold">{completedBooks.length}</span>
                <span className="text-sm text-muted-foreground">Books Completed</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4">
                <span className="text-3xl font-bold">{currentlyReading.length}</span>
                <span className="text-sm text-muted-foreground">Currently Reading</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4">
                <span className="text-3xl font-bold">
                  {completedBooks.reduce((sum, book) => sum + (book.userRating || 0), 0) / completedBooks.length || 0}
                </span>
                <span className="text-sm text-muted-foreground">Avg. Rating</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4">
                <span className="text-3xl font-bold">{completedBooks.reduce((sum, book) => sum + book.pages, 0)}</span>
                <span className="text-sm text-muted-foreground">Pages Read</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="reading">Currently Reading</TabsTrigger>
          <TabsTrigger value="abandoned">Abandoned</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-6">
            {readingHistory.length > 0 ? (
              readingHistory.map((book) => <HistoryBookCard key={book.id} book={book} />)
            ) : (
              <EmptyHistoryMessage />
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-6">
            {completedBooks.length > 0 ? (
              completedBooks.map((book) => <HistoryBookCard key={book.id} book={book} />)
            ) : (
              <EmptyHistoryMessage />
            )}
          </div>
        </TabsContent>

        <TabsContent value="reading">
          <div className="space-y-6">
            {currentlyReading.length > 0 ? (
              currentlyReading.map((book) => <HistoryBookCard key={book.id} book={book} />)
            ) : (
              <EmptyHistoryMessage />
            )}
          </div>
        </TabsContent>

        <TabsContent value="abandoned">
          <div className="space-y-6">
            {abandonedBooks.length > 0 ? (
              abandonedBooks.map((book) => <HistoryBookCard key={book.id} book={book} />)
            ) : (
              <EmptyHistoryMessage />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HistoryBookCard({ book }: { book: ReadingHistoryItem }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/4 lg:w-1/6">
            <BookCover book={book} className="aspect-[2/3] h-auto w-full" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-xl font-bold">
              <Link href={`/books/${book.id}`} className="hover:underline">
                {book.title}
              </Link>
            </h3>
            <p className="mb-2 text-muted-foreground">{book.author}</p>

            <div className="mb-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-1 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                {book.status === "completed" ? (
                  <span>Finished on {new Date(book.dateRead).toLocaleDateString()}</span>
                ) : book.status === "reading" ? (
                  <span>Currently reading</span>
                ) : (
                  <span>Abandoned</span>
                )}
              </div>

              {book.status === "reading" && book.progress && (
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{book.progress}% complete</span>
                </div>
              )}

              {book.userRating && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Rated {book.userRating}/5</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {book.status === "reading" && (
                <>
                  <Button size="sm" variant="default">
                    Update Progress
                  </Button>
                  <Button size="sm" variant="outline">
                    Mark as Complete
                  </Button>
                </>
              )}
              {book.status === "completed" && !book.userRating && (
                <Button size="sm" variant="outline">
                  Rate this Book
                </Button>
              )}
              <Button size="sm" variant="outline" asChild>
                <Link href={`/books/${book.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyHistoryMessage() {
  return (
    <div className="rounded-lg border p-8 text-center">
      <h3 className="mb-2 text-xl font-medium">No reading history yet</h3>
      <p className="mb-4 text-muted-foreground">Start reading books to build your reading history.</p>
      <Button asChild>
        <Link href="/explore">Explore Books</Link>
      </Button>
    </div>
  )
}
