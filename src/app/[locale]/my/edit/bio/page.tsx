"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import PageContainer from "@/components/layout/page-container"

export default function EditBioPage() {
  const router = useRouter()
  const [bio, setBio] = useState("")
  const maxLength = 100

  const handleSave = () => {
    // 这里可以添加保存逻辑
    router.back()
  }

  return (
    <PageContainer title='编辑简介'>
      <div className='p-4 space-y-4'>
        {/* 输入框 */}
        <div className='space-y-2'>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder='介绍喜好、个性或@你的亲友'
            className='w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background'
            maxLength={maxLength}
          />

          {/* 字数统计 */}
          <div className='flex justify-between items-center text-sm text-muted-foreground'>
            <span>简单介绍一下自己吧</span>
            <span>
              {bio.length}/{maxLength}
            </span>
          </div>
        </div>

        {/* 保存按钮 */}
        <Button onClick={handleSave} className='w-full mt-6' disabled={bio.trim().length === 0}>
          保存
        </Button>
      </div>
    </PageContainer>
  )
}
