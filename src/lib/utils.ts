import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 根据当前语言构建本地化路径
 * 在使用 [locale] 动态路由的情况下，所有语言都需要语言前缀
 * @param href 基础路径
 * @param locale 当前语言
 * @returns 本地化的路径
 */
export function getLocalizedPath(href: string, locale: string): string {
  // 在 [locale] 路由结构下，所有语言都需要语言前缀
  return `/${locale}${href}`
}
