import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type TextElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "small"

const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        lead: "text-xl text-[var(--muted-foreground)]",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-[var(--muted-foreground)]",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: TextElement
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, align, as = "p", ...props }, ref) => {
    const Tag = as as any

    return (
      <Tag
        ref={ref}
        className={cn(textVariants({ variant, align }), className)}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

// Convenience components
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<React.HTMLAttributes<HTMLHeadingElement>, "as">>((props, ref) => <Text ref={ref} as="h1" variant="h1" {...props} />)
H1.displayName = "H1"

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<React.HTMLAttributes<HTMLHeadingElement>, "as">>((props, ref) => <Text ref={ref} as="h2" variant="h2" {...props} />)
H2.displayName = "H2"

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<React.HTMLAttributes<HTMLHeadingElement>, "as">>((props, ref) => <Text ref={ref} as="h3" variant="h3" {...props} />)
H3.displayName = "H3"

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<React.HTMLAttributes<HTMLHeadingElement>, "as">>((props, ref) => <Text ref={ref} as="h4" variant="h4" {...props} />)
H4.displayName = "H4"

export const P = React.forwardRef<HTMLParagraphElement, Omit<React.HTMLAttributes<HTMLParagraphElement>, "as">>((props, ref) => <Text ref={ref} as="p" variant="p" {...props} />)
P.displayName = "P"

export const Lead = React.forwardRef<HTMLElement, Omit<React.HTMLAttributes<HTMLElement>, "as">>((props, ref) => <Text ref={ref} as="p" variant="lead" {...props} />)
Lead.displayName = "Lead"

export const Large = React.forwardRef<HTMLElement, Omit<React.HTMLAttributes<HTMLElement>, "as">>((props, ref) => <Text ref={ref} as="div" variant="large" {...props} />)
Large.displayName = "Large"

export const Small = React.forwardRef<HTMLElement, Omit<React.HTMLAttributes<HTMLElement>, "as">>((props, ref) => <Text ref={ref} as="small" variant="small" {...props} />)
Small.displayName = "Small"

export const Muted = React.forwardRef<HTMLElement, Omit<React.HTMLAttributes<HTMLElement>, "as">>((props, ref) => <Text ref={ref} as="p" variant="muted" {...props} />)
Muted.displayName = "Muted"

export { Text, textVariants }
