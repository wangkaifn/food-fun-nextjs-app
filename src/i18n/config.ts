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
