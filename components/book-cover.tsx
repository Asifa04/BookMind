"use client"

import type { Book } from "@/lib/types"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface BookCoverProps {
  book: Book
  className?: string
}

export function BookCover({ book, className }: BookCoverProps) {
  const [imageError, setImageError] = useState(false)

  // Generate a deterministic color based on the book title (for fallback)
  const generateColor = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    // Generate hue (0-360), saturation (60-90%), lightness (45-65%)
    const h = hash % 360
    const s = 60 + (hash % 30)
    const l = 45 + (hash % 20)

    return `hsl(${h}, ${s}%, ${l}%)`
  }

  // Generate a contrasting text color (black or white) based on background brightness
  const getTextColor = (hslStr: string) => {
    // Extract lightness from HSL
    const l = Number.parseInt(hslStr.split(",")[2].split("%")[0])
    return l > 50 ? "#000000" : "#ffffff"
  }

  const bgColor = generateColor(book.title)
  const textColor = getTextColor(bgColor)

  return (
    <div className={cn("relative overflow-hidden rounded-md", className)}>
      {book.coverImage && !imageError ? (
        <Image
          src={book.coverImage || "/placeholder.svg"}
          alt={`Cover for ${book.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageError(true)}
          unoptimized // Skip Next.js image optimization to avoid CORS issues
        />
      ) : (
        // Fallback if image fails to load
        <div
          className="flex h-full w-full flex-col items-center justify-center p-4 text-center"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <div className="mb-2 text-lg font-bold line-clamp-3">{book.title}</div>
          <div className="text-sm opacity-80">{book.author}</div>
        </div>
      )}
    </div>
  )
}
