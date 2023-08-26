import * as React from "react"

import "./techtag.css"
import { techTagInfo } from "@/constants/techTagInfo"
import Link from "next/link"

interface ITechTag {
  keyword: string,
}

const TechTag: React.FC<ITechTag> = ({ keyword }): React.ReactElement => {
  const normalizedKeyword = keyword.toLowerCase()
  const techTagClassName = `tech-tag ${normalizedKeyword}`
  const techTagUrl = techTagInfo[normalizedKeyword]?.url === "javascript:void(0)" ? "/contact" : techTagInfo[normalizedKeyword]?.url
  const techTagSource = techTagInfo[normalizedKeyword]?.imageSource

  return (
    <Link href={techTagUrl ?? "https://www.google.com"}>
      <div className={techTagClassName} data-imagesource={techTagSource} title={techTagUrl} />
    </Link>
  )
}

export default TechTag
