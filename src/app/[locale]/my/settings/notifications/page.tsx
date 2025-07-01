"use client"

import { useTranslations } from "next-intl"
import PageContainer from "@/components/layout/page-container"

export default function NotificationsSettingsPage() {
  const t = useTranslations("settings")

  return (
    <PageContainer title={t("notifications")} variant='default'>
      <div className='p-4'>
        <div className='text-center py-20'>
          <h2 className='text-lg font-medium text-muted-foreground mb-2'>通知设置</h2>
          <p className='text-sm text-muted-foreground'>此页面正在开发中...</p>
        </div>
      </div>
    </PageContainer>
  )
}
