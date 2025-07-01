"use client"

import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import PageContainer from "@/components/layout/page-container"
import { Switch } from "@/components/ui/switch"
import { Icon } from "@/components/common/icon"

export default function ThemeSettingsPage() {
  const t = useTranslations("settings")
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  console.log("theme", theme, resolvedTheme)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 简化的加载状态，避免复杂的条件渲染
  if (!mounted) {
    return (
      <PageContainer title={t("darkMode")} variant='default'>
        <div className='p-4'>
          <div className='animate-pulse space-y-4'>
            <div className='h-20 bg-muted rounded-lg'></div>
            <div className='h-32 bg-muted rounded-lg'></div>
          </div>
        </div>
      </PageContainer>
    )
  }

  const isDarkMode = resolvedTheme === "dark"
  const isSystemMode = theme === "system"

  const handleSystemModeChange = (checked: boolean) => {
    setTheme(checked ? "system" : resolvedTheme === "dark" ? "dark" : "light")
  }

  return (
    <PageContainer title={t("darkMode")} variant='default'>
      <div className='p-4 space-y-6'>
        {/* 当前主题状态 */}
        <div className='bg-card rounded-lg p-4 border'>
          <h3 className='text-sm font-medium text-muted-foreground mb-3'>{t("currentTheme")}</h3>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-background to-muted border border-border flex items-center justify-center'>
              <Icon
                name={isDarkMode ? "Moon" : "Sun"}
                className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-orange-500"}`}
              />
            </div>
            <div>
              <div className='font-medium text-foreground'>
                {isDarkMode ? t("darkModeTitle") : t("lightMode")}
              </div>
              <div className='text-sm text-muted-foreground'>
                {isSystemMode
                  ? t("followSystemSettings")
                  : isDarkMode
                    ? t("darkThemeEnabled")
                    : t("lightThemeEnabled")}
              </div>
            </div>
          </div>
        </div>

        {/* 主题设置选项 */}
        <div className='bg-card rounded-lg border'>
          {/* 跟随系统开关 */}
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
              <Icon name='Monitor' className='h-5 w-5 text-muted-foreground' />
              <div>
                <div className='font-medium text-foreground'>{t("followSystem")}</div>
                <div className='text-sm text-muted-foreground'>{t("autoMatchSystem")}</div>
              </div>
            </div>
            <Switch checked={isSystemMode} onCheckedChange={handleSystemModeChange} />
          </div>
        </div>

        {/* 主题预览 */}
        <div className='space-y-3'>
          <h3 className='text-sm font-medium text-muted-foreground px-4'>{t("themePreview")}</h3>
          <div className='bg-card rounded-lg p-4 border'>
            <div className='grid grid-cols-2 gap-4'>
              {/* 浅色主题预览 */}
              <div
                className={`relative p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                  !isDarkMode ? "border-primary bg-primary/5" : "border-border bg-background"
                }`}
                onClick={() => setTheme("light")}
              >
                <div className='bg-white rounded p-2 shadow-sm border'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Icon name='Sun' className='h-4 w-4 text-orange-500' />
                    <div className='text-xs font-medium text-gray-900'>{t("lightMode")}</div>
                  </div>
                  <div className='space-y-1'>
                    <div className='h-2 bg-gray-200 rounded'></div>
                    <div className='h-2 bg-gray-100 rounded w-2/3'></div>
                  </div>
                </div>
                {!isDarkMode && (
                  <Icon name='Check' className='absolute top-2 right-2 h-4 w-4 text-primary' />
                )}
              </div>

              {/* 深色主题预览 */}
              <div
                className={`relative p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                  isDarkMode ? "border-primary bg-primary/5" : "border-border bg-background"
                }`}
                onClick={() => setTheme("dark")}
              >
                <div className='bg-gray-900 rounded p-2 shadow-sm border border-gray-800'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Icon name='Moon' className='h-4 w-4 text-blue-400' />
                    <div className='text-xs font-medium text-white'>{t("darkModeTitle")}</div>
                  </div>
                  <div className='space-y-1'>
                    <div className='h-2 bg-gray-700 rounded'></div>
                    <div className='h-2 bg-gray-800 rounded w-2/3'></div>
                  </div>
                </div>
                {isDarkMode && (
                  <Icon name='Check' className='absolute top-2 right-2 h-4 w-4 text-primary' />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 说明信息 */}
        <div className='bg-muted/30 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <Icon name='Info' className='h-5 w-5 text-muted-foreground mt-0.5' />
            <div className='flex-1'>
              <h4 className='font-medium text-foreground mb-1'>主题说明</h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {t("themeDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
