"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { BookOpen, Menu, Search, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()
  const [showSearch, setShowSearch] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 py-4">
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                    <BookOpen className="h-5 w-5" />
                    <span>BookMind</span>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    <Link href="/" className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                      Home
                    </Link>
                    <Link href="/explore" className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                      Explore
                    </Link>
                    <Link
                      href="/recommendations"
                      className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                    >
                      Recommendations
                    </Link>
                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/history"
                          className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Reading History
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth/login"
                          className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Login
                        </Link>
                        <Link
                          href="/auth/register"
                          className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>BookMind</span>
          </Link>

          {!isMobile && (
            <nav className="ml-8 flex gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
                Explore
              </Link>
              <Link href="/recommendations" className="text-sm font-medium transition-colors hover:text-primary">
                Recommendations
              </Link>
              {user && (
                <Link href="/history" className="text-sm font-medium transition-colors hover:text-primary">
                  History
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {showSearch ? (
            <div className="flex items-center gap-2">
              <Input type="search" placeholder="Search books..." className="w-[200px] md:w-[300px]" />
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/history">Reading History</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/favorites">Favorites</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
