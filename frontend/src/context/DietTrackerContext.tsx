import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from './AuthContext'
import dietTrackerApi from '../api/dietTrackerApi'
import { getErrorMessage, getErrorStatus } from '../services/api'
import type {
  ActionResult,
  DailyTracker,
  DietTracker,
  MarkMealResponse,
} from '../types'

export interface DietTrackerContextValue {
  // State
  activeTracker: DietTracker | null
  allTrackers: DietTracker[]
  loading: boolean
  error: string | null

  // Actions
  createTracker: (aiMealPlanId: string) => Promise<ActionResult<DietTracker>>
  fetchActiveTracker: (force?: boolean) => Promise<void>
  fetchAllTrackers: () => Promise<void>
  markMealAsEaten: (
    dayNumber: number,
    mealId: string,
  ) => Promise<ActionResult<MarkMealResponse>>
  undoMeal: (
    dayNumber: number,
    mealId: string,
  ) => Promise<ActionResult<MarkMealResponse>>
  getTrackerDay: (dayNumber: number) => Promise<ActionResult<DailyTracker>>
  clearError: () => void

  // Computed
  hasActiveTracker: boolean
  totalTrackers: number
}

export const DietTrackerContext = createContext<DietTrackerContextValue | null>(
  null,
)

// Custom hook to use DietTrackerContext
export const useDietTracker = (): DietTrackerContextValue => {
  const context = useContext(DietTrackerContext)
  if (!context) {
    throw new Error('useDietTracker must be used within DietTrackerProvider')
  }
  return context
}

const CACHE_DURATION = 2 * 60 * 1000 // 2 minutes (more frequent for tracker)

export function DietTrackerProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const [activeTracker, setActiveTracker] = useState<DietTracker | null>(null)
  const [allTrackers, setAllTrackers] = useState<DietTracker[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cache timestamp (ref so callbacks stay stable)
  const lastFetch = useRef<number | null>(null)

  // Fetch active tracker
  const fetchActiveTracker = useCallback(
    async (force = false) => {
      if (!user) {
        setActiveTracker(null)
        return
      }

      // Use cache if fresh (skip cache if force)
      if (
        !force &&
        lastFetch.current &&
        Date.now() - lastFetch.current < CACHE_DURATION
      ) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await dietTrackerApi.getActiveTracker()
        setActiveTracker(response)
        lastFetch.current = Date.now()
      } catch (err) {
        // 404 means no active tracker - not an error
        if (getErrorStatus(err) === 404) {
          setActiveTracker(null)
        } else {
          console.error('Error fetching active tracker:', err)
          setError(getErrorMessage(err, 'Failed to fetch tracker'))
        }
      } finally {
        setLoading(false)
      }
    },
    [user],
  )

  // Create new tracker
  const createTracker = async (
    aiMealPlanId: string,
  ): Promise<ActionResult<DietTracker>> => {
    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.createTracker(aiMealPlanId)
      setActiveTracker(response)
      lastFetch.current = Date.now()

      return { success: true, data: response }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to create tracker')
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Mark meal as eaten
  const markMealAsEaten = async (
    dayNumber: number,
    mealId: string,
  ): Promise<ActionResult<MarkMealResponse>> => {
    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.markMealAsEaten(dayNumber, mealId)
      setActiveTracker(response.tracker)
      lastFetch.current = Date.now()

      return { success: true, data: response }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to update meal')
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Undo meal (mark as not eaten)
  const undoMeal = async (
    dayNumber: number,
    mealId: string,
  ): Promise<ActionResult<MarkMealResponse>> => {
    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.undoMeal(dayNumber, mealId)
      setActiveTracker(response.tracker)
      lastFetch.current = Date.now()

      return { success: true, data: response }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to undo meal')
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  // Get specific day from tracker
  const getTrackerDay = async (
    dayNumber: number,
  ): Promise<ActionResult<DailyTracker>> => {
    setLoading(true)
    setError(null)

    try {
      const response = await dietTrackerApi.getTrackerDay(dayNumber)
      return { success: true, data: response }
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to fetch day')
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
      // The endpoint is paginated: { total, page, totalPages, trackers }.
      // Previously the whole envelope was stored here as if it were the array.
      const response = await dietTrackerApi.getAllTrackers()
      setAllTrackers(response.trackers ?? [])
    } catch (err) {
      if (getErrorStatus(err) !== 404) {
        setError(getErrorMessage(err, 'Failed to fetch trackers'))
      }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  // Auto-fetch active tracker when user logs in
  useEffect(() => {
    if (user) {
      void fetchActiveTracker()
    } else {
      setActiveTracker(null)
      setAllTrackers([])
      setError(null)
      lastFetch.current = null
    }
  }, [user, fetchActiveTracker])

  const value: DietTrackerContextValue = {
    activeTracker,
    allTrackers,
    loading,
    error,
    createTracker,
    fetchActiveTracker,
    fetchAllTrackers,
    markMealAsEaten,
    undoMeal,
    getTrackerDay,
    clearError,
    hasActiveTracker: !!activeTracker,
    totalTrackers: allTrackers.length,
  }

  return (
    <DietTrackerContext.Provider value={value}>
      {children}
    </DietTrackerContext.Provider>
  )
}

export default DietTrackerContext
