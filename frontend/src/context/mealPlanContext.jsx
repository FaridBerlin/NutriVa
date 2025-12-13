import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'
//import * as mealApi from '../api/mealApi'
import mealApi from '../api/mealApi'

export const MealPlanContext = createContext()

// Custom hook to use MealPlanContext
export const useMealPlan = () => {
  const context = useContext(MealPlanContext)
  if (!context) {
    throw new Error('useMealPlan must be used within MealPlanProvider')
  }
  return context
}

export function MealPlanProvider({ children }) {
  const { user } = useContext(AuthContext)

  const [activePlan, setActivePlan] = useState(null)
  const [allPlans, setAllPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cache control
  const [lastFetch, setLastFetch] = useState(null)
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  // Fetch latest meal plan
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
      const response = await mealApi.getLatestMealPlan()
      setActivePlan(response.mealPlan)
      setLastFetch(Date.now())
    } catch (err) {
      // 404 means no plans yet - not an error
      if (err.response?.status === 404) {
        setActivePlan(null)
      } else {
        setError(err.response?.data?.message || 'Failed to fetch meal plan')
      }
    } finally {
      setLoading(false)
    }
  }

  // Fetch all meal plans
  const fetchAllPlans = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const response = await mealApi.getAllMealPlans()
      setAllPlans(response.mealPlans || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch meal plans')
    } finally {
      setLoading(false)
    }
  }

  // Generate new meal plan
  const generateMealPlan = async (planData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await mealApi.generateMealPlan(planData)
      const newPlan = response.mealPlan

      // Update state
      setActivePlan(newPlan)
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

  // Get specific meal plan by ID
  const getMealPlanById = async (planId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await mealApi.getMealPlanById(planId)
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

  // Get specific day from meal plan
  const getMealPlanDay = async (planId, dayNumber) => {
    setLoading(true)
    setError(null)

    try {
      const response = await mealApi.getMealPlanDay(planId, dayNumber)
      return { success: true, data: response.day }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch day'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Delete meal plan
  const deleteMealPlan = async (planId) => {
    setLoading(true)
    setError(null)

    try {
      await mealApi.deleteMealPlan(planId)

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
    if (user) {
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
    deleteMealPlan,
    setActiveById,
    clearError,

    // Computed
    hasActivePlan,
    totalPlans,
  }

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  )
}

export default MealPlanContext
