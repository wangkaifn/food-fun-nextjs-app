import Loading from "./loading"

export default function Home() {
  return (
    <div className='min-h-screen font-[family-name:var(--font-geist-sans)] p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* 头部区域 */}
        <header className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4'>欢迎来到 Food Fun</h1>
          <p className='text-xl text-muted-foreground'>美食探索，生活乐趣</p>
        </header>

        {/* 主要内容区域 */}
        <main className='space-y-8'>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 border'>
              <div className='text-3xl mb-4'>🍽️</div>
              <h3 className='text-xl font-semibold mb-3'>美食推荐</h3>
              <p className='text-muted-foreground'>精选全球美食，为您推荐最受欢迎的菜品和餐厅。</p>
            </div>

            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 border'>
              <div className='text-3xl mb-4'>👨‍🍳</div>
              <h3 className='text-xl font-semibold mb-3'>烹饪指南</h3>
              <p className='text-muted-foreground'>
                详细的烹饪教程，让您轻松掌握各种美食的制作技巧。
              </p>
            </div>

            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 border'>
              <div className='text-3xl mb-4'>🥗</div>
              <h3 className='text-xl font-semibold mb-3'>健康饮食</h3>
              <p className='text-muted-foreground'>营养搭配建议，帮助您保持健康的饮食习惯。</p>
            </div>
          </div>
        </main>
      </div>
      <Loading />
    </div>
  )
}
