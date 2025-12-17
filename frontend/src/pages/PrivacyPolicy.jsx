import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  const year = new Date().getFullYear()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-gray-700 mb-4">
        This Privacy Policy explains how NutriVa collects, uses, discloses, and
        protects your personal information. This is a minimal template — adapt
        it to your legal requirements (GDPR, CCPA, etc.).
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="text-gray-700">
        We may collect information you provide directly (account details,
        profile), and data collected automatically (usage data, cookies).
      </p>

      <h2 className="text-xl font-semibold mt-6">
        2. How We Use Your Information
      </h2>
      <p className="text-gray-700">
        We use information to provide and improve services, communicate with
        you, and for analytics.
      </p>

      <h2 className="text-xl font-semibold mt-6">3. Cookies & Tracking</h2>
      <p className="text-gray-700">
        We use cookies and similar technologies to personalise content and
        analyse traffic. You can manage cookie preferences in your browser.
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Sharing</h2>
      <p className="text-gray-700">
        We do not sell personal information. We may share data with service
        providers and when required by law.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Contact</h2>
      <p className="text-gray-700">
        If you have questions about this policy, contact us at{' '}
        <a className="text-primary" href="mailto:support@nutriva.com">
          support@nutriva.com
        </a>
        .
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
