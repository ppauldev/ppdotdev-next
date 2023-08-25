import { useEffect, useState } from "react"

import moment from "moment"

// See: https://github.com/GraphCMS/rich-text/tree/main/packages/react-renderer#code-blocks-with-prismjs
import Prism from "prismjs"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

import { RichText } from "@graphcms/rich-text-react-renderer"
import { RichTextContent } from "@graphcms/rich-text-types"

import "./custom-prism-vsc-dark-plus.css"

import "./page.css"
import PostHeader from "@/components/header/PostHeader"
import { SEO } from "@/components/header/SEO"

interface IPost {
  post: IPostProps
}

interface IPostProps {
  author: string,
  body: string,
  date: Date,
  metadescription: string,
  metakeywords: string[],
  preview: string,
  rtBody: { raw: RichTextContent },
  slug: string,
  title: string,
  type: string,
  tags: string[]
}

interface IPostIntroProps {
  author: string,
  title: string,
  date: Date,
}

interface IPostMarkdownProps {
  rtBody: { raw: RichTextContent },
}

export async function getStaticPaths() {
  const resRaw = await fetch(process.env.NEXT_PUBLIC_GRAPH_CMS_API_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        posts {
          id
          title
          date
          body
          rtBody { raw }
          preview
          slug
          type
          tags
          image {
            url
          }
          imageSource
          imageLicense
          metadescription
          metakeywords
        }
      }`
    })
  })

  const { data } = await resRaw.json()

  return {
    paths: data.posts.map((post: any) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }: any) {
  const resRaw = await fetch(process.env.NEXT_PUBLIC_GRAPH_CMS_API_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        post(where: { slug: "${params.slug}" }) {
          id
          author
          title
          date
          body
          rtBody { raw }
          preview
          slug
          type
          tags
          image {
            url
          }
          imageSource
          imageLicense
          metadescription
          metakeywords
        }
      }`
    })
  })

  const { data } = await resRaw.json()

  return { props: { post: data.post } }
}


export default function Post({ post }: { post: IPostProps }) {
  return (
    <div className="post-template">
      <SEO metaDescription={post.metadescription} metaKeywords={post.metakeywords} title={post.title} />
      <PostHeader keywords={post.tags} />
      <article className="post">
        <div className="post-content">
          <PostIntro author={post.author} date={post.date} title={post.title} />
          <PostMarkdown rtBody={post.rtBody} />
        </div>
      </article>
    </div>
  )
}

const PostIntro: React.FC<IPostIntroProps> = ({ author, date, title }): React.ReactElement => {
  return (
    <div className="post-content-intro">
      <div className="post-info">{author} · {moment(date).format("LL")}</div>
      <h1>{title}</h1>
    </div>
  )
}

const PostMarkdown: React.FC<IPostMarkdownProps> = ({ rtBody }): React.ReactElement => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true) // Preventing Hydration error in Next JS
  }, [])

  useEffect(() => {
    Prism.highlightAll()
  }, [isMounted])

  if (!rtBody || !isMounted) {
    return (<NoContent />)
  }

  return (
    <RichText
      content={rtBody?.raw}
      renderers={{
        code_block: ({ children }) => {
          return (
            <pre className="line-numbers language-javascript">
              <code>{children}</code>
            </pre>
          );
        },
        img: ({ src, altText }) => {
          return (
            <div className="post-image-wrapper">
              <img src={src} alt={altText} width="100%" />
            </div>
          )
        },
      }}
    />
  )
}

const NoContent: React.FC = (): React.ReactElement => {
  return (
    <p>No content published yet.</p>
  )
}