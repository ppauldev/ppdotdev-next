import * as React from "react"

import moment from "moment"

import "./posttile.css"

interface IPostTile {
  post: IPostTileProps
}

interface IPostTileProps {
  slug: string,
  title: string,
  date: Date,
  preview: string,
  image: { url: string },
  imageSource: string,
  imageLicense: string,
}

const PostTile: React.FC<IPostTile> = ({ post }): React.ReactElement => {
  const handleOnMouseOver = () => {
    const img = document.getElementById(`post-tile-image-${post.slug}`)
    if (img) {
      img.style.backgroundSize = "110%"
    }
  }

  const handleOnMouseLeave = () => {
    const img = document.getElementById(`post-tile-image-${post.slug}`)
    if (img) {
      img.style.backgroundSize = "100%"
    }
  }

  return (
    <a
      href={post.slug}
      className="post-tile-slug"
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      <article className="post-tile">
        <div className="post-tile-image-wrapper">
          <div
            id={`post-tile-image-${post.slug}`}
            className="post-tile-image"
            style={{ background: `url(${post?.image?.url}) 50% / 100%` }}
            data-imagesource={post?.imageSource}
            data-imagelicense={post?.imageLicense}
          />
        </div>
        <div
          className="post-tile-content"
        >
          <div className="post-tile-content-main">
            <h2>{post.title}</h2>
            <h3>{post.preview}</h3>
          </div>
          <p className="post-tile-content-side">{moment(post.date).format("LL")}</p>
        </div>
      </article>
    </a>
  )
}

export default PostTile
