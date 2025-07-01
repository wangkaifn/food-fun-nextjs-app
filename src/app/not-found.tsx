import { redirect } from "@/i18n/navigation"
import { defaultLocale } from "@/i18n/config"

export default function GlobalNotFound() {
  redirect({ href: "/", locale: defaultLocale })
}
