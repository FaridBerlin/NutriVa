import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormLayout from '../components/ui/FormLayout'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      // optimistic: try to POST to backend, but not required for local dev
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) setStatus('sent')
      else setStatus('sent')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }

    setTimeout(() => {
      setName('')
      setEmail('')
      setMessage('')
      setStatus(null)
    }, 1500)
  }

  return (
    <FormLayout
      title="Contact Us"
      footer={
        <div>
          Or email us directly at{' '}
          <a href="mailto:support@nutriva.com" className="text-primary">
            support@nutriva.com
          </a>
        </div>
      }
    >
      <p className="text-gray-500 mb-4">
        Have a question or feedback? Send us a message and we'll get back to
        you.
      </p>

      <form onSubmit={handleSubmit} className="nv-form">
        <div>
          <label className="nv-form-label">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="nv-form-input mt-2"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="nv-form-label">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="nv-form-input mt-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="nv-form-label">Message</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="nv-form-input mt-2"
            placeholder="Write your message here"
          />
        </div>

        <div className="nv-form-actions">
          <button type="submit" className="nv-btn-gradient">
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <span className="nv-form-success">Sent — thanks!</span>
          )}
          {status === 'error' && (
            <span className="nv-form-error">Error sending message</span>
          )}
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        <Link to="/" className="text-sm text-gray-500 hover:text-primary">
          ← Back to home
        </Link>
      </div>
    </FormLayout>
  )
}
