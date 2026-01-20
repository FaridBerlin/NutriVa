import { Link } from 'react-router-dom'
import { useState } from 'react'
import NutrivaLogo from './NutrivaLogo'
import ThemeToggle from './ui/ThemeToggle'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-green-400 to-primary"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="relative max-w-screen-xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center hover:scale-105 transition-transform"
              >
                <NutrivaLogo />
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 
                           rounded-xl flex items-center justify-center transition-all duration-300 
                           hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 group"
              >
                <svg
                  className="w-5 h-5 text-white group-hover:text-primary transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-br hover:from-sky-500 hover:to-sky-600 
                           rounded-xl flex items-center justify-center transition-all duration-300 
                           hover:scale-110 hover:shadow-lg hover:shadow-sky-500/30 group"
              >
                <svg
                  className="w-5 h-5 text-white group-hover:text-primary transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-500 
                           rounded-xl flex items-center justify-center transition-all duration-300 
                           hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 group"
              >
                <svg
                  className="w-5 h-5 text-white group-hover:text-primary transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-800 
                           rounded-xl flex items-center justify-center transition-all duration-300 
                           hover:scale-110 hover:shadow-lg hover:shadow-blue-700/30 group"
              >
                <svg
                  className="w-5 h-5 text-white group-hover:text-primary transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="text-white hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .getElementById('how-it-works')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-white hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#tools"
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .getElementById('tools')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-white hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .getElementById('faq')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-white hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .getElementById('faq')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-white hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  Help Center
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Contact Email */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-200 mb-2">Need help?</p>
              <a
                href="mailto:support@nutriva.com"
                className="text-primary hover:text-green-400 transition-colors font-medium flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@nutriva.com
              </a>
            </div>
            {/* Theme Toggle (footer) */}
            <div className="mt-4 flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/40 rounded-2xl p-8 mb-12 border border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold mb-2">Stay Updated</h4>
              <p className="text-gray-200">
                Get nutrition tips and updates delivered to your inbox.
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 font-semibold animate-pulse">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Thanks for subscribing!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex w-full md:w-auto gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 md:w-72 px-5 py-3 bg-gray-900 border border-gray-700 rounded-xl 
                             text-white placeholder-gray-500 focus:outline-none focus:border-primary 
                             focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button type="submit" className="nv-btn-primary">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span>© {currentYear} Nutriva.</span>
              <span className="hidden md:inline">•</span>
              <span>All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-white hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-white hover:text-primary transition-colors"
              >
                Terms
              </Link>

              {/*   <Link
                to="/imprint"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Imprint
              </Link> */}
            </div>

            <p className="text-gray-300 text-sm flex items-center gap-2">
              Made with
              <span className="text-red-500 animate-pulse">❤️</span>
              for a healthier you
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
