"use client"

import useSWR from "swr"
import request from "graphql-request"
import { PreviewTile } from "@/components/main/PreviewTile"
import PostTile from "@/components/main/PostTile"

import "./page.css"
import { queryPostsProtocols } from "@/constants/queries"

const fetcher = (query: any) => request(process.env.NEXT_PUBLIC_GRAPH_CMS_API_URL as string, query)

interface IPostTileProps {
  slug: string,
  title: string,
  date: Date,
  preview: string,
  body: string,
  type: string,
  image: { url: string },
  imageSource: string,
  imageLicense: string,
}

export default function Page() {
  const { data, error, isLoading }: any = useSWR(queryPostsProtocols, fetcher)

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