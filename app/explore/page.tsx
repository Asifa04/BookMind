"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BookGrid } from "@/components/book-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/lib/types"

export default function ExplorePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentGenre, setCurrentGenre] = useState("all")

  useEffect(() => {
    // Load all books on component mount
    const loadBooks = async () => {
      const allBooks = await getAllBooks()
      setBooks(allBooks)
      setFilteredBooks(allBooks)
    }

    loadBooks()
  }, [])

  const handleGenreChange = async (genre: string) => {
    setCurrentGenre(genre)

    if (genre === "all") {
      setFilteredBooks(books)
    } else {
      const genreBooks = books.filter((book) => book.genre.toLowerCase() === genre.toLowerCase())
      setFilteredBooks(genreBooks)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      handleGenreChange(currentGenre)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = books.filter(
      (book) =>
        (currentGenre === "all" || book.genre.toLowerCase() === currentGenre.toLowerCase()) &&
        (book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.isbn.includes(query)),
    )

    setFilteredBooks(results)
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Explore Books</h1>

      <div className="mb-6">
        <form className="flex w-full max-w-lg items-center space-x-2" onSubmit={handleSearch}>
          <Input
            type="search"
            placeholder="Search books by title, author, or ISBN..."
            className="flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <Tabs defaultValue={currentGenre} className="mb-8" onValueChange={handleGenreChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="fiction">Fiction</TabsTrigger>
          <TabsTrigger value="non-fiction">Non-Fiction</TabsTrigger>
          <TabsTrigger value="mystery">Mystery</TabsTrigger>
          <TabsTrigger value="sci-fi">Sci-Fi</TabsTrigger>
          <TabsTrigger value="fantasy">Fantasy</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <BookGrid books={filteredBooks} />
        </TabsContent>
        <TabsContent value="fiction">
          <BookGrid books={filteredBooks} />
        </TabsContent>
        <TabsContent value="non-fiction">
          <BookGrid books={filteredBooks} />
        </TabsContent>
        <TabsContent value="mystery">
          <BookGrid books={filteredBooks} />
        </TabsContent>
        <TabsContent value="sci-fi">
          <BookGrid books={filteredBooks} />
        </TabsContent>
        <TabsContent value="fantasy">
          <BookGrid books={filteredBooks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
