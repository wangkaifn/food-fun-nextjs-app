"use client"

import { useTranslations } from "next-intl"

export default function AIPage() {
  const t = useTranslations("ai")

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-4'>{t("title")}</h1>
        <p className='text-muted-foreground'>{t("subtitle")}</p>
      </div>
    </div>
  )
}
