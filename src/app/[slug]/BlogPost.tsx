'use client'

import { useEffect, useState, useMemo } from "react"
import moment from "moment"
import { RichText } from "@graphcms/rich-text-react-renderer"
import Link from "next/link"
import { getQueryPostBySlug } from "@/constants/queries"
import { IPostProps } from "@/types/base.types"
import React from "react"
import { getHighlighter } from 'shiki'
import { Toast } from "@/components/ui/toast"
import { ArrowUp } from "lucide-react"
import TechTag from '@/components/main/TechTag'
import { Skeleton } from "@/components/ui/skeleton"

import "./code-styles.css"
import "./page.css"

interface ITagsList {
  keywords: string[],
}

const TagsList: React.FC<ITagsList> = ({ keywords }): React.ReactElement => {
  return (
    <div className="flex items-center gap-2">
      <span>•</span>
      {keywords.map((keyword) => (
        <TechTag key={keyword} keyword={keyword} variant="simple" />
      ))}
    </div>
  )
}

function PostSkeleton() {
  return (
    <div className="post-template">
      <article className="post">
        <div className="post-content">
          <div className="post-content-intro">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-12 w-3/4 mb-8" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-32 w-full rounded-xl my-8" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </article>
    </div>
  )
}

export default function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<IPostProps | null>(null)
  const [highlighter, setHighlighter] = useState<any>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    fetchPost()
    getHighlighter({
      themes: ['github-dark'],
      langs: ['typescript', 'javascript', 'python']
    }).then(h => setHighlighter(h))

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const CodeBlock = useMemo(() => ({ children }: { children: any }) => {
    const content = React.isValidElement(children)
      ? (children as { props: { content: Array<{ text: string }> } }).props.content?.[0]?.text
      : typeof children === 'string'
        ? children
        : String(children)

    const highlighted = highlighter?.codeToHtml(content, {
      lang: 'typescript',
      themes: {
        light: 'github-dark',
        dark: 'github-dark'
      }
    })

    const [showToast, setShowToast] = useState(false)

    const copyToClipboard = () => {
      navigator.clipboard.writeText(content)
      setShowToast(false)
      setTimeout(() => setShowToast(true), 0)
    }

    return (
      <>
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute top-3 right-4 flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="copy-button"
              aria-label="Copy code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            <span className="text-xs text-slate-400">typescript</span>
          </div>
          <div
            className="overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: highlighted || '' }}
          />
        </div>
        {showToast && <Toast message="Copied to clipboard!" />}
      </>
    )
  }, [highlighter])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function fetchPost() {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPH_CMS_API_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: getQueryPostBySlug(slug) })
    })
    const { data } = await res.json()
    setPost(data.post)
  }

  if (!post) return <PostSkeleton />

  return (
    <div className="post-template">
      <article className="post">
        <div className="post-content">
          <div className="post-content-intro">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span>·</span>
              <span>{moment(post.date).format("LL")}</span>
              <TagsList keywords={post.tags || []} />
            </div>
            <h1>{post.title}</h1>
          </div>
          {post.rtBody?.raw && (
            <RichText
              content={post.rtBody.raw}
              renderers={{
                a: ({ children, href }) => <Link href={href ?? "#"}>{children}</Link>,
                code_block: CodeBlock,
                img: ({ src, altText }) => (
                  <div className="post-image-wrapper">
                    <img src={src} alt={altText} width="100%" />
                  </div>
                ),
              }}
            />
          )}
        </div>
      </article>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-opacity z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  )
} 