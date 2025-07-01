"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Flame, Utensils, ChefHat, Award, Star, Trophy, Crown } from "lucide-react"
import type { UserLevel } from "@/lib/user-levels"

interface LevelBadgeProps {
  level: UserLevel | string
  size?: "sm" | "md" | "lg"
  showName?: boolean
  className?: string
  interactive?: boolean
}

export default function LevelBadge({
  level,
  size = "md",
  showName = false,
  className,
  interactive = true
}: LevelBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  // 如果传入的是字符串，转换为简单的等级对象
  const levelObj = typeof level === "string" ? getLevelByName(level) : level

  // 根据大小设置尺寸
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }

  // 根据大小设置图标尺寸
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6"
  }

  // 根据等级获取图标
  const getIcon = () => {
    switch (levelObj.name) {
      case "厨艺新手":
        return <Flame className={cn(iconSizes[size], "text-white")} />
      case "家常小厨":
        return <Utensils className={cn(iconSizes[size], "text-white")} />
      case "烹饪达人":
        return <ChefHat className={cn(iconSizes[size], "text-white")} />
      case "美食专家":
        return <Award className={cn(iconSizes[size], "text-white")} />
      case "星级主厨":
        return <Star className={cn(iconSizes[size], "text-white")} />
      case "烹饪大师":
        return <Trophy className={cn(iconSizes[size], "text-white")} />
      case "传奇厨神":
        return <Crown className={cn(iconSizes[size], "text-white")} />
      default:
        return <Flame className={cn(iconSizes[size], "text-white")} />
    }
  }

  // 获取徽章背景色 - 优化后的配色方案
  const getBadgeColor = () => {
    switch (levelObj.name) {
      case "厨艺新手":
        return "from-zinc-500 to-zinc-700"
      case "家常小厨":
        return "from-emerald-400 to-emerald-600"
      case "烹饪达人":
        return "from-sky-400 to-blue-600"
      case "美食专家":
        return "from-violet-400 to-purple-600"
      case "星级主厨":
        return "from-amber-400 to-yellow-600"
      case "烹饪大师":
        return "from-rose-400 to-orange-600"
      case "传奇厨神":
        return "from-rose-500 to-red-700"
      default:
        return "from-zinc-500 to-zinc-700"
    }
  }

  // 获取徽章边框色
  const getBadgeBorder = () => {
    switch (levelObj.name) {
      case "厨艺新手":
        return "border-zinc-400"
      case "家常小厨":
        return "border-emerald-300"
      case "烹饪达人":
        return "border-sky-300"
      case "美食专家":
        return "border-violet-300"
      case "星级主厨":
        return "border-amber-300"
      case "烹饪大师":
        return "border-rose-300"
      case "传奇厨神":
        return "border-rose-300"
      default:
        return "border-zinc-400"
    }
  }

  // 获取徽章阴影色
  const getBadgeShadow = () => {
    switch (levelObj.name) {
      case "厨艺新手":
        return "shadow-zinc-400/50"
      case "家常小厨":
        return "shadow-emerald-400/50"
      case "烹饪达人":
        return "shadow-sky-400/50"
      case "美食专家":
        return "shadow-violet-400/50"
      case "星级主厨":
        return "shadow-amber-400/50"
      case "烹饪大师":
        return "shadow-rose-400/50"
      case "传奇厨神":
        return "shadow-rose-500/50"
      default:
        return "shadow-zinc-400/50"
    }
  }

  // 获取文本颜色
  const getTextColor = () => {
    switch (levelObj.name) {
      case "厨艺新手":
        return "text-zinc-600"
      case "家常小厨":
        return "text-emerald-600"
      case "烹饪达人":
        return "text-blue-600"
      case "美食专家":
        return "text-purple-600"
      case "星级主厨":
        return "text-amber-600"
      case "烹饪大师":
        return "text-orange-600"
      case "传奇厨神":
        return "text-red-600"
      default:
        return "text-zinc-600"
    }
  }

  const badge = (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full",
        sizeClasses[size],
        getBadgeBorder(),
        "border-2",
        "bg-gradient-to-br",
        getBadgeColor(),
        interactive && "cursor-pointer transition-all duration-300",
        interactive && isHovered && `shadow-lg ${getBadgeShadow()}`,
        className
      )}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      {getIcon()}

      {/* 等级名称 */}
      {showName && (
        <span
          className={cn(
            "ml-2 text-xs font-medium",
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base",
            getTextColor()
          )}
        >
          {levelObj.name}
        </span>
      )}
    </div>
  )

  return badge
}

// 根据等级名称获取等级对象
function getLevelByName(name: string): Partial<UserLevel> {
  switch (name) {
    case "厨艺新手":
      return {
        id: 1,
        name: "厨艺新手",
        requiredPoints: 0,
        icon: "Flame",
        color: "text-zinc-600",
        description: "刚开始探索烹饪世界的初学者"
      }
    case "家常小厨":
      return {
        id: 2,
        name: "家常小厨",
        requiredPoints: 100,
        icon: "Utensils",
        color: "text-emerald-600",
        description: "已掌握基本烹饪技巧，能做出美味家常菜"
      }
    case "烹饪达人":
      return {
        id: 3,
        name: "烹饪达人",
        requiredPoints: 300,
        icon: "ChefHat",
        color: "text-blue-600",
        description: "烹饪技巧娴熟，能尝试各种不同风格的菜肴"
      }
    case "美食专家":
      return {
        id: 4,
        name: "美食专家",
        requiredPoints: 800,
        icon: "Award",
        color: "text-purple-600",
        description: "对食材和烹饪有深入理解，能创新菜品"
      }
    case "星级主厨":
      return {
        id: 5,
        name: "星级主厨",
        requiredPoints: 2000,
        icon: "Star",
        color: "text-amber-600",
        description: "拥有专业水准的烹饪技巧，菜品精致考究"
      }
    case "烹饪大师":
      return {
        id: 6,
        name: "烹饪大师",
        requiredPoints: 5000,
        icon: "Trophy",
        color: "text-orange-600",
        description: "烹饪造诣深厚，能驾驭各国菜系"
      }
    case "传奇厨神":
      return {
        id: 7,
        name: "传奇厨神",
        requiredPoints: 10000,
        icon: "Crown",
        color: "text-red-600",
        description: "烹饪界的传奇人物，拥有无与伦比的创造力"
      }
    default:
      return {
        id: 1,
        name: "厨艺新手",
        requiredPoints: 0,
        icon: "Flame",
        color: "text-zinc-600",
        description: "刚开始探索烹饪世界的初学者"
      }
  }
}
