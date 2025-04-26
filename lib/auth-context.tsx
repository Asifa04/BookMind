"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  // Simplified auth for demo purposes
  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0],
        email: email,
        bio: "I love reading books of all genres, especially fiction and fantasy.",
        favoriteGenres: ["Fiction", "Fantasy", "Mystery"],
        memberSince: new Date().toISOString(),
      }

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)

      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      })

      return mockUser
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name: name,
        email: email,
        bio: "",
        favoriteGenres: [],
        memberSince: new Date().toISOString(),
      }

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)

      toast({
        title: "Registration successful",
        description: `Welcome to BookMind, ${name}!`,
      })

      return mockUser
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
