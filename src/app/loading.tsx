import { useTranslations } from "next-intl"

export default function Loading() {
  const t = useTranslations("common")

  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <div className='text-center space-y-8'>
        {/* 加载动画 */}
        <div className='relative'>
          {/* 外圈旋转动画 */}
          <div className='w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto'></div>

          {/* 内圈脉冲动画 */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-8 h-8 bg-primary rounded-full animate-pulse'></div>
          </div>
        </div>

        {/* 加载文本 */}
        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold text-foreground'>{t("loading")}</h2>
          <p className='text-muted-foreground'>请稍候，我们正在为您准备精彩内容</p>
        </div>
        {/* 品牌信息 */}
        <div className='text-center'>
          <div className='text-4xl mb-2'>🍽️</div>
          <p className='text-sm text-muted-foreground'>
            {t("appName")} - {t("appDescription")}
          </p>
        </div>
      </div>
    </div>
  )
}
