import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export default function Home() {
  return (
    <div className='min-h-screen font-[family-name:var(--font-geist-sans)] p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* 头部区域 */}
        <header className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold'>Hello Next.js</h1>
          <ThemeToggle />
        </header>

        {/* 主要内容区域 */}
        <main className='space-y-8'>
          <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 border'>
            <h2 className='text-2xl font-semibold mb-4'>主题适配的背景渐变</h2>
            <p className='text-muted-foreground mb-4'>
              在亮色主题下显示暖色调的渐变（橙→黄→绿）， 在暗色主题下显示对应的暗色调渐变。
            </p>
            <div className='flex gap-4'>
              <Button>主要按钮</Button>
              <Button variant='outline'>次要按钮</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
