import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function ResetPasswordForm() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

  // Check minimum length
  if (password.length < 6) {
    setError('Password must be at least 6 characters long')
    return
  }

    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      await api.post(`/auth/reset-password/${token}`, { password })
      setSuccess(true)
      setMessage('Password reset successful! Redirecting...')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired reset link')
    } finally {
      setIsLoading(false)
    }
  }

  const greenButtonClass = `
    text-white bg-gradient-to-br from-green-600 to-green-400 
    hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
    focus:ring-green-200 font-medium rounded-md 
    text-base px-5 py-2.5 shadow-md transition-all text-center
    disabled:opacity-50
  `

  return (
    <div className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      {message && <div className="text-green-600">{message}</div>}

      {success ? (
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/login')}
            className={greenButtonClass}
          >
            Go to Login
          </button>

          <p className="text-sm text-gray-500">
            Redirecting to login...
          </p>
        </div>
      ) : (



      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button type="submit" disabled={isLoading || password.length < 6} className={greenButtonClass}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      )}
    </div>
  )
}
