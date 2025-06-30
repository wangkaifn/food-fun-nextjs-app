# Next.js + next-intl 国际化集成方案

## 📋 目录

- [概述](#概述)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [配置文件详解](#配置文件详解)
- [布局架构](#布局架构)
- [核心组件实现](#核心组件实现)
- [路由和导航](#路由和导航)
- [翻译文件管理](#翻译文件管理)
- [错误处理](#错误处理)
- [最佳实践](#最佳实践)
- [部署优化](#部署优化)
- [常见问题](#常见问题)

## 🌍 概述

本文档详细说明了如何在 Next.js 项目中集成 next-intl 国际化解决方案，实现完整的多语言支持。

### 支持的语言

- 🇨🇳 中文 (zh) - 默认语言
- 🇺🇸 英文 (en)

### 主要特性

- ✅ 完整的多语言路由支持
- ✅ 服务端渲染(SSR)兼容
- ✅ 静态站点生成(SSG)优化
- ✅ TypeScript 类型安全
- ✅ 自动语言检测和重定向
- ✅ SEO 友好的 URL 结构

## 🛠 技术栈

### 核心依赖

```json
{
  "next": "^15.0.0",
  "next-intl": "^3.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0"
}
```

### 安装依赖

```bash
pnpm add next-intl
```

## 📁 项目结构

```
food-fun-nextjs-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # 根布局 (HTML 结构)
│   │   ├── not-found.tsx                 # 全局 404 页面
│   │   ├── page.tsx                      # 根页面 (重定向)
│   │   ├── globals.css                   # 全局样式
│   │   └── [locale]/                     # 动态语言路由
│   │       ├── layout.tsx                # 本地化布局
│   │       ├── not-found.tsx             # 本地化 404 页面
│   │       ├── page.tsx                  # 首页
│   │       ├── my/page.tsx               # 个人页面
│   │       ├── search/page.tsx           # 搜索页面
│   │       ├── community/page.tsx        # 社区页面
│   │       └── ai/page.tsx               # AI 页面
│   ├── components/
│   │   ├── language/
│   │   │   └── language-switcher.tsx    # 语言切换器
│   │   └── layout/
│   │       └── bottom-navigation.tsx    # 底部导航
│   ├── i18n/
│   │   ├── config.ts                     # 语言配置
│   │   ├── routing.ts                    # 路由配置
│   │   ├── navigation.ts                 # 导航工具
│   │   └── request.ts                    # 服务端配置
│   └── lib/
│       └── utils.ts                      # 工具函数
├── messages/                             # 翻译文件
│   ├── zh.json                          # 中文翻译
│   └── en.json                          # 英文翻译
├── middleware.ts                         # Next.js 中间件
├── next.config.ts                        # Next.js 配置
└── package.json
```

## ⚙️ 配置文件详解

### 1. 语言配置 (`src/i18n/config.ts`)

```typescript
export type Locale = "zh" | "en"

export const locales: Locale[] = ["zh", "en"]
export const defaultLocale: Locale = "zh"

export const localeNames: Record<Locale, string> = {
  zh: "中文",
  en: "English"
}

export const localeFlags: Record<Locale, string> = {
  zh: "🇨🇳",
  en: "🇺🇸"
}
```

### 2. 路由配置 (`src/i18n/routing.ts`)

```typescript
import { defineRouting } from "next-intl/routing"
import { defaultLocale, locales } from "./config"

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed" // 所有语言都使用前缀
})
```

### 3. 导航工具 (`src/i18n/navigation.ts`)

```typescript
import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
```

### 4. 服务端配置 (`src/i18n/request.ts`)

```typescript
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})
```

### 5. 中间件配置 (`middleware.ts`)

```typescript
import createMiddleware from "next-intl/middleware"
import { routing } from "./src/i18n/routing"

export default createMiddleware(routing)

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
}
```

## 🏗 布局架构

### 根布局层次结构

```
根布局 (app/layout.tsx)
├── <html> ✅ 必需标签
├── <body> ✅ 必需标签
├── 基础字体配置
├── PWA 元数据
└── 本地化布局 (app/[locale]/layout.tsx)
    ├── NextIntlClientProvider
    ├── PWA 组件
    ├── 主内容区域
    └── 底部导航
```

### 根布局实现 (`src/app/layout.tsx`)

```typescript
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Food Fun",
  description: "一个美食相关的 Next.js 应用",
  manifest: "/manifest.json",
  // ... 其他 PWA 配置
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' />
        {/* ... 其他头部标签 */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

### 本地化布局实现 (`src/app/[locale]/layout.tsx`)

```typescript
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { locales, type Locale } from "@/i18n/config"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-theme-gradient">
        <main className='pb-20'>{children}</main>
        <BottomNavigation />
      </div>
    </NextIntlClientProvider>
  )
}
```

## 🧩 核心组件实现

### 1. 本地化路径工具 (`src/lib/utils.ts`)

```typescript
/**
 * 根据当前语言构建本地化路径
 * 在使用 [locale] 动态路由的情况下，所有语言都需要语言前缀
 */
export function getLocalizedPath(href: string, locale: string): string {
  return `/${locale}${href}`
}
```

### 2. 语言切换器 (`src/components/language/language-switcher.tsx`)

```typescript
"use client"

import { useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useLocale } from "next-intl"

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return

    startTransition(() => {
      // 移除当前语言前缀
      let pathWithoutLocale = pathname
      if (pathname.startsWith(`/${locale}`)) {
        pathWithoutLocale = pathname.slice(`/${locale}`.length)
      }

      if (!pathWithoutLocale) {
        pathWithoutLocale = "/"
      }

      // 在 [locale] 路由结构下，所有语言都需要语言前缀
      const newPath = `/${newLocale}${pathWithoutLocale}`
      router.push(newPath)
    })
  }

  // ... 渲染逻辑
}
```

### 3. 底部导航 (`src/components/layout/bottom-navigation.tsx`)

```typescript
"use client"

import { useLocale } from "next-intl"
import { getLocalizedPath } from "@/lib/utils"

const navItems = [
  { key: "home", href: "/", icon: "Home" },
  { key: "search", href: "/search", icon: "Search" },
  // ... 其他导航项
]

export default function BottomNavigation() {
  const locale = useLocale()

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 pb-safe'>
      <div className='flex h-16 items-center justify-around px-safe'>
        {navItems.map(item => (
          <Link
            key={item.key}
            href={getLocalizedPath(item.href, locale)}
            // ... 样式
          >
            {/* ... 内容 */}
          </Link>
        ))}
      </div>
    </nav>
  )
}
```

## 🗺 路由和导航

### URL 路径结构

```
/ (根路径)
├── /zh/                    # 中文首页
├── /zh/my                  # 中文个人页面
├── /zh/search              # 中文搜索页面
├── /en/                    # 英文首页
├── /en/my                  # 英文个人页面
└── /en/search              # 英文搜索页面
```

### 路径前缀策略

- **所有语言都使用前缀**：避免路径冲突
- **与文件结构保持一致**：`[locale]` 目录结构
- **中间件自动重定向**：访问 `/` 自动重定向到 `/zh/`

### 导航组件使用

```typescript
// ✅ 推荐：使用国际化导航工具
import { Link } from "@/i18n/navigation"
<Link href="/about">关于我们</Link>

// ❌ 避免：直接使用 Next.js Link
import Link from "next/link"
<Link href="/zh/about">关于我们</Link>
```

## 📝 翻译文件管理

### 文件结构建议

```json
// messages/zh.json
{
  "common": {
    "appName": "Food Fun",
    "appDescription": "一个美食相关的 Next.js 应用",
    "language": "语言"
  },
  "navigation": {
    "home": "首页",
    "search": "搜索",
    "community": "社区",
    "ai": "AI助手",
    "my": "我的"
  },
  "error": {
    "pageNotFound": "页面未找到",
    "pageNotFoundDescription": "您访问的页面不存在或已被移除",
    "goHome": "返回首页"
  },
  "pages": {
    "home": {
      "title": "欢迎使用 Food Fun",
      "subtitle": "发现美食，分享快乐"
    }
  }
}
```

```json
// messages/en.json
{
  "common": {
    "appName": "Food Fun",
    "appDescription": "A food-related Next.js application",
    "language": "Language"
  },
  "navigation": {
    "home": "Home",
    "search": "Search",
    "community": "Community",
    "ai": "AI Assistant",
    "my": "My"
  },
  "error": {
    "pageNotFound": "Page Not Found",
    "pageNotFoundDescription": "The page you are looking for does not exist or has been removed",
    "goHome": "Go Home"
  },
  "pages": {
    "home": {
      "title": "Welcome to Food Fun",
      "subtitle": "Discover food, share joy"
    }
  }
}
```

### 翻译最佳实践

1. **层次化组织**：按功能模块组织翻译键
2. **命名规范**：使用 camelCase 命名法
3. **复用性**：将通用文本放在 `common` 下
4. **占位符支持**：使用参数化翻译

```typescript
// 使用示例
const t = useTranslations("pages.home")
const title = t("title") // "欢迎使用 Food Fun"

// 参数化翻译
const welcomeMsg = t("welcome", { name: "张三" }) // "欢迎 张三"
```

## 🚨 错误处理

### 404 页面层次

```
404 错误处理
├── 根级别 not-found.tsx
│   ├── 处理无效语言代码 (/invalid-lang/page)
│   ├── 处理系统级 404 错误
│   └── 重定向到默认语言
└── 本地化 [locale]/not-found.tsx
    ├── 处理语言内页面不存在 (/zh/invalid-page)
    ├── 支持国际化内容
    └── 本地化的错误信息
```

### 实现示例

```typescript
// src/app/not-found.tsx (根级别)
export default function GlobalNotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>404</h1>
        <p>Page Not Found</p>
        <Link href="/zh/">Go Home</Link>
      </div>
    </div>
  )
}

// src/app/[locale]/not-found.tsx (本地化)
export default function LocalizedNotFound() {
  const t = useTranslations("error")
  const locale = useLocale()

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>404</h1>
        <p>{t("pageNotFoundDescription")}</p>
        <Link href={`/${locale}/`}>{t("goHome")}</Link>
      </div>
    </div>
  )
}
```

## ✨ 最佳实践

### ✅ 推荐做法

1. **统一路径工具**

   ```typescript
   // 使用统一的 getLocalizedPath 函数
   import { getLocalizedPath } from "@/lib/utils"
   ```

2. **类型安全**

   ```typescript
   // 定义明确的 Locale 类型
   export type Locale = "zh" | "en"
   ```

3. **组件复用**

   ```typescript
   // 创建可复用的国际化组件
   export function LocalizedLink({ href, children, ...props }) {
     const locale = useLocale()
     return <Link href={getLocalizedPath(href, locale)} {...props}>{children}</Link>
   }
   ```

4. **SEO 优化**

   ```typescript
   // 动态元数据
   export async function generateMetadata({ params }: Props): Promise<Metadata> {
     const { locale } = await params
     const messages = await getMessages({ locale })

     return {
       title: messages.common.appName,
       description: messages.common.appDescription
     }
   }
   ```

### ❌ 避免的问题

1. **硬编码语言前缀**

   ```typescript
   // ❌ 不要这样做
   <Link href="/zh/about">关于我们</Link>

   // ✅ 应该这样做
   <Link href={getLocalizedPath("/about", locale)}>关于我们</Link>
   ```

2. **混用导航工具**

   ```typescript
   // ❌ 不要混用
   import Link from "next/link"
   import { Link as IntlLink } from "@/i18n/navigation"

   // ✅ 统一使用国际化版本
   import { Link } from "@/i18n/navigation"
   ```

3. **忘记语言验证**
   ```typescript
   // ✅ 总是验证语言参数
   if (!locales.includes(locale as Locale)) {
     notFound()
   }
   ```

## 🚀 部署优化

### 静态生成配置

```typescript
// 为所有语言生成静态页面
export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}
```

### Next.js 配置优化 (`next.config.ts`)

```typescript
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 性能优化
  experimental: {
    optimizePackageImports: ["next-intl"]
  },

  // 国际化配置
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Accept-Language",
            value: "zh,en;q=0.9"
          }
        ]
      }
    ]
  }
}

export default withNextIntl(nextConfig)
```

### 构建优化

```bash
# 构建时分析包大小
npm run build -- --analyze

# 优化翻译文件加载
# 使用动态导入减少初始包大小
const messages = await import(`../../messages/${locale}.json`)
```

## ❓ 常见问题

### Q1: 为什么所有语言都需要前缀？

**A:** 在使用 `[locale]` 动态路由的项目结构中，文件系统本身就要求所有路径包含语言前缀。如果默认语言不使用前缀，会导致路径不匹配，产生 404 错误。

### Q2: 如何处理复杂的嵌套翻译？

**A:** 使用点记法访问嵌套的翻译键：

```typescript
const t = useTranslations("pages.user.profile")
const title = t("title") // 访问 pages.user.profile.title
```

### Q3: 如何实现动态路由的国际化？

**A:**

```typescript
// [locale]/user/[id]/page.tsx
export default function UserProfile({ params }: { params: { locale: string; id: string } }) {
  // 实现逻辑
}
```

### Q4: 如何优化翻译文件的加载性能？

**A:**

1. 按页面拆分翻译文件
2. 使用 webpack 的动态导入
3. 实现翻译缓存机制

### Q5: 如何处理 RTL（从右到左）语言？

**A:**

```typescript
// 在配置中添加 RTL 支持
export const localeConfig = {
  zh: { dir: "ltr" },
  ar: { dir: "rtl" } // 阿拉伯语
}
```

## 📚 参考资源

- [next-intl 官方文档](https://next-intl-docs.vercel.app/)
- [Next.js 国际化指南](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [React Intl 最佳实践](https://formatjs.io/docs/react-intl/)

---

**版本:** 1.0.0  
**更新时间:** 2024-12-19  
**维护者:** Food Fun 开发团队

> 💡 **提示**: 本文档会持续更新，建议定期查看最新版本。如有问题或建议，请提交 Issue 或 PR。
