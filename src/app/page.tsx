"use client"

import useSWR from "swr"

import "./page.css"

import { PreviewTile } from "@/components/main/PreviewTile"
import PostTile from "@/components/main/PostTile"
import request from "graphql-request"
import { queryPostsAll } from "@/constants/queries"
import { IPostTileProps } from "@/types/base.types"

// export async function generateMetadata() {}
// export const metadata: Metadata = {
//   title: "...",
// }

const fetcher = (query: any) => request(process.env.NEXT_PUBLIC_GRAPH_CMS_API_URL as string, query)

export default function Page() {
  const { data, error, isLoading }: any = useSWR(queryPostsAll, fetcher)

  if (isLoading) {
    return (
      <div>
        <main>
          <section>
            <PreviewTile backgroundColor="lightgray" />
          </section>
        </main>
      </div>
    )
  }

  if (!data.posts) {
    return null
  }

  if (error) {
    throw new Error(error)
  }

  return (
    <div>
      <main>
        <section>
          {data.posts.map((post: IPostTileProps) => {
            return (
              <PostTile
                key={post.slug}
                post={post}
              />
            )
          })}
        </section>
      </main>
    </div>
  )
}
