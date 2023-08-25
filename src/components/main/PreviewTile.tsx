"use client"

import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader"

export const PreviewTile = (props: any) => {
  const [loaderWidth, setLoaderWidth] = useState(0)

  useEffect(() => {
    if (!window) { return; }

    if (window.innerWidth >= 320 && window.innerWidth < 428) { setLoaderWidth(260) };
    if (window.innerWidth >= 428 && window.innerWidth < 600) { setLoaderWidth(320) };
    if (window.innerWidth >= 600 && window.innerWidth < 1140) { setLoaderWidth(390) };
    if (window.innerWidth >= 1140 && window.innerWidth < 1268) { setLoaderWidth(340) };
    if (window.innerWidth >= 1268) { setLoaderWidth(390) };
  }, []) // Note: Avoiding resize listener, because of minor use case

  if (!loaderWidth || loaderWidth === 0) {
    return null
  }

  return (
    <ContentLoader
      viewBox={`0 0 ${loaderWidth} 500`}
      height={500}
      width={loaderWidth}
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width={loaderWidth} height="200" />
      <rect x="4" y="230" rx="0" ry="0" width={loaderWidth - 40} height="40" />
      <rect x="4" y="290" rx="0" ry="0" width={loaderWidth - 121} height="20" />
      <rect x="4" y="320" rx="0" ry="0" width={loaderWidth - 86} height="20" />
    </ContentLoader>
  )
}