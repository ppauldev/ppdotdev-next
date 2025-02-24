import { cn } from "@/lib/utils"

interface CodeProps extends React.HTMLAttributes<HTMLPreElement> { }

export function Code({ className, ...props }: CodeProps) {
  return (
    <pre
      className={cn(
        "mb-4 rounded-lg bg-muted px-4 py-3 font-mono text-sm",
        className
      )}
      {...props}
    />
  )
} 