"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/common/icon"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import LevelBadge from "@/components/common/level-badge"

// 模拟用户数据
const userData = {
  id: "101",
  name: "美食爱好者",
  avatar: "https://kzmqk4kkwv9pca2gd25v.lite.vusercontent.net/placeholder.svg",
  bio: "我是一个美食爱好者，喜欢尝试各种菜系。",
  cookingPoints: 280, // 烹饪热度
  joinDays: 30,
  savedRecipes: 12,
  completedRecipes: 5,
  consecutiveCheckins: 3,
  communityPosts: 2,
  // 已解锁的等级
  unlockedLevels: ["厨艺新手", "家常小厨"],
  // 展示徽章
  displayBadge: "家常小厨"
}

export default function MyPage() {
  const router = useRouter()

  return (
    <div className='min-h-screen bg-background'>
      {/* 头部背景和用户信息 */}
      <div className='relative h-40 bg-gradient-to-br from-orange-400 to-pink-500'>
        <Image
          src='https://kzmqk4kkwv9pca2gd25v.lite.vusercontent.net/placeholder.svg'
          alt='background'
          fill
          className='object-cover'
        />

        {/* 设置按钮 */}
        <Button
          size='icon'
          variant='ghost'
          className='absolute top-4 right-4 rounded-full text-white hover:bg-white/20'
          onClick={() => router.push("/my/settings")}
        >
          <Icon name='Settings' className='h-5 w-5' />
        </Button>

        {/* 用户信息 */}
        <div className='absolute bottom-6 left-4 flex items-center gap-4'>
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 p-1'>
            <div
              className='w-full h-full rounded-full bg-cover bg-center'
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face)"
              }}
            />
          </div>
          <div>
            <h1 className='text-lg font-bold text-white'>
              阿凯
              <Badge className='mr-2 rounded-full scale-85'>
                <LevelBadge level={userData.displayBadge} size='sm' />
                <span className='ml-1'>{userData.displayBadge}</span>
              </Badge>
            </h1>
            <div className='text-white/80 text-xs flex items-center gap-1'>
              食趣号：81153288623
              <Icon name='QrCode' className='size-3 inline-block' />
            </div>
            <div className='flex items-center gap-2 text-white/80 text-xs mt-1'>
              <Icon name='MapPin' className='size-3' />
              <span className='text-xs'>浙江·杭州</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className='bg-background rounded-t-2xl -mt-4 pt-6 px-4 relative z-10'>
        {/* 统计数据和编辑按钮 */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex gap-8'>
            <div className='text-center'>
              <div className='text-xl font-bold'>43</div>
              <div className='text-muted-foreground text-sm'>关注</div>
            </div>
            <div className='text-center'>
              <div className='text-xl font-bold'>28</div>
              <div className='text-muted-foreground text-sm'>粉丝</div>
            </div>
            <div className='text-center'>
              <div className='text-xl font-bold'>5</div>
              <div className='text-muted-foreground text-sm'>完成食谱</div>
            </div>
          </div>
          <Button
            variant='secondary'
            className='rounded-lg px-6'
            onClick={() => router.push("/my/edit")}
          >
            编辑主页
          </Button>
        </div>

        {/* 个人信息编辑区域 */}
        <div className='space-y-3 mb-8'>
          <div className='flex items-center gap-3 p-3 bg-muted/50 rounded-lg'>
            <span className='text-muted-foreground flex-1'>点击添加介绍，让大家认识你...</span>
            <Icon name='Edit2' className='h-4 w-4 text-muted-foreground' />
          </div>
        </div>
        {/* 功能菜单 */}
        <div className='grid grid-cols-4 gap-4 mb-8'>
          {[
            { icon: "Timer", label: "烹饪计时器" },
            { icon: "Scale", label: "单位转换" },
            { icon: "Book", label: "厨房术语" },
            { icon: "MoreHorizontal", label: "更多工具" }
          ].map((item, index) => (
            <div key={index} className='text-center'>
              <div className='w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-2 mx-auto'>
                <Icon name={item.icon as any} className='h-6 w-6 text-muted-foreground' />
              </div>
              <span className='text-xs'>{item.label}</span>
            </div>
          ))}
        </div>

        {/* 内容标签页 */}
        <Tabs defaultValue='works' className='w-full'>
          <TabsList className='w-full grid grid-cols-4 h-10'>
            <TabsTrigger value='works'>作品</TabsTrigger>
            <TabsTrigger value='recommend'>推荐</TabsTrigger>
            <TabsTrigger value='collection'>收藏</TabsTrigger>
            <TabsTrigger value='like'>喜欢</TabsTrigger>
          </TabsList>
          <TabsContent value='works' className='mt-6'>
            <div className='text-center text-muted-foreground py-8'>暂无作品</div>
          </TabsContent>
          <TabsContent value='recommend' className='mt-6'>
            <div className='text-center text-muted-foreground py-8'>暂无推荐内容</div>
          </TabsContent>
          <TabsContent value='collection' className='mt-6'>
            <div className='text-center text-muted-foreground py-8'>暂无收藏内容</div>
          </TabsContent>
          <TabsContent value='like' className='mt-6'>
            <div className='text-center text-muted-foreground py-8'>暂无喜欢内容</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
