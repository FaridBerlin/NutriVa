import type { AxiosResponse } from 'axios'
import api, { getErrorMessage, getErrorStatus } from '../services/api'
import type {
  NutritionTargets,
  Profile,
  ProfileInput,
  ProfileResponse,
} from '../types'

export interface ProfileResult {
  data: Profile | null
  calculations: NutritionTargets | null
  warnings?: string[]
  error: string | null
}

export interface DeleteProfileResult {
  data: boolean
  error: string | null
}

// Request/Response logging for debugging (only in development)
const isDevelopment = import.meta.env.DEV

const logRequest = (method: string, url: string, data?: unknown) => {
  if (isDevelopment) {
    console.log(`[Profile API] ${method} ${url}`, data || '')
  }
}

const logResponse = (method: string, url: string, response: AxiosResponse) => {
  if (isDevelopment) {
    console.log(`[Profile API] ${method} ${url} - Success:`, response.data)
  }
}

const logError = (method: string, url: string, error: unknown) => {
  if (isDevelopment) {
    console.error(
      `[Profile API] ${method} ${url} - Error:`,
      getErrorMessage(error, 'Unknown error'),
    )
  }
}

// Retry logic for failed requests (server errors only)
const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries = 2,
): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    const status = getErrorStatus(error)
    if (retries > 0 && status !== undefined && status >= 500) {
      console.log(`[Profile API] Retrying... (${retries} attempts left)`)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
      return retryRequest(fn, retries - 1)
    }
    throw error
  }
}

/** Backend returns { data: { profile, nutritionTargets, warnings? } } */
const toProfileResult = (body: ProfileResponse): ProfileResult => ({
  data: body.data?.profile ?? null,
  calculations: body.data?.nutritionTargets ?? null,
  warnings: body.data?.warnings,
  error: null,
})

/**
 * Create user profile
 */
export const createProfile = async (
  profileData: ProfileInput,
): Promise<ProfileResult> => {
  try {
    logRequest('POST', '/profile/complete', profileData)

    const response = await retryRequest(() =>
      api.post<ProfileResponse>('/profile/complete', profileData),
    )

    logResponse('POST', '/profile/complete', response)
    return toProfileResult(response.data)
  } catch (error) {
    logError('POST', '/profile/complete', error)

    return {
      data: null,
      calculations: null,
      error: getErrorMessage(error, 'Failed to create profile'),
    }
  }
}

/**
 * Get current user's profile
 */
export const getProfile = async (): Promise<ProfileResult> => {
  try {
    logRequest('GET', '/profile')

    const response = await retryRequest(() =>
      api.get<ProfileResponse>('/profile'),
    )

    logResponse('GET', '/profile', response)
    return toProfileResult(response.data)
  } catch (error) {
    logError('GET', '/profile', error)

    // 404 means profile doesn't exist yet - not really an error
    // 400 with "not found" message also means profile doesn't exist
    const status = getErrorStatus(error)
    const message = getErrorMessage(error, 'Failed to fetch profile')
    if (status === 404 || (status === 400 && message.includes('not found'))) {
      return {
        data: null,
        calculations: null,
        error: null,
      }
    }

    return {
      data: null,
      calculations: null,
      error: message,
    }
  }
}

/**
 * Update user profile
 */
export const updateProfile = async (
  profileData: ProfileInput,
): Promise<ProfileResult> => {
  try {
    logRequest('PUT', '/profile', profileData)

    const response = await retryRequest(() =>
      api.put<ProfileResponse>('/profile', profileData),
    )

    logResponse('PUT', '/profile', response)
    return toProfileResult(response.data)
  } catch (error) {
    logError('PUT', '/profile', error)

    return {
      data: null,
      calculations: null,
      error: getErrorMessage(error, 'Failed to update profile'),
    }
  }
}

/**
 * Delete user profile
 */
export const deleteProfile = async (): Promise<DeleteProfileResult> => {
  try {
    logRequest('DELETE', '/profile')

    const response = await retryRequest(() => api.delete('/profile'))

    logResponse('DELETE', '/profile', response)

    return {
      data: true,
      error: null,
    }
  } catch (error) {
    logError('DELETE', '/profile', error)

    return {
      data: false,
      error: getErrorMessage(error, 'Failed to delete profile'),
    }
  }
}

export default {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
}
