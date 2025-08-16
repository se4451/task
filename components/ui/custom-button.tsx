import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "small" | "medium" | "large"
  loading?: boolean
  asChild?: boolean
}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "medium", loading = false, disabled, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all outline-none border-0 cursor-pointer"

    const variantClasses = {
      primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus:ring-3 focus:ring-ring/20",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus:ring-3 focus:ring-ring/20",
      outline:
        "bg-transparent text-foreground border border-border hover:bg-accent hover:text-accent-foreground focus:ring-3 focus:ring-ring/20",
    }

    const sizeClasses = {
      small: "h-8 px-3 text-xs",
      medium: "h-10 px-4 text-sm",
      large: "h-12 px-6 text-base",
    }

    const loadingClasses = loading ? "relative text-transparent" : ""
    const disabledClasses = disabled || loading ? "pointer-events-none opacity-50 cursor-not-allowed" : ""

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          loadingClasses,
          disabledClasses,
          className,
        )}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />
          </div>
        )}
        {children}
      </button>
    )
  },
)

CustomButton.displayName = "CustomButton"

export { CustomButton }
