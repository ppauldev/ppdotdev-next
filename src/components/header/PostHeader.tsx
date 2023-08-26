import * as React from "react"

import "./postheader.css"
import TechTag from "../main/TechTag";
import Link from "next/link";

interface IPostHeader {
  keywords: string[],
}

interface ITagsList {
  keywords: string[],
}

const PostHeader: React.FC<IPostHeader> = ({ keywords }): React.ReactElement => {
  return (
    <header className="post-template-header">
      <div id="logo-wrapper">
        <Link href="/">
          <div id="logo" />
        </Link>
      </div>
      <TagsList keywords={keywords} />
    </header>
  )
}

const TagsList: React.FC<ITagsList> = ({ keywords }): React.ReactElement => {
  return (
    <div className="post-template-header-keywords">
      <p>Tags:</p>
      {keywords.map((keyword) => {
        return (
          <TechTag key={keyword} keyword={keyword} />
        )
      })}
    </div>
  )
}

export default PostHeader
