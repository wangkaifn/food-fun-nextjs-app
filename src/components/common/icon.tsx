import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"
import { memo } from "react"
import type { LucideIcon } from "lucide-react"

export type IconProps = LucideIcons.LucideProps & {
  name: keyof typeof LucideIcons
  className?: string
  strokeWidth?: number
}

export const Icon = memo(({ name, className, strokeWidth, ...props }: IconProps) => {
  const IconComponent = LucideIcons[name] as LucideIcon

  if (!IconComponent) {
    return null
  }

  return (
    <IconComponent
      className={cn("h-4 w-4", className)}
      strokeWidth={strokeWidth || 2.5}
      {...props}
    />
  )
})

Icon.displayName = "Icon"
