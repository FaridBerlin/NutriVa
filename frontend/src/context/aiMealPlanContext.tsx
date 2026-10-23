import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { useAuth } from './AuthContext'
import aiMealPlanApi from '../api/aiMealPlanApi'
import { getErrorMessage, getErrorStatus } from '../services/api'
import type {
  ActionResult,
  AiMealPlan,
  DayPlan,
  GenerationDetail,
  GenerationMethod,
  MealPlanRequest,
} from '../types'

export type GenerateMealPlanResult =
  | {
      success: true
      data: AiMealPlan
      generationMethod?: GenerationMethod
      generationDetail?: GenerationDetail
      error?: undefined
    }
  | { success: false; error: string; data?: undefined }

export interface AiMealPlanContextValue {
  // State
  activePlan: AiMealPlan | null
  allPlans: AiMealPlan[]
  loading: boolean
  error: string | null

  // Actions
  generateMealPlan: (
    planData: MealPlanRequest,
  ) => Promise<GenerateMealPlanResult>
  fetchLatestPlan: () => Promise<void>
  fetchAllPlans: () => Promise<void>
  getMealPlanById: (planId: string) => Promise<ActionResult<AiMealPlan>>
  getMealPlanDay: (
    planId: string,
    dayNumber: number,
  ) => Promise<ActionResult<DayPlan>>
  getDayFromLatestPlan: (dayNumber: number) => Promise<ActionResult<DayPlan>>
  deleteMealPlan: (planId: string) => Promise<ActionResult>
  setActiveById: (planId: string) => Promise<void>
  setActivePlan: Dispatch<SetStateAction<AiMealPlan | null>>
  clearError: () => void

  // Computed
  hasActivePlan: boolean
  totalPlans: number
}

export const AiMealPlanContext = createContext<AiMealPlanContextValue | null>(
  null,
)

// Custom hook to use AiMealPlanContext
export const useAiMealPlan = (): AiMealPlanContextValue => {
  const context = useContext(AiMealPlanContext)
  if (!context) {
    throw new Error('useAiMealPlan must be used within AiMealPlanProvider')
  }
  return context
}

// Alias for backward compatibility - uses same name as old context
export const useMealPlan = useAiMealPlan

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function AiMealPlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const [activePlan, setActivePlan] = useState<AiMealPlan | null>(null)
  const [allPlans, setAllPlans] = useState<AiMealPlan[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cache timestamp (ref so callbacks stay stable)
  const lastFetch = useRef<number | null>(null)

  // Fetch latest AI meal plan
  const fetchLatestPlan = useCallback(async () => {
    if (!user) {
      setActivePlan(null)
      return
    }

    // Use cache if fresh
    if (lastFetch.current && Date.now() - lastFetch.current < CACHE_DURATION) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getLatestMealPlan()
      setActivePlan(response.mealPlan)
      lastFetch.current = Date.now()
    } catch (err) {
      // 404 means no plans yet - not an error, silently handle it
      if (getErrorStatus(err) === 404) {
        setActivePlan(null)
      } else {
        console.error('Error fetching AI meal plan:', err)
        setError(getErrorMessage(err, 'Failed to fetch last meal plan'))
      }
    } finally {
      setLoading(false)
    }
  }, [user])

  // Fetch all AI meal plans
  const fetchAllPlans = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getAllMealPlans()
      setAllPlans(response.mealPlans || [])
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch all meal plans'))
    } finally {
      setLoading(false)
    }
  }, [user])

  // Generate new AI meal plan
  const generateMealPlan = async (
    planData: MealPlanRequest,
  ): Promise<GenerateMealPlanResult> => {
    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.generateMealPlan(planData)
      const newPlan = response.mealPlan

      setActivePlan(newPlan)
      setAllPlans((prev) => [newPlan, ...prev])
      lastFetch.current = Date.now()

      return {
        success: true,
        data: newPlan,
        generationMethod: response.generationMethod,
        generationDetail: response.generationDetail,
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to generate meal plan')
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Get specific AI meal plan by ID
  const getMealPlanById = async (
    planId: string,
  ): Promise<ActionResult<AiMealPlan>> => {
    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getMealPlanById(planId)
      return { success: true, data: response.mealPlan }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to fetch meal plan')
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Get specific day from AI meal plan
  const getMealPlanDay = async (
    planId: string,
    dayNumber: number,
  ): Promise<ActionResult<DayPlan>> => {
    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getMealPlanDay(planId, dayNumber)
      return { success: true, data: response.day }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to fetch day')
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Get specific day from latest AI meal plan (for diet planner)
  const getDayFromLatestPlan = async (
    dayNumber: number,
  ): Promise<ActionResult<DayPlan>> => {
    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getDayFromLatestPlan(dayNumber)
      return { success: true, data: response }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to fetch day')
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Delete AI meal plan
  const deleteMealPlan = async (planId: string): Promise<ActionResult> => {
    setLoading(true)
    setError(null)

    try {
      await aiMealPlanApi.deleteMealPlan(planId)

      setAllPlans((prev) => prev.filter((plan) => plan._id !== planId))

      // If deleted plan was active, clear it
      if (activePlan?._id === planId) {
        setActivePlan(null)
      }

      return { success: true }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to delete meal plan')
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Set active plan (for switching between plans)
  const setActiveById = async (planId: string) => {
    const result = await getMealPlanById(planId)
    if (result.success && result.data) {
      setActivePlan(result.data)
    }
  }

  const clearError = () => setError(null)

  // Auto-fetch latest plan when user logs in
  useEffect(() => {
    if (user?.profileCompleted) {
      // Only fetch if user has completed profile
      void fetchLatestPlan()
    } else {
      setActivePlan(null)
      setAllPlans([])
      setError(null)
    }
  }, [user, fetchLatestPlan])

  const value: AiMealPlanContextValue = {
    activePlan,
    allPlans,
    loading,
    error,
    generateMealPlan,
    fetchLatestPlan,
    fetchAllPlans,
    getMealPlanById,
    getMealPlanDay,
    getDayFromLatestPlan,
    deleteMealPlan,
    setActiveById,
    setActivePlan,
    clearError,
    hasActivePlan: !!activePlan,
    totalPlans: allPlans.length,
  }

  return (
    <AiMealPlanContext.Provider value={value}>
      {children}
    </AiMealPlanContext.Provider>
  )
}

export default AiMealPlanContext
