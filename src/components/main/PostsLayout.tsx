"use client"

import { PreviewTile } from "@/components/main/PreviewTile"
import PostTile from "@/components/main/PostTile"
import { IPostTileProps } from "@/types/base.types"

interface PostsLayoutProps {
  isLoading: boolean
  error: any
  posts: IPostTileProps[] | undefined
}

export default function PostsLayout({ isLoading, error, posts }: PostsLayoutProps) {
  if (isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-222px)] items-center justify-center bg-muted py-10">
        <section className="container grid justify-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <PreviewTile backgroundColor="transparent" />
        </section>
      </main>
    )
  }

  if (!posts) return null
  if (error) throw new Error(error)

  return (
    <main className="flex min-h-[calc(100vh-222px)] items-center justify-center bg-muted py-10">
      <section className="container grid justify-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: IPostTileProps) => (
          <PostTile key={post.slug} post={post} />
        ))}
      </section>
    </main>
  )
} 