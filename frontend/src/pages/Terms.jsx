import { Link } from 'react-router-dom'

export default function Terms() {
  const year = new Date().getFullYear()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="text-gray-700 mb-4">
        These Terms of Service govern your use of the NutriVa website and
        services. Please read them carefully before using our service.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Acceptance</h2>
      <p className="text-gray-700">
        By accessing or using NutriVa, you agree to these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. Use of Service</h2>
      <p className="text-gray-700">
        You agree to use the service in compliance with applicable laws and not
        to misuse the service.
      </p>

      <h2 className="text-xl font-semibold mt-6">3. Limitation of Liability</h2>
      <p className="text-gray-700">
        NutriVa is provided as-is. We are not liable for indirect or
        consequential damages. If you need specific legal terms, adapt this
        document with counsel.
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Changes</h2>
      <p className="text-gray-700">
        We may update these terms — we will post changes on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Contact</h2>
      <p className="text-gray-700">
        Questions:{' '}
        <a className="text-primary" href="mailto:support@nutriva.com">
          support@nutriva.com
        </a>
      </p>

      <p className="text-sm text-gray-500 mt-8">
        © {year} NutriVa. All rights reserved.
      </p>

      <p className="mt-6">
        <Link to="/" className="text-primary underline">
          Back to Home
        </Link>
      </p>
    </div>
  )
}
