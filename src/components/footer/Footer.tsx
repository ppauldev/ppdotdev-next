"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import TechTag from "../main/TechTag"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground/60 font-medium tracking-wider">
              © {currentYear} | Phillip Paul
            </p>
          </div>

          {/* Center: Contact */}
          <div className="flex justify-center">
            <div className="flex items-center gap-4 bg-muted/20 hover:bg-muted/30 transition-colors rounded-full px-5 py-1.5">
              <TechTag keyword="github" />
              <TechTag keyword="linkedin" />
              <TechTag keyword="mail" />
            </div>
          </div>

          {/* Right: Powered by */}
          <div className="flex justify-center md:justify-end">
            <div className="inline-flex items-center gap-3 bg-muted/20 hover:bg-muted/30 transition-colors rounded-full px-5 py-1.5">
              <TechTag keyword="react" />
              <TechTag keyword="typescript" />
              <TechTag keyword="nextjs" />
              <TechTag keyword="graphcms" />
              <TechTag keyword="vercel" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
