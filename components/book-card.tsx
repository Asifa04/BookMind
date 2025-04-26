import type { Book } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { BookCover } from "@/components/book-cover"
import { BookRating } from "@/components/book-rating"
import Link from "next/link"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/books/${book.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <BookCover book={book} className="h-full w-full object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 font-semibold">{book.title}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">{book.author}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <BookRating rating={book.rating} />
          <span className="text-sm text-muted-foreground">{book.publishedYear}</span>
        </CardFooter>
      </Link>
    </Card>
  )
}
