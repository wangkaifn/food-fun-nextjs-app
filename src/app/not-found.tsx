import { redirect } from "next/navigation"
import { defaultLocale } from "@/i18n/config"

export default function GlobalNotFound() {
  // 重定向到默认语言的 404 页面
  redirect(`/${defaultLocale}/not-found`)
}
