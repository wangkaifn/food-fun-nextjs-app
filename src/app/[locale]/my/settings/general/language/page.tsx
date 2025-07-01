"use client"

import { useTranslations, useLocale } from "next-intl"
import { useTransition } from "react"
import { useRouter as useNextRouter } from "next/navigation"
import PageContainer from "@/components/layout/page-container"
import { Icon } from "@/components/common/icon"
import { locales, localeNames, localeFlags, type Locale, defaultLocale } from "@/i18n/config"

export default function LanguageSettingsPage() {
  const t = useTranslations("settings")
  const locale = useLocale()
  const router = useNextRouter()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale || isPending) return

    startTransition(() => {
      // 设置语言偏好到cookie
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`

      // 标记这是语言切换，禁用页面动画
      sessionStorage.setItem("isLanguageSwitch", "true")

      // 构建正确的URL路径
      // 由于localePrefix是"as-needed"，默认语言不需要前缀
      const currentPath = "/my/settings/general/language"
      const newPath = newLocale === defaultLocale ? currentPath : `/${newLocale}${currentPath}`

      // 使用原生router进行导航，这样可以正确处理语言前缀
      router.push(newPath)
    })
  }

  return (
    <PageContainer title={t("languageTranslation")} variant='default'>
      <div className='p-4 space-y-6'>
        {/* 当前语言显示 */}
        <div className='bg-card rounded-lg p-4'>
          <h3 className='text-sm font-medium text-muted-foreground mb-3'>{t("currentLanguage")}</h3>
          <div className='flex items-center gap-3'>
            <span className='text-2xl' role='img' aria-label={localeNames[locale as Locale]}>
              {localeFlags[locale as Locale]}
            </span>
            <div>
              <div className='font-medium text-foreground'>{localeNames[locale as Locale]}</div>
              <div className='text-sm text-muted-foreground'>
                {locale === "zh" ? "简体中文" : "English (US)"}
              </div>
            </div>
          </div>
        </div>

        {/* 语言选择列表 */}
        <div>
          <h3 className='text-sm font-medium text-muted-foreground mb-3 px-4'>
            {t("selectLanguage")}
          </h3>
          <div className='bg-card rounded-lg shadow-sm'>
            {locales.map((loc, index) => (
              <div key={loc}>
                <div
                  className={`flex items-center justify-between p-4 transition-colors cursor-pointer ${
                    isPending ? "opacity-50 pointer-events-none" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleLocaleChange(loc)}
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-xl' role='img' aria-label={localeNames[loc]}>
                      {localeFlags[loc]}
                    </span>
                    <div>
                      <div className='font-medium text-foreground'>{localeNames[loc]}</div>
                      <div className='text-sm text-muted-foreground'>
                        {loc === "zh" ? "简体中文" : "English (US)"}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {loc === locale && (
                      <div className='flex items-center gap-1 text-primary'>
                        <Icon name='Check' className='h-4 w-4' />
                        <span className='text-sm font-medium'>{t("selected")}</span>
                      </div>
                    )}
                    {isPending && loc !== locale && (
                      <Icon name='Loader2' className='h-4 w-4 animate-spin text-muted-foreground' />
                    )}
                  </div>
                </div>
                {index < locales.length - 1 && <div className='border-b border-border ml-4'></div>}
              </div>
            ))}
          </div>
        </div>

        {/* 翻译功能说明 */}
        <div className='bg-muted/30 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <Icon name='Info' className='h-5 w-5 text-muted-foreground mt-0.5' />
            <div className='flex-1'>
              <h4 className='font-medium text-foreground mb-1'>{t("autoTranslation")}</h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {t("autoTranslationDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
