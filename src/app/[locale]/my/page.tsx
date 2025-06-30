"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/common/icon"
import LanguageSwitcher from "@/components/language/language-switcher"

export default function MyPage() {
  const t = useTranslations("profile")

  return (
    <div className='container mx-auto px-4 py-8 space-y-6'>
      {/* 页面标题 */}
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>{t("title")}</h1>
      </div>

      {/* 设置选项 */}
      <div className='space-y-4'>
        {/* 语言设置 */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Icon name='Languages' className='h-5 w-5' />
              {t("language")}
            </CardTitle>
            <CardDescription>{/* 选择您的首选语言 */}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>{t("currentLanguage")}</span>
              <LanguageSwitcher />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
