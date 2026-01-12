import { useState } from 'react'
import api from '../../services/api'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await api.post('/auth/forgot-password', { email })
      setEmailSent(true)
      setEmail('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // SUCCESS VIEW
  if (emailSent) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Instruction Sent
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          We sent an email to you with instructions on how to set your password.
          <br />
          Please click the link in the email and continue. If you need any help, please send us an email at support@nutriva.com and we would happy to help you.
          <br />
          Thank you.
        </p>

        <a
          href="/login"
          className="inline-block mt-4 text-green-600 font-medium hover:underline"
        >
          Back to Login
        </a>
      </div>
    )
  }

  // DEFAULT FORM VIEW
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">
        Forgot Password
      </h2>

      <p className="text-center text-sm text-gray-600">
        Enter your email to receive a reset link
      </p>

      {error && <div className="text-red-600 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-gradient-to-br from-green-600 to-green-400 
                     hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                     focus:ring-green-200 font-medium rounded-md 
                     text-base px-5 py-2.5 shadow-md transition-all
                     disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  )
}




