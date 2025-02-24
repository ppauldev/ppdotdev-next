"use client"

import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader"

export function PreviewTile(props: any) {
  const [loaderWidth, setLoaderWidth] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const width = window.innerWidth
    if (width >= 320 && width < 428) setLoaderWidth(260)
    if (width >= 428 && width < 600) setLoaderWidth(320)
    if (width >= 600 && width < 1140) setLoaderWidth(390)
    if (width >= 1140 && width < 1268) setLoaderWidth(340)
    if (width >= 1268) setLoaderWidth(390)
  }, [])

  if (!loaderWidth) return null

  return (
    <ContentLoader
      viewBox={`0 0 ${loaderWidth} 500`}
      height={500}
      width={loaderWidth}
      className="rounded-lg"
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width={loaderWidth} height="200" />
      <rect x="4" y="230" rx="0" ry="0" width={loaderWidth - 40} height="40" />
      <rect x="4" y="290" rx="0" ry="0" width={loaderWidth - 121} height="20" />
      <rect x="4" y="320" rx="0" ry="0" width={loaderWidth - 86} height="20" />
    </ContentLoader>
  )
}