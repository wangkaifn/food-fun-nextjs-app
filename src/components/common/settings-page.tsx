"use client"

import { useRouter } from "@/i18n/navigation"
import SettingsItem from "@/components/common/settings-item"
import PageContainer from "@/components/layout/page-container"

interface SettingsItem {
  icon: string
  title: string
  subtitle?: string
  value?: string
  href?: string
  onClick?: () => void
  rightElement?: React.ReactNode
}

interface SettingsGroup {
  title?: string
  items: SettingsItem[]
}

interface SettingsPageProps {
  title: string
  variant?: "default" | "dark" | "gradient"
  groups: SettingsGroup[]
  children?: React.ReactNode
}

export default function SettingsPage({
  title,
  variant = "default",
  groups,
  children
}: SettingsPageProps) {
  const router = useRouter()

  // 渲染设置项
  const renderItem = (item: SettingsItem, itemIndex: number) => (
    <div key={itemIndex}>
      <SettingsItem
        icon={item.icon}
        title={item.title}
        subtitle={item.subtitle}
        value={item.value}
        onClick={item.href ? () => router.push(item.href!) : item.onClick}
        rightElement={item.rightElement}
      />
    </div>
  )

  return (
    <PageContainer title={title} variant={variant}>
      <div className='p-4 space-y-6'>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.title && (
              <h3 className='text-sm font-medium text-muted-foreground mb-3 px-4'>{group.title}</h3>
            )}

            <div className='space-y-3'>
              {group.items.map((item, itemIndex) => renderItem(item, itemIndex))}
            </div>
          </div>
        ))}
        {children && <div>{children}</div>}
      </div>
    </PageContainer>
  )
}
