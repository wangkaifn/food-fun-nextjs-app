"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Icon } from "@/components/common/icon"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [neverShowAgain, setNeverShowAgain] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // 确保只在客户端运行
    setIsClient(true)

    // 检查是否支持PWA并且在生产环境
    const supported =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    setIsSupported(supported)
  }, [])

  useEffect(() => {
    // 只在客户端环境下且支持PWA时执行
    if (!isClient || !isSupported) return

    // 检查是否已经安装或者在独立窗口中运行
    if (typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches) {
      return
    }

    // 检查用户是否选择了不再提醒
    const neverShow = typeof window !== "undefined" ? localStorage.getItem("pwa-never-show") : null
    if (neverShow === "true") {
      return
    }

    // 检查是否已经显示过提示（临时隐藏）
    const hasPromptedToday =
      typeof window !== "undefined" ? localStorage.getItem("pwa-prompted-today") : null
    const today = new Date().toDateString()
    if (hasPromptedToday === today) {
      return
    }

    // 监听beforeinstallprompt事件
    const handleBeforeInstallPrompt = (e: Event) => {
      // 阻止Chrome 67及更早版本自动显示安装提示
      e.preventDefault()
      // 存储事件以便稍后触发
      setInstallPrompt(e as BeforeInstallPromptEvent)

      // 延迟显示提示，让用户先浏览一下应用
      setTimeout(() => {
        setShowPrompt(true)
      }, 10000) // 10秒后显示
    }

    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      }
    }
  }, [isClient, isSupported])

  const handleInstall = () => {
    if (!installPrompt) return

    // 显示安装提示
    installPrompt.prompt()

    // 等待用户响应提示
    installPrompt.userChoice
      .then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          // 用户接受了安装提示，永久隐藏
          if (typeof window !== "undefined") {
            localStorage.setItem("pwa-never-show", "true")
          }
        } else {
          // 用户拒绝了安装提示
          if (neverShowAgain) {
            // 如果选择了不再提醒，永久隐藏
            if (typeof window !== "undefined") {
              localStorage.setItem("pwa-never-show", "true")
            }
          } else {
            // 否则今天不再显示
            if (typeof window !== "undefined") {
              localStorage.setItem("pwa-prompted-today", new Date().toDateString())
            }
          }
        }
        setShowPrompt(false)
      })
      .catch(() => {
        // 处理错误情况
        setShowPrompt(false)
      })
  }

  const handleClose = () => {
    if (neverShowAgain) {
      // 如果选择了不再提醒，永久隐藏
      if (typeof window !== "undefined") {
        localStorage.setItem("pwa-never-show", "true")
      }
    } else {
      // 否则今天不再显示
      if (typeof window !== "undefined") {
        localStorage.setItem("pwa-prompted-today", new Date().toDateString())
      }
    }
    setShowPrompt(false)
  }

  const handleNeverShowChange = (checked: boolean) => {
    setNeverShowAgain(checked)
  }

  // 在服务器端、不支持环境或者不显示提示时不渲染任何内容
  if (!isClient || !isSupported || !showPrompt) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <Card className='w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95'>
        <CardHeader className='pb-2'>
          <div className='flex justify-between items-start'>
            <div className='flex items-center gap-2'>
              <div className='size-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center'>
                <Icon name='Download' />
              </div>
              <CardTitle className='text-lg'>安装食趣应用</CardTitle>
            </div>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={handleClose}>
              <Icon name='X' />
            </Button>
          </div>
          <CardDescription>获得更好的使用体验</CardDescription>
        </CardHeader>
        <CardContent className='pb-2'>
          <p className='text-sm'>
            将食趣安装到您的设备上，随时随地访问，即使在离线状态下也能使用部分功能。
          </p>

          {/* 不再提醒选择框 */}
          <div className='flex items-center space-x-2 mt-3 pt-2 border-t border-border/50'>
            <input
              type='checkbox'
              id='never-show-again'
              checked={neverShowAgain}
              onChange={e => handleNeverShowChange(e.target.checked)}
              className='w-4 h-4 text-blue-600 bg-background border-border rounded focus:ring-blue-500 focus:ring-2'
            />
            <label
              htmlFor='never-show-again'
              className='text-xs text-muted-foreground cursor-pointer select-none'
            >
              不再提醒安装
            </label>
          </div>
        </CardContent>
        <CardFooter className='flex justify-end gap-2'>
          <Button variant='outline' onClick={handleClose}>
            稍后再说
          </Button>
          <Button onClick={handleInstall}>
            <Icon name='Download' className='mr-2' />
            立即安装
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
