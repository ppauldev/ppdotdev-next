import * as React from "react"

import "./techtag.css"
import { techTagInfo } from "@/constants/techTagInfo"

interface ITechTag {
  keyword: string,
}

const TechTag: React.FC<ITechTag> = ({ keyword }): React.ReactElement => {
  const normalizedKeyword = keyword.toLowerCase()
  const techTagClassName = `tech-tag ${normalizedKeyword}`
  const techTagUrl = techTagInfo[normalizedKeyword]?.url === "javascript:void(0)" ? "/contact" : techTagInfo[normalizedKeyword]?.url
  const techTagSource = techTagInfo[normalizedKeyword]?.imageSource

  return (
    <a className={techTagClassName} href={techTagUrl} data-imagesource={techTagSource} title={techTagUrl} />
  )
}

export default TechTag
