import { Metadata } from "next"

interface SEOProps {
  metaDescription: string
  metaKeywords: string[]
  title: string
}

export function generateMetadata({ metaDescription, metaKeywords, title }: SEOProps): Metadata {
  return {
    title,
    description: metaDescription.replace(/^(.{152}[^\s]*).*/, "$1"),
    keywords: metaKeywords.join(", "),
  }
}
