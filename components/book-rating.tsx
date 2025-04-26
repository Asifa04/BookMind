import { Star, StarHalf } from "lucide-react"

interface BookRatingProps {
  rating: number
}

export function BookRating({ rating }: BookRatingProps) {
  // Calculate full and half stars
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        } else if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} className="h-4 w-4 text-primary" />
        } else {
          return <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
        }
      })}
      <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
    </div>
  )
}
