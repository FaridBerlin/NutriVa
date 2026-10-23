import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import api from '../services/api'
import type { User } from '../types'

export interface AuthContextValue {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  isLoading: boolean
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = async () => {
    try {
      // clear cookie
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  useEffect(() => {
    // Always resolve the session on mount. Skipping this on public pages left
    // an already-logged-in visitor with user === null, so navigating from the
    // landing page to a protected route bounced them to /login. The request is
    // a single cookie check and returns 401 harmlessly when signed out.
    const verifyToken = async () => {
      try {
        // Call backend to verify token (stored in httpOnly cookie)
        const response = await api.get<{ user: User }>('/auth/me')
        setUser(response.data.user)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    void verifyToken()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
