"use client"

import { useEffect } from "react"

import moment from "moment"

// See: https://github.com/GraphCMS/rich-text/tree/main/packages/react-renderer#code-blocks-with-prismjs
import Prism from "prismjs"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

import { RichText } from "@graphcms/rich-text-react-renderer"
import { RichTextContent } from "@graphcms/rich-text-types"

import "./custom-prism-vsc-dark-plus.css"

import "./page.css"

interface IPost {
  post: IPostProps
}

interface IPostProps {
  author: string,
  title: string,
  date: Date,
  rtBody: { raw: RichTextContent },
}

interface IPostIntroProps {
  author: string,
  title: string,
  date: Date,
}

interface IPostMarkdownProps {
  rtBody: { raw: RichTextContent },
}

export async function generateStaticParams() {
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
  console.log("data: ", data)

  return data.posts.map((post: IPostProps) => ({ post }))

  // return [{}]
}

export default function Post({ params }) {
  console.log("post: ", post)
  return (
    <article className="post">
      <div className="post-content">
        <PostIntro author={post.author} date={post.date} title={post.title} />
        <PostMarkdown rtBody={post.rtBody} />
      </div>
    </article>
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
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  if (!rtBody) {
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