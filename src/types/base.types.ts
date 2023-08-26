import { RichTextContent } from "@graphcms/rich-text-types"

export interface IPostProps {
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

export interface IPostIntroProps {
  author: string,
  title: string,
  date: Date,
}

export interface IPostMarkdownProps {
  rtBody: { raw: RichTextContent },
}

export interface IPostTileProps {
  slug: string,
  title: string,
  date: Date,
  preview: string,
  body: string,
  type: string,
  image: { url: string },
  imageSource: string,
  imageLicense: string,
}
