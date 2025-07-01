"use client"

import { ReactNode, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"
import { Icon } from "@/components/common/icon"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  // 阻止滚动穿透
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // 遮罩层动画
  const overlayAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    config: {
      tension: 300,
      friction: 30
    }
  })

  // 底部弹窗动画
  const sheetAnimation = useSpring({
    transform: isOpen ? "translateY(0%)" : "translateY(100%)",
    config: {
      tension: 300,
      friction: 25
    }
  })

  if (!isOpen && sheetAnimation.transform.get() === "translateY(100%)") {
    return null
  }

  return (
    <div className='fixed inset-0 z-50'>
      {/* 遮罩层 */}
      <animated.div
        style={overlayAnimation}
        className='absolute inset-0 bg-black/50'
        onClick={onClose}
      />

      {/* 弹窗内容 */}
      <animated.div
        style={sheetAnimation}
        className='absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl'
      >
        {/* 顶部拖拽条 */}
        <div className='flex justify-center pt-3 pb-2'>
          <div className='w-8 h-1 bg-muted-foreground/30 rounded-full' />
        </div>

        {/* 标题栏 */}
        {title && (
          <div className='flex items-center justify-between px-4 py-3 border-b border-border'>
            <h3 className='text-lg font-medium'>{title}</h3>
            <button onClick={onClose} className='p-1 hover:bg-muted rounded-full transition-colors'>
              <Icon name='X' className='h-5 w-5' />
            </button>
          </div>
        )}

        {/* 内容区域 */}
        <div className='px-4 py-4 pb-safe'>{children}</div>
      </animated.div>
    </div>
  )
}
