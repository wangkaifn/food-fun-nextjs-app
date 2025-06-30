import type { NextConfig } from "next"
import withSerwistInit from "@serwist/next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const withSerwist = withSerwistInit({
  // 在开发环境禁用Serwist，避免Turbopack兼容性问题
  disable: process.env.NODE_ENV === "development",
  swSrc: "src/app/sw.ts", // Service Worker 源文件路径
  swDest: "public/sw.js" // 生成的 Service Worker 文件路径
})

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false
}

export default withSerwist(withNextIntl(nextConfig))
