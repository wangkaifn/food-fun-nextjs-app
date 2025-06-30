import { useTranslations } from "next-intl"

export default function HomePage() {
  const t = useTranslations("home")

  return (
    <div className='h-full font-[family-name:var(--font-geist-sans)] p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* 头部区域 */}
        <header className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4'>{t("title")}</h1>
          <p className='text-xl text-muted-foreground'>{t("subtitle")}</p>
        </header>

        {/* 主要内容区域 */}
        <main className='space-y-8'>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 border'>
              <div className='text-3xl mb-4'>🍽️</div>
              <h3 className='text-xl font-semibold mb-3'>{t("featuredRecipes")}</h3>
              <p className='text-muted-foreground'>{t("featuredDescription")}</p>
            </div>

            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 border'>
              <div className='text-3xl mb-4'>👨‍🍳</div>
              <h3 className='text-xl font-semibold mb-3'>{t("cookingGuide")}</h3>
              <p className='text-muted-foreground'>{t("cookingDescription")}</p>
            </div>

            <div className='bg-card/80 backdrop-blur-sm rounded-lg p-6 border'>
              <div className='text-3xl mb-4'>🥗</div>
              <h3 className='text-xl font-semibold mb-3'>{t("healthyEating")}</h3>
              <p className='text-muted-foreground'>{t("healthDescription")}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
