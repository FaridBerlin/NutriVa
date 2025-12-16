import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react'
import { AuthContext } from './AuthContext'
import * as profileApi from '../api/profileApi'

export const ProfileContext = createContext()

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider')
  }
  return context
}

export function ProfileProvider({ children }) {
  const { user } = useContext(AuthContext)

  const [profile, setProfile] = useState(null)
  const [nutritionTargets, setNutritionTargets] = useState(null)
  const [loading, setLoading] = useState(true) // Start with loading true
  const [error, setError] = useState(null)

  // Cache to reduce API calls
  const [lastFetch, setLastFetch] = useState(null)
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  // Fetch profile from API
  // Updated 4 December 2025: Fixed to match Backend response structure
  const fetchProfile = useCallback(
    async (forceRefresh = false) => {
      // Check cache
      if (
        !forceRefresh &&
        lastFetch &&
        Date.now() - lastFetch < CACHE_DURATION
      ) {
        console.log('[ProfileContext] Using cached profile')
        return
      }

      setLoading(true)
      setError(null)

      try {
        const {
          data,
          calculations,
          error: apiError,
        } = await profileApi.getProfile()

        if (apiError) {
          setError(apiError)
          setProfile(null)
          setNutritionTargets(null)
        } else if (data) {
          // Backend returns profile data directly
          setProfile(data)
          // Set calculations as nutritionTargets
          setNutritionTargets(calculations)
          setLastFetch(Date.now())
        } else {
          // No profile exists yet
          setProfile(null)
          setNutritionTargets(null)
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch profile')
      } finally {
        setLoading(false)
      }
    },
    [lastFetch],
  )

  // Create profile with optimistic update
  const createProfile = async (profileData) => {
    setLoading(true)
    setError(null)

    // Optimistic update
    const optimisticProfile = { ...profileData, user: user?.id }
    setProfile(optimisticProfile)

    try {
      const { data, error: apiError } =
        await profileApi.createProfile(profileData)

      if (apiError) {
        // Rollback on error
        setProfile(null)
        setNutritionTargets(null)
        setError(apiError)
        return { success: false, error: apiError }
      }

      // Update with actual data from server
      setProfile(data.profile)
      setNutritionTargets(data.nutritionTargets)
      setLastFetch(Date.now())

      return { success: true, data }
    } catch (err) {
      // Rollback on error
      setProfile(null)
      setNutritionTargets(null)
      const errorMessage = err.message || 'Failed to create profile'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Update profile with optimistic update
  const updateProfile = async (profileData) => {
    setLoading(true)
    setError(null)

    // Store previous state for rollback
    const previousProfile = profile
    const previousTargets = nutritionTargets

    // Optimistic update
    setProfile({ ...profile, ...profileData })

    try {
      const { data, error: apiError } =
        await profileApi.updateProfile(profileData)

      if (apiError) {
        // Rollback on error
        setProfile(previousProfile)
        setNutritionTargets(previousTargets)
        setError(apiError)
        return { success: false, error: apiError }
      }

      // Update with actual data from server
      setProfile(data.profile)
      setNutritionTargets(data.nutritionTargets)
      setLastFetch(Date.now())

      return { success: true, data }
    } catch (err) {
      // Rollback on error
      setProfile(previousProfile)
      setNutritionTargets(previousTargets)
      const errorMessage = err.message || 'Failed to update profile'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Delete profile
  const deleteProfile = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: apiError } = await profileApi.deleteProfile()

      if (apiError) {
        setError(apiError)
        return { success: false, error: apiError }
      }

      setProfile(null)
      setNutritionTargets(null)
      setLastFetch(null)

      return { success: true }
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete profile'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Refresh profile (force fetch)
  // Refresh profile (force fetch, async)
  const refreshProfile = async () => {
    await fetchProfile(true)
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  // Computed values
  const isProfileComplete = Boolean(
    profile &&
    profile.age &&
    profile.gender &&
    profile.height &&
    profile.weight,
  )

  const calorieGoal = nutritionTargets?.targetCalories || 0

  const profileProgress = profile
    ? (() => {
        const requiredFields = [
          'age',
          'gender',
          'height',
          'weight',
          'activityLevel',
          'dietaryGoal',
        ]
        const filledFields = requiredFields.filter(
          (field) => profile[field] !== null && profile[field] !== undefined,
        )
        return Math.round((filledFields.length / requiredFields.length) * 100)
      })()
    : 0

  // Fetch profile when user changes
  useEffect(() => {
    if (user && user.profileCompleted) {
      // Only fetch if user has completed profile
      fetchProfile()
    } else {
      // Clear profile when user logs out or hasn't completed profile
      setProfile(null)
      setNutritionTargets(null)
      setLastFetch(null)
      setLoading(false)
    }
  }, [user]) // Remove fetchProfile from dependencies to avoid infinite loop

  const value = {
    profile,
    nutritionTargets,
    loading,
    error,
    fetchProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    refreshProfile,
    clearError,
    // Computed values
    isProfileComplete,
    calorieGoal,
    profileProgress,
  }

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
