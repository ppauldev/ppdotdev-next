import Navigation from "@/components/header/Navigation"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Footer from "@/components/footer/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "phillippaul.dev | React, TypeScript, Clean Code",
  description: "This is the personal blog of Phillip Paul, a React/TypeScript developer from Berlin, Germany. The content is partially created by ChatGPT-4 to showcase and test the latest developments in generative AI.",
  keywords: "Software development, react, gatsby, graphql, graph cms, blog, typescript, javascript, python, clean code, testing, research, RPA, robotic process automation",
  viewport: "width=device-width, initial-scale=1.0"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="webview">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
