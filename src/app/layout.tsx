import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import Navigation from "@/components/header/Navigation"
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
            <Navigation />
            <section className="flex-1 pt-16 relative bg-[linear-gradient(to_bottom,transparent_50%,hsl(var(--muted))_50%)]">
              {children}
            </section>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
