"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icon, IconProps } from "../common/icon"

export default function BottomNavigation() {
  const pathname = usePathname()

  //   // 在认证页面和根路径(开屏动画显示时)不显示底部导航
  //   const isAuthPage = pathname.startsWith("/auth/")

  //   if (isAuthPage) {
  //     return null
  //   }

  const navItems: { href: string; icon: IconProps["name"]; label: string }[] = [
    { href: "/", icon: "Home", label: "首页" },
    { href: "/search", icon: "Search", label: "搜索" },
    { href: "/ai", icon: "Brain", label: "AI" },
    { href: "/community", icon: "Users", label: "社区" },
    { href: "/my", icon: "User", label: "我的" }
  ]

  return (
    <div className='fixed bottom-0 left-0 right-0 border-t bg-background z-10'>
      <nav className='flex justify-around items-center h-16'>
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon name={item.icon} className='h-5 w-5' />
              <span className='text-xs mt-1'>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
