import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)
export const config = {
  // 匹配所有路径，除了静态文件、API路由和Next.js内部路由
  matcher: [
    // 匹配除了这些路径之外的所有路径：
    // - api (API 路由)
    // - _next/static (静态文件)
    // - _next/image (图片优化)
    // - favicon.ico (网站图标)
    // - 包含点的文件 (如 .js, .css, .png 等)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|sw.js|manifest.json).*)"
  ]
}
