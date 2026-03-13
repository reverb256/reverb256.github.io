import * as React from "react"
import { cn } from "@/lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  const ariaOrientation = orientation === "vertical" ? ("vertical" as const) : undefined
  const decorativeAttr = decorative
    ? { role: "none" as const }
    : { role: "separator" as const, "aria-orientation": ariaOrientation }

  return (
    <div
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...decorativeAttr}
      {...props}
    />
  )
}

export { Separator }
