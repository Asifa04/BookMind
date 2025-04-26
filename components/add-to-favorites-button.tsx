"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface AddToFavoritesButtonProps {
  bookId: string
  className?: string
}

export function AddToFavoritesButton({ bookId, className }: AddToFavoritesButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const toggleFavorite = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsLoading(true)

    try {
      // Toggle favorite status
      const response = await fetch(`/api/books/${bookId}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFavorite: !isFavorite,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update favorite status")
      }

      setIsFavorite(!isFavorite)

      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite
          ? "This book has been removed from your favorites."
          : "This book has been added to your favorites.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your favorites.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      className={cn(className)}
      onClick={toggleFavorite}
      disabled={isLoading}
    >
      <Heart className={cn("mr-2 h-4 w-4", isFavorite ? "fill-current" : "")} />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </Button>
  )
}
