"use client"

import { useTranslations } from "next-intl"
import { Icon } from "@/components/common/icon"
import { cn } from "@/lib/utils"
import { Link, usePathname } from "@/i18n/navigation"

const navItems = [
  { key: "home", href: "/", icon: "Home" },
  { key: "search", href: "/search", icon: "Search" },
  { key: "ai", href: "/ai", icon: "Bot" },
  { key: "community", href: "/community", icon: "Users" },
  { key: "my", href: "/my", icon: "User" }
] as const

export default function BottomNavigation() {
  const t = useTranslations("navigation")
  const pathname = usePathname()

  // 是否显示底部导航
  const isShowBottomNavigation = navItems.some(item => item.href === pathname)
  if (!isShowBottomNavigation) return null

  // 检查当前路径是否激活
  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-safe'>
      <div className='flex h-16 items-center justify-around px-safe'>
        {navItems.map(item => (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs transition-colors hover:text-foreground/80",
              isActive(item.href) ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon name={item.icon} className='size-5' />
            <span className='text-[10px] leading-tight'>{t(item.key)}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
