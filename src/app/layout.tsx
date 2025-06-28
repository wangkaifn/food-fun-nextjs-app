import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import BottomNavigation from "@/components/layout/bottom-navigation"
import PWAInstallPrompt from "@/components/pwa/install-prompt"
import PWAUpdatePrompt from "@/components/pwa/update-prompt"
import { cn } from "@/lib/utils"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Food Fun Next.js App",
  description: "一个美食相关的 Next.js 应用",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Food Fun"
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: "Food Fun",
    title: "Food Fun Next.js App",
    description: "一个美食相关的 Next.js 应用"
  }
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/icons/icon-192x192.png' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      </head>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased bg-theme-gradient text-foreground flex flex-col min-h-screen`
        )}
      >
        <PWAUpdatePrompt />
        <main className='flex-1'>{children}</main>
        <BottomNavigation />
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
