"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/common/icon"
import { useRouter } from "next/navigation"
import PageContainer from "@/components/layout/page-container"
import BottomSheet from "@/components/common/bottom-sheet"

export default function EditProfilePage() {
  const router = useRouter()
  const [selectedGender, setSelectedGender] = useState("")
  const [isGenderSheetOpen, setIsGenderSheetOpen] = useState(false)

  const genderOptions = [
    { value: "male", label: "男", icon: "User" },
    { value: "female", label: "女", icon: "User" },
    { value: "private", label: "不展示", icon: "EyeOff" }
  ]

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender)
    setIsGenderSheetOpen(false)
  }

  const getGenderLabel = () => {
    const gender = genderOptions.find(g => g.value === selectedGender)
    return gender ? gender.label : "选择性别，表达自我"
  }

  return (
    <PageContainer title='编辑主页'>
      {/* 头部背景区域 */}
      <div className='relative h-64 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600'>
        {/* 更换封面按钮 */}
        <Button
          variant='secondary'
          className='absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm text-white border-none hover:bg-white/30 px-4'
        >
          <Icon name='Camera' className='h-4 w-4 mr-2' />
          更换封面
        </Button>

        {/* 头像编辑区域 */}
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
          <div className='relative'>
            <div className='w-24 h-24 rounded-full bg-white p-1'>
              <div
                className='w-full h-full rounded-full bg-cover bg-center'
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face)"
                }}
              />

              <div className='absolute top-0 left-0 w-full h-full rounded-full bg-black/50 flex flex-col items-center justify-center'>
                {/* 相机图标 */}
                <Icon name='Camera' className='size-6' />
                <span className='text-sm'>更换头像</span>
              </div>
            </div>
          </div>
        </div>

        {/* 资料完成度 */}
        <div className='absolute bottom-4 right-4 text-white/80 text-sm'>资料完成度 50%</div>
      </div>

      {/* 表单区域 */}
      <div className='bg-background rounded-t-2xl pt-16 px-4 mt-8'>
        <div className='space-y-0'>
          {/* 名字 */}
          <button
            className='w-full flex items-center justify-between py-4 border-b border-border text-left'
            onClick={() => router.push("/my/edit/name")}
          >
            <div className='flex-1'>
              <div className='text-sm text-muted-foreground mb-1'>名字</div>
              <div className='text-base'>阿凯</div>
            </div>
            <Icon name='ChevronRight' className='h-5 w-5 text-muted-foreground' />
          </button>

          {/* 简介 */}
          <button
            className='w-full flex items-center justify-between py-4 border-b border-border text-left'
            onClick={() => router.push("/my/edit/bio")}
          >
            <div className='flex-1'>
              <div className='text-sm text-muted-foreground mb-1'>简介</div>
              <div className='text-base text-muted-foreground'>介绍喜好、个性或@你的亲友</div>
            </div>
            <Icon name='ChevronRight' className='h-5 w-5 text-muted-foreground' />
          </button>

          {/* 性别 */}
          <button
            className='w-full flex items-center justify-between py-4 border-b border-border text-left'
            onClick={() => setIsGenderSheetOpen(true)}
          >
            <div className='flex-1'>
              <div className='text-sm text-muted-foreground mb-1'>性别</div>
              <div className={`text-base ${selectedGender ? "" : "text-muted-foreground"}`}>
                {getGenderLabel()}
              </div>
            </div>
            <Icon name='ChevronRight' className='h-5 w-5 text-muted-foreground' />
          </button>

          {/* 所在地 */}
          <div className='flex items-center justify-between py-4 border-b border-border'>
            <div className='flex-1'>
              <div className='text-sm text-muted-foreground mb-1'>所在地</div>
              <div className='text-base'>中国·杭州</div>
            </div>
            <Icon name='ChevronRight' className='h-5 w-5 text-muted-foreground' />
          </div>

          {/* 食趣号 */}
          <div className='flex items-center justify-between py-4 border-b border-border'>
            <div className='flex-1'>
              <div className='text-sm text-muted-foreground mb-1'>食趣号</div>
              <div className='text-base'>81153288623</div>
            </div>
            <Icon name='ChevronRight' className='h-5 w-5 text-muted-foreground' />
          </div>
        </div>
        {/* 底部安全区域 */}
        <div className='h-20'></div>
      </div>

      {/* 性别选择底部弹窗 */}
      <BottomSheet
        isOpen={isGenderSheetOpen}
        onClose={() => setIsGenderSheetOpen(false)}
        title='选择性别'
      >
        <div className='space-y-3 pb-5'>
          {genderOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleGenderSelect(option.value)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                selectedGender === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <Icon name={option.icon as any} className='h-5 w-5 text-muted-foreground' />
              <span className='flex-1 text-left'>{option.label}</span>
              {selectedGender === option.value && (
                <Icon name='Check' className='h-5 w-5 text-primary' />
              )}
            </button>
          ))}
        </div>
      </BottomSheet>
    </PageContainer>
  )
}
