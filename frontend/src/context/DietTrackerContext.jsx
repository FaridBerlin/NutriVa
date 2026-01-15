import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'
import dietTrackerApi from '../api/dietTrackerApi'

export const DietTrackerContext = createContext()

// Custom hook to use DietTrackerContext
export const useDietTracker = () => {
  const context = useContext(DietTrackerContext)
  if (!context) {
    throw new Error('useDietTracker must be used within DietTrackerProvider')
  }
  return context
}

export function DietTrackerProvider({ children }) {
  const { user } = useContext(AuthContext)

  const [activeTracker, setActiveTracker] = useState(null)
  const [allTrackers, setAllTrackers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cache control
  const [lastFetch, setLastFetch] = useState(null)
  const CACHE_DURATION = 2 * 60 * 1000 // 2 minutes (more frequent for tracker)

  // Fetch active tracker
  const fetchActiveTracker = async () => {
    if (!user && activeTracker) {
      setActiveTracker(null)
      return
    }

    // Use cache if fresh
    if (lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.getActiveTracker()
      setActiveTracker(response)
      setLastFetch(Date.now())
    } catch (err) {
      // 404 means no active tracker - not an error
      if (err.response?.status === 404) {
        setActiveTracker(null)
      } else {
        console.error('Error fetching active tracker:', err)
        setError(err.response?.data?.message || 'Failed to fetch tracker')
      }
    } finally {
      setLoading(false)
    }
  }

  // Create new tracker
  const createTracker = async (aiMealPlanId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.createTracker(aiMealPlanId)
      setActiveTracker(response)
      setLastFetch(Date.now())

      return { success: true, data: response }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create tracker'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Mark meal as eaten
  const markMealAsEaten = async (dayNumber, mealId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.markMealAsEaten(dayNumber, mealId)
      setActiveTracker(response.tracker)
      setLastFetch(Date.now())

      return { success: true, data: response }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update meal'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Undo meal (mark as not eaten)
  const undoMeal = async (dayNumber, mealId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.undoMeal(dayNumber, mealId)
      setActiveTracker(response.tracker)
      setLastFetch(Date.now())

      return { success: true, data: response }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to undo meal'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Get specific day from tracker
  const getTrackerDay = async (dayNumber) => {
    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.getTrackerDay(dayNumber)
      return { success: true, data: response }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch day'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Fetch all trackers
  const fetchAllTrackers = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.getAllTrackers()
      setAllTrackers(response || [])
    } catch (err) {
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || 'Failed to fetch trackers')
      }
    } finally {
      setLoading(false)
    }
  }

  // Clear error
  const clearError = () => setError(null)

  // Auto-fetch active tracker when user logs in
  useEffect(() => {
    if (user) {
      fetchActiveTracker()
    } else {
      setActiveTracker(null)
      setAllTrackers([])
      setError(null)
    }
  }, [user])

  // Computed values
  const hasActiveTracker = !!activeTracker
  const totalTrackers = allTrackers.length

  const value = {
    // State
    activeTracker,
    allTrackers,
    loading,
    error,

    // Actions
    createTracker,
    fetchActiveTracker,
    fetchAllTrackers,
    markMealAsEaten,
    undoMeal,
    getTrackerDay,
    clearError,

    // Computed
    hasActiveTracker,
    totalTrackers,
  }

  return (
    <DietTrackerContext.Provider value={value}>
      {children}
    </DietTrackerContext.Provider>
  )
}

export default DietTrackerContext
