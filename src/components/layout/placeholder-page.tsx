"use client"

import PageContainer from "@/components/layout/page-container"

interface PlaceholderPageProps {
  title: string
  subtitle?: string
  variant?: "default" | "dark" | "gradient"
}

export default function PlaceholderPage({
  title,
  subtitle,
  variant = "default"
}: PlaceholderPageProps) {
  return (
    <PageContainer title={title} variant={variant}>
      <div className='p-4'>
        <div className='text-center py-20'>
          <h2 className='text-lg font-medium text-muted-foreground mb-2'>{title}</h2>
          {subtitle && <p className='text-sm text-muted-foreground mb-2'>{subtitle}</p>}
          <p className='text-sm text-muted-foreground'>此页面正在开发中...</p>
        </div>
      </div>
    </PageContainer>
  )
}
