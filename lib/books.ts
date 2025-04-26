import type { Book } from "@/lib/types"

// Updated mock data with real book cover images
export const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    genre: "Fiction",
    publishedYear: 1925,
    pages: 180,
    isbn: "9780743273565",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
    rating: 4.2,
    ratingCount: 3842,
    language: "English",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "The story of young Scout Finch, her brother Jem, and their father Atticus, as they navigate issues of race and class in their small Southern town.",
    genre: "Fiction",
    publishedYear: 1960,
    pages: 281,
    isbn: "9780061120084",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
    rating: 4.5,
    ratingCount: 4921,
    language: "English",
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
    genre: "Romance",
    publishedYear: 1813,
    pages: 279,
    isbn: "9780141439518",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
    rating: 4.3,
    ratingCount: 3254,
    language: "English",
  },
  {
    id: "4",
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel set in Airstrip One, formerly Great Britain, a province of the superstate Oceania, whose residents are victims of perpetual war, omnipresent government surveillance, and public manipulation.",
    genre: "Sci-Fi",
    publishedYear: 1949,
    pages: 328,
    isbn: "9780451524935",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
    rating: 4.6,
    ratingCount: 5102,
    language: "English",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "The adventure of Bilbo Baggins, a hobbit who embarks on an unexpected journey to reclaim the Lonely Mountain from the dragon Smaug.",
    genre: "Fantasy",
    publishedYear: 1937,
    pages: 310,
    isbn: "9780547928227",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
    rating: 4.7,
    ratingCount: 4587,
    language: "English",
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "The story of Holden Caulfield, a teenage boy who has been expelled from prep school and is wandering around New York City.",
    genre: "Fiction",
    publishedYear: 1951,
    pages: 277,
    isbn: "9780316769488",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg",
    rating: 4.0,
    ratingCount: 2987,
    language: "English",
  },
  {
    id: "7",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "An epic high-fantasy novel that follows hobbits Frodo Baggins, Sam Gamgee, and others on their quest to destroy the One Ring.",
    genre: "Fantasy",
    publishedYear: 1954,
    pages: 1178,
    isbn: "9780618640157",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
    rating: 4.9,
    ratingCount: 6254,
    language: "English",
  },
  {
    id: "8",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description:
      "The first novel in the Harry Potter series, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.",
    genre: "Fantasy",
    publishedYear: 1997,
    pages: 223,
    isbn: "9780747532743",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg",
    rating: 4.8,
    ratingCount: 7321,
    language: "English",
  },
  {
    id: "9",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A philosophical novel about a young Andalusian shepherd who dreams of finding a worldly treasure and embarks on a journey to find it.",
    genre: "Fiction",
    publishedYear: 1988,
    pages: 197,
    isbn: "9780062315007",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
    rating: 4.6,
    ratingCount: 4123,
    language: "English",
  },
  {
    id: "10",
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "A dystopian novel set in a futuristic World State, inhabited by genetically modified citizens and an intelligence-based social hierarchy.",
    genre: "Sci-Fi",
    publishedYear: 1932,
    pages: 311,
    isbn: "9780060850524",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575509280i/5129.jpg",
    rating: 4.5,
    ratingCount: 3876,
    language: "English",
  },
  {
    id: "11",
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    description:
      "The story of Amir, a young boy from Kabul, and his journey of redemption as he confronts his past and seeks forgiveness.",
    genre: "Fiction",
    publishedYear: 2003,
    pages: 371,
    isbn: "9781594631931",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg",
    rating: 4.7,
    ratingCount: 4532,
    language: "English",
  },
  {
    id: "12",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description:
      "A mystery thriller novel that follows symbologist Robert Langdon as he investigates a murder in the Louvre Museum and discovers a battle between the Priory of Sion and Opus Dei.",
    genre: "Mystery",
    publishedYear: 2003,
    pages: 454,
    isbn: "9780307474278",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579621267i/968.jpg",
    rating: 4.1,
    ratingCount: 5123,
    language: "English",
  },
  {
    id: "13",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description:
      "In a dystopian future, the nation of Panem forces each of its twelve districts to send a teenage boy and girl to compete in the Hunger Games, a televised fight to the death.",
    genre: "Sci-Fi",
    publishedYear: 2008,
    pages: 374,
    isbn: "9780439023481",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg",
    rating: 4.5,
    ratingCount: 6234,
    language: "English",
  },
  {
    id: "14",
    title: "The Shining",
    author: "Stephen King",
    description:
      "The story of Jack Torrance, an aspiring writer and recovering alcoholic who accepts a position as the off-season caretaker of the historic Overlook Hotel in the Colorado Rockies.",
    genre: "Horror",
    publishedYear: 1977,
    pages: 447,
    isbn: "9780307743657",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg",
    rating: 4.7,
    ratingCount: 3987,
    language: "English",
  },
  {
    id: "15",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    description:
      "A psychological thriller that follows journalist Mikael Blomkvist and hacker Lisbeth Salander as they investigate a wealthy family's dark secrets.",
    genre: "Mystery",
    publishedYear: 2005,
    pages: 672,
    isbn: "9780307454546",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327868566i/2429135.jpg",
    rating: 4.4,
    ratingCount: 4765,
    language: "English",
  },
]

// More books for recommendations
export const additionalBooks: Book[] = [
  {
    id: "16",
    title: "Dune",
    author: "Frank Herbert",
    description:
      'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    genre: "Sci-Fi",
    publishedYear: 1965,
    pages: 412,
    isbn: "9780441172719",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
    rating: 4.6,
    ratingCount: 8765,
    language: "English",
  },
  {
    id: "17",
    title: "The Martian",
    author: "Andy Weir",
    description:
      "Stranded on Mars, astronaut Mark Watney must use his scientific ingenuity to survive until a rescue mission can be launched.",
    genre: "Sci-Fi",
    publishedYear: 2011,
    pages: 369,
    isbn: "9780553418026",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1413706054i/18007564.jpg",
    rating: 4.7,
    ratingCount: 7654,
    language: "English",
  },
  {
    id: "18",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description:
      "A psychological thriller about a woman who shoots her husband and then stops speaking, and the therapist determined to unravel the mystery of her silence.",
    genre: "Mystery",
    publishedYear: 2019,
    pages: 325,
    isbn: "9781250301697",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg",
    rating: 4.5,
    ratingCount: 6543,
    language: "English",
  },
  {
    id: "19",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    description:
      "A coming-of-age story about a young girl raised in isolation in the marshes of North Carolina who becomes a suspect in a murder investigation.",
    genre: "Fiction",
    publishedYear: 2018,
    pages: 368,
    isbn: "9780735219090",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg",
    rating: 4.8,
    ratingCount: 7890,
    language: "English",
  },
  {
    id: "20",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    description:
      "The first day of the autobiography of Kvothe, an adventurer and musician, as he recounts his life story to a chronicler.",
    genre: "Fantasy",
    publishedYear: 2007,
    pages: 662,
    isbn: "9780756404741",
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg",
    rating: 4.9,
    ratingCount: 8901,
    language: "English",
  },
]

// Combine all books for the full catalog
export const allBooks = [...mockBooks, ...additionalBooks]

export async function getRecommendedBooks(): Promise<Book[]> {
  // In a real app, this would fetch from the database
  // For now, return mock data
  return mockBooks.slice(0, 5)
}

export async function getAllBooks(): Promise<Book[]> {
  // In a real app, this would fetch from the database
  return allBooks
}

export async function getBooksByGenre(genre: string): Promise<Book[]> {
  // In a real app, this would fetch from the database
  return allBooks.filter((book) => book.genre.toLowerCase() === genre.toLowerCase())
}

export async function getBookById(id: string): Promise<Book | null> {
  // In a real app, this would fetch from the database
  const book = allBooks.find((book) => book.id === id)
  return book || null
}

export async function getSimilarBooks(id: string): Promise<Book[]> {
  // In a real app, this would use the recommendation engine
  const book = await getBookById(id)
  if (!book) return []

  // Return books of the same genre
  return allBooks.filter((b) => b.id !== id && b.genre === book.genre).slice(0, 4)
}

export async function getUserFavorites(userId: string): Promise<Book[]> {
  // In a real app, this would fetch from the database
  // For now, return mock data
  return mockBooks.slice(0, 3)
}

export async function getUserReadingHistory(userId: string): Promise<Book[]> {
  // In a real app, this would fetch from the database
  // For now, return mock data
  return mockBooks.slice(3, 6)
}

// New function for personalized recommendations
export async function getPersonalizedRecommendations(userId: string, preferences: string[] = []): Promise<Book[]> {
  // In a real app, this would use a sophisticated recommendation algorithm
  // For now, we'll simulate personalized recommendations

  // If we have user preferences, prioritize those genres
  if (preferences.length > 0) {
    const preferredGenreBooks = allBooks.filter((book) =>
      preferences.some((genre) => book.genre.toLowerCase() === genre.toLowerCase()),
    )

    // If we have enough books from preferred genres, return those
    if (preferredGenreBooks.length >= 5) {
      return preferredGenreBooks.slice(0, 5)
    }

    // Otherwise, add some highly-rated books to fill out the recommendations
    const remainingCount = 5 - preferredGenreBooks.length
    const otherRecommendations = allBooks
      .filter((book) => !preferredGenreBooks.some((pb) => pb.id === book.id))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, remainingCount)

    return [...preferredGenreBooks, ...otherRecommendations]
  }

  // If no preferences, return highest rated books
  return allBooks.sort((a, b) => b.rating - a.rating).slice(0, 5)
}
