import { BookCover } from "@/components/book-cover"
import { Button } from "@/components/ui/button"
import { getBookById, getSimilarBooks } from "@/lib/books"
import { BookRating } from "@/components/book-rating"
import { BookGrid } from "@/components/book-grid"
import { AddToFavoritesButton } from "@/components/add-to-favorites-button"
import { notFound } from "next/navigation"

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  const similarBooks = await getSimilarBooks(params.id)

  return (
    <div className="container py-8">
      <div className="mb-12 grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <BookCover book={book} className="mb-4 h-80 w-56" />
          <div className="flex w-full gap-2">
            <AddToFavoritesButton bookId={book.id} className="flex-1" />
            <Button variant="outline" className="flex-1">
              Share
            </Button>
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="mb-2 text-3xl font-bold">{book.title}</h1>
          <p className="mb-4 text-xl text-muted-foreground">by {book.author}</p>

          <div className="mb-4 flex items-center gap-4">
            <BookRating rating={book.rating} />
            <span className="text-sm text-muted-foreground">{book.ratingCount} ratings</span>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">About this book</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Genre</h3>
              <p>{book.genre}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Published</h3>
              <p>{book.publishedYear}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Pages</h3>
              <p>{book.pages}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">ISBN</h3>
              <p>{book.isbn}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Available Languages</h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                English
              </Button>
              <Button variant="outline" size="sm">
                Tamil
              </Button>
              <Button variant="outline" size="sm">
                Hindi
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Similar Books You Might Enjoy</h2>
        <BookGrid books={similarBooks} />
      </section>
    </div>
  )
}
