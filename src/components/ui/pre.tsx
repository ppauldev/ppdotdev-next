"use client"

import { cn } from "@/lib/utils"

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string
  'data-language'?: string
  'data-theme'?: string
}

export function Pre({
  children,
  className,
  'data-language': language,
  'data-theme': theme,
  ...props
}: PreProps) {
  return (
    <pre
      className={cn(
        "relative my-4 overflow-x-auto rounded-lg",
        "font-mono text-sm",
        "bg-[#1E1E1E] text-white",
        className
      )}
      data-language={language}
      data-theme={theme}
      {...props}
    >
      {children}
    </pre>
  )
} 