"use client"

import { useTranslations } from "next-intl"
import PageContainer from "@/components/layout/page-container"

export default function AccountSettingsPage() {
  const t = useTranslations("settings")

  return (
    <PageContainer title={t("account")} variant='default'>
      <div className='p-4'>
        <div className='text-center py-20'>
          <h2 className='text-lg font-medium text-muted-foreground mb-2'>账号与安全</h2>
          <p className='text-sm text-muted-foreground'>此页面正在开发中...</p>
        </div>
      </div>
    </PageContainer>
  )
}
