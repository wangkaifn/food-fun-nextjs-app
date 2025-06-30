import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import BottomNavigation from "@/components/layout/bottom-navigation"
import PWAInstallPrompt from "@/components/pwa/install-prompt"
import PWAUpdatePrompt from "@/components/pwa/update-prompt"
import { cn } from "@/lib/utils"
import { locales, type Locale } from "@/i18n/config"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const appName = messages?.common?.appName || "Food Fun"
  const appDescription = messages?.common?.appDescription || "一个美食相关的 Next.js 应用"

  return {
    title: appName,
    description: appDescription
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // 验证locale参数
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // 获取消息
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={cn("antialiased bg-theme-gradient text-foreground min-h-screen")}>
        <PWAUpdatePrompt />
        <main className='pb-20'>{children}</main>
        <BottomNavigation />
        <PWAInstallPrompt />
      </div>
    </NextIntlClientProvider>
  )
}
