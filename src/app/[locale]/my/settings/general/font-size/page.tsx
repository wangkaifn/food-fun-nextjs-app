"use client"

import { useTranslations } from "next-intl"
import PageContainer from "@/components/layout/page-container"

export default function FontSizeSettingsPage() {
  const t = useTranslations("settings")

  return (
    <PageContainer title={t("fontSize")} variant='default'>
      <div className='p-4'>
        <div className='text-center py-20'>
          <h2 className='text-lg font-medium text-muted-foreground mb-2'>字体大小</h2>
          <p className='text-sm text-muted-foreground'>此页面正在开发中...</p>
        </div>
      </div>
    </PageContainer>
  )
}
