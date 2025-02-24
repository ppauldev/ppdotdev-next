import "../globals.css"
import type { Metadata, Viewport } from "next"
import Footer from "@/components/footer/Footer"

export const metadata: Metadata = {
  title: "phillippaul.dev | React, TypeScript, Clean Code",
  description: "This is the personal blog of Phillip Paul, a React/TypeScript developer from Berlin, Germany. The content is partially created by ChatGPT-4 to showcase and test the latest developments in generative AI.",
  keywords: "Software development, react, gatsby, graphql, graph cms, blog, typescript, javascript, python, clean code, testing, research, RPA, robotic process automation",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
}

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
