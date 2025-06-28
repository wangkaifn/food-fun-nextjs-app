# PWA 配置详细技术说明

## 概述

本项目采用现代化的 PWA 解决方案，使用 `@serwist/next` 作为核心框架，实现了完整的渐进式 Web 应用功能。本文档将详细说明所有 PWA 相关的配置和实现细节。

## 技术架构

### 核心框架：Serwist

- **框架选择**: `@serwist/next` v9.0.15
- **优势**:
  - Next.js 原生集成
  - TypeScript 完整支持
  - 现代化的 Service Worker 管理
  - 灵活的缓存策略
  - 预缓存自动生成

## 1. Next.js 配置集成

### 文件：`next.config.ts`

```typescript
import type { NextConfig } from "next"
import withSerwistInit from "@serwist/next"

const withSerwist = withSerwistInit({
  // 在开发环境禁用Serwist，避免Turbopack兼容性问题
  disable: process.env.NODE_ENV === "development",
  swSrc: "src/app/sw.ts", // Service Worker 源文件路径
  swDest: "public/sw.js" // 生成的 Service Worker 文件路径
})

const nextConfig: NextConfig = {
  /* config options here */
}

export default withSerwist(nextConfig)
```

**配置说明：**

- **disable**: 开发环境自动禁用，避免与 Turbopack 冲突
- **swSrc**: TypeScript Service Worker 源文件位置
- **swDest**: 编译后的 Service Worker 输出位置
- **自动功能**:
  - 静态资源预缓存清单自动生成
  - Workbox 缓存策略集成
  - 构建时优化和压缩

## 2. Service Worker 实现

### 文件：`src/app/sw.ts`

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultCache } from "@serwist/next/worker"
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist"
import { Serwist } from "serwist"

// 预缓存条目自动注入
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[]
    skipWaiting(): void
    addEventListener(type: string, listener: (event: any) => void): void
  }
}

declare const self: WorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: false, // 用户控制更新时机
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache
})

// 监听来自客户端的消息
self.addEventListener("message", (event: any) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

serwist.addEventListeners()
```

**核心特性：**

1. **预缓存管理**: 自动缓存构建时的静态资源
2. **用户控制更新**: `skipWaiting: false` 让用户决定更新时机
3. **客户端接管**: `clientsClaim: true` 立即控制页面
4. **导航预加载**: `navigationPreload: true` 优化导航性能
5. **运行时缓存**: 使用默认缓存策略处理动态内容
6. **消息通信**: 监听客户端发送的 `SKIP_WAITING` 消息

## 3. 应用清单配置

### 文件：`public/manifest.json`

```json
{
  "name": "食趣 - 美食探索平台",
  "short_name": "食趣",
  "description": "发现美食，享受烹饪，健康生活",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#f97316",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/maskable-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**配置详解：**

- **name**: 完整应用名称，安装时显示
- **short_name**: 简短名称，主屏幕显示
- **description**: 应用描述，应用商店和安装提示显示
- **start_url**: 应用启动 URL
- **display**: `standalone` 模式提供原生应用体验
- **background_color**: 启动画面背景色
- **theme_color**: 状态栏和浏览器 UI 主题色 (#f97316 - 橙色)
- **orientation**: 限制为竖屏模式
- **icons**: Maskable 图标支持 Android 自适应图标

## 4. HTML Meta 标签配置

### 文件：`src/app/layout.tsx`

```typescript
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
```

**元标签说明：**

- **manifest**: 链接到应用清单文件
- **appleWebApp**: iOS Safari 专用 PWA 配置
- **formatDetection**: 禁用自动电话号码检测
- **openGraph**: 社交媒体分享优化
- **viewport**: 移动端视口优化，禁用用户缩放

**关键 Meta 标签：**

```html
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

## 5. 图标资源体系

### 完整图标集合

**Favicon 系列** (浏览器标签页):

- 16x16px (1,129 bytes) - 小尺寸标签页
- 32x32px (4,217 bytes) - 标准标签页
- 48x48px (9,365 bytes) - 高分辨率标签页
- 64x64px (16,561 bytes) - 超高分辨率

**应用图标系列** (主屏幕和应用列表):

- 72x72px (20,921 bytes) - Android 低密度屏幕
- 96x96px (37,102 bytes) - Android 中密度屏幕
- 128x128px (65,859 bytes) - 桌面应用
- 144x144px (83,307 bytes) - Android 高密度屏幕
- 192x192px (147,973 bytes) - Android 标准图标
- 256x256px (262,913 bytes) - 桌面高分辨率
- 384x384px (591,246 bytes) - Android 超高密度
- 512x512px (1,050,873 bytes) - PWA 标准图标
- 1024x1024px (4,202,201 bytes) - 高质量显示

**Maskable 图标系列** (Android 自适应):

- 192x192px (38,102 bytes) - 标准自适应图标
- 512x512px (263,987 bytes) - 高质量自适应图标

**设计规范：**

- 安全区域：图标内容在中心 80% 区域内
- 背景填充：确保四角圆形裁剪后视觉效果
- 向量化支持：SVG 格式的矢量图标

## 6. PWA 功能组件

### 安装提示组件

**文件：`src/components/pwa/install-prompt.tsx`**

**核心功能：**

1. **环境检测**

   ```typescript
   const supported =
     typeof window !== "undefined" &&
     "serviceWorker" in navigator &&
     process.env.NODE_ENV === "production"
   ```

2. **安装状态检测**

   ```typescript
   if (window.matchMedia("(display-mode: standalone)").matches) {
     return // 已安装，不显示提示
   }
   ```

3. **用户偏好存储**

   ```typescript
   localStorage.setItem("pwa-never-show", "true") // 永不提醒
   localStorage.setItem("pwa-prompted-today", new Date().toDateString()) // 今日已提醒
   ```

4. **延迟显示策略**
   ```typescript
   setTimeout(() => {
     setShowPrompt(true)
   }, 10000) // 10秒后显示，让用户先体验应用
   ```

**用户体验优化：**

- 非侵入式设计：不在应用加载时立即显示
- 智能提醒：记住用户选择，避免重复打扰
- 平台适配：检测不同浏览器的安装能力
- 优雅降级：不支持环境下自动隐藏

### 更新提示组件

**文件：`src/components/pwa/update-prompt.tsx`**

**更新检测机制：**

1. **Service Worker 状态监听**

   ```typescript
   navigator.serviceWorker.ready.then(registration => {
     if (registration.waiting) {
       setWaitingWorker(registration.waiting)
       setShowUpdatePrompt(true)
     }
   })
   ```

2. **定时检查策略**

   ```typescript
   const updateInterval = setInterval(checkForUpdates, 120000) // 2分钟检查一次
   ```

3. **页面可见性优化**

   ```typescript
   const handleVisibilityChange = () => {
     if (!document.hidden) {
       checkForUpdates()
     }
   }
   ```

4. **强制更新机制**
   ```typescript
   waitingWorker.postMessage({ type: "SKIP_WAITING" })
   setTimeout(() => {
     window.location.reload()
   }, 1000)
   ```

## 7. 缓存策略详解

### 预缓存资源 (构建时生成)

**自动包含：**

- Next.js 静态资源 (`/_next/static/`)
- 应用页面和组件
- 字体文件
- 图标和清单文件

**预缓存特点：**

- 安装时立即缓存
- 版本控制和更新检测
- 完整离线支持

### 运行时缓存策略

**1. Google Fonts**

```typescript
// 字体文件 - Cache First
{
  matcher: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
  handler: new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [new ExpirationPlugin({
      maxEntries: 4,
      maxAgeSeconds: 31536000, // 1年
      maxAgeFrom: "last-used"
    })]
  })
}

// 字体样式表 - Stale While Revalidate
{
  matcher: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
  handler: new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
    plugins: [new ExpirationPlugin({
      maxEntries: 4,
      maxAgeSeconds: 604800, // 1周
      maxAgeFrom: "last-used"
    })]
  })
}
```

**2. 静态资源**

```typescript
// 图片资源
{
  matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  handler: new StaleWhileRevalidate({
    cacheName: "static-image-assets",
    plugins: [new ExpirationPlugin({
      maxEntries: 64,
      maxAgeSeconds: 2592000, // 30天
    })]
  })
}

// JavaScript 资源
{
  matcher: /\/_next\/static.+\.js$/i,
  handler: new CacheFirst({
    cacheName: "next-static-js-assets",
    plugins: [new ExpirationPlugin({
      maxEntries: 64,
      maxAgeSeconds: 86400, // 1天
    })]
  })
}
```

**3. API 缓存**

```typescript
// API 接口
{
  matcher: ({sameOrigin, url: {pathname}}) =>
    sameOrigin && pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/auth/callback"),
  method: "GET",
  handler: new NetworkFirst({
    cacheName: "apis",
    plugins: [new ExpirationPlugin({
      maxEntries: 16,
      maxAgeSeconds: 86400
    })],
    networkTimeoutSeconds: 10
  })
}
```

**4. Next.js 特殊缓存**

```typescript
// RSC (React Server Components) 预取
{
  matcher: ({request, url: {pathname}, sameOrigin}) =>
    request.headers.get("RSC") === "1" &&
    request.headers.get("Next-Router-Prefetch") === "1" &&
    sameOrigin && !pathname.startsWith("/api/"),
  handler: new NetworkFirst({
    cacheName: "pages-rsc-prefetch",
    plugins: [new ExpirationPlugin({
      maxEntries: 32,
      maxAgeSeconds: 86400
    })]
  })
}

// RSC 常规请求
{
  matcher: ({request, url: {pathname}, sameOrigin}) =>
    request.headers.get("RSC") === "1" &&
    sameOrigin && !pathname.startsWith("/api/"),
  handler: new NetworkFirst({
    cacheName: "pages-rsc",
    plugins: [new ExpirationPlugin({
      maxEntries: 32,
      maxAgeSeconds: 86400
    })]
  })
}

// HTML 页面
{
  matcher: ({request, url: {pathname}, sameOrigin}) =>
    request.headers.get("Content-Type")?.includes("text/html") &&
    sameOrigin && !pathname.startsWith("/api/"),
  handler: new NetworkFirst({
    cacheName: "pages-html",
    plugins: [new ExpirationPlugin({
      maxEntries: 32,
      maxAgeSeconds: 86400
    })]
  })
}
```

### 缓存策略说明

**1. Cache First (缓存优先)**

- 用途：静态资源 (JS、CSS、字体)
- 策略：先检查缓存，不存在时网络获取
- 优势：最快的加载速度
- 适用：变化少的资源

**2. Network First (网络优先)**

- 用途：API、页面内容
- 策略：先尝试网络，失败时使用缓存
- 优势：内容最新，离线可用
- 适用：动态内容

**3. Stale While Revalidate (过期重新验证)**

- 用途：图片、样式表
- 策略：返回缓存，后台更新
- 优势：快速响应 + 内容更新
- 适用：可接受暂时过期的资源

## 8. 离线功能实现

### 离线页面支持

**导航回退：**

```typescript
// 导航失败时的回退页面
navigateFallback: "/offline", // 可选：创建离线页面
navigateFallbackAllowlist: [/^(?!\/__).*/], // 允许的路径
navigateFallbackDenylist: [/^\/__.*$/] // 排除的路径
```

**离线指示器：**

```typescript
// 网络状态检测
window.addEventListener("online", () => {
  // 网络恢复处理
})

window.addEventListener("offline", () => {
  // 离线状态处理
})
```

### 后台同步 (可扩展)

```typescript
// 后台同步配置 (未来扩展)
import { BackgroundSync } from "workbox-background-sync"

const bgSync = new BackgroundSync("api-queue", {
  maxRetentionTime: 24 * 60 // 24小时
})

// 失败的 API 请求自动重试
self.addEventListener("sync", event => {
  if (event.tag === "api-queue") {
    event.waitUntil(bgSync.replayRequests())
  }
})
```

## 9. 性能优化

### 预缓存优化

**资源压缩：**

- Gzip/Brotli 压缩
- 图片优化和 WebP 支持
- CSS/JS 最小化

**智能预缓存：**

- 关键路径优先
- 增量更新
- 版本化管理

### 运行时优化

**缓存过期管理：**

```typescript
new ExpirationPlugin({
  maxEntries: 64, // 最大缓存条目
  maxAgeSeconds: 86400, // 最大缓存时间
  maxAgeFrom: "last-used", // 基于最后使用时间
  purgeOnQuotaError: true // 配额不足时清理
})
```

**内存管理：**

- 自动清理过期缓存
- 配额检测和处理
- LRU (最近最少使用) 策略

## 10. 开发和调试

### 开发环境配置

```typescript
// 开发时禁用 PWA
disable: process.env.NODE_ENV === "development"
```

**原因：**

- 避免缓存干扰开发
- 兼容 Turbopack 快速刷新
- 简化调试过程

### 生产环境验证

**PWA 检查清单：**

1. ✅ HTTPS 部署
2. ✅ Manifest 文件有效
3. ✅ Service Worker 注册成功
4. ✅ 图标完整可用
5. ✅ 离线功能正常
6. ✅ 安装提示工作
7. ✅ 更新机制正常

**调试工具：**

- Chrome DevTools → Application → Service Workers
- Chrome DevTools → Application → Manifest
- Chrome DevTools → Application → Storage
- Lighthouse PWA 审计

### 部署注意事项

**必需配置：**

1. HTTPS 协议
2. 正确的 MIME 类型
3. 适当的缓存头
4. Service Worker 作用域

**优化建议：**

1. CDN 分发静态资源
2. 启用 HTTP/2
3. 配置适当的 CSP
4. 监控缓存性能

## 11. 浏览器兼容性

### 支持情况

**完整支持：**

- Chrome 67+
- Firefox 60+
- Safari 11.1+
- Edge 79+

**部分支持：**

- Safari iOS (安装限制)
- Chrome Android (完整支持)

**优雅降级：**

- 不支持环境自动禁用 PWA 功能
- 保持基本 Web 应用功能
- 渐进增强策略

### 平台特性

**Android：**

- 完整 PWA 支持
- 原生安装体验
- 后台同步
- 推送通知

**iOS：**

- 基础 PWA 支持
- 手动安装 (添加到主屏幕)
- 有限后台功能
- 无推送通知 (iOS 16.4+ 支持)

**桌面端：**

- Chrome/Edge 完整支持
- 窗口模式运行
- 系统集成
- 快捷方式支持

## 12. 安全考虑

### Service Worker 安全

**作用域限制：**

- Service Worker 只能控制同域资源
- 无法访问父级路径
- 受同源策略限制

**内容安全策略 (CSP)：**

```http
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline';
  worker-src 'self'
```

### 缓存安全

**敏感数据处理：**

- 不缓存认证信息
- API 响应过滤
- 用户数据隔离

**更新机制：**

- 强制更新敏感变更
- 版本控制和回滚
- 恶意缓存检测

## 总结

本项目的 PWA 配置采用了现代化的技术栈和最佳实践：

1. **完整的 PWA 功能**：安装、离线、更新、缓存
2. **优秀的用户体验**：快速加载、原生感受、智能提示
3. **强大的缓存策略**：多层次、多策略、自动管理
4. **良好的兼容性**：跨平台支持、优雅降级
5. **开发友好**：TypeScript、调试工具、文档完善

这套配置为用户提供了接近原生应用的体验，同时保持了 Web 应用的灵活性和可访问性。
