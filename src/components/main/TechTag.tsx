"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { techTagInfo } from "@/constants/techTagInfo"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ITechTagProps {
  keyword: string
  variant?: 'default' | 'simple'
}

export default function TechTag({ keyword, variant = 'default' }: ITechTagProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!keyword) return null

  const normalizedKeyword = keyword.toLowerCase()
  const techTagUrl = techTagInfo[normalizedKeyword]?.url === "javascript:void(0)" ? "/contact" : techTagInfo[normalizedKeyword]?.url
  const techTagSource = techTagInfo[normalizedKeyword]?.imageSource

  const getDarkModeStyles = () => {
    switch (normalizedKeyword) {
      case 'react':
        return "brightness-[10]"
      case 'typescript':
        return "brightness-[10]"
      case 'graphcms':
        return "brightness-[2] contrast-[2] saturate-[2]"
      case 'hygraph':
        return "brightness-[2] contrast-[2] saturate-[2]"
      case 'vercel':
        return "invert brightness-[2] contrast-[2] saturate-[2]"
      case 'nextjs':
        return "invert brightness-[5] contrast-[2] saturate-200"
      case 'mail':
        return "invert brightness-[3] contrast-[3] saturate-[2]"
      case 'github':
        return "brightness-[10] contrast-[1.75]"
      case 'linkedin':
        return "brightness-100 hover:opacity-100"
      default:
        return "filter invert hue-rotate-180 contrast-[1.25]"
    }
  }

  const ImageComponent = (
    <div
      className={cn(
        "relative h-5 w-5",
        "inline-flex items-center justify-center",
        "opacity-100",
        mounted && theme === 'dark' && getDarkModeStyles()
      )}
    >
      <Image
        src={`/images/tech_tags/${normalizedKeyword}_icon.webp`}
        alt={keyword}
        width={20}
        height={20}
        className="grayscale hover:grayscale-0"
        data-imagesource={techTagSource}
      />
    </div>
  )

  return techTagUrl ? (
    <Link
      href={techTagUrl}
      className={cn(
        "text-xs font-medium transition-colors no-underline",
        variant === 'default' ? [
          "relative py-1.5",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:transition-transform after:duration-200",
          "hover:after:scale-x-100 after:bg-foreground/25"
        ] : [
          "hover:text-foreground/80",
          "after:hidden"
        ]
      )}
    >
      {ImageComponent}
    </Link>
  ) : (
    ImageComponent
  )
}
