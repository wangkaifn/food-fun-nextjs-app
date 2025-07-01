"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/common/icon"
import { Link } from "@/i18n/navigation"

export default function NotFound() {
  const t = useTranslations("error")

  return (
    <div className='min-h-screen flex items-center justify-center p-8 fixed z-50'>
      <div className='max-w-2xl mx-auto text-center space-y-8'>
        {/* 404 数字 */}
        <div className=''>
          <h1 className='text-9xl md:text-[12rem] font-bold text-primary/20 select-none'>404</h1>
          <div className='flex items-center justify-center'>
            <div className='p-8'>
              <div className='space-y-4'>
                <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                  {t("pageNotFound")}
                </h2>
                <p className='text-lg text-muted-foreground max-w-md mx-auto'>
                  {t("pageNotFoundDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button asChild size='lg' className='min-w-32'>
            <Link href='/' className='flex items-center'>
              <Icon name='Home' className='mr-2' />
              {t("goHome")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
