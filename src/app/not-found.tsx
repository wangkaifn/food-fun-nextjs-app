"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/common/icon"

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center p-8 fixed z-50'>
      <div className='max-w-2xl mx-auto text-center space-y-8'>
        {/* 404 数字 */}
        <div className=''>
          <h1 className='text-9xl md:text-[12rem] font-bold text-primary/20 select-none'>404</h1>
          <div className='flex items-center justify-center'>
            <div className='p-8'>
              <div className='space-y-4'>
                <h2 className='text-3xl md:text-4xl font-bold text-foreground'>页面未找到</h2>
                <p className='text-lg text-muted-foreground max-w-md mx-auto'>
                  抱歉，您访问的页面不存在或已被移除。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button asChild size='lg' className='min-w-32'>
            <Link href='/'>
              <Icon name='Home' className='mr-2' />
              返回首页
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
