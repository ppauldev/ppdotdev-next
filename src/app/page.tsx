"use client"

import useSWR from "swr"
import request from "graphql-request"
import { useSearchParams } from "next/navigation"
import { queryPostsAll } from "@/constants/queries"
import PostsLayout from '@/components/main/PostsLayout'
import { Suspense } from "react"

// export async function generateMetadata() {}
// export const metadata: Metadata = {
//   title: "...",
// }

const fetcher = (query: any) => request(process.env.NEXT_PUBLIC_GRAPH_CMS_API_URL as string, query)

function PageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const { data, error, isLoading }: any = useSWR(queryPostsAll, fetcher)

  const filteredPosts = category
    ? data?.posts?.filter((post: any) =>
      post.type?.toLowerCase() === category.replace(/-/g, '').toLowerCase()
    )
    : data?.posts

  return (
    <PostsLayout
      isLoading={isLoading}
      error={error}
      posts={filteredPosts}
    />
  )
}

export default function Page() {
  return (
    <Suspense fallback={<PostsLayout isLoading={true} posts={[]} error={null} />}>
      <PageContent />
    </Suspense>
  )
}
