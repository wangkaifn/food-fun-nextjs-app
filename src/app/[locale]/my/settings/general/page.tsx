"use client"

import { useTranslations } from "next-intl"
import { Icon } from "@/components/common/icon"
import { useState } from "react"
import { useRouter } from "next/navigation"
import PageContainer from "@/components/layout/page-container"

export default function GeneralSettingsPage() {
  const t = useTranslations("settings")
  const router = useRouter()
  const [useSystemFont, setUseSystemFont] = useState(false)

  const displaySettings = [
    {
      title: t("languageTranslation"),
      href: "/my/settings/general/language"
    },
    {
      title: t("fontSize"),
      href: "/my/settings/general/font-size"
    }
  ]

  const otherSettings = [
    {
      title: t("darkMode"),
      href: "/my/settings/general/theme"
    }
  ]

  return (
    <PageContainer title={t("generalTitle")}>
      <div className='p-4 space-y-8'>
        {/* 显示设置组 */}
        <div>
          <h2 className='text-sm font-medium text-muted-foreground mb-4 px-4'>{t("display")}</h2>
          <div className='bg-card rounded-lg shadow-sm'>
            {displaySettings.map((item, index) => (
              <div key={index}>
                <div
                  className='flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer'
                  onClick={() => router.push(item.href)}
                >
                  <span className='text-foreground'>{item.title}</span>
                  <Icon name='ChevronRight' className='h-5 w-5 text-muted-foreground' />
                </div>
                {index < displaySettings.length - 1 && (
                  <div className='border-b border-border ml-4'></div>
                )}
              </div>
            ))}

            {/* 使用系统默认字体开关 */}
            <div className='border-b border-border ml-4'></div>
            <div className='flex items-center justify-between p-4'>
              <span className='text-foreground'>{t("useSystemFont")}</span>
              <div
                className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                  useSystemFont ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setUseSystemFont(!useSystemFont)}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    useSystemFont ? "translate-x-5" : "translate-x-0.5"
                  } mt-0.5`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 其他设置组 */}
        <div className='bg-card rounded-lg shadow-sm'>
          {otherSettings.map((item, index) => (
            <div key={index}>
              <div
                className='flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer'
                onClick={() => router.push(item.href)}
              >
                <span className='text-foreground'>{item.title}</span>
                <Icon name='ChevronRight' className='h-5 w-5 text-muted-foreground' />
              </div>
              {index < otherSettings.length - 1 && (
                <div className='border-b border-border ml-4'></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
