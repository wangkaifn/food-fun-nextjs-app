"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import SettingsPage from "@/components/common/settings-page"

export default function SettingsMainPage() {
  const t = useTranslations("settings")

  const settingsGroups = [
    {
      title: "基础设置",
      items: [
        {
          icon: "User",
          title: t("account"),
          subtitle: "管理您的账号信息和安全设置",
          href: "/my/settings/account"
        },
        {
          icon: "Settings",
          title: t("general"),
          subtitle: "主题、语言、字体等通用配置",
          href: "/my/settings/general"
        },
        {
          icon: "Bell",
          title: t("notifications"),
          subtitle: "消息通知和提醒设置",
          href: "/my/settings/notifications"
        }
      ]
    }
  ]

  return (
    <SettingsPage title={t("title")} variant='dark' groups={settingsGroups}>
      {/* 账号操作区域 */}
      <div className='space-y-4 pt-8'>
        <Button
          variant='ghost'
          className='w-full text-foreground bg-muted/50 hover:bg-muted/70 rounded-lg py-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
        >
          {t("switchAccount")}
        </Button>

        <Button
          variant='ghost'
          className='w-full text-foreground bg-muted/50 hover:bg-muted/70 rounded-lg py-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
        >
          {t("logout")}
        </Button>
      </div>

      {/* 底部法律条款 */}
      <div className='flex flex-wrap justify-center gap-4 py-8 text-xs text-muted-foreground'>
        <span className='hover:text-foreground transition-colors duration-200 cursor-pointer'>
          《个人信息收集清单》
        </span>
        <span className='hover:text-foreground transition-colors duration-200 cursor-pointer'>
          《第三方信息共享清单》
        </span>
        <span className='hover:text-foreground transition-colors duration-200 cursor-pointer'>
          《食趣用户服务协议》
        </span>
        <span className='hover:text-foreground transition-colors duration-200 cursor-pointer'>
          《食趣用户隐私政策》
        </span>
      </div>

      {/* 底部安全区域 */}
      <div className='h-8'></div>
    </SettingsPage>
  )
}
