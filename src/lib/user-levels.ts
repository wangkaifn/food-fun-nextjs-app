// 厨艺积分系 - "烹饪热度"
export type UserLevel = {
  id: number
  name: string
  requiredPoints: number
  icon: string // 图标名称，对应Lucide图标
  color: string // Tailwind颜色类
  description: string
  privileges: Privilege[] // 添加特权数组
}

// 特权类型定义
export type Privilege = {
  id: string
  name: string
  description: string
  icon: string // 对应Lucide图标
}

// 所有可用特权的定义
export const allPrivileges: Record<string, Privilege> = {
  basicRecipes: {
    id: "basicRecipes",
    name: "基础食谱访问",
    description: "访问平台上的基础食谱",
    icon: "Book"
  },
  saveRecipes: {
    id: "saveRecipes",
    name: "食谱收藏",
    description: "收藏喜欢的食谱",
    icon: "Bookmark"
  },
  basicTimer: {
    id: "basicTimer",
    name: "基础计时器",
    description: "使用基础烹饪计时器",
    icon: "Clock"
  },
  communityAccess: {
    id: "communityAccess",
    name: "社区访问",
    description: "浏览美食社区内容",
    icon: "Users"
  },
  postComment: {
    id: "postComment",
    name: "评论功能",
    description: "在社区内发表评论",
    icon: "MessageSquare"
  },
  createPost: {
    id: "createPost",
    name: "发布内容",
    description: "在社区发布美食分享",
    icon: "PenSquare"
  },
  advancedRecipes: {
    id: "advancedRecipes",
    name: "进阶食谱访问",
    description: "访问更复杂和专业的食谱",
    icon: "BookOpen"
  },
  multiTimer: {
    id: "multiTimer",
    name: "多重计时器",
    description: "同时设置多个烹饪计时器",
    icon: "Timers"
  },
  ingredientSubstitution: {
    id: "ingredientSubstitution",
    name: "食材替代建议",
    description: "获取食材替代方案建议",
    icon: "Replace"
  },
  nutritionAnalysis: {
    id: "nutritionAnalysis",
    name: "营养分析",
    description: "查看食谱的详细营养成分分析",
    icon: "PieChart"
  },
  mealPlanning: {
    id: "mealPlanning",
    name: "膳食规划",
    description: "使用膳食规划工具",
    icon: "Calendar"
  },
  recipeScaling: {
    id: "recipeScaling",
    name: "食谱份量调整",
    description: "自由调整食谱的份量和计量单位",
    icon: "Scale"
  },
  aiAssistant: {
    id: "aiAssistant",
    name: "AI烹饪助手",
    description: "使用AI助手获取烹饪建议",
    icon: "Bot"
  },
  customRecipes: {
    id: "customRecipes",
    name: "自定义食谱",
    description: "创建和保存自己的食谱",
    icon: "FileEdit"
  },
  proTimer: {
    id: "proTimer",
    name: "专业计时器",
    description: "使用带温度控制的专业计时器",
    icon: "Timer"
  },
  videoTutorials: {
    id: "videoTutorials",
    name: "视频教程",
    description: "访问高质量烹饪视频教程",
    icon: "Video"
  },
  expertConsultation: {
    id: "expertConsultation",
    name: "专家咨询",
    description: "向烹饪专家提问",
    icon: "HelpCircle"
  },
  exclusiveEvents: {
    id: "exclusiveEvents",
    name: "专属活动",
    description: "参与专属烹饪活动和挑战",
    icon: "Trophy"
  },
  recipeAnalysis: {
    id: "recipeAnalysis",
    name: "食谱分析",
    description: "获取食谱的专业分析和改进建议",
    icon: "LineChart"
  },
  advancedAI: {
    id: "advancedAI",
    name: "高级AI功能",
    description: "使用高级AI功能，如食材识别和创意建议",
    icon: "Sparkles"
  },
  contentCreator: {
    id: "contentCreator",
    name: "内容创作者",
    description: "获得内容创作者徽章和特权",
    icon: "Award"
  },
  betaFeatures: {
    id: "betaFeatures",
    name: "测试新功能",
    description: "优先体验平台新功能",
    icon: "Zap"
  },
  customThemes: {
    id: "customThemes",
    name: "自定义主题",
    description: "自定义应用界面主题和颜色",
    icon: "Palette"
  },
  mentorProgram: {
    id: "mentorProgram",
    name: "导师计划",
    description: "参与烹饪导师计划",
    icon: "GraduationCap"
  },
  verifiedBadge: {
    id: "verifiedBadge",
    name: "认证徽章",
    description: "获得认证美食家徽章",
    icon: "BadgeCheck"
  },
  prioritySupport: {
    id: "prioritySupport",
    name: "优先支持",
    description: "获得优先客户支持",
    icon: "Headphones"
  },
  adFree: {
    id: "adFree",
    name: "无广告体验",
    description: "享受无广告的应用体验",
    icon: "ShieldCheck"
  }
}

// 厨艺等级定义
export const userLevels: UserLevel[] = [
  {
    id: 1,
    name: "厨艺新手",
    requiredPoints: 0,
    icon: "Flame",
    color: "text-gray-500",
    description: "刚开始探索烹饪世界的初学者",
    privileges: [
      allPrivileges.basicRecipes,
      allPrivileges.basicTimer,
      allPrivileges.communityAccess
    ]
  },
  {
    id: 2,
    name: "家常小厨",
    requiredPoints: 100,
    icon: "Utensils",
    color: "text-green-500",
    description: "已掌握基本烹饪技巧，能做出美味家常菜",
    privileges: [
      allPrivileges.basicRecipes,
      allPrivileges.basicTimer,
      allPrivileges.communityAccess,
      allPrivileges.saveRecipes,
      allPrivileges.postComment,
      allPrivileges.ingredientSubstitution
    ]
  },
  {
    id: 3,
    name: "烹饪达人",
    requiredPoints: 300,
    icon: "ChefHat",
    color: "text-blue-500",
    description: "烹饪技巧娴熟，能尝试各种不同风格的菜肴",
    privileges: [
      allPrivileges.basicRecipes,
      allPrivileges.basicTimer,
      allPrivileges.communityAccess,
      allPrivileges.saveRecipes,
      allPrivileges.postComment,
      allPrivileges.ingredientSubstitution,
      allPrivileges.createPost,
      allPrivileges.multiTimer,
      allPrivileges.advancedRecipes,
      allPrivileges.nutritionAnalysis
    ]
  },
  {
    id: 4,
    name: "美食专家",
    requiredPoints: 800,
    icon: "Award",
    color: "text-purple-500",
    description: "对食材和烹饪有深入理解，能创新菜品",
    privileges: [
      allPrivileges.basicRecipes,
      allPrivileges.basicTimer,
      allPrivileges.communityAccess,
      allPrivileges.saveRecipes,
      allPrivileges.postComment,
      allPrivileges.ingredientSubstitution,
      allPrivileges.createPost,
      allPrivileges.multiTimer,
      allPrivileges.advancedRecipes,
      allPrivileges.nutritionAnalysis,
      allPrivileges.aiAssistant,
      allPrivileges.customRecipes,
      allPrivileges.recipeScaling,
      allPrivileges.mealPlanning
    ]
  },
  {
    id: 5,
    name: "星级主厨",
    requiredPoints: 2000,
    icon: "Star",
    color: "text-yellow-500",
    description: "拥有专业水准的烹饪技巧，菜品精致考究",
    privileges: [
      allPrivileges.basicRecipes,
      allPrivileges.basicTimer,
      allPrivileges.communityAccess,
      allPrivileges.saveRecipes,
      allPrivileges.postComment,
      allPrivileges.ingredientSubstitution,
      allPrivileges.createPost,
      allPrivileges.multiTimer,
      allPrivileges.advancedRecipes,
      allPrivileges.nutritionAnalysis,
      allPrivileges.aiAssistant,
      allPrivileges.customRecipes,
      allPrivileges.recipeScaling,
      allPrivileges.mealPlanning,
      allPrivileges.proTimer,
      allPrivileges.videoTutorials,
      allPrivileges.expertConsultation,
      allPrivileges.exclusiveEvents,
      allPrivileges.adFree
    ]
  },
  {
    id: 6,
    name: "烹饪大师",
    requiredPoints: 5000,
    icon: "Trophy",
    color: "text-orange-500",
    description: "烹饪造诣深厚，能驾驭各国菜系",
    privileges: [
      allPrivileges.basicRecipes,
      allPrivileges.basicTimer,
      allPrivileges.communityAccess,
      allPrivileges.saveRecipes,
      allPrivileges.postComment,
      allPrivileges.ingredientSubstitution,
      allPrivileges.createPost,
      allPrivileges.multiTimer,
      allPrivileges.advancedRecipes,
      allPrivileges.nutritionAnalysis,
      allPrivileges.aiAssistant,
      allPrivileges.customRecipes,
      allPrivileges.recipeScaling,
      allPrivileges.mealPlanning,
      allPrivileges.proTimer,
      allPrivileges.videoTutorials,
      allPrivileges.expertConsultation,
      allPrivileges.exclusiveEvents,
      allPrivileges.adFree,
      allPrivileges.recipeAnalysis,
      allPrivileges.advancedAI,
      allPrivileges.contentCreator,
      allPrivileges.betaFeatures,
      allPrivileges.customThemes
    ]
  },
  {
    id: 7,
    name: "传奇厨神",
    requiredPoints: 10000,
    icon: "Crown",
    color: "text-red-500",
    description: "烹饪界的传奇人物，拥有无与伦比的创造力",
    privileges: [
      allPrivileges.basicRecipes,
      allPrivileges.basicTimer,
      allPrivileges.communityAccess,
      allPrivileges.saveRecipes,
      allPrivileges.postComment,
      allPrivileges.ingredientSubstitution,
      allPrivileges.createPost,
      allPrivileges.multiTimer,
      allPrivileges.advancedRecipes,
      allPrivileges.nutritionAnalysis,
      allPrivileges.aiAssistant,
      allPrivileges.customRecipes,
      allPrivileges.recipeScaling,
      allPrivileges.mealPlanning,
      allPrivileges.proTimer,
      allPrivileges.videoTutorials,
      allPrivileges.expertConsultation,
      allPrivileges.exclusiveEvents,
      allPrivileges.adFree,
      allPrivileges.recipeAnalysis,
      allPrivileges.advancedAI,
      allPrivileges.contentCreator,
      allPrivileges.betaFeatures,
      allPrivileges.customThemes,
      allPrivileges.mentorProgram,
      allPrivileges.verifiedBadge,
      allPrivileges.prioritySupport
    ]
  }
]

// 根据积分获取用户等级
export function getUserLevel(points: number): UserLevel {
  for (let i = userLevels.length - 1; i >= 0; i--) {
    if (points >= userLevels[i].requiredPoints) {
      return userLevels[i]
    }
  }
  return userLevels[0] // 默认返回最低等级
}

// 获取下一个等级
export function getNextLevel(points: number): UserLevel | null {
  for (let i = 0; i < userLevels.length; i++) {
    if (points < userLevels[i].requiredPoints) {
      return userLevels[i]
    }
  }
  return null // 已达到最高等级
}

// 计算到下一级的进度百分比
export function getLevelProgress(points: number): number {
  const currentLevel = getUserLevel(points)
  const nextLevel = getNextLevel(points)

  if (!nextLevel) return 100 // 已达到最高等级

  const currentLevelPoints = currentLevel.requiredPoints
  const nextLevelPoints = nextLevel.requiredPoints
  const pointsInCurrentLevel = points - currentLevelPoints
  const pointsRequiredForNextLevel = nextLevelPoints - currentLevelPoints

  return Math.min(Math.floor((pointsInCurrentLevel / pointsRequiredForNextLevel) * 100), 100)
}

// 烹饪热度获取方式及对应积分
export const pointsActivities = [
  { name: "每日打卡", points: 5, description: "每天登录应用并完成一次操作" },
  { name: "完成食谱", points: 20, description: "标记一个食谱为已完成" },
  { name: "发布食谱", points: 30, description: "分享原创食谱到社区" },
  { name: "发表评论", points: 5, description: "在社区帖子下评论" },
  { name: "获得点赞", points: 2, description: "你的帖子或评论获得一个点赞" },
  { name: "内容被收藏", points: 10, description: "你的食谱或帖子被他人收藏" },
  { name: "分享到社交媒体", points: 15, description: "将食谱或帖子分享到社交媒体" },
  { name: "上传烹饪成果照片", points: 25, description: "上传你按照食谱烹饪的成果照片" },
  { name: "参与挑战活动", points: 50, description: "参与平台发起的烹饪挑战活动" },
  { name: "获得精选推荐", points: 100, description: "你的内容被平台推荐到首页" }
]

export function addExperience(points: number) {
  // 在实际应用中，这个函数应该更新用户在数据库或本地存储中的烹饪热度
  console.log(`Added ${points} experience points to user.`)
}

// 检查用户是否拥有特定特权
export function hasPrivilege(userLevel: UserLevel, privilegeId: string): boolean {
  return userLevel.privileges.some(privilege => privilege.id === privilegeId)
}

// 获取用户下一级将解锁的特权
export function getNextLevelPrivileges(
  currentLevel: UserLevel,
  nextLevel: UserLevel | null
): Privilege[] {
  if (!nextLevel) return []

  const currentPrivilegeIds = new Set(currentLevel.privileges.map(p => p.id))
  return nextLevel.privileges.filter(privilege => !currentPrivilegeIds.has(privilege.id))
}
