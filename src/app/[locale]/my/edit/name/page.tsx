"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import PageContainer from "@/components/layout/page-container"

export default function EditNamePage() {
  const router = useRouter()
  const [name, setName] = useState("阿凯")
  const maxLength = 20

  const handleSave = () => {
    // 这里可以添加保存逻辑
    router.back()
  }

  return (
    <PageContainer title='编辑名字'>
      <div className='p-4 space-y-4'>
        {/* 输入框 */}
        <div className='space-y-2'>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='请输入您的名字'
            className='w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-base'
            maxLength={maxLength}
          />

          {/* 字数统计 */}
          <div className='flex justify-between items-center text-sm text-muted-foreground'>
            <span>设置一个好记的名字</span>
            <span>
              {name.length}/{maxLength}
            </span>
          </div>
        </div>

        {/* 提示信息 */}
        <div className='bg-muted/50 p-3 rounded-lg'>
          <p className='text-sm text-muted-foreground'>
            • 名字将显示在您的个人主页
            <br />
            • 建议使用真实姓名或常用昵称
            <br />• 名字长度不超过{maxLength}个字符
          </p>
        </div>

        {/* 保存按钮 */}
        <Button onClick={handleSave} className='w-full mt-6' disabled={name.trim().length === 0}>
          保存
        </Button>
      </div>
    </PageContainer>
  )
}
