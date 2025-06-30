"use client"

import { useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/common/icon"
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config"

export default function LanguageSwitcher() {
  const t = useTranslations("common")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return

    startTransition(() => {
      // 构建新的路径
      const segments = pathname.split("/").filter(Boolean)

      // 如果当前路径包含语言前缀，则替换它；否则添加语言前缀
      if (locales.includes(segments[0] as Locale)) {
        segments[0] = newLocale
      } else {
        segments.unshift(newLocale)
      }

      const newPath = "/" + segments.join("/")
      router.push(newPath)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='h-9 w-9 px-0' disabled={isPending}>
          <span className='text-base' role='img' aria-label={localeNames[locale as Locale]}>
            {localeFlags[locale as Locale]}
          </span>
          <span className='sr-only'>{t("language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-[160px]'>
        {locales.map(loc => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className='cursor-pointer'
            disabled={isPending}
          >
            <span className='mr-2 text-base' role='img' aria-label={localeNames[loc]}>
              {localeFlags[loc]}
            </span>
            <span>{localeNames[loc]}</span>
            {loc === locale && <Icon name='Check' className='ml-auto h-4 w-4' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
