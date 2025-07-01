// 这个文件将被next-intl中间件自动处理
// 用户访问根路径时，中间件会自动重定向到合适的语言版本
import { defaultLocale } from "@/i18n/config"
import { redirect } from "next/navigation"
export default function RootPage() {
  redirect(defaultLocale)
}
