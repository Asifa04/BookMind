import { BookGrid } from "@/components/book-grid"
import { Button } from "@/components/ui/button"
import { getRecommendedBooks } from "@/lib/books"
import Link from "next/link"

export default async function Home() {
  const recommendedBooks = await getRecommendedBooks()

  return (
    <div className="container py-8">
      <section className="mb-12">
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Discover Your Next Favorite Book</h1>
            <p className="mb-6 text-lg">
              Personalized recommendations powered by AI, tailored to your unique reading preferences.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/explore">Explore Books</Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Recommended For You</h2>
          <Button asChild variant="outline">
            <Link href="/recommendations">View All</Link>
          </Button>
        </div>
        <BookGrid books={recommendedBooks} />
      </section>

      <section className="mb-12">
        <div className="rounded-lg border bg-card p-8 text-card-foreground shadow">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" x2="12" y1="22" y2="12" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-medium">Personalized Recommendations</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your reading history to suggest books you'll love.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-medium">Advanced Search</h3>
              <p className="text-muted-foreground">
                Find exactly what you're looking for with our powerful search tools.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454Z" />
                  <path d="m17 4 2 2" />
                  <path d="m19 2 2 2" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-medium">Multilingual Support</h3>
              <p className="text-muted-foreground">
                Enjoy recommendations in multiple languages including Tamil and Hindi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
