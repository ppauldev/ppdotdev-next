"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState, Suspense } from "react"

const navigationItems: string[][] = [
  // ["coffee", "Books + Coffee"],
  ["cleancode", "Clean code"],
  ["protocols", "Protocols"],
  ["research", "Research"],
  ["testing", "Testing"],
].map(([value, label]) => [`/?category=${value}`, label])

// Add this keyframe animation to your globals.css
const shimmerStyles = `
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
`.trim()

function NavigationContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')
  const [open, setOpen] = useState(false)

  const isActiveLink = (path: string) => {
    if (path === '/') return pathname === '/' && !currentCategory
    return path === `/?category=${currentCategory}`
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isActiveLink(path)) {
      e.preventDefault()
      window.location.href = '/'
    }
    setOpen(false)
  }

  return (
    <>
      <style jsx global>{shimmerStyles}</style>
      <motion.header
        className={cn(
          "fixed top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/0 shadow-none transition-all duration-0 bg-background/95 supports-[backdrop-filter]:bg-background/60 shadow-sm"
        )}
      >
        <div className="container flex h-16 items-center">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="inline-flex items-center">
              <div
                className="relative h-10 w-10 rounded-md overflow-hidden group"
              >
                <Image
                  src="/images/logo_ppdotdev.webp"
                  alt="Logo"
                  fill
                  sizes="40px"
                  className="rounded-md saturate-[0.3] group-hover:saturate-100 transition-all duration-300"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1s infinite'
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Center: Navigation (Desktop) and Menu (Mobile) */}
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map(([path, label]) => (
                <Link
                  key={path}
                  href={path}
                  onClick={(e) => handleNavClick(e, path)}
                  className={cn(
                    "relative py-1.5 text-sm font-medium transition-all duration-200",
                    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:transition-transform after:duration-200",
                    isActiveLink(path)
                      ? "text-foreground after:scale-x-100 after:bg-foreground"
                      : [
                        "text-foreground/60",
                        "hover:text-foreground/80 hover:after:scale-x-100 after:bg-foreground/25"
                      ]
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-6 mt-8">
                  {navigationItems.map(([path, label]) => (
                    <Link
                      key={path}
                      href={path}
                      onClick={(e) => handleNavClick(e, path)}
                      className={cn(
                        "text-2xl font-medium transition-colors w-fit",
                        isActiveLink(path)
                          ? "text-foreground border-b-2 border-foreground"
                          : "text-foreground/60 hover:text-foreground/80"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex-1 flex justify-end">
            <ModeToggle />
          </div>
        </div>
      </motion.header>
    </>
  )
}

export default function Navigation() {
  return (
    <Suspense fallback={
      <motion.header className={cn("fixed top-0 z-50 w-full border-b bg-background/95 shadow-sm")}>
        <div className="container flex h-16 items-center">
          {/* Simplified header for loading state */}
        </div>
      </motion.header>
    }>
      <NavigationContent />
    </Suspense>
  )
}
