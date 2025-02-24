import { Options } from "rehype-pretty-code"

export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: true,
  defaultLang: 'typescript',
} 