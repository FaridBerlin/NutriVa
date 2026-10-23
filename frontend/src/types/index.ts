/**
 * Shared domain types for the NutriVa frontend.
 *
 * These mirror the Mongoose models and controller responses in /backend.
 * Dates arrive over JSON as ISO strings, so they are typed as `string`.
 */

// ---------------------------------------------------------------------------
// Common
// ---------------------------------------------------------------------------

export interface Macros {
  protein: number
  carbs: number
  fat: number
}

export interface Nutrition extends Macros {
  calories: number
}

/** Uniform result returned by context actions instead of throwing. */
export type ActionResult<T = undefined> =
  | { success: true; data?: T; error?: undefined }
  | { success: false; error: string; data?: undefined }

/** Shape of an error body sent by the Express API. */
export interface ApiErrorBody {
  success?: false
  message?: string
  error?: string | { code: string; details?: string }
}

// ---------------------------------------------------------------------------
// User / auth
// ---------------------------------------------------------------------------

export interface User {
  /** Present on login/signup responses */
  id?: string
  /** Present on /auth/me and /user/me responses (raw Mongo document) */
  _id?: string
  name: string
  email: string
  profileCompleted: boolean
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  success: boolean
  user: User
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export type Gender = 'male' | 'female' | 'other'
export type ActivityLevel =
  'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
export type FoodType = 'veg' | 'nonveg' | 'vegan'
export type DietaryGoal =
  'lose_weight' | 'maintain_weight' | 'gain_weight' | 'build_muscle'

export interface WeightRecord {
  _id?: string
  weight: number
  date: string
}

export interface Profile {
  _id?: string
  id?: string
  user?: string | Pick<User, '_id' | 'name' | 'email'>
  age: number
  gender: Gender
  /** centimetres */
  height: number
  /** kilograms */
  weight: number
  activityLevel: ActivityLevel
  foodType?: FoodType
  dietaryGoal: DietaryGoal
  targetWeight?: number
  startWeight?: number
  weightHistory?: WeightRecord[]
  /** Virtuals included by the backend's toJSON */
  bmr?: number
  bmi?: number
  createdAt?: string
  updatedAt?: string
}

/** Fields a client may send when creating/updating a profile. */
export type ProfileInput = Partial<
  Pick<
    Profile,
    | 'age'
    | 'gender'
    | 'height'
    | 'weight'
    | 'activityLevel'
    | 'foodType'
    | 'dietaryGoal'
    | 'targetWeight'
    | 'startWeight'
  >
>

export interface NutritionTargets {
  dailyCalories: number
  bmr: number
  tdee: number
  macros: Macros
}

export interface ProfileResponse {
  success: boolean
  message: string
  data: {
    profile: Profile
    nutritionTargets: NutritionTargets
    warnings?: string[]
  }
}

// ---------------------------------------------------------------------------
// AI meal plans
// ---------------------------------------------------------------------------

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
export type PlanFoodType = 'veg' | 'nonveg' | 'vegan' | 'both'
export type Allergen = 'dairy' | 'gluten' | 'nuts' | 'none' | ''

export interface Meal {
  _id: string
  type: MealType
  dishName: string
  description: string
  cookingMethod?: string
  keyIngredients?: string[]
  nutrition?: Partial<Nutrition>
  eaten?: boolean
  // Legacy fields kept by the backend for backward compatibility
  mealId?: string
  name?: string
  category?: string
  ingredients?: string[]
  image?: string
}

export interface DayPlan {
  _id?: string
  dayNumber: number
  date?: string
  meals: Meal[]
  totalNutrition?: Partial<Nutrition>
}

export interface AiMealPlan {
  _id: string
  userId: string
  planName: string
  mealPerDay: number
  age?: number
  weight?: number
  height?: number
  gender?: Gender
  activityLevel?: string
  goal?: string
  planDuration: number
  foodType: PlanFoodType
  allergens?: Allergen[]
  restrictionsAndAllergies?: string
  dailyCalories: number
  dailyMacros?: Partial<Macros>
  days: DayPlan[]
  useTemplates?: boolean
  // Legacy
  duration?: number
  mealsPerDay?: number
  dietType?: string
  createdAt: string
  updatedAt?: string
}

/** Body accepted by POST /ai-meal-plans */
export interface MealPlanRequest {
  planName: string
  age: number
  weight: number
  height: number
  gender: Gender
  activityLevel: string
  goal: string
  planDuration: number
  mealPerDay: number
  foodType: PlanFoodType
  restrictionsAndAllergies?: string
  allergens?: Allergen[]
  useTemplates?: boolean
}

/** Which engine produced a plan (AI may silently fall back to templates). */
export type GenerationMethod =
  | 'ai'
  | 'ai-partial-templates'
  | 'templates-ai-rejected'
  | 'templates-ai-failed'
  | 'templates'

export interface GenerationDetail {
  aiDays?: number
  templateDays?: number
  [key: string]: unknown
}

export interface GenerateMealPlanResponse {
  success: boolean
  message: string
  mealPlan: AiMealPlan
  generationMethod?: GenerationMethod
  generationDetail?: GenerationDetail
}

export interface MealPlanResponse {
  success: boolean
  mealPlan: AiMealPlan
}

export interface MealPlansResponse {
  success: boolean
  count: number
  mealPlans: AiMealPlan[]
}

export interface MealPlanDayResponse {
  success: boolean
  day: DayPlan
}

// ---------------------------------------------------------------------------
// Diet tracker
// ---------------------------------------------------------------------------

export type TrackerStatus = 'active' | 'completed' | 'abandoned'
export type MealTimingStatus =
  'completed' | 'upcoming' | 'active' | 'missed' | 'anytime'

export interface TrackedMeal {
  _id?: string
  mealId: string
  name: string
  category: string
  isEaten: boolean
  eatenAt?: string
  nutrition?: Partial<Nutrition>
  /** Added by the backend on GET /diet-trackers/active */
  timingStatus?: MealTimingStatus
}

export interface DailyTracker {
  _id?: string
  date: string
  dayNumber: number
  meals: TrackedMeal[]
  consumed: Nutrition
  target?: Partial<Nutrition>
  mealsCompleted: number
  totalMeals?: number
  completionPercentage: number
}

export interface DietTracker {
  _id: string
  userId: string
  /** Populated by the backend on most endpoints */
  aiMealPlanId: AiMealPlan | string
  status: TrackerStatus
  startDate: string
  currentDay: number
  totalDays: number
  overallCompletionPercentage: number
  streak: number
  longestStreak: number
  lastTrackedDate?: string
  adherenceScore: number
  dailyTrackers: DailyTracker[]
  createdAt?: string
  updatedAt?: string
}

export interface MarkMealResponse {
  message: string
  tracker: DietTracker
  dayCompleted?: boolean
  nextDayNumber?: number
  nextDayCreated?: boolean
}

export interface AllTrackersResponse {
  total: number
  page: number
  totalPages: number
  trackers: DietTracker[]
}

// ---------------------------------------------------------------------------
// AI doctor
// ---------------------------------------------------------------------------

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  role: ChatRole
  content: string
}

export interface ChatResponse {
  success: boolean
  data?: { message: string; role: 'assistant' }
  error?: string
}
