import axios, { isAxiosError } from 'axios'
import type { ApiErrorBody } from '../types'

export const API_URL: string =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies
})

/** HTTP status of a failed request, if it was an HTTP error. */
export function getErrorStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined
}

/**
 * Best human-readable message for any thrown value: the API's `message`,
 * then the Error's own message, then `fallback`.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<ApiErrorBody>(error)) {
    const body = error.response?.data
    if (body?.message) return body.message
    if (typeof body?.error === 'string') return body.error
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}

export default api
