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

export default function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // 确保只在客户端运行
    setIsClient(true)

    // 检查是否支持Service Worker并且不在开发环境
    const supported =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    setIsSupported(supported)
  }, [])

  useEffect(() => {
    // 只在客户端环境下且支持Service Worker时执行
    if (!isClient || !isSupported) return

    const checkForUpdates = () => {
      navigator.serviceWorker
        .getRegistration()
        .then(registration => {
          if (registration) {
            registration.update()
          }
        })
        .catch(() => {
          // 忽略错误，避免在开发环境中报错
        })
    }

    navigator.serviceWorker.ready
      .then(registration => {
        // 检查是否有等待中的worker
        if (registration.waiting) {
          setWaitingWorker(registration.waiting)
          setShowUpdatePrompt(true)
        }

        // 监听新的Service Worker安装
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // 只有当新worker安装完成并且有控制器时才显示提示
                setWaitingWorker(newWorker)
                setShowUpdatePrompt(true)
              }
            })
          }
        })
      })
      .catch(() => {
        // 忽略错误，避免在开发环境中报错
      })

    // 定期检查更新，但频率降低到避免干扰
    const updateInterval = setInterval(checkForUpdates, 120000) // 2分钟检查一次

    // 页面重新可见时检查更新
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkForUpdates()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      clearInterval(updateInterval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isClient, isSupported])

  const handleUpdate = () => {
    if (!refreshing && waitingWorker) {
      setRefreshing(true)

      // 发送SKIP_WAITING消息给等待中的Service Worker
      waitingWorker.postMessage({ type: "SKIP_WAITING" })

      // 延迟刷新页面，给Service Worker时间处理
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.reload()
        }
      }, 1000)
    }
  }

  const handleClose = () => {
    setShowUpdatePrompt(false)
    // 5分钟后再次提醒（如果仍有等待的worker）
    setTimeout(
      () => {
        if (waitingWorker) {
          setShowUpdatePrompt(true)
        }
      },
      5 * 60 * 1000
    )
  }

  // 在服务器端、不支持环境或者不满足显示条件时不渲染任何内容
  if (!isClient || !isSupported || !showUpdatePrompt || !waitingWorker) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <Card>
        <CardHeader className='pb-2'>
          <div className='flex justify-between items-start'>
            <div className='flex items-center gap-2'>
              <div className='size-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center'>
                <Icon name='RefreshCw' />
              </div>
              <CardTitle className='text-lg'>新版本可用</CardTitle>
            </div>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={handleClose}>
              <Icon name='X' />
            </Button>
          </div>
          <CardDescription>发现应用更新</CardDescription>
        </CardHeader>
        <CardContent className='pb-2'>
          <p className='text-sm'>
            食趣应用有新版本可用，包含功能改进和错误修复。更新后将获得更好的使用体验。
          </p>
          {refreshing && (
            <div className='mt-2 text-xs text-blue-600 font-medium'>正在应用更新，请稍候...</div>
          )}
        </CardContent>
        <CardFooter className='flex justify-end gap-2'>
          <Button variant='outline' onClick={handleClose} disabled={refreshing}>
            稍后更新
          </Button>
          <Button onClick={handleUpdate} disabled={refreshing || !waitingWorker}>
            {refreshing ? (
              <>
                <Icon name='Loader2' className='mr-2 animate-spin' />
                更新中...
              </>
            ) : (
              <>
                <Icon name='Download' className='mr-2' />
                立即更新
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
