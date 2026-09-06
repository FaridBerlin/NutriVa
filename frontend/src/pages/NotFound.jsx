import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-textDark">
          Page not found
        </h1>
        <p className="mt-2 text-textLight">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
