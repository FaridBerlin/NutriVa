import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { AuthContext } from '../../context/AuthContext'

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
      localStorage.setItem('token', response.data.token)
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

  // shared green button style
  const greenButtonClass = `
    text-white bg-gradient-to-br from-green-600 to-green-400 
    hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
    focus:ring-green-200 font-medium rounded-md 
    text-base px-5 py-2.5 shadow-md transition-all text-center
    disabled:opacity-50
  `

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Login</h2>

      {error && <div className="text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
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
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Login button with unified green gradient style */}
        <button type="submit" disabled={isLoading} className={greenButtonClass}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
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
