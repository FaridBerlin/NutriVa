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
import * as profileApi from '../api/profileApi'
import { getErrorMessage } from '../services/api'
import type {
  ActionResult,
  NutritionTargets,
  Profile,
  ProfileInput,
} from '../types'

export interface ProfileContextValue {
  profile: Profile | null
  nutritionTargets: NutritionTargets | null
  loading: boolean
  error: string | null
  fetchProfile: (forceRefresh?: boolean) => Promise<void>
  createProfile: (profileData: ProfileInput) => Promise<ActionResult<Profile>>
  updateProfile: (profileData: ProfileInput) => Promise<ActionResult<Profile>>
  deleteProfile: () => Promise<ActionResult>
  refreshProfile: () => Promise<void>
  clearError: () => void
  // Computed values
  isProfileComplete: boolean
  calorieGoal: number
  profileProgress: number
}

export const ProfileContext = createContext<ProfileContextValue | null>(null)

export const useProfile = (): ProfileContextValue => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider')
  }
  return context
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const REQUIRED_FIELDS = [
  'age',
  'gender',
  'height',
  'weight',
  'activityLevel',
  'dietaryGoal',
] as const satisfies readonly (keyof Profile)[]

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [nutritionTargets, setNutritionTargets] =
    useState<NutritionTargets | null>(null)
  const [loading, setLoading] = useState(true) // Start with loading true
  const [error, setError] = useState<string | null>(null)

  // Cache timestamp. A ref (not state) so fetchProfile keeps a stable identity.
  const lastFetch = useRef<number | null>(null)

  // Fetch profile from API
  const fetchProfile = useCallback(async (forceRefresh = false) => {
    // Check cache
    if (
      !forceRefresh &&
      lastFetch.current &&
      Date.now() - lastFetch.current < CACHE_DURATION
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
        setProfile(data)
        setNutritionTargets(calculations)
        lastFetch.current = Date.now()
      } else {
        // No profile exists yet
        setProfile(null)
        setNutritionTargets(null)
      }
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch profile'))
    } finally {
      setLoading(false)
    }
  }, [])

  // Create profile with optimistic update
  const createProfile = async (
    profileData: ProfileInput,
  ): Promise<ActionResult<Profile>> => {
    setLoading(true)
    setError(null)

    // Optimistic update
    setProfile({ ...profileData, user: user?.id ?? user?._id } as Profile)

    try {
      const {
        data,
        calculations,
        error: apiError,
      } = await profileApi.createProfile(profileData)

      if (apiError) {
        // Rollback on error
        setProfile(null)
        setNutritionTargets(null)
        setError(apiError)
        return { success: false, error: apiError }
      }

      setProfile(data)
      setNutritionTargets(calculations)
      lastFetch.current = Date.now()

      return { success: true, data: data ?? undefined }
    } catch (err) {
      // Rollback on error
      setProfile(null)
      setNutritionTargets(null)
      const errorMessage = getErrorMessage(err, 'Failed to create profile')
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Update profile with optimistic update
  const updateProfile = async (
    profileData: ProfileInput,
  ): Promise<ActionResult<Profile>> => {
    setLoading(true)
    setError(null)

    // Store previous state for rollback
    const previousProfile = profile
    const previousTargets = nutritionTargets

    // Optimistic update
    setProfile(profile ? { ...profile, ...profileData } : null)

    try {
      const {
        data,
        calculations,
        error: apiError,
      } = await profileApi.updateProfile(profileData)

      if (apiError) {
        // Rollback on error
        setProfile(previousProfile)
        setNutritionTargets(previousTargets)
        setError(apiError)
        return { success: false, error: apiError }
      }

      setProfile(data)
      setNutritionTargets(calculations)
      lastFetch.current = Date.now()

      return { success: true, data: data ?? undefined }
    } catch (err) {
      // Rollback on error
      setProfile(previousProfile)
      setNutritionTargets(previousTargets)
      const errorMessage = getErrorMessage(err, 'Failed to update profile')
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Delete profile
  const deleteProfile = async (): Promise<ActionResult> => {
    setLoading(true)
    setError(null)

    try {
      const { error: apiError } = await profileApi.deleteProfile()

      if (apiError) {
        setError(apiError)
        return { success: false, error: apiError }
      }

      setProfile(null)
      setNutritionTargets(null)
      lastFetch.current = null

      return { success: true }
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to delete profile')
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Refresh profile (force fetch)
  const refreshProfile = async () => {
    await fetchProfile(true)
  }

  const clearError = () => setError(null)

  // Computed values
  const isProfileComplete = Boolean(
    profile &&
    profile.age &&
    profile.gender &&
    profile.height &&
    profile.weight,
  )

  const calorieGoal = nutritionTargets?.dailyCalories || 0

  const profileProgress = profile
    ? Math.round(
        (REQUIRED_FIELDS.filter(
          (field) => profile[field] !== null && profile[field] !== undefined,
        ).length /
          REQUIRED_FIELDS.length) *
          100,
      )
    : 0

  // Fetch profile when user changes
  useEffect(() => {
    if (user?.profileCompleted) {
      // Only fetch if user has completed profile
      void fetchProfile()
    } else {
      // Clear profile when user logs out or hasn't completed profile
      setProfile(null)
      setNutritionTargets(null)
      lastFetch.current = null
      setLoading(false)
    }
  }, [user, fetchProfile])

  const value: ProfileContextValue = {
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
    isProfileComplete,
    calorieGoal,
    profileProgress,
  }

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
