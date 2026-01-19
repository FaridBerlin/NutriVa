import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'
import aiMealPlanApi from '../api/aiMealPlanApi'

export const AiMealPlanContext = createContext()

// Custom hook to use AiMealPlanContext
export const useAiMealPlan = () => {
  const context = useContext(AiMealPlanContext)
  if (!context) {
    throw new Error('useAiMealPlan must be used within AiMealPlanProvider')
  }
  return context
}

// Alias for backward compatibility - uses same name as old context
export const useMealPlan = useAiMealPlan

export function AiMealPlanProvider({ children }) {
  const { user } = useContext(AuthContext)

  const [activePlan, setActivePlan] = useState(null)
  const [allPlans, setAllPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cache control
  const [lastFetch, setLastFetch] = useState(null)
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  // Fetch latest AI meal plan
  const fetchLatestPlan = async () => {
    if (!user) {
      setActivePlan(null)
      return
    }

    // Use cache if fresh
    if (lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getLatestMealPlan()
      setActivePlan(response.mealPlan)
      console.log('latest Meal PLan:', response.mealPlan)
      setLastFetch(Date.now())
    } catch (err) {
      // 404 means no plans yet - not an error, silently handle it
      if (err.response?.status === 404) {
        setActivePlan(null)
        // Don't set error for 404 - it's expected when user has no plans
      } else {
        console.error('Error fetching AI meal plan:', err)
        setError(
          err.response?.data?.message || 'Failed to fetch last meal plan',
        )
      }
    } finally {
      setLoading(false)
    }
  }

  // Fetch all AI meal plans
  const fetchAllPlans = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getAllMealPlans()
      setAllPlans(response.mealPlans || [])
      console.log('All Meal PLans: ', response.mealPlans)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch all meal plans')
    } finally {
      setLoading(false)
    }
  }

  // Generate new AI meal plan
  const generateMealPlan = async (planData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.generateMealPlan(planData)
      const newPlan = response.mealPlan

      // Update state
      setActivePlan(newPlan)
      console.log('generated Meal Plan:', newPlan)
      setAllPlans((prev) => [newPlan, ...prev])
      setLastFetch(Date.now())

      return { success: true, data: newPlan }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to generate meal plan'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Get specific AI meal plan by ID
  const getMealPlanById = async (planId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getMealPlanById(planId)
      return { success: true, data: response.mealPlan }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to fetch meal plan'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Get specific day from AI meal plan
  const getMealPlanDay = async (planId, dayNumber) => {
    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getMealPlanDay(planId, dayNumber)
      return { success: true, data: response.day }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch day'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Get specific day from latest AI meal plan (for diet planner)
  const getDayFromLatestPlan = async (dayNumber) => {
    setLoading(true)
    setError(null)

    try {
      const response = await aiMealPlanApi.getDayFromLatestPlan(dayNumber)
      return { success: true, data: response }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch day'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Delete AI meal plan
  const deleteMealPlan = async (planId) => {
    setLoading(true)
    setError(null)

    try {
      await aiMealPlanApi.deleteMealPlan(planId)

      // Update state - remove from allPlans
      setAllPlans((prev) => prev.filter((plan) => plan._id !== planId))

      // If deleted plan was active, clear it
      if (activePlan?._id === planId) {
        setActivePlan(null)
      }

      return { success: true }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to delete meal plan'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Set active plan (for switching between plans)
  const setActiveById = async (planId) => {
    const result = await getMealPlanById(planId)
    if (result.success) {
      setActivePlan(result.data)
    }
  }

  // Clear error
  const clearError = () => setError(null)

  // Auto-fetch latest plan when user logs in
  useEffect(() => {
    if (user && user.profileCompleted) {
      // Only fetch if user has completed profile
      fetchLatestPlan()
    } else {
      setActivePlan(null)
      setAllPlans([])
      setError(null)
    }
  }, [user])

  // Computed values
  const hasActivePlan = !!activePlan
  const totalPlans = allPlans.length

  const value = {
    // State
    activePlan,
    allPlans,
    loading,
    error,

    // Actions
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

    // Computed
    hasActivePlan,
    totalPlans,
  }

  return (
    <AiMealPlanContext.Provider value={value}>
      {children}
    </AiMealPlanContext.Provider>
  )
}

export default AiMealPlanContext
