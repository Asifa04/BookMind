"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

const genres = [
  { id: "fiction", label: "Fiction" },
  { id: "non-fiction", label: "Non-Fiction" },
  { id: "mystery", label: "Mystery" },
  { id: "sci-fi", label: "Science Fiction" },
  { id: "fantasy", label: "Fantasy" },
  { id: "romance", label: "Romance" },
  { id: "thriller", label: "Thriller" },
  { id: "biography", label: "Biography" },
  { id: "history", label: "History" },
  { id: "self-help", label: "Self-Help" },
  { id: "poetry", label: "Poetry" },
  { id: "horror", label: "Horror" },
]

export default function OnboardingPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { toast } = useToast()

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres((prev) => (prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]))
  }

  const handleSubmit = async () => {
    try {
      // Save user preferences
      await fetch("/api/user/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genres: selectedGenres,
        }),
      })

      toast({
        title: "Preferences saved",
        description: "Your reading preferences have been saved successfully.",
      })

      router.push("/recommendations")
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: "There was a problem saving your preferences. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Welcome to BookMind</h1>
        <p className="text-muted-foreground">
          Let&apos;s personalize your experience by understanding your reading preferences
        </p>
      </div>

      {step === 1 && (
        <Card className="w-full max-w-3xl">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-xl font-semibold">Select your favorite genres</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Choose at least 3 genres that interest you the most. This helps us recommend books you&apos;ll love.
            </p>

            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {genres.map((genre) => (
                <div key={genre.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={genre.id}
                    checked={selectedGenres.includes(genre.id)}
                    onCheckedChange={() => handleGenreToggle(genre.id)}
                  />
                  <Label htmlFor={genre.id} className="cursor-pointer">
                    {genre.label}
                  </Label>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={selectedGenres.length < 3}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="w-full max-w-3xl">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-xl font-semibold">Tell us about your reading habits</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              This information helps us tailor recommendations to your reading style.
            </p>

            <div className="mb-6 space-y-4">
              <div>
                <Label htmlFor="reading-frequency">How often do you read?</Label>
                <select
                  id="reading-frequency"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">A few times a week</option>
                  <option value="monthly">A few times a month</option>
                  <option value="rarely">Rarely</option>
                </select>
              </div>

              <div>
                <Label htmlFor="preferred-language">Preferred language for books</Label>
                <select
                  id="preferred-language"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="english">English</option>
                  <option value="tamil">Tamil</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Finish</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
