import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { AuthContext } from '../../context/AuthContext'
import Button from '../ui/Button'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const response = await api.post('/auth/login', formData)
      setUser(response.data.user)

      if (!response.data.user.profileCompleted) {
        navigate('/profile') // New user - fill profile first
      } else {
        navigate('/dashboard') // Existing user - go to dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="nv-input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="nv-input"
            required
          />
        </div>
        {/* Login button with unified Button component */}
        <Button type="submit" variant="primary" size="md" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        {/* Forgot Password */}
        <p className="text-sm text-right">
          <a href="/forgot-password" className="text-green-600 hover:underline">
            Forgot your password?
          </a>
        </p>
      </form>

      <p className="text-sm">
        Don't have an account?{' '}
        <a href="/signup" className="text-primary hover:underline">
          Sign up
        </a>
      </p>
    </div>
  )
}
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { AuthContext } from '../../context/AuthContext'
import Button from '../ui/Button'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
 
    try {
      const response = await api.post('/auth/login', formData)
      setUser(response.data.user)

      if (!response.data.user.profileCompleted) {
        navigate('/profile') // New user - fill profile first
      } else {
        navigate('/dashboard') // Existing user - go to dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

<<<<<<< HEAD
=======

>>>>>>> 656ec87 (Implement Button component and replace button elements in forms and navbar for consistency)
  return (
    <div className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="nv-input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="nv-input"
            required
          />
        </div>
        {/* Login button with unified Button component */}
        <Button type="submit" variant="primary" size="md" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        {/* Forgot Password */}
        <p className="text-sm text-right">
          <a href="/forgot-password" className="text-green-600 hover:underline">
            Forgot your password?
          </a>
        </p>
      </form>

      <p className="text-sm">
        Don't have an account?{' '}
        <a href="/signup" className="text-primary hover:underline">
          Sign up
        </a>
      </p>
    </div>
  )
}
