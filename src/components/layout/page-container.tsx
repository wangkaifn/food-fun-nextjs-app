"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/common/icon"
import { useRouter, usePathname } from "@/i18n/navigation"
import { ReactNode, useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"

interface PageContainerProps {
  title: string
  children: ReactNode
  variant?: "default" | "dark" | "gradient"
  className?: string
  headerClassName?: string
}

export default function PageContainer({
  title,
  children,
  variant = "default",
  className = "",
  headerClassName = ""
}: PageContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isExiting, setIsExiting] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [mounted, setMounted] = useState(false)

  // 检查是否是通过返回操作或语言切换到达的页面
  useEffect(() => {
    const isBackNavigation = sessionStorage.getItem("isBackNavigation")
    const isLanguageSwitch = sessionStorage.getItem("isLanguageSwitch")

    if (isBackNavigation === "true" || isLanguageSwitch === "true") {
      setShouldAnimate(false)
      sessionStorage.removeItem("isBackNavigation")
      sessionStorage.removeItem("isLanguageSwitch")
    }
    setMounted(true)
  }, [])

  // 页面滑入滑出动画
  const pageAnimation = useSpring({
    from: {
      opacity: 0,
      transform: shouldAnimate ? "translateX(100%)" : "translateX(0%)"
    },
    to: {
      opacity: isExiting ? 0 : mounted ? 1 : 0,
      transform: isExiting
        ? "translateX(100%)"
        : mounted
          ? "translateX(0%)"
          : shouldAnimate
            ? "translateX(100%)"
            : "translateX(0%)"
    },
    config: {
      tension: 300,
      friction: 25
    },
    immediate: !shouldAnimate && !isExiting
  })

  // 处理返回按钮点击
  const handleBack = () => {
    if (isExiting) return

    sessionStorage.setItem("isBackNavigation", "true")
    setIsExiting(true)

    // 等待动画完成后再执行返回
    setTimeout(() => {
      // 智能构建返回路径，保持语言前缀
      const pathSegments = pathname.split("/").filter(Boolean)

      // 如果是深层路径，返回上一级
      if (pathSegments.length > 1) {
        pathSegments.pop() // 移除最后一段
        const backPath = "/" + pathSegments.join("/")
        router.push(backPath)
      } else {
        // 如果已经是根级路径，使用浏览器的back
        router.back()
      }
    }, 350)
  }

  // 根据variant决定样式类
  const getVariantClasses = () => {
    switch (variant) {
      case "dark":
        return {
          container: "min-h-screen bg-background text-foreground",
          header: "bg-background/95 backdrop-blur-sm border-b border-border",
          title: "text-foreground",
          button: "text-foreground hover:bg-muted"
        }
      case "gradient":
        return {
          container: "min-h-screen bg-theme-gradient text-white",
          header: "bg-transparent",
          title: "text-white",
          button: "text-white hover:bg-white/20"
        }
      default:
        return {
          container: "min-h-screen bg-background text-foreground",
          header: "bg-card/95 backdrop-blur-sm border-b border-border",
          title: "text-foreground",
          button: "text-foreground hover:bg-muted"
        }
    }
  }

  const styles = getVariantClasses()

  return (
    <animated.div style={pageAnimation} className={`${styles.container} ${className}`}>
      {/* 固定顶部导航栏 */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 ${styles.header} ${headerClassName}`}
      >
        <Button
          size='icon'
          variant='ghost'
          className={`${styles.button} transition-all duration-200 hover:scale-105 active:scale-95`}
          onClick={handleBack}
        >
          <Icon name='ChevronLeft' className='h-6 w-6' />
        </Button>
        <h1 className={`text-lg font-medium ${styles.title}`}>{title}</h1>
        <div className='w-10'></div>
      </div>

      {/* 页面内容 */}
      <div className='pt-20'>{children}</div>
    </animated.div>
  )
}
