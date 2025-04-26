export interface Book {
  id: string
  title: string
  author: string
  description: string
  genre: string
  publishedYear: number
  pages: number
  isbn: string
  coverImage?: string
  rating: number
  ratingCount: number
  language: string
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
  bio?: string
  favoriteGenres?: string[]
  memberSince?: string
}
