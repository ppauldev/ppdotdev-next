"use client"

import Link from "next/link"
import Image from "next/image"
import moment from "moment"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface IPostTileProps {
  post: {
    slug: string
    title: string
    date: Date
    preview: string
    image: { url: string }
    imageSource: string
    imageLicense: string
  }
}

export default function PostTile({ post }: IPostTileProps) {
  return (
    <Link href={`/${post.slug}`} className="block no-underline group">
      <Card className="h-[470px] m-2.5 transition-all hover:border-foreground/20 flex flex-col overflow-hidden">
        <div className="relative w-full h-[200px] overflow-hidden">
          <Image
            src={post.image.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col flex-1">
          <CardHeader>
            <CardTitle className="text-xl text-foreground line-clamp-2">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <CardDescription className="line-clamp-5">
              {post.preview}
            </CardDescription>
          </CardContent>
          <CardFooter className="mt-auto">
            <p className="text-xs text-muted-foreground">
              {moment(post.date).format("MMM DD, YYYY")}
            </p>
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}
