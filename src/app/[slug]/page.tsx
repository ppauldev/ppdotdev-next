import BlogPost from './BlogPost'
import { queryPostsForPaths } from "@/constants/queries"

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />
}

export async function generateStaticParams() {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPH_CMS_API_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: queryPostsForPaths
    })
  })

  const { data } = await res.json()

  return data.posts.map((post: any) => ({
    slug: post.slug,
  }))
}