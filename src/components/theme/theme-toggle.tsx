"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className='bg-background/80 backdrop-blur-sm'
    >
      {theme === "dark" ? "🌞" : "🌙"}
      <span className='ml-2'>{theme === "dark" ? "亮色模式" : "暗色模式"}</span>
    </Button>
  )
}
