import { useProfile } from '../../context/ProfileContext'

export default function DashboardHeader({ userName }) {
  const { profile, loading } = useProfile()
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="p-6 rounded-b-2xl bg-gradient-to-r from-gray-100 to-gray-200 shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Weight</span>
          <span className="text-lg font-semibold text-gray-900">
            {loading ? '...' : profile?.weight ? `${profile.weight} kg` : '—'}
          </span>
        </div>

        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900">{userName}</h1>
          <p className="text-gray-600 mt-1">{currentDate}</p>
        </div>
      </div>
    </div>
  )
}
