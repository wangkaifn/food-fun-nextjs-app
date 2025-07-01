"use client"

import { Icon } from "@/components/common/icon"
import { useState } from "react"

interface SettingsItemProps {
  icon: string
  title: string
  subtitle?: string
  value?: string
  onClick?: () => void
  rightElement?: React.ReactNode
}

export default function SettingsItem({
  icon,
  title,
  subtitle,
  value,
  onClick,
  rightElement
}: SettingsItemProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseDown = () => {
    if (onClick) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseLeave = () => {
    setIsPressed(false)
  }

  const isClickable = !!onClick

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border bg-card/50 backdrop-blur-sm transition-all duration-200 ${
        isClickable
          ? "cursor-pointer select-none hover:bg-muted/50 hover:shadow-md active:scale-[0.98]"
          : ""
      } ${isPressed ? "scale-[0.96]" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className='flex items-center gap-4'>
        <div className='w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center transition-colors duration-200'>
          <Icon name={icon as any} className='h-5 w-5 text-muted-foreground' />
        </div>

        <div>
          <div className='font-medium transition-colors duration-200'>{title}</div>
          {subtitle && (
            <div className='text-sm text-muted-foreground transition-colors duration-200'>
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {value && (
          <span className='text-muted-foreground text-sm transition-colors duration-200'>
            {value}
          </span>
        )}

        {rightElement ||
          (isClickable && (
            <Icon
              name='ChevronRight'
              className='h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-1'
            />
          ))}
      </div>
    </div>
  )
}
