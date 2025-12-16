import { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to verify token and get user data
  const verifyToken = async () => {
    try {
      // Call backend to verify token (stored in httpOnly cookie)
      const response = await api.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

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
    // Skip token verification on public pages
    const publicPages = ['/', '/login', '/signup']
    const currentPath = window.location.pathname

    if (!publicPages.includes(currentPath)) {
      verifyToken()
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
